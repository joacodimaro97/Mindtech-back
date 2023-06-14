import express from 'express'
import { Router } from 'express';
import payments from '../controllers/payments/payments.js'

const router = Router();

router.post('/', payments)


export default router