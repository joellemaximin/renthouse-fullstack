    const express = require("express");
    const router = express.Router();
    const upload = require("../services/file-upload");
    // const singleImg = upload.single('photos');
    // const verified = require('../middleware/verifytoken')
    // const config = require('../services/config-aws')
    // const {imageValidation} = require('../middleware/validation')
    const pool = require("../middleware/dbConnect");
    // conspicture = require('../Controllers/photos');

    router.use(express.json());
    const {
        generateGetUrl,
        generatePutUrl,
    } = require('../services/file-upload');
       
    // working good
    router.post("/upload-image", upload.single('photos'), (req, res) =>{
        // console.log(req.file, "foanfoanoefnoaneof")

        pool.query('INSERT INTO photos SET ?', function (err, results, fields) {
            // if(err) {
            //     return res.status(422).send({err: [{title: 'Erreurs ', details: err.message}] });
            // }
            return res.send({
                results,
                'photos': req.file.location,
                imgUrl: req.file.location
            })
      
            //  console.log(results, 'Profile image uploaded');
            // }
           
        })
    });


    router.get("/generate-get-url", (req, res) =>{
        console.log(req.query)

        const { Key } = req.query;

        generateGetUrl(Key)
        .then(getURL => {res.send(getURL)})
        .catch(err => {res.send(err)});
        
    });

    router.get('/generate-put-url', (req,res)=>{
        // Both Key and ContentType are defined in the client side.
        // Key refers to the remote name of the file.
        // ContentType refers to the MIME content type, in this case image/jpeg
        const { Key, ContentType } =  req.query;
        generatePutUrl(Key, ContentType).then(putURL => {
          res.send({putURL});
        })
        .catch(err => {
          res.send(err);
        });
      });
   
    router.get('/album', (req, res, next) => {
  
	// USING PROMISES, call on the promise method
        s3.getObject({Bucket: myBucket}).promise()
        .then(data => {
            const baseURL = `https://s3.amazonaws.com/${myBucket}/gitepicture`;      
            let urlArr = data.Contents.map(e => baseURL + e.Key);
            res.send({ data: urlArr});
        })
        .catch(err => console.log(err));
	
    });

    router.get('/view/:filename', (req, res, next) => {
        // var params = { Bucket: myBucket, Key: req.params.filename };
        getObject(function(err, data){
          console.log(data)
          if (err) { 
            return next() 
          } else {
            // Convert file to base65 rile
            var img = new Buffer(data.Body, 'base64');
            res.contentType(data.ContentType);
            res.status(200).send(img);
          } 
        });
    });
      
    router.get('/url/:originalname', (req, res, next) => {
        var params = { Bucket: myBucket, Key: req.params.originalname};
        s3.getObject(params, function(err, data) {
            console.log(params)
            // console.log(data)
            if (err) {
            return ({ error: err });
            }
            return(data.Body);
        });

    });
  
    router.delete("/delete-image/:imageId", (req, res ) => {
        const params = {Bucket: myBucket, Key: req.params.imageId}
        s3.deleteObject(params, function(err, data) {
            if (err) {
              return res.send({ error: err });
            }
            res.send({ data });
        });
    })

    

module.exports = router;
