const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const app = express();
mongoose.connect("mongodb://localhost:27017/website8", {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(() => {
    console.log("connected")
}).catch((e) => {
    console.log("not connected")
});
const port = 3000;

const webSchema = new mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    message: String
});

app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded());

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('index.pug', params);
})

app.post('/', (req, res)=>{
    var myData = new WebSocket(req.body);
    myData.save().then(() =>{
        res.send("this items has been save to the database");
    }).catch(() =>{
        res.status(400).send("item was not saved to the database")
    });

   //  res.status(200).render('contact.pug');
});

app.listen(port, () => {
    console.log(` app is running on port ${port} `)
});