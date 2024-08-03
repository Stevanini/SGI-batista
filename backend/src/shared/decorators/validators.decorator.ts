import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  isEmail,
} from 'class-validator';
import { VerifyDocument } from '@utils/verify-document.utils';

export function IsAValidTelephone(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'IsAValideTelephone',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: string, args: ValidationArguments) {
          if (!value) return false;
          return /^\+(?:[0-9]●?){6,14}[0-9]$/.test(value);
        },
        defaultMessage() {
          return 'Entre com um telefone válido';
        },
      },
    });
  };
}

export function IsValidCPFOrCNPJ(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'IsValidCPFOrCNPJ',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: string, args: ValidationArguments) {
          if (!value) return false;
          const verifyDocument = new VerifyDocument();
          return verifyDocument.isValidCPFOrCNPJ(value);
        },
        defaultMessage() {
          return 'Informe um CPF ou CNPJ válido';
        },
      },
    });
  };
}

export function IsValidCPFOrCNPJOrEmail(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'IsValidCPFOrCNPJ',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (!value) return false;
          const verifyDocument = new VerifyDocument();
          if (isEmail(value) || verifyDocument.isValidCPFOrCNPJ(value))
            return true;

          return false;
        },
        defaultMessage() {
          return 'Informe um CPF/CNPJ/EMAIL válido';
        },
      },
    });
  };
}

export function IsValidCpf(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'IsValidCpf',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (!value) return false;
          const verifyDocument = new VerifyDocument();
          return verifyDocument.validCpf(value);
        },
        defaultMessage() {
          return 'Informe um CPF válido';
        },
      },
    });
  };
}

export function IsValidCnpj(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'IsValidCnpj',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (!value) return false;
          const verifyDocument = new VerifyDocument();
          return verifyDocument.validCnpj(value);
        },
        defaultMessage() {
          return 'Informe um CNPJ válido';
        },
      },
    });
  };
}
