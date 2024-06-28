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
// import { AdvancedSecurity } from '@shared/decorators/security.decorator';
// import { IsPublic } from '@shared/decorators/is-public.decorator';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Members')
@Controller('members')
// @AdvancedSecurity()
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'O membro foi criado com sucesso',
  })
  @ApiResponse({ status: 403, description: 'Acesso proibido.' })
  create(@Body() createMemberDto: CreateMemberDto) {
    return this.memberService.create(createMemberDto, '');
  }

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
