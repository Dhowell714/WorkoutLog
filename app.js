const Express = require("express");
const app = Express();

app.use('/test', (req,res) => {
    res.send('Test Confirmed')
});

app.listen(4000, () => {
    console.log(`[Server]: App is listening on 4000.`);
});