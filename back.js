const app = require("./server");
require("./Routes/route-a")(app);
require("./Routes/route-g")(app);
require("./Routes/route-p")(app);
require('./Routes/route-c')(app);
require('./Routes/route-equi')(app);
// require('./Routes/route-auth')(app);
require('./Routes/route-user')(app);
// require('./Routes/route-role')(app);

const userRouter = require("./Routes/route-auth");

app.use("/auth-admin", userRouter);

//ok something here
//heeeeellyeah
const port = process.env.PORT || 9200;
app.listen(port, () => console.log(`server on port ${port}`));

 