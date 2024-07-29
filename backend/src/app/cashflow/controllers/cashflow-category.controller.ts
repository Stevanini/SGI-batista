import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    UseInterceptors,
    Patch,
} from '@nestjs/common';
import { CashFlowCategory } from '../entities/cashflow-category.entity';
import { AdvancedSecurity } from '@/src/shared/decorators/security.decorator';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import {
    CreateCashFlowCategoryDto,
    UpdateCashFlowCategoryDto,
} from '../dto/cashflow-category.dto';
import { CashFlowCategoryService } from '../services/cashflow-category.service';
import { CurrentUserInterceptor } from '@/src/shared/interceptors/current-user.interceptors';
import { MemberFromJwt } from '../../auth/interfaces/member-from-jwt';

@ApiTags('Cashflows Category')
@Controller('cashflowCategories')
@AdvancedSecurity()
@UseInterceptors(CurrentUserInterceptor)
export class CashFlowCategoryController {
    constructor(
        private readonly cashFlowCategoryService: CashFlowCategoryService,
    ) {}

    @Post()
    @ApiBody({ type: CreateCashFlowCategoryDto })
    async create(
        @Body() dto: CreateCashFlowCategoryDto & { member: MemberFromJwt },
    ): Promise<CashFlowCategory> {
        return this.cashFlowCategoryService.create(
            dto,
            dto.member?.name ?? 'API',
        );
    }

    @Get()
    async findAll(): Promise<CashFlowCategory[]> {
        return this.cashFlowCategoryService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<CashFlowCategory> {
        return this.cashFlowCategoryService.findOne(id);
    }

    @Patch(':id')
    @ApiBody({ type: UpdateCashFlowCategoryDto })
    update(
        @Param('id') id: string,
        @Body()
        dto: UpdateCashFlowCategoryDto & { member: MemberFromJwt },
    ) {
        return this.cashFlowCategoryService.update(
            id,
            dto,
            dto.member?.name ?? 'API',
        );
    }
}
