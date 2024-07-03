import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { AdvancedSecurity } from '@shared/decorators/security.decorator';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrentMember } from '../auth/decorators/current-member.decorator';
import { Member } from './entities/member.entity';
import { APIInfo } from '@/src/shared/decorators/api-info.decorator';
import { IsPublic } from '@/src/shared/decorators/is-public.decorator';

@ApiTags('Members')
@Controller('members')
@AdvancedSecurity()
export class MemberController {
    constructor(private readonly memberService: MemberService) {}

    @Post()
    @ApiResponse({
        status: 201,
        description: 'O membro foi criado com sucesso',
    })
    @ApiResponse({ status: 403, description: 'Acesso proibido.' })
    @IsPublic()
    create(@Body() createMemberDto: CreateMemberDto) {
        return this.memberService.create(createMemberDto, '');
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
    update(@Param('id') id: string, @Body() updateMemberDto: UpdateMemberDto) {
        return this.memberService.update(id, updateMemberDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.memberService.remove(id);
    }
}
