import express from 'express';
const router = express.Router()


//controllers
import { prices, createSubscription, subscriptionStatus, subscriptions , customerPortal} from '../controllers/subs.controller'
import {requireSignIn } from '../middlewares'

//api/register
router.get('/prices', prices);

router.post('/create-subscription', requireSignIn,createSubscription);

router.get('/subscription-status', requireSignIn, subscriptionStatus)

router.get('/subscriptions', requireSignIn, subscriptions);

router.get('/customer-portal', requireSignIn, customerPortal);

module.exports = router
