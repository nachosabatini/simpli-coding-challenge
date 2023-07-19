import { Router } from 'express';
import { createLead, getAllLeads } from '../controllers/leadController';

const leadsRouter: Router = Router();

leadsRouter.post('/leads', createLead);
leadsRouter.get('/leads', getAllLeads);

export default leadsRouter;
