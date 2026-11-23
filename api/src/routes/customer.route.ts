import { Router } from 'express';

import { findCustomerOptions } from '../services/customer.service.ts';

const router = Router();

router.get('/options', async (_request, response) => {
  const customerOptions = await findCustomerOptions();

  response.status(200).json(customerOptions);
});

export default router;
