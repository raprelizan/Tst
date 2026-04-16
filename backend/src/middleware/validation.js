import Joi from 'joi';

const reportSchema = Joi.object({
  type: Joi.string().valid('anonymous', 'confidential').required(),
  category: Joi.string()
    .valid('crime', 'suspicious_activity', 'corruption', 'safety_hazard')
    .required(),
  title: Joi.string().min(5).max(120).required(),
  description: Joi.string().min(20).max(5000).required(),
  location: Joi.string().allow('', null).max(200),
  consentAccepted: Joi.boolean().valid(true).required(),
  confidentialContact: Joi.object({
    fullName: Joi.string().min(2).max(120).required(),
    phone: Joi.string().min(6).max(30).required(),
    email: Joi.string().email().allow('')
  }).optional()
});

export function validateReport(req, res, next) {
  const { error } = reportSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      error: 'Validation failed',
      details: error.details.map((item) => item.message)
    });
  }

  if (req.body.type === 'confidential' && !req.body.confidentialContact) {
    return res.status(400).json({
      error: 'Confidential contact information is required for confidential reports.'
    });
  }

  return next();
}
