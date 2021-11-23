import React, {useEffect, useState, useContext} from 'react'
import axios from 'axios'
import PriceCard from '../components/cards/PriceCard'
import {UserContext} from '../context'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const [state, setState] = useContext(UserContext)
    const [prices, setPrices] = useState([])
    const [userSubscriptions, setUserSubscriptions] = useState([]);

    //console.log('Home:state', state.user.subscription)

    useEffect(() =>{
        fetchPrices()
    }, [])

    useEffect(() =>{
        //console.log('useEffect', state.user.subscription)

        let data = state.user.subscription
        let results = []

        const check = () => data && data.map(sub => {
            //console.log('d', d)
            results.push(sub.plan.id)
        })
        check()

        setUserSubscriptions(results)

    }, [state && state.user])



    const fetchPrices = async() => {
        const {data} = await axios.get('/prices')
        //console.log('data', data)
        setPrices(data)
    }

    const handleClick =async(price) => {

        if(userSubscriptions && userSubscriptions.includes(price.id)) {
            navigate(`${price.nickname.toLowerCase()}`);
            return
        }

        // console.log('plan click')
        // console.log('price.id',price.id)
        if(state && state.token) {
            const {data} = await axios.post('/create-subscription', {
                priceId:price.id
            })

            //console.log('Home', data)

            window.open(data)

        } else {
            navigate('/register')
        }
    }
    return (
        <div className="container-fluid">
            <div className="row col-md-6 offset-md-3 text-center">
                <h1 className="pt-5 fw-bold">
                    あなたのビジネスにあった計画を探そう
                </h1>
                <p className="lead pb-4">
                    自分に合ったプランを選びます
                </p>
            </div>
            <div className="row pt-5 mb-3 text-center">
                {
                    prices && prices.map(price => (
                        <PriceCard
                        price={price}
                        key={price.id}
                        handleSubscription={handleClick}
                        userSubscriptions={userSubscriptions}
                        />
                    ))
                }
                {JSON.stringify(prices, null, 4)}
            </div>
        </div>

    )
}

export default Home

