import { ValidationError } from 'class-validator';

export const handlerError = (validationErrors: ValidationError[]) =>
    validationErrors.map((validationError) => {
        if (validationError.children && validationError.children.length > 0) {
            return handlerError(validationError.children);
        }

        return {
            property: validationError.property,
            error: validationError.constraints
                ? Object.keys(validationError.constraints).map((k) =>
                    k === 'whitelistValidation'
                        ? `A propriedade ${validationError.property} é inesperada e por isso foi rejeitada`
                        : validationError.constraints[k],
                )
                : ['Não pode ser indefinido'],
        };
    });
