import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Patch,
    UseInterceptors,
} from '@nestjs/common';
import { AdvancedSecurity } from '@/src/shared/decorators/security.decorator';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CashFlowGroupCategoryService } from '../services/cashflow-group-category.service';
import {
    CreateCashFlowGroupCategoryDto,
    UpdateCashFlowGroupCategoryDto,
} from '../dto/cashflow-group-category.dto';
import { CashFlowGroupCategory } from '../entities/cashflow-group-category.entity';
import { CurrentUserInterceptor } from '@/src/shared/interceptors/current-user.interceptors';
import { MemberFromJwt } from '../../auth/interfaces/member-from-jwt';

@ApiTags('Cashflows Group Category')
@Controller('cashflowGroupCategories')
@AdvancedSecurity()
@UseInterceptors(CurrentUserInterceptor)
export class CashFlowGroupCategoryController {
    constructor(
        private readonly cashFlowGroupCategoryService: CashFlowGroupCategoryService,
    ) {}

    @Post()
    async create(
        @Body()
        dto: CreateCashFlowGroupCategoryDto & { member: MemberFromJwt },
    ): Promise<CreateCashFlowGroupCategoryDto> {
        return this.cashFlowGroupCategoryService.create(dto, dto.member.name);
    }

    @Get()
    async findAll(): Promise<CashFlowGroupCategory[]> {
        return this.cashFlowGroupCategoryService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<CashFlowGroupCategory> {
        return this.cashFlowGroupCategoryService.findOne(id);
    }

    @Patch(':id')
    @ApiBody({ type: UpdateCashFlowGroupCategoryDto })
    update(
        @Param('id') id: string,
        @Body()
        dto: UpdateCashFlowGroupCategoryDto & { member: MemberFromJwt },
    ) {
        return this.cashFlowGroupCategoryService.update(
            id,
            dto,
            dto.member?.name ?? 'API',
        );
    }
}
