import { Router } from 'express';
import { register, login, getProfile, updateProfile } from '../controllers/authController';
import { submitQuiz, getQuizResponses } from '../controllers/quizController';
import { createBlueprint, getBlueprint, getPublicBlueprint } from '../controllers/blueprintController';
import { getLibraryContent, getLibraryItem, interactWithContent, getBookmarks, addLibraryContent } from '../controllers/libraryController';
import { getSubscription, upgradeSubscription, cancelSubscription, getTransactions } from '../controllers/subscriptionController';
import { authenticateToken, optionalAuth } from '../middleware/auth';

const router = Router();

// Auth routes
router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/auth/profile', authenticateToken, getProfile);
router.put('/auth/profile', authenticateToken, updateProfile);

// Quiz routes
router.post('/quiz/submit', authenticateToken, submitQuiz);
router.get('/quiz/responses', authenticateToken, getQuizResponses);

// Blueprint routes
router.post('/blueprint', authenticateToken, createBlueprint);
router.get('/blueprint', authenticateToken, getBlueprint);
router.get('/blueprint/:blueprintId', optionalAuth, getPublicBlueprint);

// Library routes
router.get('/library', optionalAuth, getLibraryContent);
router.get('/library/:id', optionalAuth, getLibraryItem);
router.post('/library/:id/interact', authenticateToken, interactWithContent);
router.get('/library/bookmarks', authenticateToken, getBookmarks);
router.post('/library', authenticateToken, addLibraryContent);

// Subscription routes
router.get('/subscription', authenticateToken, getSubscription);
router.post('/subscription/upgrade', authenticateToken, upgradeSubscription);
router.post('/subscription/cancel', authenticateToken, cancelSubscription);
router.get('/subscription/transactions', authenticateToken, getTransactions);

export default router;
