// #!/usr/bin/env node
var express = require('express')
var bodyparser = require('body-parser')
var app = express();
// var path = require('path')
// var passort=require('passport');
// process.env.NODE_ENV = 'production';


// app.use(express.static('./build'))
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json());


// const allowUrl = ['/isAuth','/auth'];

// const authenticationMiddleware = (whiteList =[]) => (req, res, next) => {
//     // console.log(req.baseUrl)
//     // console.log(whiteList)
//     // console.log(whiteList.find(req.baseUrl))
//     if(whiteList.includes(req.path)) {
//     return next();
//     }

//     if (req.isAuthenticated()) {
//       return next()
//     }
//     res.json({
//         message:'route is protected'
//     });
// }
// app.use(passort.initialize());
// app.use(authenticationMiddleware(allowUrl));
// app.use(apiRouter);

require('./config/db-config-mysql');
// require('./app/configs/passport-config')(app);
// require('./app/routes/route-brands')(app);
// require('./app/routes/route-inventoryHistories')(app);
// require('./app/routes/route-inventories')(app);
// require('./app/routes/route-orderDetails')(app);
// require('./app/routes/route-orders')(app);
// require('./app/routes/route-login')(app);
require('./routes/route_Permission')(app);
// require('./app/routes/route-productCategories')(app);
// require('./app/routes/route-products')(app);
require('./routes/route_Roles')(app);
require('./routes/route_Rolepermissions')(app);
// // require('./app/routes/route-salesAndReturns')(app);
require('./routes/route_Users')(app);

// // require('./app/routes/route-allGet')(app);
// app.get('*', function (req, res) {
//     res.sendFile(path.resolve(__dirname, './build', 'index.html'))
// })

app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).send(err.message)
})

app.listen(process.env.PORT || 8000, () => console.log("app is running"))
