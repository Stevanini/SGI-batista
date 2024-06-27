import { iS_VALID_PASSWORD } from '@shared/constants/auth.constants';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateMemberDto {
  @IsNotEmpty({ message: 'O e-mail é obrigatório' })
  @IsEmail({}, { message: 'Digite um e-mail válido' })
  email: string;

  @IsString({ message: 'Login ou senha inválidos' })
  @MinLength(4, { message: 'A senha deve ter mais ou igual a 4 caracteres' })
  @MaxLength(20, { message: 'A senha deve ter menos ou igual a 20 caracteres' })
  @Matches(iS_VALID_PASSWORD, {
    message: 'Senha muito fraca',
  })
  password: string;

  @IsString({ message: 'Nome inválido' })
  name: string;
}
