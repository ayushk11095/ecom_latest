import Joi from "joi";

export default {
    userCreateValidator,
    logInValidator,
    profileUpdateValidator,
    productCreateValidator,
    listValidator,
}

export async function userCreateValidator(req, res, next) {
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    mob: Joi.string().required(),
    countryCode: Joi.string().required(),
    isnCode: Joi.string().required(),
    password: Joi.string().required()
  });

  const { error } = await schema.validate(req.body);
  if (error) {
    return next({
      status: 400,
      code: `invalid_params`,
      message: error.details[0].message
  })
  }
  next();
}

export async function logInValidator(req, res, next) {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  });

  const { error } = await schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }
  next();
}

export async function profileUpdateValidator(req, res, next) {
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    mob: Joi.string().required(),
    countryCode: Joi.string().required(),
    isnCode: Joi.string().required(),
  });

  const { error } = await schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }
  next();
}

export async function productCreateValidator(req, res, next) {
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    images: Joi.array().items(Joi.string()),
    price: Joi.number().required(),
    discountPrice: Joi.number(),
    description: Joi.string(),
    stock: Joi.number().required()
  });

  const { error } = await schema.validate(req.body);
  if (error) {
    return next({
      status: 400,
      code: `invalid_params`,
      message: error.details[0].message
  })
  }
  next();
}

export async function productUpdateValidator(req, res, next) {
  const schema = Joi.object().keys({
    uuid: Joi.string().required(),
    title: Joi.string().required(),
    images: Joi.array().items(Joi.string()),
    price: Joi.number().required(),
    discountPrice: Joi.number(),
    description: Joi.string(),
    stock: Joi.number().required()
  });

  const { error } = await schema.validate(req.body);
  if (error) {
    return next({
      status: 400,
      code: `invalid_params`,
      message: error.details[0].message
  })
  }
  next();
}

export async function listValidator(req, res, next) {
  const schema = Joi.object().keys({
    page: Joi.number(),
    pageSize: Joi.number(),
  });

  const { error } = await schema.validate(req.body);
  if (error) {
    return next({
      status: 400,
      code: `invalid_params`,
      message: error.details[0].message
  })
  }
  next();
}