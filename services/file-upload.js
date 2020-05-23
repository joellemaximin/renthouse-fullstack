const aws = require('aws-sdk')
const config = require('./config-aws')
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path')

aws.config.update({
	secretAccessKey: config.AWS_SECRET_ACCESS,
	accessKeyId: config.AWS_ACCESS_KEY_ID,
	region: config.REGION
})
  
const s3 = new aws.S3();
var logoBucket = new aws.S3( { params: {Bucket: config.AWS_SECRET_ACCESS} } )

const fileFilter = (req, file, cb) => {
	// reject a file
	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
	  cb(null, true);
	} else {
	  cb(new Error('Error about type image, only JPEG or PNG'), false);
	}
};

const upload =multer({
	fileFilter,
	limits: {
		fileSize: 1024 * 1024 * 5
	},
	storage: multerS3({
		s3:s3,
		bucket: config.BUCKET_NAME,
		acl: 'public-read',
		// contentType: multerS3.AUTO_CONTENT_TYPE,
		metadata: function (req, file, cb) {
			cb(null, {fieldName: file.fieldname});
		},
		key: function (req, file, ab_callback) {
			// cb(null, Date.now().toString())
			var newFileName = Date.now().toString() + "-" + path.extname(file.originalname);
			var fullPath = 'gitepicture/'+ newFileName;
			console.log(file)
			ab_callback(null, fullPath);
		}
	})
})

 
module.exports = upload;