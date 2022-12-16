import { RequestHandler } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { sanitize } from 'class-sanitizer';
import { HttpException } from '@exceptions/index';

function dtoValidationMiddleware(schema: new () => {}, skipMissingProperties = false): RequestHandler {
  return async (req, _res, next) => {
    const dtoObj = plainToInstance(schema, req.body);
    const errors: ValidationError[] = await validate(dtoObj, { skipMissingProperties });
    if (errors.length > 0) {
      const dtoErrors = errors.map((error: ValidationError) => (Object as any).values(error.constraints)).join(', ');
      next(new HttpException(400, dtoErrors));
    } else {
      //sanitize the object and call the next middleware
      sanitize(dtoObj);
      req.body = dtoObj;
      next();
    }
  };
}

export default dtoValidationMiddleware;
