import React, { useState , useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link , useNavigate, useParams } from "react-router-dom";
import {parseISO} from 'date-fns'
import axios from 'axios';
import { toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  toast.configure()
// import moment from 'react-moment';
// import 'moment-timezone';
function User() {
  const Taker = {
    Name: "",
    Number: "",
    DOB:new Date() || "",
    Services: "",
    Therapist: "",
    Payment: "",
  };
  // for form
  const [state, setState] = useState(Taker);
  const { Name, Number, DOB, Services, Therapist, Payment } = state;
  const navigate = useNavigate();
  // for Date Format
  // const [startDate, setStartDate] = useState(new Date());
  // // use this
  // setState({ ...state, DOB: new Date() });
  // const [information, setinformation] = useState([])
  const onValueChange = (e) => {
    console.log(e.target.value, e.target.name);

    setState({ ...state, [e.target.name]: e.target.value });
    console.log(state);
  };
  const {id}=useParams();
  useEffect(() => {
    axios.get(`http://localhost:5500/details/${id}`).then((response)=> {
      if(id){
       setState({Name:response.data[0].name , Number:response.data[0].number , DOB:parseISO(response.data[0].dob) ,Services:response.data[0].services , Therapist:response.data[0].therapist , Payment:response.data[0].payment});
       console.log(response.data[0].dob);
      //  console.log(getVarDate(new Date()))
      }
      else{
      setState({...response.data[0]});
      }

    // console.log(response.data[0].dob);
    console.log(state);
    // setinformation(response.data[0]);
  })

    // console.log(information);
  }, [id])


  

const poster =(e)=>{
  e.preventDefault();
  if(!state.Name || !state.Number || !state.DOB || !state.Services || !state.Therapist || !state.Payment)
  {
    toast.error("please provide the value in the input field", {position: toast.POSITION.TOP_CENTER});
  }
  else{
    if(id)
    {
axios.put(`http://localhost:5500/update/${id}` , state ).then(()=>{
  setState({Name:"" , Number:"" , DOB:"", Services:"", Therapist:"" , Payment:""});
}).catch((error)=>{
  toast.error("error");
});
toast.success("Details Updated Successfully" , {position: toast.POSITION.TOP_CENTER});
    }
    else{
  axios.post('http://localhost:5500/create', state ).then(response => {console.log('success',response);
  setState({Name:"" , Number:"" , DOB:"", Services:"", Therapist:"" , Payment:""});
}).catch((error)=>{
  console.log(error);
})
toast.success("values inserted successfully", {position: toast.POSITION.TOP_CENTER});
}
setTimeout(() => {
  navigate('/view');
}, 2000);

      }
    };
  
  return (
    <>
      <div className="container mt-2 d-flex justify-content-center flex-column align-items-center align-contents-center">
        <h1> Customer Entries </h1>
        <form action="" onSubmit={poster} className="row mt-2 d-flex justify-content-center flex-column align-items-center align-contents-center " >
          <div className="col" style={{ width: "100%" }}>
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your Name"
              onChange={(e) => onValueChange(e)}
              name="Name"
              value={Name || ""}
            />
          </div>

          <div className="col" style={{ width: "100%" }}>
            <label className="form-label">Number</label>
            <input
              type="integer"
              className="form-control"
              placeholder="Enter your Number"
              onChange={(e) => onValueChange(e)}
              name="Number"
              value={Number || ""}
            />
          </div>

          <div className="col" style={{ width: "100%" }}>
            <label htmlFor="inputState" className="form-label">
              Date Of Birth
            </label>
            <DatePicker
              selected={DOB}
              onChange={(date, e) => {
                setState({ ...state, DOB:date });
                // setState({ ...state, [e.target.name]: e.target.value });
                // onValueChange(date);
                // console.log(date.toLocaleDateString());
                // setState({...state , [e.target.name]:e.target.startDate});
                // console.log(state);
              }}
              scrollableYearDropdown
              showYearDropdown
              maxDate={new Date()}
              dateFormat="dd/MM/yyyy"
              name="DOB"
              value={DOB || ""}
            />
          </div>

          <div className="col" style={{ width: "100%" }}>
            <label htmlFor="inputState" className="form-label">
              Services
            </label>
            <select
              id="inputState"
              className="form-select"
              onChange={(e) => onValueChange(e)}
              name="Services"
              value={Services || ""}
            >
              <option value=" "> </option>
              <option value="Audi">Audi</option>
              <option value="BMW">BMW</option>
              <option value="Mercedes">Mercedes</option>
              <option value="Volvo">Volvo</option>
            </select>
          </div>

          <div className="col" style={{ width: "100%" }}>
            <label htmlFor="inputState" className="form-label">
              Therapists
            </label>
            <select
              id="inputState"
              className="form-select"
              onChange={(e) => onValueChange(e)}
              name="Therapist"
              value={Therapist || ""}
            >
              <option value=" "> </option>
              <option value="Audi">Audi</option>
              <option value="BMW">BMW</option>
              <option value="Mercedes">Mercedes</option>
              <option value="Volvo">Volvo</option>
            </select>
          </div>

          <div className="col" style={{ width: "100%" }}>
            <label htmlFor="inputState" className="form-label">
              Payment
            </label>
            <select
              id="inputState"
              className="form-select"
              onChange={(e) => onValueChange(e)}
              name="Payment"
              value={Payment || ""}
            >
              <option value=" "> </option>
              <option value="Audi">Audi</option>
              <option value="BMW">BMW</option>
              <option value="Mercedes">Mercedes</option>
              <option value="Volvo">Volvo</option>
            </select>
          </div>

          <div className="col mt-2 d-flex justify-content-center flex-column align-items-center align-contents-center ">
              
         <input type="submit" className="btn btn-primary rounded-3" value={id ? "update" : "save"}/>
            {/* <Link to="/view"></Link>  */}
          </div>
        </form>
      </div>
    </>
  );
}

export default User;
