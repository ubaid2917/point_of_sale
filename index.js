const express = require('express')
const app = express()
const db = require('./db/db');
const port = process.env.port || 3000;
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');


// set public path
const staticPath = path.join(__dirname, 'public');
const viewPath = path.join(staticPath, 'views');


// set view engine
app.set('view engine', 'ejs');
app.set("views", viewPath )



// serve static files
app.use(express.static(staticPath));

// bodyparser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// routes
const userRoutes = require('./routes/userRoute')
const adminDashboard = require('./routes/admindashboardroute')
const admincategory = require('./routes/admincategoryroute');
const adminproducts = require('./routes/adminproductRoutes')
const staffRoute = require('./routes/staff Routes/staffDashRoute')
const managerRoute = require('./routes/manager/managerRoute');

app.use('/', userRoutes)
app.use('/', adminDashboard)
app.use('/', admincategory)
app.use('/', adminproducts)
app.use('/', staffRoute)
app.use('/', managerRoute);

app.listen(port, function(){
    console.log(`listening on ${port}`);
})