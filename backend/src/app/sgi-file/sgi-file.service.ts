import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SgiFile } from './entities/sgi-file.entity';
import { SgiFileTag } from './entities/sgi-file-tag.entity';
import { UploadSgiFileDto } from './dto/update-sgi-file.dto';

@Injectable()
export class SgiFileService {
    constructor(
        @InjectRepository(SgiFile)
        private sgiFileRepository: Repository<SgiFile>,
        @InjectRepository(SgiFileTag)
        private sgiFiletagRepository: Repository<SgiFileTag>,
    ) {}

    async uploadFile(
        file: Express.Multer.File,
        dto: UploadSgiFileDto,
        createdBy: string,
    ): Promise<SgiFile> {
        const base64Content = file.buffer.toString('base64');

        const sgiFile = new SgiFile({
            name: file.originalname,
            base64File: base64Content,
            mimeType: file.mimetype,
            createdBy,
            updatedBy: createdBy,
        });

        if (dto.sgiFileTag) {
            const sgiFileTagDb = await this.sgiFiletagRepository.findOneBy({
                name: dto.sgiFileTag,
            });

            if (!sgiFileTagDb) {
                throw new BadRequestException('A tag não existe');
            }
            sgiFile.sgiFileTag = sgiFileTagDb;
        }

        return this.sgiFileRepository.save(sgiFile);
    }

    async findFilesByTag(tag: string): Promise<SgiFile[]> {
        // console.log('findFilesByTag');
        return this.sgiFileRepository
            .createQueryBuilder('sgiFile')
            .leftJoinAndSelect('sgiFile.sgiFileTag', 'tag')
            .where('tag.name = :tagName', { tagName: tag })
            .getMany();
    }

    async findFileById(id: string): Promise<SgiFile> {
        return this.sgiFileRepository.findOne({
            where: { id },
            relations: ['sgiFileTag'],
        });
    }

    async remove(id: string): Promise<void> {
        await this.sgiFileRepository.delete(id);
    }
}
