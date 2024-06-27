import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginRequestBody {
  @IsNotEmpty({ message: 'O e-mail é obrigatório' })
  @IsEmail({}, { message: 'E-mail inválido' })
  email: string;

  @IsNotEmpty({ message: 'A senha é obrigatória' })
  @IsString({ message: 'Senha inválida' })
  password: string;
}
