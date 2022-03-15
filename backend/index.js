var express = require('express');
var cors = require('cors');
const app = express();
var mysql = require('mysql');
var bodyparser =require('body-parser');
const bcrypt = require('bcrypt');
const saltround = 10 ;
const db = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'',
	database:'mydatabase'
});


// app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({extended:true}));
// post request 
app.post("/create",(req,res)=>{
	const name = req.body.Name;
	const number = req.body.Number;
	const dob = req.body.DOB;
	const services = req.body.Services;
	const therapist = req.body.Therapist;
	const Payment = req.body.Payment;
	// res.send("creation starts", name , number );
	console.log(name,number,dob,services,therapist,Payment);
	
	// db.connect((error)=>{
	// 	if(error) throw error ;
	// 	else{
	// 	console.log("databse connected");
var sql = "INSERT INTO user SET ?";
// var values = [`${name}`,`${number}`,`${dob}`,`${services}`,`${therapist}`,`${Payment}`];
var values = {name:`${name}`,number:`${number}`, dob:`${dob}`, services:`${services}`, therapist:`${therapist}`, Payment:`${Payment}`}
db.query(sql,values,(error,result)=>{
if(error)
{
	console.log(error);
}

	// res.write("Values Inserted",result);
	console.log("values insertd",result);
	res.send(result);

// });
// }
});


});


// get request
app.get('/details' , (req,res)=>{
	console.log(res);
	
		// db.connect((error)=>{
		// 	if(error) throw error 
		// 	console.log("get created");
			db.query('SELECT * FROM user',(error,result)=>{
				if(error)
				{
					console.log(error);
				} ;
		
					console.log("data fetched");
					// res.send(result);
					console.log(result);
					res.send(result);
				})
		// });
	});

	app.delete('/remove/:id' , (req,res)=>{
		const {id}=req.params;
		const sqldel = "DELETE FROM user WHERE id=?"
		db.query(sqldel , id , (error,result)=>{
			if(error){
				console.log(error)
			}
			console.log("Values Deleted Successfully",{id});
		});
	});

// UPDATION PART

app.get('/details/:id' , (req,res)=>{
	const {id}=req.params ;
	const sqld = 'SELECT * FROM user WHERE id = ?';
		db.query(sqld , id , (error,result)=>{
			if(error)
			{
				console.log(error);
			} ;
				console.log(result);
				res.send(result);
			})
});

app.put('/update/:id' , (req,res)=>{
	const {id}=req.params;
	const name = req.body.Name;
	const number = req.body.Number;
	const dob = req.body.DOB;
	const services = req.body.Services;
	const therapist = req.body.Therapist;
	const Payment = req.body.Payment;
	const sqlput='UPDATE user SET name = ? , number = ? , dob = ? , services = ? , therapist = ? , payment = ? WHERE id = ?';
	db.query(sqlput , [name , number , dob , services , therapist , Payment , id ] , (error , result)=>{
		if(error){
console.log(error);
		}
		console.log("values updated successfully" , result);
	});
});
// user_id
app.post("/login",(req,res)=>{
	const user = req.body.user;
	const password = req.body.password;
	console.log(user);
	db.query("SELECT userid FROM userid WHERE userid=? ;",user ,(err,resolve)=>{
		console.log(resolve.length);
		if( resolve.length==0){
			bcrypt.hash(password,saltround ,(error , hash)=>{
				if(err){
					console.log(error);
				}
			const sqlUS = "INSERT INTO userid (userid , password) VALUE (?,?)"
			db.query(sqlUS , [user , hash] , (error,result)=>{
				if(error)
				{
					console.log(error);
				}
				else{
					console.log(result);
				}
			
		});
	})
	res.send(resolve);3
		}
		else
		{
			res.send({message:"user already exists"});
			console.log(resolve);
			console.log(resolve.userid);
		}
	});
				
	});
	
//Login_check
app.post('/checkin',(req,res)=>{
	const user=req.body.user;
	const password =req.body.password;
	// console.log(user);
	
	const sqlLog="SELECT * FROM userid WHERE userid=? ;"
	db.query(sqlLog,user,(err,result)=>{
		if(err){
			console.log(err);
		}
		console.log("your result is : ",result);
			if(result.length==1){
				bcrypt.compare(password , result[0].password , (error ,response)=>{
					if(response){
						// console.log(error);

						res.send(result);
						console.log(result);
					}
					else{
						res.send({message:"wrong username and password"})
							console.log("wrong username")
				
			            } 
					});
				}
			else{
				res.send({message:"Invalid userid and password "})
				console.log("Invalid userid and password")
			}
			// console.log(result);
			// res.send(result);
	});
})
app.get('/',(req,res)=>{
	res.send("hello world");
})
app.listen(5500,(e)=>{
	console.log("listenng");
})