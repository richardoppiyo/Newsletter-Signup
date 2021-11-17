const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");


const app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));


app.get("/",function(req,res){

    res.sendFile(__dirname + "/signup.html")
})

// API KEY -  668ade3e7d45d1a0d0c855e05dbbe94d-us20
// List id -  3d9c56cfd9.
app.post("/",function(req,res){
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const  email = req.body.email;

  const url = "https://us20.api.mailchimp.com/3.0/lists/3d9c56cfd9";
  const options = {
    method: "POST",
    auth: "richie : 668ade3e7d45d1a0d0c855e05dbbe94d-us20"
  }
  const data = {
    members:[
            {
              email_address: email,
              // status: subscribed,
              merge_fields: [
                              {
                              FNAME: firstName,
                              LNAME: lastName
                              }
                            ]
            }
            ]
  };

  const jsonData = JSON.stringify(data);

  const request = https.get(url,options,function(response){
    response.on("data",function(data){
      console.log(JSON.parse(data));
    });
  })

  request.write(jsonData);
  request.end();

})


app.listen(3000,function(){
  console.log("Connected on Port 3000");
})
