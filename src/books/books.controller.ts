import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) {}

    @Get()
    findAll() {
        return this.booksService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.booksService.findOne(id);
    }

    @Post()
    create(@Body() dto: CreateBookDto) {
        return this.booksService.create(dto);
    }

    @Post('bulk')
    createBulk(@Body() dtos: CreateBookDto[]) {
        return this.booksService.createBulk(dtos);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() dto: CreateBookDto) {
        return this.booksService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.booksService.remove(id);
    }
}
