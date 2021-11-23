import React, {useEffect, useContext} from 'react'
import {useNavigate} from 'react-router-dom'

import { UserContext } from '../../context'


const Premium = ({path}) => {

    const [ state, setState ] = useContext(UserContext)
    const navigate = useNavigate()


    useEffect(() =>{
        //console.log('useEffect', state.user.subscription)

        let data = state.user.subscription
        let results = []

        const check = () => data && data.map(sub => {
            results.push(sub.plan.nickname)
        })
        check()

        const plan = path.toUpperCase();

         if(!results.includes(plan)) {
            navigate('/')
        }

    }, [state && state.user])
    return (
        <>
      <div className="container-fluid">
        <div className="row py-5 bg-light text-center">
          <h1 className="display-4 fw-bold">プレミアム</h1>
          <p className="lead">
          今月の20の限定銘柄をご紹介します。
          </p>
        </div>
      </div>

      <div className="container py-5">
        <div className="row">
          <div className="col-md-8 p-5 rounded bg-dark text-light">
            <ul className="lead">
              <li>Tesla</li>
              <li>Microsoft</li>
              <li>PayPal</li>
              <li>Square</li>
              <li>Alibaba</li>
              <li>Gamestop</li>
              <li>Jumia</li>
              <li>Palantir</li>
              <li>Nio</li>
              <li>Space</li>
              <li>Doyu</li>
              <li>Twitter</li>
              <li>Facebook</li>
              <li>Pintrest</li>
              <li>Tencent</li>
              <li>Coinbase</li>
              <li>Robinhood</li>
              <li>Bitcoin</li>
              <li>Ethereum</li>
              <li>Cardano</li>
            </ul>
          </div>

          <div className="col-md-4">
            <h4>マーケットの分析</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Accusantium ratione pariatur ab unde voluptatem ea, quae veniam
              aperiam sint porro aliquid animi eveniet, culpa id reiciendis vel
              nihil veritatis qui.
            </p>
            <h4>メールでのサポート</h4>
            <p>subscriptions@domain.com</p>
            <h4>コールセンター</h4>
            1300 123 456
          </div>
        </div>
      </div>
    </>
    )
}

export default Premium

