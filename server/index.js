const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const cors = require('cors');

const mysql = require("mysql");
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "bank",
    //database:"CRUDDataBase",
  });
 app.use(cors());
 app.use(express.json());
 app.use(bodyParser.urlencoded({extended:true}));

  app.post('/api/login',(req,res)=>{
    console.log('res in api',req.body)
      // const userName="rshah";
      // const password="Roshani@1997";
    const sqlInsert = "SELECT * FROM Employee WHERE userName= ? and password=? and role=? ";
    db.query(sqlInsert,[req.body.userName,req.body.password,req.body.role],(err,result)=>{
        if(err){
            console.log('in err',err);

        }else{
          console.log('in else success')
          console.log(result)
            //res.send(result)
            return res.status('200').json(
              result,
            );

        }
    });
    
})

app.post('/api/customerLogin',(req,res)=>{
  console.log('res in api',req.body)
    // const userName="rshah";
    // const password="Roshani@1997";
  const sqlInsert = "SELECT * FROM Customers WHERE ssn= ? and role=? ";
  db.query(sqlInsert,[req.body.userName,req.body.role],(err,result)=>{
      if(err){
          console.log('in err',err);

      }else{
        console.log('in else success')
        console.log(sqlInsert)
          //res.send(result)
          return res.status('200').json(
            result,
          );

      }
  });
  
})
app.get("/api/getCustomers", (req, res) => {
  console.log('in get customers')
  db.query("SELECT * FROM Customers", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log('result',result)
      return res.status('200').json(
        result,
      );
    }
  });
});

app.post("/api/addCustomer", (req, res) => {
  console.log('req',req.body)
  const ssn = req.body.ssn;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const aptNo = req.body.aptNo;
  const streetNo = req.body.streetNo;
  const city = req.body.city;
  const state = req.body.state;
  const zipcode = req.body.zipcode;
const role = 'customer'
  db.query(
    "INSERT INTO Customers (ssn, firstName, lastName, aptNo, streetNo,city,state,zipcode,role) VALUES (?,?,?,?,?,?,?,?,?)",
    [ssn, firstName, lastName, aptNo, streetNo,city,state,zipcode,role],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.post("/api/addAccount", (req, res) => {
  console.log('req',req.body)
  const accountNo = req.body.accountNo;
  const ssn = req.body.ssn;
  const accountType = req.body.accountType;
  const balance = 500;
  var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
  const lastAccessDate =  mm + '/' + dd + '/' + yyyy

  db.query(
    "INSERT INTO accounts (accountNo, ssn, accountType, balance, lastAccessDate) VALUES (?,?,?,?,?)",
    [accountNo,ssn, accountType, balance, lastAccessDate],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/api/getAccounts", (req, res) => {
  console.log('in get customers')
  db.query("SELECT * FROM Accounts", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log('result',result)
      return res.status('200').json(
        result,
      );
    }
  });
});
app.get("/api/getAccountsBySSN/:ssn", (req, res) => {
  console.log('req))))))))))))))))))',req.params.ssn)
  db.query("SELECT * FROM Accounts", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log('result',result)
      return res.status('200').json(
        result,
      );
    }
  });
});



app.post("/api/addTransaction", (req, res) => {
  console.log('req',req.body)
  var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
const lastAccessDate =  mm + '/' + dd + '/' + yyyy
  const currentDate = lastAccessDate;
  const amount = req.body.amount;
  const originAccountNo = req.body.originAccountNo;
  const destinationAccountNo = req.body.destinationAccountNo;
  const transactionCode = req.body.transactionCode;
  

  db.query(
    "INSERT INTO transactionreference (currentDate, amount, originAccountNo, destinationAccountNo, transactionCode) VALUES (?,?,?,?,?)",
    [currentDate, amount, originAccountNo, destinationAccountNo, transactionCode],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {

        console.log('result ',result)
        // return res.status('200').json(
        //   result,
        // );
        
        res.send("Values Inserted");
      }
    }
  );
});


app.get("/api/getTransactions", (req, res) => {
  console.log('in get getTransactions')
  db.query("SELECT * FROM transactionreference", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log('result',result)
      return res.status('200').json(
        result,
      );
    }
  });
});

// app.get('/',(req,res)=>{
//     const sqlInsert = "INSERT INTO CUSTOMERS (CustomerFName,CustomerAddress,CustomerLName) VALUES ('MITI','57 SIP AVENUE','SHAH');"
//     db.query(sqlInsert,(err,result)=>{
//         res.send('Hello World in dbms project')
//     });
    
// })
// const cors = require("cors");

// app.use(cors());
// app.use(express.json());



// app.post("/signIn", (req, res) => {
//   inside('inside signin method api')
//   const Username = req.body.EmpUsername;
//   const passowrd = req.body.EmpPassword;
 

//   db.query(
//     //"Select * FROM Employee WHERE EmpUsername = ${Username} ",
//     "SELECT * FROM Employee WHERE EmpUsername = Username AND EmpPassword = passowrd",
//     [name, age, country, position, wage],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.send("Values Inserted");
//       }
//     }
//   );
// });

// app.get("/employees", (req, res) => {
//   db.query("SELECT * FROM employees", (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(result);
//     }
//   });
// });

// app.put("/update", (req, res) => {
//   const id = req.body.id;
//   const wage = req.body.wage;
//   db.query(
//     "UPDATE employees SET wage = ? WHERE id = ?",
//     [wage, id],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.send(result);
//       }
//     }
//   );
// });

// app.delete("/delete/:id", (req, res) => {
//   const id = req.params.id;
//   db.query("DELETE FROM employees WHERE id = ?", id, (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(result);
//     }
//   });
// });

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});