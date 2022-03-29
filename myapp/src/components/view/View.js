import React , {useEffect , useState} from "react";
import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
toast.configure();

function View() {

const [first, setfirst] = useState([])

	// useEffect(() => {
	//   fetch('http://localhost:5500/details').then((res)=>res.json()).then((data)=>console.log(data));
	 
	// },[]);
const loaddata = ()=>{
	fetch('http://localhost:5500/details').then((res)=>res.json()).then((data)=>{console.log(data); 
		setfirst(data);
	});
}

	useEffect(() => {
	loaddata();
		// axios.get('http://localhost:5500/details', {
		// 	params: {
		// 	  ID: 12345,
		// 	  header:"Access-Control-Allow-Origin: *"
		// 	}
		//   })
		//   .then(function (response) {
		// 	console.log(response);
		//   })
	}, [])

  const remover=(id)=>{
    if(window.confirm("Are you sure wanted to delete ?"))
    {
    axios.delete(`http://localhost:5500/remove/${id}`);
    toast.success("Deletd Successfully" , {position: toast.POSITION.TOP_CENTER});
    console.log(id);
    setTimeout(() => {
      loaddata();
    }, 500);
    }
  }
	
	
  return (
	<div className='container mt-2 d-flex justify-content-center flex-column align-items-center align-contents-center'>
		<table className="table">
  {/* <caption>List of users</caption> */}
  <thead className="table-light" >
    <tr>
      <th scope="col">ID</th>
      <th scope="col">NAME</th>
      <th scope="col">NUMBER</th>
      <th scope="col">DOB</th>
	  <th scope="col">SERVICES</th>
	  <th scope="col">THERAPISTS</th>
	  <th scope="col">PAYMENT</th>
    <th scope="col"><Link to={`/admin`}><button type="button" className=" btn btn-secondary rounded-3 " > Admin </button></Link></th>
    <th scope="col"><Link to={`/user`}><button type="button" className=" btn btn-secondary rounded-3 " > GO BACK </button></Link></th>
    </tr>
  </thead>
{first.map((data)=>(
  <tbody key={data.id}>
    <tr>
      <th scope="row">{data.id}</th>
      <td>{data.name}</td>
      <td>{data.number}</td>
      <td>{data.dob.slice(0,10).replace(/-/g,'/')}</td>
	  <td>{data.services}</td>
	  <td>{data.therapist}</td>
	  <td>{data.payment}</td>
    <td><Link to={`/update/${data.id}`}><button type="button" className=" btn btn-success rounded-3 " > EDIT </button> </Link> </td>
    <td><button type="button" className=" btn btn-danger rounded-3 " onClick={()=>remover(data.id )}> DELETE </button></td>
    </tr>
    {/* <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Larry</td>
      <td>the Bird</td>
      <td>@twitter</td>
    </tr> */}
  </tbody>
))}
</table>
	</div>
  )
}

export default View
