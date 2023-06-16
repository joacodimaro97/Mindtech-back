import express from 'express'
import { Router } from 'express';
import payments from '../controllers/payments/payments.js'
import mp_react_native from '../controllers/payments/mp_react_native.js';

const router = Router();

router.post('/', payments)
router.post('/native', mp_react_native)


export default router