const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
import User from '../models/User'

export const prices = async (req, res) => {
    const prices = await stripe.prices.list();
    //console.log('prices', prices)
    res.json(prices.data.reverse());
};

export const createSubscription = async(req, res) => {
    //console.log('req',req.body)
    try {
        // なせuser._idが使用できるのか
        // それはmiddlewareが確認できるから
        const user = await User.findById(req.user._id)

        const session = await stripe.checkout.sessions.create({
            mode:'subscription',
            payment_method_types: ['card'],
            line_items: [{
                    price: req.body.priceId,
                    quantity:1
                }

            ],
            customer:user.stripe_customer_id,
            success_url: process.env.STRIPE_SUCCESS_URL,
            cancel_url: process.env.STRIPE_CANCEL_URL
        })
        //console.log('session', session)
        res.send(session.url)

    }catch(error) {
        console.log(error)
    }
}

/*
ユーザーが支払った後の処理
localhost:8000/subscription-status
*expand
プロパティを拡張して、ユーザーが行った支払いに関する情報を取得
*/

export const subscriptionStatus = async (req, res) => {
    try {

        const user = await User.findById(req.user._id);
        console.log('subscription:server', user)
        const subscription = await stripe.subscriptions.list({
            customer: user.stripe_customer_id,
            status:'all',
            expand:['data.default_payment_method']
        });

        //console.log('subscription', subscription)
        // 支払った後のデータを更新する
        const updated = await User.findByIdAndUpdate(user._id, {
            subscription:subscription.data
        }, {new: true})

        //console.log('updated', updated)

        res.json(updated)

    }catch(error) {
        console.log(error)
    }
}

export const subscriptions = async (req, res) => {
    try {

        const user = await User.findById(req.user._id);
        console.log('subscription:server', user)
        const subscriptions = await stripe.subscriptions.list({
            customer: user.stripe_customer_id,
            status:'all',
            expand:['data.default_payment_method']
        });

        res.json(subscriptions)

    }catch(error) {
        console.log(error)
    }
}

export const customerPortal = async(req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const portalSession = await stripe.billingPortal.sessions.create({
            customer: user.stripe_customer_id,
            return_url: process.env.STRIPE_SUCCESS_URL
        })

        console.log('customerPortal', portalSession)
        res.json(portalSession.url)

    }catch(error) {
        console.log(error)
    }
}


