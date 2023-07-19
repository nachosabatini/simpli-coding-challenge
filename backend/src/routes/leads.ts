import { Router } from 'express';
import { createLead } from '../controllers/leadController';

const leadsRouter: Router = Router();

leadsRouter.post('/leads', createLead);

export default leadsRouter;
