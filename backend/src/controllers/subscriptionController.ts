import { Request, Response } from 'express';
import pool from '../config/database';
import { v4 as uuidv4 } from 'uuid';

/**
 * Get user subscription
 * @route GET /api/subscription
 */
export const getSubscription = async (req: Request, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const result = await pool.query(
      `SELECT id, user_id, tier, status, current_period_start, current_period_end, cancel_at_period_end, created_at, updated_at
       FROM subscriptions
       WHERE user_id = $1`,
      [req.userId]
    );

    if (result.rows.length === 0) {
      // Create free subscription if doesn't exist
      const subscriptionId = uuidv4();
      await pool.query(
        `INSERT INTO subscriptions (id, user_id, tier, status)
         VALUES ($1, $2, $3, $4)`,
        [subscriptionId, req.userId, 'free', 'active']
      );

      return res.json({
        id: subscriptionId,
        userId: req.userId,
        tier: 'free',
        status: 'active',
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Get subscription error:', error);
    res.status(500).json({ error: 'Failed to fetch subscription' });
  }
};

/**
 * Upgrade subscription
 * @route POST /api/subscription/upgrade
 */
export const upgradeSubscription = async (req: Request, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { tier, paymentMethodId } = req.body;

    if (!tier || !['premium', 'studio'].includes(tier)) {
      return res.status(400).json({ error: 'Invalid subscription tier' });
    }

    // Get pricing
    const pricing: Record<string, number> = {
      premium: 99,
      studio: 299,
    };

    const amount = pricing[tier];

    // Create transaction
    const transactionId = uuidv4();
    await pool.query(
      `INSERT INTO transactions (id, user_id, amount, currency, status, payment_method)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [transactionId, req.userId, amount, 'SAR', 'completed', paymentMethodId || 'card']
    );

    // Update subscription
    const now = new Date();
    const periodEnd = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days

    const subscriptionResult = await pool.query(
      `UPDATE subscriptions
       SET tier = $1, status = $2, current_period_start = $3, current_period_end = $4, cancel_at_period_end = false, updated_at = CURRENT_TIMESTAMP
       WHERE user_id = $5
       RETURNING id, tier, status, current_period_start, current_period_end`,
      [tier, 'active', now, periodEnd, req.userId]
    );

    // Update user tier
    await pool.query(
      'UPDATE users SET subscription_tier = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
      [tier, req.userId]
    );

    res.json({
      message: 'Subscription upgraded successfully',
      subscription: subscriptionResult.rows[0],
      transaction: { id: transactionId, amount, currency: 'SAR', status: 'completed' },
    });
  } catch (error) {
    console.error('Upgrade subscription error:', error);
    res.status(500).json({ error: 'Failed to upgrade subscription' });
  }
};

/**
 * Cancel subscription
 * @route POST /api/subscription/cancel
 */
export const cancelSubscription = async (req: Request, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { cancelAtPeriodEnd = true } = req.body;

    const result = await pool.query(
      `UPDATE subscriptions
       SET cancel_at_period_end = $1, status = CASE WHEN $1 = true THEN status ELSE 'cancelled' END, updated_at = CURRENT_TIMESTAMP
       WHERE user_id = $2
       RETURNING id, tier, status, cancel_at_period_end`,
      [cancelAtPeriodEnd, req.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Subscription not found' });
    }

    res.json({
      message: cancelAtPeriodEnd ? 'Subscription will be cancelled at period end' : 'Subscription cancelled immediately',
      subscription: result.rows[0],
    });
  } catch (error) {
    console.error('Cancel subscription error:', error);
    res.status(500).json({ error: 'Failed to cancel subscription' });
  }
};

/**
 * Get transaction history
 * @route GET /api/subscription/transactions
 */
export const getTransactions = async (req: Request, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const result = await pool.query(
      `SELECT id, amount, currency, status, payment_method, created_at
       FROM transactions
       WHERE user_id = $1
       ORDER BY created_at DESC
       LIMIT 50`,
      [req.userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
};
