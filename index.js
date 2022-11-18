//DEPENDENCIES
const express = require('express');
const morgan = require('morgan');
const app = express();
//ROUTES
const pokemon = require('./routes/pokemon');
const user = require('./routes/user');
//MIDDELWARE
const auth = require('./middleware/auth');
const notFound = require('./middleware/notFound')
const index = require("./middleware/index")

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", index);
app.use("/user", user);
app.use(auth);
app.use("/pokemon", pokemon);
app.use(notFound);


app.listen(process.env.PORT || 3000, ()=>{
    console.log("Server is running...");
});

