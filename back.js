const app = require("./server");
require("./Routes/route-a")(app);
require("./Routes/route-g")(app);
require("./Routes/route-p")(app);
require('./Routes/route-c')(app);
require('./Routes/route-equi')(app);
require('./Routes/route-user')(app);
//ok something here
//heeeeellyeah
const path = require("path");

require('dotenv').config();

console.log("env ", process.env.NODE_ENV);

if (process.env.NODE_ENV == 'production') {
	// Serve any static files
	app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
	app.get('*', function(req, res) {
	  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
	});
}

const port = process.env.PORT || 9200;
app.listen(port, () => console.log(`server on port ${port}`));

 