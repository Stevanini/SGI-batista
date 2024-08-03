import {
    BadRequestException,
    ValidationPipe,
    ValidationPipeOptions,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { handlerError } from '@shared/utils/errors.util';

export class HttpValidationPipe extends ValidationPipe {
    constructor(options?: ValidationPipeOptions) {
        super({
            transform: true,
            forbidUnknownValues: true,
            whitelist: true,
            forbidNonWhitelisted: true,
            exceptionFactory: (validationErrors: ValidationError[] = []) =>
                new BadRequestException(handlerError(validationErrors)),
            ...options,
        });
    }
}
