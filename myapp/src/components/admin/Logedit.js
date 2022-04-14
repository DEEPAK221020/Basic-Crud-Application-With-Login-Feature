import React , {useState , useEffect} from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
toast.configure()

export const Logedit = () => {

const [third, setthird] = useState('');
const [fourth, setfourth] = useState('');
  const token = localStorage.getItem('token');
  useEffect(() => {
    axios.post('http://localhost:5500/tokenvalidator' , {token} ).then((resp)=>{
      console.log(' my response :- ', resp );
    setthird(resp.data.pass);
    setfourth(resp.data.user[0].userid);
  });
    
  },[]);
  
//   const [first, setfirst] = useState(fourth);
// const [second, setsecond] = useState(third);
  console.log(third);
  console.log(fourth);
  const onValChange = (e)=>{
setthird(e.target.value);
  } 
  const putdata = (e)=>{
    if(fourth && third)
    {
    axios.put('http://localhost:5500/LogUpdate' , {fourth , third}).then((resp)=>{
      console.log(resp);
      // e.preventdefault();
      setTimeout(() => {
        toast.success("updated successfully",{position: toast.POSITION.TOP_CENTER});
      }, 1000);
  }
    );
   
   
    }
   
  }
  return (
    <>  
	<div className='container d-flex justify-content-center flex-column align-items-center align-contents-center'style={{width:"100%" , height:"100vh"}} >
  <form className=' p-4 d-flex flex-column justify-content-center align-items-center align-contents-center border rounded' >
  <div className="mb-3 d-flex justify-content-center flex-column align-items-center align-contents-center ">
    <label htmlFor="exampleInputEmail1" className="form-label">User ID *</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" style={{width:"100%"}} placeholder="Enter Your ID" value={fourth} onChange={(e)=>setfourth(e.target.value)} name='userid' />
    {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
  </div>
  <div className="mb-3 d-flex justify-content-center flex-column align-items-center align-contents-center ">
    <label htmlFor="exampleInputPassword1" className="form-label">Password *</label>
    <input type="password" className="form-control" id="exampleInputPassword1" style={{width:"100%"}} placeholder="Enter Password" value={third} onChange={(e)=>{onValChange(e)}} name='password' />
  </div>
  <button type="submit" className="btn btn-primary mt-3" style={{width:"50%"}} onClick={putdata} >Update </button>
 <Link to='/admin'> <button type="submit" className="btn btn-primary mt-3" style={{width:"100%"}}>Go Back </button></Link>
</form>
</div>
</>
  )
}
