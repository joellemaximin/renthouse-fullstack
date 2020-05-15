module.exports = app => {
    const upload = require("../services/file-upload");
    const singleImg = upload.single('photos');
    const verified = require('../middleware/verifytoken')
    const config = require('../services/config-aws')
    const {imageValidation} = require('../middleware/validation')


    app.post("/upload-image", verified, (req, res) =>{
        console.log('passe laaaa')
        
        singleImg(req, res, function(err) {
            if(err) {
                return res.status(422).send({errors: [{title: 'Erreurs ', details: err.message}] });
            }
            const { error } = imageValidation(req.body)
            if (error) return res.status(422).send(error.details[0].message );
            
           console.log('passe ici')
           return res.json({'photos': req.file.location})
        })
        res.end();
    });

    // app.delete("/delete-image", (req, res ) => {
    //     const params = {Bucket: config.BUCKET_NAME, Key: }
    //     s3.deleteObject(params, function(err, data) {
    //         if (err) {
    //           return res.send({ error: err });
    //         }
    //         res.send({ data });
    //     });
    // })

    
};