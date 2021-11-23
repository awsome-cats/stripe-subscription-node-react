import React, {useState, useContext} from 'react'
import Input from '../components/Input'
import Button from '../components/Button'

import { toast } from 'react-hot-toast';
//axios
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

//context
import { UserContext } from '../context'
const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    //context
    const [state,setState] = useContext(UserContext)
    const navigate = useNavigate();


    const handleClick = async (e) => {


        try {
            e.preventDefault()

            const {data} = await axios.post('/register', {
                name,
                email,
                password
            });
            //console.log('data', data)

            if(data.error) {
                toast.error(data.error)
            }else {
                setName('')
                setEmail('')
                setPassword('')
                toast.success(`${data.user.name}は登録されました`)
                const {user, token} = data
                //console.log('register', user, token)
                const newData = {
                    user,
                    token
                }
                setState(newData)
                localStorage.setItem('auth',JSON.stringify(newData))
                navigate('/')
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
                    <h1 className="pt-5 fw-bold">get start</h1>
                    <p className="lead pb-4">
                        Sign up for free. No credit card required
                    </p>
                    <div className="form-group">
                        <Input label='氏名' value={name} setValue={setName}/>
                        <Input label='Eメール'type="email" value={email} setValue={setEmail}/>
                        <Input label='パスワード' type="password" value={password} setValue={setPassword}/>
                        <div className="d-grid">
                        <Button handleClick={handleClick} type="danger" text="登録する" size="sm"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;

