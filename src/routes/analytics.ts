import { Router } from 'express';
import { getEventCounts, getEventCountsByType } from '../controllers/analyticsController';

const router = Router();

// GET /analytics/event-counts - Get total event counts
router.get('/event-counts', getEventCounts);

// GET /analytics/event-counts-by-type - Get event counts by type
router.get('/event-counts-by-type', getEventCountsByType);

export default router;