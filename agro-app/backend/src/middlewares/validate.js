const Joi = require('joi');

function validate(schema, source = 'body') {
  return (req, res, next) => {
    const data = req[source];
    const { error, value } = schema.validate(data, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      return res.status(400).json({
        error: 'Datos inválidos',
        detalles: error.details.map(d => d.message)
      });
    }

    // Guarda el resultado validado
    const key = `validated${source.charAt(0).toUpperCase() + source.slice(1)}`;
    req[key] = value;

    // (opcional) también lo guarda en req.validated.body / params / query
    req.validated = req.validated || {};
    req.validated[source] = value;

    next();
  };
}

module.exports = validate;
