const aws = require('aws-sdk')
const config = require('./config-aws')
const multer = require('multer');
const multerS3 = require('multer-s3');

aws.config.update({
	secretAccessKey: config.AWS_SECRET_ACCESS,
	accessKeyId: config.AWS_ACCESS_KEY_ID,
	region: config.REGION
})
  
const s3 = new aws.S3();

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
		metadata: function (req, file, cb) {
			cb(null, {fieldName: 'oeainoefa'});
			//cb(null, {fieldName: file.fieldname});

		},
		key: function (req, file, cb) {
			cb(null, Date.now().toString())
		}
	})
})

 
module.exports = upload;