import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CashFlowCategory } from './entities/cashflow-category.entity';
import { AdvancedSecurity } from '@/src/shared/decorators/security.decorator';
import { ApiTags } from '@nestjs/swagger';
import { CreateCashFlowCategoryDto } from './dto/cashflow-category.dto';
import { CashFlowCategoryService } from './cashflow-category.service';

@ApiTags('CashflowsCategory')
@Controller('cashflow-categories')
@AdvancedSecurity()
export class CashFlowCategoryController {
    constructor(
        private readonly cashFlowTypeService: CashFlowCategoryService,
    ) {}

    @Post()
    async create(
        @Body() category: CreateCashFlowCategoryDto,
    ): Promise<CreateCashFlowCategoryDto> {
        return this.cashFlowTypeService.create(category, 'API');
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
