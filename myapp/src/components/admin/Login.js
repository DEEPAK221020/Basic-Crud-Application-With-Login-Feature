import React , {useState , useEffect} from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import {Navigate, useNavigate , Link } from 'react-router-dom';
// import { set } from 'date-fns';
  toast.configure()

// const next = {
//   ideas : false
// } ;

const Login = () => {
 const navigate = useNavigate();
    
  const [usid, setusid] = useState("");
  const [password, setpassword] = useState("");
  // const [log, setlog] = useState(false);
  // const [loger , setloger]=useState(false);
  // useEffect(() => {
  //   if( localStorage.getItem('token'))
  //   {
  //     navigate('/admin');
  //   }
  //   else{
  //     navigate('/');
  //   }
  // }, [])
  
  const insert=(e)=>{
    e.preventDefault();
    if(usid && password)
    {
axios.post('http://localhost:5500/login',{
  user:usid,
  password:password
}).then((res)=>{console.log(res); 
if(res.data.message)
{
  toast.error("user already exists" , {position: toast.POSITION.TOP_CENTER});
}
else{
  console.log("bolo : " , res)
setusid("");
  setpassword("");
 
   toast.success("register successfully",{position: toast.POSITION.TOP_CENTER})
}
}).catch((err)=>console.log(err));


    }
    else{
      toast.error("filled the id" ,{position: toast.POSITION.TOP_CENTER} )
    }
  }
  const signin=(e)=>{
    e.preventDefault();
    if(usid && password)
    {
    axios.post('http://localhost:5500/checkin',{
      user:usid,
      password:password
    }).then((result)=>{console.log(result);
      if(result.data.token)
      {
        setusid("");
        setpassword("");
        // setlog(true);
        toast.success("Signin successfully",{position: toast.POSITION.TOP_CENTER})       
        localStorage.setItem('token' , `${result.data.token}`);
        console.log(result.data);
        navigate('/admin');
        console.log("deal done");
          // <Navigate to='/admin'/>
      }
     else if(result.data.message){
        toast.error("invalid userid and password" ,{position: toast.POSITION.TOP_CENTER} );
        // <Redirect to='/'/>
        
      }

    }).catch((error)=>console.log(error));

    // <Navigate to='/admin' />
  
  }
  else{
    toast.error("filled the id" ,{position: toast.POSITION.TOP_CENTER} )
  }
  
}


  return (
	<div className='container d-flex justify-content-center flex-column align-items-center align-contents-center'style={{width:"100%" , height:"100vh"}} >
  <form className=' p-4 d-flex flex-column justify-content-center align-items-center align-contents-center border rounded' >
  <div className="mb-3 d-flex justify-content-center flex-column align-items-center align-contents-center ">
    <label htmlFor="exampleInputEmail1" className="form-label">User ID *</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" style={{width:"100%"}} placeholder="Enter Your ID" value={usid}  onChange={(e)=>setusid(e.target.value) } />
    {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
  </div>
  <div className="mb-3 d-flex justify-content-center flex-column align-items-center align-contents-center ">
    <label htmlFor="exampleInputPassword1" className="form-label">Password *</label>
    <input type="password" className="form-control" id="exampleInputPassword1" style={{width:"100%"}} placeholder="Enter Password" value={password}  onChange={(e)=>setpassword(e.target.value) } />
  </div>
  <button type="submit" className="btn btn-primary" style={{width:"50%"}} onClick={(e)=>{signin(e)}} >Sign In</button>
  <button type="submit" className="btn btn-primary mt-3" style={{width:"50%"}} onClick={(e)=> insert(e)} >Register</button>
</form>
</div>
	
  )
}


export default Login