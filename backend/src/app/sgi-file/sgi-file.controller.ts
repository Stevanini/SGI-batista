import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    UseInterceptors,
    UploadedFile,
    Query,
} from '@nestjs/common';
import { SgiFileService } from './sgi-file.service';
import { AdvancedSecurity } from '@/src/shared/decorators/security.decorator';
import { CurrentUserInterceptor } from '@/src/shared/interceptors/current-user.interceptors';
import { ApiBody, ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { MemberFromJwt } from '../auth/interfaces/member-from-jwt';
import { SgiFile } from './entities/sgi-file.entity';
import { UploadSgiFileDto } from './dto/update-sgi-file.dto';
import { IsPublic } from '@/src/shared/decorators/is-public.decorator';

@ApiTags('Files')
@Controller('sgi-file')
@AdvancedSecurity()
@UseInterceptors(CurrentUserInterceptor)
export class SgiFileController {
    constructor(private readonly sgiFileService: SgiFileService) {
        // console.log('SgiFileController');
    }

    @Post('upload')
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('file'))
    @ApiBody({
        description: 'Upload Image',
        type: UploadSgiFileDto,
    })
    async uploadFile(
        @UploadedFile() file: Express.Multer.File,
        @Body() dto: any & { member: MemberFromJwt },
    ) {
        // console.log(file, JSON.stringify(dto));
        return this.sgiFileService.uploadFile(file, dto, 'dto.member.name');
    }

    // @Get(':id')
    // @ApiOperation({ summary: 'Get file by ID' })
    // @ApiParam({ name: 'id', type: String, description: 'File ID' })
    // @ApiResponse({ status: 200, description: 'File found', type: SgiFile })
    // async getFileById(@Param('id') id: string): Promise<SgiFile> {
    //     if (!isUUID(id)) {
    //         throw new BadRequestException('Invalid UUID format');
    //     }
    //     return this.sgiFileService.findFileById(id);
    // }

    @Get('q')
    @IsPublic()
    @ApiQuery({ name: 'tag', type: String })
    async findFilesByTag(@Query('tag') tag: string): Promise<SgiFile[]> {
        return this.sgiFileService.findFilesByTag(tag);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.sgiFileService.remove(id);
    }
}
