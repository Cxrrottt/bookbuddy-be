import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Loan } from './loan.entity';
import { Book } from '../books/book.entity';
import { CreateLoanDto } from './dto/create-loan.dto';

@Injectable()
export class LoansService {
    constructor(
        @InjectRepository(Loan)
        private readonly loanRepo: Repository<Loan>,
        @InjectRepository(Book)
        private readonly bookRepo: Repository<Book>,
    ) {}

    async create(dto: CreateLoanDto) {
        const book = await this.bookRepo.findOneBy({ id: dto.bookId });
        if (!book) throw new NotFoundException('Book not found');

        if (!book.available) {
            throw new BadRequestException('Book is not available');
        }

        book.available = false;
        await this.bookRepo.save(book);

        const loan = this.loanRepo.create({
            book,
            borrowerName: dto.borrowerName,
            loanDate: new Date(),
        });

        return this.loanRepo.save(loan);
    }

    findAll() {
        return this.loanRepo.find();
    }

    async returnLoan(loanId: number) {
        const loan = await this.loanRepo.findOne({
            where: { id: loanId },
            relations: ['book'],
        });
        if (!loan) throw new NotFoundException('Loan not found');

        if (loan.returnDate) {
            throw new BadRequestException('Loan already returned');
        }

        loan.returnDate = new Date();
        await this.loanRepo.save(loan);

        loan.book.available = true;
        await this.bookRepo.save(loan.book);

        return loan;
    }
}