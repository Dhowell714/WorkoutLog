require("dotenv").config();
const Express = require("express");
const app = Express();
const dbConnection = require("./db");

const controllers = require("./controllers");

app.use(Express.json());

app.use("/log", controllers.logController);
app.use("/user", controllers.userController);
app.use(require("./middleware/validate-jwt"));
dbConnection.authenticate()
    .then(() => dbConnection.sync())
    .then(() => {
        app.listen(4000, () => {
            console.log(`[Server]: App is listening on 4000.`);
        });
    })
    .catch((err) => {
        console.log(`[Server]: Server crashed. Error = ${err}`);
    });

//app.use('/test', (req,res) => {
//    res.send('Test Confirmed')
//});

//app.listen(4000, () => {
//    console.log(`[Server]: App is listening on 4000.`);
//});