import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

import { LoginRequestBody } from '@app/auth/dto/login.dto';

@Injectable()
export class LoginValidationMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const body = req.body;

    const loginRequestBody = new LoginRequestBody();
    loginRequestBody.email = body.email;
    loginRequestBody.password = body.password;

    const validations = await validate(loginRequestBody);

    if (validations.length) {
      const formattedErrors = validations.map((error) => {
        return {
          property: error.property,
          error: Object.values(error.constraints),
        };
      });

      throw new BadRequestException(formattedErrors);
    }

    next();
  }
}
