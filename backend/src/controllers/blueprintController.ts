import { Request, Response } from 'express';
import pool from '../config/database';
import { v4 as uuidv4 } from 'uuid';

/**
 * Create or update user blueprint
 * @route POST /api/blueprint
 */
export const createBlueprint = async (req: Request, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { name, description, traits, avatarConfig, recommendations, culturalInsights } = req.body;

    // Check if blueprint exists
    const existing = await pool.query(
      'SELECT id FROM blueprints WHERE user_id = $1',
      [req.userId]
    );

    let blueprintId: string;

    if (existing.rows.length > 0) {
      // Update existing blueprint
      blueprintId = existing.rows[0].id;
      await pool.query(
        `UPDATE blueprints
         SET name = $1, description = $2, traits = $3, avatar_config = $4,
             recommendations = $5, cultural_insights = $6, updated_at = CURRENT_TIMESTAMP
         WHERE id = $7`,
        [
          name,
          description,
          JSON.stringify(traits),
          JSON.stringify(avatarConfig),
          JSON.stringify(recommendations),
          JSON.stringify(culturalInsights),
          blueprintId,
        ]
      );
    } else {
      // Create new blueprint
      blueprintId = uuidv4();
      await pool.query(
        `INSERT INTO blueprints (id, user_id, name, description, traits, avatar_config, recommendations, cultural_insights)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          blueprintId,
          req.userId,
          name,
          description,
          JSON.stringify(traits),
          JSON.stringify(avatarConfig),
          JSON.stringify(recommendations),
          JSON.stringify(culturalInsights),
        ]
      );
    }

    res.json({
      message: 'Blueprint saved successfully',
      blueprintId,
    });
  } catch (error) {
    console.error('Create blueprint error:', error);
    res.status(500).json({ error: 'Failed to create blueprint' });
  }
};

/**
 * Get user blueprint
 * @route GET /api/blueprint
 */
export const getBlueprint = async (req: Request, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const result = await pool.query(
      `SELECT id, user_id, name, description, traits, avatar_config, recommendations, cultural_insights, created_at, updated_at
       FROM blueprints
       WHERE user_id = $1`,
      [req.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Blueprint not found' });
    }

    const blueprint = result.rows[0];
    res.json({
      id: blueprint.id,
      userId: blueprint.user_id,
      name: blueprint.name,
      description: blueprint.description,
      traits: blueprint.traits,
      avatarConfig: blueprint.avatar_config,
      recommendations: blueprint.recommendations,
      culturalInsights: blueprint.cultural_insights,
      createdAt: blueprint.created_at,
      updatedAt: blueprint.updated_at,
    });
  } catch (error) {
    console.error('Get blueprint error:', error);
    res.status(500).json({ error: 'Failed to fetch blueprint' });
  }
};

/**
 * Get public blueprint (for sharing)
 * @route GET /api/blueprint/:blueprintId
 */
export const getPublicBlueprint = async (req: Request, res: Response) => {
  try {
    const { blueprintId } = req.params;

    const result = await pool.query(
      `SELECT id, name, description, traits, avatar_config, recommendations, cultural_insights
       FROM blueprints
       WHERE id = $1`,
      [blueprintId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Blueprint not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Get public blueprint error:', error);
    res.status(500).json({ error: 'Failed to fetch blueprint' });
  }
};
