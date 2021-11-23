
import { hasPassword, comparePassword } from '../helpers/auth'
import User from '../models/User'
import jwt from 'jsonwebtoken'
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export const register = async (req, res) => {

    try {

        //console.log('register', req.body)

        const { name, email, password } = req.body

        if(!name) {
           //res.status(400) ではcatchがerrorを返してしまう
            return res.json({
                error: '氏名を入力してください'
            })
        }

        if(!password || password.length < 6) {

            return res.json({
                error: 'パスワードは6文字以上です'
            })
        }

        const existEmail = await User.findOne({email});
        //console.log('existEmail', existEmail)

        if(existEmail) {
            return res.json({
                error: 'Eメールが存在しています'
            })
        }
        const hashedPassword = await hasPassword(password);

        //create account stripe

        const customer = await stripe.customers.create({
            email,
        })

        console.log('customer', customer)

        try {
            const user = await new User({
                name,
                email,
                password: hashedPassword,
                stripe_customer_id: customer.id
            }).save();

            const token = jwt.sign({
                _id:user._id
            }, process.env.JWT_SECRET, {expiresIn:'7d'})

            //console.log('createUser', user)

            const { password, ...rest} = user._doc;


            res.status(200).json({
                status: 1,
                success:true,
                message: 'アカウントが作成されました',
                user:rest,
                token
            })



        }catch(error) {
            console.log(error)
        }

    }catch(error) {
        console.log(error)
        res.status(400).json({
            status: 0,
            success:false,
            message: 'データを取得できませんでした'
        })
    }


}

export const login = async(req, res) => {
    try {



        const user = await User.findOne({email:req.body.email})

        if(!user) {
            return res.json({
                error: 'Eメールが見つかりません'
            })
        }
            const match = await comparePassword(req.body.password, user.password)

            if(!match) {
                return res.json({
                    error: 'パスワードが間違っています'
                })
            }

            // token
            const token = jwt.sign({
                _id:user._id
            }, process.env.JWT_SECRET, {expiresIn:'7d'})

            const { password, ...rest } = user._doc;

            res.status(200).json({
                token,
                user:rest
            })

    }catch(error) {

        console.log(error)
        res.status(400).json({
            status: 0,
            success:false,
            message: 'データを取得できませんでした'
        })


    }
}
