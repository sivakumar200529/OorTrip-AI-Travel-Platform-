import { Router } from 'express';
import { generateTrip, getTrips, getTripById, updateTrip } from '../controllers/tripController';

const router = Router();

router.post('/generate', generateTrip);
router.get('/', getTrips);
router.get('/:id', getTripById);
router.put('/:id', updateTrip);

export default router;
