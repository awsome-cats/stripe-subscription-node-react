import React, {useState, useEffect, useContext } from 'react'
import axios from 'axios';
import { SyncOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom';
import { UserContext} from '../context'


const StripeSuccess = () => {
    //const [] = useState()
    const [state,setState] = useContext(UserContext)
    const navigate = useNavigate();


    useEffect(() =>{
        getSubscriptionStatus()
    }, [])

    const getSubscriptionStatus = async() => {

        const { data } = await axios.get('/subscription-status')
        console.log('data',data)
        //server側でupdateした結果、配列に値がない時
        if(data && data.length === 0) {
            navigate('/')
            //ある時
        }else {
            //update localStorage user
            const auth = JSON.parse(localStorage.getItem('auth'))
            auth.user = data;
            localStorage.setItem('auth', JSON.stringify(auth));
            //update user UserContext
            setState(auth);
            setTimeout(() => {
                navigate('/account')
            }, 1000)
        }

    }
    return (
        <div className="d-flex justify-content-center fw-bold" style={{height:'90vh'}}>
            <div className="d-flex align-items-center">
                <SyncOutlined spin style={{ fontSize:'50px'}}/>
            </div>

        </div>
    )
}

export default StripeSuccess
