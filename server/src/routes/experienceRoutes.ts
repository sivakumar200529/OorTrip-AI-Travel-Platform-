import { Router } from 'express';
import { getExperiences, createExperience } from '../controllers/experienceController';

const router = Router();

router.get('/', getExperiences);
router.post('/', createExperience);

export default router;
