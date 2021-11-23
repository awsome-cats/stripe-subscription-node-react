import React, {useContext} from 'react';
import { UserContext} from '../../context'
// import {Link} from 'react-router-dom'

const PriceCard = ({price, handleSubscription, userSubscriptions}) => {

    const [state] = useContext(UserContext)
    //console.log('priceCard', state)
    //console.log('userSubscriptions', userSubscriptions)

    const dynamicDescription = () => {
        if(price.nickname === 'BASIC') {
            return '5 exclusive stocks'
        }else if(price.nickname === 'STANDARD'){
            return '10 exclusive stocks'

        }else if(price.nickname === 'PREMIUM') {
            return '20 exclusive stocks'
        }
    };

    const buttonStyle = () =>{
        return price.nickname === 'BASIC' ? 'btn-outline-danger': 'btn-danger'
    }
    const headerStyle = () =>{
        return price.nickname === 'PREMIUM' ? 'bg-danger text-light': ''
    }

    const borderStyle = () =>{
        return price.nickname === 'PREMIUM' ? 'border-danger': ''
    }

    const buttonText = () => {
        return state && state.token ? 'プランを購入': 'サインアップ'
    }



    return (

            <div className="col">
                <div className={`card mb-4 rounded-3 shadow-sm ${borderStyle()}`}>
                    <div className={`card-header py-3 ${headerStyle()}`}>
                        <h4 className="my-0 fw-normal">{price.nickname}</h4>
                    </div>
                    <div className="card-body">
                        <h1 className="card-title pricing-card-title">
                            {
                            (price.unit_amount).toLocaleString('ja-JP',
                            {style:'currency',currency:'JPY'})}
                            <small className="text-muted fw-light">
                                /月
                            </small>
                        </h1>
                        <ul className="list-unstyled mt-3 mb-4">
                            <li className="fw-bold">{dynamicDescription()}</li>
                            <li>Free market analysis</li>
                            <li>Email support</li>
                            <li>Help center access</li>
                        </ul>

                       {/* <Link to="/register"> */}
                        <button
                        onClick={() => handleSubscription(price)}
                            className={`w-100 btn btn-lg ${buttonStyle()}`}>
                                {/* {JSON.stringify(userSubscriptions)} */}
                                {userSubscriptions && userSubscriptions.includes(price.id)? 'Access Plan': buttonText()}
                                {/* {buttonText()} */}
                            </button>
                        {/* </Link> */}
                    </div>
                </div>
            </div>

    )
}

export default PriceCard

