import { Schema, Validator as JsonValidator } from 'jsonschema';
import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';


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
