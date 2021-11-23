import React, { useState,useEffect, useContext } from 'react'
import {useNavigate} from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'
import axios from 'axios'
import moment from 'moment'

import {UserContext} from '../context'
const Account = () => {

    const [state, setState] = useContext(UserContext)
    const [subscriptions, setSubscriptions] =useState([])
    const navigate = useNavigate()

    useEffect(() =>{

        if(state && state.token) getSubscriptions()

    }, [state && state.token])

    const getSubscriptions = async () => {
        const {data} = await axios.get('/subscriptions')
        setSubscriptions(data.data)
    }

    const manageSubscription = async() => {
        const { data } = await axios.get('/customer-portal')
        console.log('manage', data)

        window.open(data)
    }

    // const navigate = Navigate()
    return (
        <div className="container">
            <div className="row">
                <UserOutlined className="display-4"/>
                <h1>アカウント</h1>
                <p className="lead pb-4">
                    定期購入のステータス
                </p>
                {/* <pre>{JSON.stringify(subscriptions, null, 4)}</pre> */}
            </div>
            <div className="row">
                {
                    subscriptions && subscriptions.map(sub => (
                        <div key={sub.id}>
                            <section>
                                <hr/>
                                <h4>{sub.plan.nickname}</h4>
                                <h5>
                                    {
                                        (sub.plan.amount).toLocaleString('ja-JP', {
                                            style: 'currency',
                                            currency: sub.plan.currency
                                        })
                                    }
                                </h5>
                                <p>ステータス: {sub.status}</p>
                                <p>下四桁: {sub.default_payment_method.card.last4}</p>
                                <p>契約期間の期末:{moment(sub.current_period_end * 1000).format('YYYY MMMM Do dddd')}</p>
                                <button onClick={() => navigate(`/${sub.plan.nickname.toLowerCase()}`)} className="btn btn-outline-danger">アクセス</button>
                                <button onClick={manageSubscription} className="btn btn-outline-warning">サブスクの管理</button>
                            </section>

                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Account
