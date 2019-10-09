import { Schema, Validator as JsonValidator } from 'jsonschema';
import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

/**
 * create a validator function that receives data and check if it's conform to the passed schema
 * @param schema main json schema
 * @param refSchema optional schemas to extends the main one
 */
export const isJsonValid = (schema: Schema, ...refSchema: Schema[]) => {
    return (data: any) => {
      const jsonValidator = new JsonValidator();
      refSchema.forEach((s) => jsonValidator.addSchema(s, s.id));
      const isValidResult = jsonValidator.validate(data, schema, { throwError: true });
      return isValidResult.valid;
    };
};

/**
 * catch errors for async functions
 * @param fn async function to validate
 */
export const wrapAsync = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Extracts the validation errors from a request and makes them available in a Result object.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }
    // Make sure to `.catch()` any errors and pass them along to the `next()`
    fn(req, res, next).catch(next);
  };
};
