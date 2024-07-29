import { BadRequestException, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
    CreateCashFlowGroupCategoryDto,
    UpdateCashFlowGroupCategoryDto,
} from '../dto/cashflow-group-category.dto';
import { CashFlowGroupCategory } from '../entities/cashflow-group-category.entity';

@Injectable()
export class CashFlowGroupCategoryService {
    constructor(
        @InjectRepository(CashFlowGroupCategory)
        private cashFlowGroupCategoryRepository: Repository<CashFlowGroupCategory>,
    ) {}

    async create(
        dto: CreateCashFlowGroupCategoryDto,
        createdBy: string,
    ): Promise<CreateCashFlowGroupCategoryDto> {
        const { name, description } = dto;

        const exits = await this.cashFlowGroupCategoryRepository.findOneBy({
            name,
        });
        if (exits) {
            throw new BadRequestException('A categoria já existe');
        }

        const newEntity = new CashFlowGroupCategory({
            name,
            description,
            createdBy,
            updatedBy: createdBy,
        });

        return await this.cashFlowGroupCategoryRepository.save(newEntity);
    }

    async update(
        id: string,
        dto: UpdateCashFlowGroupCategoryDto,
        updatedBy: string,
    ): Promise<CashFlowGroupCategory> {
        const cashFlow = await this.findOne(id);

        cashFlow.updatedBy = updatedBy;

        Object.assign(cashFlow, dto);

        return await this.cashFlowGroupCategoryRepository.save(cashFlow);
    }

    async findAll(): Promise<CashFlowGroupCategory[]> {
        return await this.cashFlowGroupCategoryRepository.find();
    }

    async findOne(id: string): Promise<CashFlowGroupCategory> {
        return await this.cashFlowGroupCategoryRepository.findOne({
            where: { id },
        });
    }
}
