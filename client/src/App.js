import React from 'react';
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Nav from './components/Nav'
import StripeSuccess from './pages/StripeSuccess'
import StripeCancel from './pages/StripeCancel'
import AuthRoutes from './components/routes/AuthRoutes'
import Account from './pages/Account'
import Basic from './pages/plans/Basic'
import Standard from './pages/plans/Standard'
import Premium from './pages/plans/Premium'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Toaster } from 'react-hot-toast';

/**
 * Routes: Switchの代替
 * AuthRoutesはredirectする　custom route  ラップして使用する
 */

function App() {
  return (
    	// react router v6
      <Router>
		<Nav/>
		<Toaster position="buttom-right" toastOptions={{duration: 2000}}/>
		<Routes>
			<Route exact path="/" element={<Home/>}/>
			<Route  path="/register" element={<Register/>}/>
			<Route  path="/login" element={<Login/>}/>


			<Route element={<AuthRoutes/>}>
				<Route exact path="/stripe/success" element={<StripeSuccess/>}/>
				<Route exact path="/stripe/cancel" element={<StripeCancel/>}/>
				<Route path="/account" element={<Account/>}/>
				<Route path="/basic" element={<Basic path={'basic'}/>}/>
				<Route path="/standard" element={<Standard path={'standard'}/>}/>
				<Route path="/premium" element={<Premium path={'premium'}/>}/>
			</Route>

      	</Routes>
      </Router>
  );
}

export default App;
