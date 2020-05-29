const aws = require('aws-sdk')
// const config = require('./config-aws')
require('dotenv').config();

aws.config.update({
	secretAccessKey: process.env.AWS_SECRET_ACCESS,
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	region: process.env.REGION
})

const s3 = new aws.S3();

var thisConfig = {
	AllowedHeaders:["Authorization"],
	AllowedMethods:[],
	AllowedOrigins:["*"],
	ExposeHeaders:[],
	MaxAgeSeconds:3000
  };
  
  // Assemble the list of allowed methods based on command line parameters
  var allowedMethods = [];
  process.argv.forEach(function (val, index, array) {
	if (val.toUpperCase() === "POST") {allowedMethods.push("POST")};
	if (val.toUpperCase() === "GET") {allowedMethods.push("GET")};
	if (val.toUpperCase() === "PUT") {allowedMethods.push("PUT")};
	if (val.toUpperCase() === "PATCH") {allowedMethods.push("PATCH")};
	if (val.toUpperCase() === "DELETE") {allowedMethods.push("DELETE")};
	if (val.toUpperCase() === "HEAD") {allowedMethods.push("HEAD")};
  });
  
  // Copy the array of allowed methods into the config object
  thisConfig.AllowedMethods = allowedMethods;
  // Create array of configs then add the config object to it
  var corsRules = new Array(thisConfig);
  
  // Create CORS params
  var corsParams = {Bucket: process.env.BUCKET_NAME, CORSConfiguration: {CORSRules: corsRules}};
  
  // set the new CORS configuration on the selected bucket
  s3.putBucketCors(corsParams, function(err, data) {
	if (err) {
	  // display error message
	  console.log("Error", err);
	} else {
	  // update the displayed CORS config for the selected bucket
	  console.log("Success", data);
	}
});