const express = require("express");
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}));

const PORT = process.env.PORT || 5000;

const mongoUrl = "mongodb://localhost:27017/testdb";
const mongoose = require("mongoose");
const User = require("./models/User");

mongoose.connect(mongoUrl, {useNewUrlParser: true})
.then(() => console.log('DB connected'))
.catch(error =>  console.log(error))

app.get("/users",(req, res) => {
    User.find()
    .then(users => res.send(users))
    .catch(err => res.send(err))
});

app.post("/user", (req, res) => {
    console.log(req.body)
    const newUser = new User({...req.body});
    newUser.save()
    .then(user => res.send(user))
    .catch(err => res.send(err));
    // res.send("User created");
})

app.listen(PORT, () => {
    console.log("server started")
})

