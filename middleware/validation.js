const Joi = require('@hapi/joi');
const roles = ["admin", "client", "invite"];

const validationRegister = data => {

    const schema = Joi.object({
        username: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(7).required().max(20).regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/), //special/number/capital,
        role: Joi.any().valid(...roles).default("invite"),
        createdAt:Joi.date()
        
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
module.exports.validationRegister = validationRegister;
module.exports.loginValidation = loginValidation;
