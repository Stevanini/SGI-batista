import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CashFlowCategory } from './entities/cashflow-category.entity';
import { CashFlowCategoryService } from './cashflow-type.service';

@Controller('cashflow')
export class CashFlowCategoryController {
    constructor(
        private readonly cashFlowTypeService: CashFlowCategoryService,
    ) {}

    @Post()
    async create(
        @Body() typeData: Partial<CashFlowCategory>,
    ): Promise<CashFlowCategory> {
        return this.cashFlowTypeService.create(typeData);
    }

    @Get()
    async findAll(): Promise<CashFlowCategory[]> {
        return this.cashFlowTypeService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<CashFlowCategory> {
        return this.cashFlowTypeService.findOne(id);
    }
}
