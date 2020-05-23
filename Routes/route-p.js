module.exports = app => {
    const upload = require("../services/file-upload");
    const singleImg = upload.single('photos');
    const verified = require('../middleware/verifytoken')
    const config = require('../services/config-aws')
    const {imageValidation} = require('../middleware/validation')
    const pool = require("../middleware/dbConnect");
    const s3 = require('../services/file-upload')
    const picture = require('../Controllers/photos');



    // app.post("/upload-image", verified, (req, res) =>{
    //     console.log('passe laaaa')
        
    //     singleImg(req, res, function(err) {
    //         if(err) {
    //             return res.status(422).send({errors: [{title: 'Erreurs ', details: err.message}] });
    //         }
    //         const { error } = imageValidation(req.body)
    //         if (error) return res.status(422).send(error.details[0].message );
            
    //        console.log('passe ici')
    //        return res.json({'photos': req.file.location})
    //     })
    //     res.end();
    // });



// working good
    app.post("/upload-image", upload.single('photos'), (req, res) =>{
        
        pool.query('INSERT INTO photos SET ?', function (err, results, fields) {
            if(err) {
                return res.status(422).send({err: [{title: 'Erreurs ', details: err.message}] });
            }
                
            if (req.file.location) {
                console.log(results, 'Profile image uploaded');
                res.json({'photos': req.file.location})
            }
           
        })
    });



    app.get("/photo/:imageId", (req, res) =>{
        var params = { Bucket: config.BUCKET_NAME, Key: req.params.imageId };
        console.log(params, "gaeeaefa", req.params)
        // var urlParams = {Bucket: config.aws_s3.logoBucket, Key: <key>'};
        // logoBucket.getSignedUrl('getObject', urlParams, function(err, url){
        //     res.render('test/test', {header: 'TEST', url: url});
        // });
        s3.GetObject(params, function(err, data) {
            console.log(data)
            console.log({data: data})
            res.writeHead(200, {'Content-Type': 'image/jpeg'});
            res.write(data.body, 'binary');
            res.end(null, 'binary');
        });


        pool.query(`SELECT * FROM photos WHERE id = ${id}`, (err, res) => {
            if(error) throw error
                
            res.send(results);
            console.log(results);
        });
    });


    app.get('/photos', picture.findAll);
  
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


