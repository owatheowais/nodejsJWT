//Validation
const Joi = require('@hapi/joi');

//User Registration Validation
const registerValidation = (data) => {
const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
});
//{ error } = schema.validate(req.body)
return schema.validate(data);
//.validate(data,schema);
};

//User Login Validation
const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data);
    };

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;