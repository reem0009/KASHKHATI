import { Request, Response } from 'express';
import pool from '../config/database';
import { v4 as uuidv4 } from 'uuid';

/**
 * Get library content with filters and pagination
 * @route GET /api/library
 */
export const getLibraryContent = async (req: Request, res: Response) => {
  try {
    const { category, language, difficulty, page = 1, limit = 10, search } = req.query;

    let query = 'SELECT * FROM library_content WHERE 1=1';
    const params: any[] = [];
    let paramCount = 1;

    // Apply filters
    if (category) {
      query += ` AND category = $${paramCount}`;
      params.push(category);
      paramCount++;
    }

    if (language) {
      query += ` AND language = $${paramCount}`;
      params.push(language);
      paramCount++;
    }

    if (difficulty) {
      query += ` AND difficulty = $${paramCount}`;
      params.push(difficulty);
      paramCount++;
    }

    if (search) {
      query += ` AND (title ILIKE $${paramCount} OR description ILIKE $${paramCount})`;
      params.push(`%${search}%`);
      paramCount++;
    }

    // Get total count
    const countResult = await pool.query(
      `SELECT COUNT(*) as total FROM (${query}) as counted`,
      params
    );
    const total = parseInt(countResult.rows[0].total);

    // Apply pagination
    const offset = (parseInt(page as string) - 1) * parseInt(limit as string);
    query += ` ORDER BY created_at DESC LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
    params.push(parseInt(limit as string));
    params.push(offset);

    const result = await pool.query(query, params);

    res.json({
      data: result.rows,
      pagination: {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        total,
        pages: Math.ceil(total / parseInt(limit as string)),
      },
    });
  } catch (error) {
    console.error('Get library content error:', error);
    res.status(500).json({ error: 'Failed to fetch library content' });
  }
};

/**
 * Get single library item
 * @route GET /api/library/:id
 */
export const getLibraryItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'SELECT * FROM library_content WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Content not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Get library item error:', error);
    res.status(500).json({ error: 'Failed to fetch content' });
  }
};

/**
 * Mark content as read/bookmarked
 * @route POST /api/library/:id/interact
 */
export const interactWithContent = async (req: Request, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { id } = req.params;
    const { read, bookmarked } = req.body;

    // Check if interaction exists
    const existing = await pool.query(
      'SELECT id FROM user_library_interactions WHERE user_id = $1 AND content_id = $2',
      [req.userId, id]
    );

    if (existing.rows.length > 0) {
      // Update existing interaction
      await pool.query(
        `UPDATE user_library_interactions
         SET read = COALESCE($1, read),
             bookmarked = COALESCE($2, bookmarked),
             updated_at = CURRENT_TIMESTAMP
         WHERE user_id = $3 AND content_id = $4`,
        [read !== undefined ? read : null, bookmarked !== undefined ? bookmarked : null, req.userId, id]
      );
    } else {
      // Create new interaction
      await pool.query(
        `INSERT INTO user_library_interactions (id, user_id, content_id, read, bookmarked)
         VALUES ($1, $2, $3, $4, $5)`,
        [uuidv4(), req.userId, id, read || false, bookmarked || false]
      );
    }

    res.json({ message: 'Interaction saved' });
  } catch (error) {
    console.error('Interact with content error:', error);
    res.status(500).json({ error: 'Failed to save interaction' });
  }
};

/**
 * Get user's bookmarked content
 * @route GET /api/library/bookmarks
 */
export const getBookmarks = async (req: Request, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const result = await pool.query(
      `SELECT lc.* FROM library_content lc
       INNER JOIN user_library_interactions uli ON lc.id = uli.content_id
       WHERE uli.user_id = $1 AND uli.bookmarked = true
       ORDER BY uli.updated_at DESC`,
      [req.userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Get bookmarks error:', error);
    res.status(500).json({ error: 'Failed to fetch bookmarks' });
  }
};

/**
 * Add library content (admin only)
 * @route POST /api/library (admin)
 */
export const addLibraryContent = async (req: Request, res: Response) => {
  try {
    const { title, description, content, category, subcategory, tags, language, author, source, readTime, difficulty, culturalRelevance } = req.body;

    if (!title || !content || !category) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const contentId = uuidv4();
    await pool.query(
      `INSERT INTO library_content (id, title, description, content, category, subcategory, tags, language, author, source, read_time, difficulty, cultural_relevance)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
      [contentId, title, description, content, category, subcategory, tags || [], language || 'ar', author, source, readTime || 5, difficulty || 'beginner', culturalRelevance || 75]
    );

    res.status(201).json({ message: 'Content added successfully', id: contentId });
  } catch (error) {
    console.error('Add library content error:', error);
    res.status(500).json({ error: 'Failed to add content' });
  }
};
