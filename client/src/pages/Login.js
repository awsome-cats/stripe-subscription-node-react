import React, {useState, useContext} from 'react'
//components
import Input from '../components/Input'
import Button from '../components/Button'

import { toast } from 'react-hot-toast';

//axios
import axios from 'axios'

//history
import { useNavigate } from 'react-router-dom';

// context
import { UserContext } from '../context'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // context
    const [state,setState] = useContext(UserContext)
    const navigate = useNavigate();


    const handleClick = async (e) => {

        try {
            e.preventDefault()

            const {data} = await axios.post('/login', {
                email,
                password
            });

            if(data.error) {
                toast.error(data.error)
            }else {
                setEmail('')
                setPassword('')

                const {user, token} = data
                const newData = {
                    user,
                    token
                }
                //context
                setState(newData)
                console.log('login', state)
                localStorage.setItem('auth',JSON.stringify(newData))
                navigate('/account')
            }


        }catch(error){
            console.log(error)
            toast.error('何か問題がおきました')
        }
    }
    return (
        <div className="d-flex justify-content-center " style={{height: '80vh'}}>
            <div className="container align-items-center d-flex">
                <div className="row col-md-6 offset-md-3 text-center">
                    <h1 className="pt-5 fw-bold">ログイン</h1>
                    <p className="lead pb-4">
                        Login for free. No credit card required
                    </p>
                    <div className="form-group">
                        <Input label='Eメール'type="email" value={email} setValue={setEmail}/>
                        <Input label='パスワード' type="password" value={password} setValue={setPassword}/>
                        <div className="d-grid">
                        <Button handleClick={handleClick} type="danger" text="ログインする" size="sm"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;

