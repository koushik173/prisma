const Joi = require('joi');

exports.validateSignUp = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().pattern(/^[A-Z][A-Za-z .]{3,20}$/).required(),
        email: Joi.string().pattern(/^(cse|eee|law)_\d{10}@lus\.ac\.bd$/).required(),
        password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/).required(),
        phone: Joi.string().pattern(/(\+88)?-?01[3-9]\d{8}/).required(),
        cfpassword: Joi.string().valid(Joi.ref('password')).required(),
        occupation: Joi.string().required(),
    });

    const { name, email, password, phone, occupation } = req.body

    if (!name || !email || !password ||!phone ||!occupation) {
        const message = "Please provide all fields";
        return res.send({ acknowledged: false, message });
    }

    const { error } = schema.validate(req.body);
    if (error) {
        console.log(error);
        const errorMessage = error.details[0].message;
        const fieldName = error.details[0].context.key; // Get the field name causing the error
        res.status(400).json({ error: errorMessage, field: fieldName });
    }else{
        next();
    }
    
};
exports.validateLogin = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().pattern(/^(cse|eee|law)_\d{10}@lus\.ac\.bd$/).required(),
        password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/).required(),
    });
    const {email, password} = req.body

    if (!email || !password) {
        const message = "Please provide all fields";
        return res.send({ acknowledged: false, message });
    }
    const { error } = schema.validate(req.body);
    if (error) {
        const errorMessage = error.details[0].message;
        const fieldName = error.details[0].context.key; // Get the field name causing the error
        return res.status(400).json({ error: errorMessage, field: fieldName });
    }

    next();
}
