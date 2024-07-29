import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseInterceptors,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { AdvancedSecurity } from '@shared/decorators/security.decorator';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { APIInfo } from '@/src/shared/decorators/api-info.decorator';
import { IsPublic } from '@/src/shared/decorators/is-public.decorator';
import { MemberFromJwt } from '../auth/interfaces/member-from-jwt';
import { CurrentUserInterceptor } from '@/src/shared/interceptors/current-user.interceptors';

@ApiTags('Members')
@Controller('members')
@AdvancedSecurity()
@UseInterceptors(CurrentUserInterceptor)
export class MemberController {
    constructor(private readonly memberService: MemberService) {}

    @Post()
    @ApiResponse({
        status: 201,
        description: 'O membro foi criado com sucesso',
    })
    @ApiResponse({ status: 403, description: 'Acesso proibido.' })
    @IsPublic()
    @ApiBody({ type: CreateMemberDto })
    create(@Body() dto: CreateMemberDto & { member: MemberFromJwt }) {
        return this.memberService.create(dto, dto.member.name);
    }

    @APIInfo({ name: 'aaa', description: 'Pegar todos os membro' })
    @Get()
    findAll() {
        return this.memberService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.memberService.findOne(id);
    }

    @Patch(':id')
    @ApiBody({ type: UpdateMemberDto })
    update(
        @Param('id') id: string,
        @Body() dto: UpdateMemberDto & { member: MemberFromJwt },
    ) {
        return this.memberService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.memberService.remove(id);
    }
}
