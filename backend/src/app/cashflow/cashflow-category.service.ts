import { BadRequestException, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CashFlowCategory } from './entities/cashflow-category.entity';
import { CreateCashFlowCategoryDto } from './dto/cashflow-category.dto';

@Injectable()
export class CashFlowCategoryService {
    constructor(
        @InjectRepository(CashFlowCategory)
        private cashFlowTypeRepository: Repository<CashFlowCategory>,
    ) {}

    async create(
        dto: CreateCashFlowCategoryDto,
        createdBy: string,
    ): Promise<CreateCashFlowCategoryDto> {
        const { name, description } = dto;

        const exits = await this.cashFlowTypeRepository.findOneBy({
            name,
        });
        if (exits) {
            throw new BadRequestException('A categoria já existe');
        }

        const newEntity = new CashFlowCategory({
            name,
            description,
            createdBy,
            updatedBy: createdBy,
        });

        return await this.cashFlowTypeRepository.save(newEntity);
    }

    async findAll(): Promise<CashFlowCategory[]> {
        return await this.cashFlowTypeRepository.find();
    }

    async findOne(id: string): Promise<CashFlowCategory> {
        return await this.cashFlowTypeRepository.findOne({ where: { id } });
    }
}
