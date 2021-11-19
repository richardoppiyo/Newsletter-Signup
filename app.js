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
// nwe api key - aed2cc76f2b330fa0a04b5e3bf086a56-us20
// List id -  3d9c56cfd9.
app.post("/failure",function(req,res){
  res.redirect("/");
})


app.post("/",function(req,res){
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const  email = req.body.email;

  const url = "https://us20.api.mailchimp.com/3.0/lists/3d9c56cfd9";
  const options = {
    method: "POST",
    auth: "richie:aed2cc76f2b330fa0a04b5e3bf086a56-us20"
  }
  const data = {
    members:
            [{
              email_address: email,
              status: "subscribed",
              merge_fields:
                            {
                              FNAME: firstName,
                              LNAME: lastName,
                              BIRTHDAY: "01/22",
                              ADDRESS: {
                                          addr1: "123 Freddie Ave",
                                          city: "Atlanta",
                                          state: "GA",
                                          zip: "12345",
                                      },
            },

  }],
};

  const jsonData = JSON.stringify(data);

  var request = https.request(url,options,function(response){
    if(response.statusCode === 200){
      res.sendFile(__dirname + "/success.html");
    }else{
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data",function(data){
      console.log("passed");
      console.log(JSON.parse(data));
    });
  })

  request.write(jsonData);
  request.end();

});


app.listen(3000,function(){
  console.log("Connected on Port 3000");
});
