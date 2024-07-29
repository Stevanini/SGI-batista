import { Module } from '@nestjs/common';
import { SgiFileController } from './sgi-file.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SgiFileTag } from './entities/sgi-file-tag.entity';
import { SgiFile } from './entities/sgi-file.entity';
import { SgiFileService } from './sgi-file.service';

@Module({
    imports: [TypeOrmModule.forFeature([SgiFile, SgiFileTag])],
    controllers: [SgiFileController],
    providers: [SgiFileService],
})
export class SgiFileModule {}
