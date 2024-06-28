import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Member } from '../../member/entities/member.entity';
import { AuthMemberRequest } from '../interfaces/auth-request';

export const CurrentMember = createParamDecorator(
    (data: unknown, context: ExecutionContext): Member => {
        const request = context.switchToHttp().getRequest<AuthMemberRequest>();

        return request.member;
    },
);
