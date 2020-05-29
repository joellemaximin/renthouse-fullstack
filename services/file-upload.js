const aws = require('aws-sdk')
// const config = require('./config-aws')
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path')
require('dotenv').config();

aws.config.update({
	secretAccessKey: process.env.AWS_SECRET_ACCESS,
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	region: process.env.REGION
})

const s3 = new aws.S3();
const Bucket = process.env.BUCKET_NAME;


//KEY AND BUCKET ARE HERE
// s3.listObjects(bucketParams, function(err, data) {
// 	if (err) {
// 	  console.log("Error", err);
// 	} else {
// 	  console.log("Success", data);
// 	}
// });

// s3.getBucketCors(bucketParams, function(err, data) {
// 	if (err) {
// 	  console.log("Error", err);
// 	} else if (data) {
// 	  console.log("Success", JSON.stringify(data.CORSRules));
// 	}
// });

// call S3 to retrieve policy for selected bucket
// s3.getBucketPolicy(bucketParams, function(err, data) {
//   if (err) {
//     console.log("Error", err);
//   } else if (data) {
//     console.log("Success", data.Policy);
//   }
// });

const fileFilter = (req, file, cb) => {
	// reject a file
	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
	  cb(null, true);
	} else {
	  cb(new Error('Error about type image, only JPEG or PNG'), false);
	}
};

const upload = multer({
	fileFilter,
	limits: {
		fileSize: 1024 * 1024 * 5
	},
	storage: multerS3({
		s3:s3,
		bucket: Bucket,
		acl: 'public-read',
		contentType: multerS3.AUTO_CONTENT_TYPE,
		metadata: function (req, file, cb) {
			cb(null, {fieldName: file.fieldname});
		},
		key: function (req, file, ab_callback) {
			// cb(null, Date.now().toString())
			var newFileName = Date.now().toString() + "-" + path.extname(file.originalname);
			var fullPath = 'gitepicture/'+ newFileName;
			// console.log(file)
			ab_callback(null, fullPath);
		}
	})
})
// var params = { Bucket: myBucket, Key:'gitepicture/1590287186751-.png'};
// var file = require('fs').createWriteStream('gitepicture/1590288322652-.png');
// s3.getSignedUrl(params).createReadStream().pipe(file);

// s3.getObject(params, function(err, url)
// 	{
// 		console.log(params);

// 	if (err) { throw {msg:err, code:"AWS_ERROR"}; }
// 	else { return url; }
// });

// s3.deleteObject(params, function(err, data) {
// 	if (err) {
// 	  console.log("Error", err);
// 	} else if (data) {
// 	  console.log("Success", data);
// 	}
// });

// GET URL Generator
function generateGetUrl(Key) {
	return new Promise((resolve, reject) => {
	  const params = {
		Bucket,
		Key,
		Expires: 120 //2mn
	  };
	  s3.getSignedUrl('getObject', params, (err, url) => {
		if (err) {
		  reject(err);
		} else {
		  console.log(data.Body.toString())
		  resolve(url);
		}
	  });
	});
}
  
// PUT URL Generator
function generatePutUrl(Key, ContentType) {
	return new Promise((resolve, reject) => {
	  const params = { Bucket, Key, ContentType };
	  s3.getSignedUrl('putObject', params, function(err, url) {
		if (err) {
		  reject(err);
		}
		resolve(url);
	  });
	});
}

// DELETE URL Generator
function generateDeleteUrl(Key, ContentType) {
	return new Promise((resolve, reject) => {
	  const params = { Bucket, Key, ContentType };
	  s3.getSignedUrl('deleteObject', params, function(err, url) {
		if (err) {
		  reject(err);
		}
		// If there is no errors we can send back the pre-signed Delete URL
		resolve(url);
	  });
	});
}
  
module.exports = { generateGetUrl, generatePutUrl, generateDeleteUrl};

// s3.getObject(params, function(err, data) {
// 	// console.log(params)
// 	// console.log(data)
// 	if (err) {
// 		return ({ error: err });
// 	}
// 	else {
// 		return data.Body.toString(); 

// 		// return (data.Body, 'base64');

// 	}


// })

module.exports = upload