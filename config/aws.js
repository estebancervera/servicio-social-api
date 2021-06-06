/* REQUIREMENTS FOR PHOTO */
const crypto = require('crypto');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');

const S3_BUCKET = process.env.S3_BUCKET;
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;

aws.config.update({
	secretAccessKey: AWS_SECRET_ACCESS_KEY,
	accessKeyId: AWS_ACCESS_KEY_ID,
	region: 'us-east-1'
});

const s3 = new aws.S3();

const filefilter = (req, file, cb) => {
	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

const storage = multerS3({
	s3: s3,
	bucket: S3_BUCKET,
	key: function (req, file, cb) {
		cb(null, Date.now() + crypto.randomBytes(8).toString('hex') + path.extname(file.originalname)); //use Date.now() for unique file keys
	}
});

const upload = multer({
	storage: storage,
	fileFilter: filefilter
});

const deleteS3 = function (imageName) {
	return new Promise((resolve, reject) => {
		s3.createBucket(
			{
				Bucket: S3_BUCKET
			},
			function () {
				s3.deleteObject({ Bucket: S3_BUCKET, Key: imageName }, function (err, data) {
					if (err) {
						console.log(err);
						reject();
					} else {
						//console.log('Successfully deleted file from bucket');
						resolve();
					}
				});
			}
		);
	});
};

module.exports = {
	upload,
	deleteS3,
	bucket: S3_BUCKET
};
