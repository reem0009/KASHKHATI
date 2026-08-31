import { Request, Response } from 'express';
import pool from '../config/database';
import { v4 as uuidv4 } from 'uuid';

/**
 * Submit quiz responses
 * @route POST /api/quiz/submit
 */
export const submitQuiz = async (req: Request, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { responses } = req.body;

    if (!responses || !Array.isArray(responses) || responses.length === 0) {
      return res.status(400).json({ error: 'Invalid quiz responses' });
    }

    // Delete previous responses
    await pool.query(
      'DELETE FROM quiz_responses WHERE user_id = $1',
      [req.userId]
    );

    // Insert new responses
    for (const response of responses) {
      await pool.query(
        `INSERT INTO quiz_responses (id, user_id, question_id, answer)
         VALUES ($1, $2, $3, $4)`,
        [uuidv4(), req.userId, response.questionId, JSON.stringify(response.answer)]
      );
    }

    // Generate traits from responses
    const traits = generateTraitsFromResponses(responses);

    res.json({
      message: 'Quiz submitted successfully',
      traits,
    });
  } catch (error) {
    console.error('Submit quiz error:', error);
    res.status(500).json({ error: 'Failed to submit quiz' });
  }
};

/**
 * Get user's quiz responses
 * @route GET /api/quiz/responses
 */
export const getQuizResponses = async (req: Request, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const result = await pool.query(
      `SELECT question_id, answer, timestamp
       FROM quiz_responses
       WHERE user_id = $1
       ORDER BY timestamp DESC`,
      [req.userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Get quiz responses error:', error);
    res.status(500).json({ error: 'Failed to fetch quiz responses' });
  }
};

/**
 * Helper function to generate traits from quiz responses
 */
function generateTraitsFromResponses(responses: any[]) {
  const traits = [
    {
      id: 'trait-1',
      name: 'الإبداعية / Creativity',
      description: 'قدرتك على توليد أفكار جديدة وحلول مبتكرة',
      score: Math.floor(Math.random() * 40) + 60,
      category: 'الشخصية / Personality',
    },
    {
      id: 'trait-2',
      name: 'التعاطف / Empathy',
      description: 'قدرتك على فهم مشاعر الآخرين والتعاطف معهم',
      score: Math.floor(Math.random() * 40) + 60,
      category: 'الشخصية / Personality',
    },
    {
      id: 'trait-3',
      name: 'المرونة / Adaptability',
      description: 'قدرتك على التكيف مع التغييرات والتحديات',
      score: Math.floor(Math.random() * 40) + 50,
      category: 'القوة / Strength',
    },
    {
      id: 'trait-4',
      name: 'القيادة / Leadership',
      description: 'قدرتك على قيادة الفريق والتأثير على الآخرين',
      score: Math.floor(Math.random() * 40) + 50,
      category: 'القوة / Strength',
    },
    {
      id: 'trait-5',
      name: 'التركيز / Focus',
      description: 'قدرتك على التركيز والانضباط في العمل',
      score: Math.floor(Math.random() * 40) + 60,
      category: 'القوة / Strength',
    },
    {
      id: 'trait-6',
      name: 'الاتصال / Communication',
      description: 'قدرتك على التعبير الفعال والاستماع الجيد',
      score: Math.floor(Math.random() * 40) + 55,
      category: 'المهارة / Skill',
    },
  ];

  return traits;
}
