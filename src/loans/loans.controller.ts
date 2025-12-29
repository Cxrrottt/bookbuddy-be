import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { LoansService } from './loans.service';
import { CreateLoanDto } from './dto/create-loan.dto';

@Controller('loans')
export class LoansController {
    constructor(private readonly loansService: LoansService) {}

    @Get()
    findAll() {
        return this.loansService.findAll();
    }

    @Post()
    create(@Body() dto: CreateLoanDto) {
        return this.loansService.create(dto);
    }

    @Patch(':id/return')
    returnLoan(@Param('id') id: number) {
        return this.loansService.returnLoan(id);
    }
}
