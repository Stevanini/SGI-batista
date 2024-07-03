import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { map } from 'rxjs/operators';
import { MemberFromJwt } from '@/src/app/auth/interfaces/member-from-jwt';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
    constructor(private readonly jwtService: JwtService) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const jwtToken = request.headers.authorization?.replace('Bearer ', '');

        if (jwtToken) {
            try {
                const member = this.jwtService.verify<MemberFromJwt>(jwtToken);
                request.member = member; // Adiciona o usuário ao objeto de requisição para acesso posterior
            } catch (e) {
                // Lidar com erros de validação do token JWT, se necessário
            }
        }

        return next.handle().pipe(
            map((data) => {
                // Pode modificar a resposta aqui, se necessário
                return data;
            }),
        );
    }
}
