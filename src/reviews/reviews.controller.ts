import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('reviews')
export class ReviewsController {
    constructor(private readonly reviewsService: ReviewsService) {}


    @Get()
    findAll() {
        return this.reviewsService.findAll();
    }

    @Get('book/:bookId')
    findByBook(@Param('bookId') bookId: number) {
        return this.reviewsService.findByBook(bookId);
    }

    @Get('book/:bookId/average')
    average(@Param('bookId') bookId: number) {
        return this.reviewsService.getAverageRating(bookId);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() dto: CreateReviewDto) {
        return this.reviewsService.create(dto);
    }
}
