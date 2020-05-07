const app = require("./server");
require("./Routes/route-a")(app);
require("./Routes/route-g")(app);
require("./Routes/route-p")(app);
require('./Routes/route-c')(app);
require('./Routes/route-equi')(app);
require('./Routes/route-user')(app);

const port = process.env.PORT || 9200;
app.listen(port, () => console.log(`server on port ${port}`));

 