const Joi = require('joi');

function validate({ body, params }) {
  return (req, res, next) => {
    const validated = {};

     if (body) {
      const { error, value } = body.validate(req.body, {
        abortEarly: false,
        stripUnknown: true
      });
      if (error) {
        const detalles = error.details.map(d => d.message);
        return res.status(400).json({ error: 'Body inválido', detalles });
      }
      req.validatedbBody = value;
    }


    if (params) {
      const { error, value } = params.validate(req.params, {
        abortEarly: false,
        stripUnknown: true
      });
      if (error) {
        const detalles = error.details.map(d => d.message);
        return res.status(400).json({ error: 'Params inválidos', detalles });
      }
      req.validated.params = value;
    }

next();
  };
}

module.exports = validate;