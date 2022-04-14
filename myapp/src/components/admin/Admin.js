import React from 'react'
import {Link, Navigate} from "react-router-dom";
import { toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Login from './Login';
import './admin.css';
  toast.configure()
function admin() {
  return (
	<div className='container d-flex flex-column justify-content-center align-items-center align-content-center cent'>
		<div className='row d-flex flex-column justify-content-center align-items-center gap-5 '>
			<div className='col  '><h1> Welcome to the Admin Panel</h1></div>
			<div className='col part1 card d-flex flex-column justify-content-center align-items-center '> <div className='card-body '> <Link to='/user' className='sec1'>click here to get user Form</Link></div></div> 
			<div className='col part2 card d-flex flex-column justify-content-center align-items-center'> <div className='card-body sec2'> <Link to='/view' className='sec1'>click here to view user details</Link></div></div>
		<div className='col part3 card d-flex flex-column justify-content-center align-items-center align-content-center'>
			<div className='card-body sec3'>{localStorage.getItem ? <div className='sec1'><p onClick={(e)=> { 
	if(window.confirm('are u sure want to logout'))
	{
	localStorage.removeItem('token');
	localStorage.removeItem('IAT');
	toast.success("LOG OUT successfully",{position: toast.POSITION.TOP_CENTER});
	<Navigate to="/"/>
}
}
}>LOG_OUT</p></div> : <p><Link to='/login' className='sec1'>LOGIN FORM</Link></p>}</div></div>

<div className='col part2 card d-flex flex-column justify-content-center align-items-center'> <div className='card-body sec2'> <Link to='/logupdate' className='sec1'>Edit The Login Details</Link></div></div>
</div>
	</div>
  )
}

export default admin