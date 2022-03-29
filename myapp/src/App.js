import React , {useState , createContext } from "react";
import './App.css';
import User from './components/user/User';
import View from './components/view/View';
import {BrowserRouter as Router,
  Routes,
  Route,
  Link , useNavigate, Navigate } from 'react-router-dom';
import Admin from './components/admin/Admin';
import Login from './components/admin/Login';
import ErrorPage from "./components/ErrorPage";
import axios from "axios";
import { set } from "date-fns";

const token = localStorage.getItem('token');
// var dummy ;
const PrivateRoute=(props)=>{
  // const [dummy, setdummy] = useState(false)
  
 axios.post('http://localhost:5500/tokenvalidator' , {token} ).then((resp)=>{
  console.log("this data has been ",resp);
  //  dummy = resp.data.iat;
  // console.log("hey it is : " , props.dummy1);
   console.log("gone : " , resp.data.iat);
   if(resp.data.iat)
  {
    localStorage.setItem('IAT',`${resp.data.iat}`);
    <Navigate to="/admin"/>
  }
 
  //  {
  //    defer=true;
  //  }
  //  else {
  //    defer=false;
  //  }
 
  
});
// console.log(defer);
var dataaas = localStorage.getItem('IAT');
if(dataaas){
  // console.log("hey duumy :" , dummy);
  // var games = props.element
  return props.element
  
}
else {
  return <Navigate to="/"/>
}
    };

function App() {
  const [dummy, setdummy] = useState(false)
  // const Context = createContext('Default Value');
  // let val = true;
  return (
    <Router>
    <Routes>
   {/* <Route exact path= {token ? '/admin': '/'}  /> */}
   {/* <Context.Provider val={val}></Context.Provider> */}
    <Route exact path ='/' element={<Login/>} />
    <Route exact path='/admin' element={<PrivateRoute element={<Admin/>} />} />
      <Route exact path='/user' element={<PrivateRoute element={<User/>}/>} />
      <Route exact path='/update/:id' element={<PrivateRoute element={<User/>}/>} />
      <Route exact path='/view' element={<PrivateRoute element={<View/>}/>} />
      <Route path='*' element={<PrivateRoute element={<ErrorPage/>}/>}/>
      {/* <Route from='*' to='/404' /> */}
    </Routes>
    </Router>
  );
}

export default App;
