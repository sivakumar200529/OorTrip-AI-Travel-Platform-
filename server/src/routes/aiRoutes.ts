import { Router } from 'express';
import { chat, recommend, itinerary } from '../controllers/aiController';

const router = Router();

router.post('/chat', chat);
router.post('/recommend', recommend);
router.post('/itinerary', itinerary);

export default router;
