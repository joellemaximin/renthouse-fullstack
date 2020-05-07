module.exports = app => {
    const upload = require("../services/file-upload");
    const singleImg = upload.single('photos');

    app.post("/upload-image", (req, res) =>{
        console.log('passe laaaa')
        
        singleImg(req, res, function(err) {
            if(err) {
                return res.status(422).send({errors: [{title: 'Erreurs ', details: err.message}] });
            }
            
           console.log('passe ici')
           return res.json({'photos': req.file.location})
        })
    });

    
};