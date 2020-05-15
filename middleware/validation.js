const Joi = require('@hapi/joi');

////////////////// AUTH VALIDATION //////////////////

const roles = ["admin", "client"];

const validationRegister = data => {

    const schema = Joi.object({
        username: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(7).required().max(20).regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/), //special/number/capital,
        role: Joi.any().valid(...roles).default("invite"),
        createdAt:Joi.date(),
        access_token: [
            Joi.string(),
            Joi.number()
        ]
    
        
    })
    return schema.validate(data)
}

const loginValidation = data => {

    const schema = Joi.object({
        username: Joi.string().min(6),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(7).required(),
        role: Joi.any().valid(...roles),


    })
    return schema.validate(data)
}



////////////////// Booking VALIDATION //////////////////


const status = ["new", "canceled", "checkIn", "checkedOut"];
const paid = ["paid", "unpaid"];

const bookingValidation = data => {

    const schema = Joi.object({
        checkIn: Joi.date().required(),
        checkOut: Joi.date().required(),
        giteId: Joi.number(),
        status: Joi.any().valid(...status),
        paid: Joi.any().valid(...paid).default('unpaid'),
        totalPrice: Joi.number(),
        createdAt:Joi.date()


    })
    return schema.validate(data)
}


const imageValidation = data => {
    const schema = Joi.object({
        name: Joi.image().allowTypes(['png', 'jpeg'])
    })

    return schema.validate(data)
}

const commentValidation = data => {

    const schema = Joi.object({
        body: Joi.string().required(),
        imageId: Joi.string(),
        createdAt:Joi.date()


    })
    return schema.validate(data)
}

module.exports.validationRegister = validationRegister;
module.exports.loginValidation = loginValidation;
module.exports.bookingValidation = bookingValidation;
module.exports.imageValidation = imageValidation;
module.exports.commentValidation = commentValidation;
