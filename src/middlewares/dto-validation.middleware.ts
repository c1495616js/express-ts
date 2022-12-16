import { RequestHandler } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { sanitize } from 'class-sanitizer';
import { HttpException } from '@exceptions/index';

type Option = Partial<{
  value: 'body' | 'query' | 'params';
  skipMissingProperties: boolean;
  whitelist: boolean;
  forbidNonWhitelisted: boolean;
}>;

function dtoValidationMiddleware(
  schema: new () => {},
  { value = 'body', skipMissingProperties = false, whitelist = true, forbidNonWhitelisted = true }: Option
): RequestHandler {
  return async (req, _res, next) => {
    const dtoObj = plainToInstance(schema, req[value]);
    const errors: ValidationError[] = await validate(dtoObj, {
      skipMissingProperties,
      whitelist,
      forbidNonWhitelisted,
    });
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
