import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(Book)
        private readonly bookRepository: Repository<Book>,
    ) {}

    create(dto: CreateBookDto) {
        const book = this.bookRepository.create(dto);
        return this.bookRepository.save(book);
    }

    findAll() {
        return this.bookRepository.find();
    }

    findOne(id: number) {
        return this.bookRepository.findOneBy({ id });
    }

    async update(id: number, dto: CreateBookDto) {
        const book = await this.bookRepository.findOneBy({ id });
        if (!book) throw new NotFoundException('Book not found');

        Object.assign(book, dto);
        return this.bookRepository.save(book);
    }

    async remove(id: number) {
        const res = await this.bookRepository.delete(id);
        if (res.affected === 0) throw new NotFoundException('Book not found');

        return { deleted: true };
    }

    createBulk(dtos: CreateBookDto[]) {
        const books = this.bookRepository.create(dtos);
        return this.bookRepository.save(books);
    }
}

