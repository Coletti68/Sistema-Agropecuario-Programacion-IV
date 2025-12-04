const Joi = require('joi');

function validate(schemas) {
  return (req, res, next) => {
    const validated = {};

    for (const source of ['body', 'params', 'query']) {
      if (schemas[source]) {
        const { error, value } = schemas[source].validate(req[source], {
          abortEarly: false,
          stripUnknown: true
        });

        if (error) {
          return res.status(400).json({
            error: 'Datos inválidos',
            detalles: error.details.map(d => d.message)
          });
        }

        validated[source] = value;
        req[`validated${source.charAt(0).toUpperCase() + source.slice(1)}`] = value;
      }
    }

    req.validated = validated;
    next();
  };
}

module.exports = validate;