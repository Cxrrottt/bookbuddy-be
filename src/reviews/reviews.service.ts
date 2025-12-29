import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './review.entity';
import { Book } from '../books/book.entity';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewsService {
    constructor(
        @InjectRepository(Review) private readonly reviewRepo: Repository<Review>,
        @InjectRepository(Book) private readonly bookRepo: Repository<Book>,
    ) {}

    async create(dto: CreateReviewDto) {
        const book = await this.bookRepo.findOneBy({ id: dto.bookId });
        if (!book) throw new NotFoundException('Book not found');

        const review = this.reviewRepo.create({
            book,
            reviewerName: dto.reviewerName,
            rating: dto.rating,
            comment: dto.comment,
            createdAt: new Date(),
        });

        return this.reviewRepo.save(review);
    }

    findAll() {
        return this.reviewRepo.find({ order: { createdAt: 'DESC' } });
    }

    findByBook(bookId: number) {
        return this.reviewRepo.find({
            where: { book: { id: bookId } },
            order: { createdAt: 'DESC' },
        });
    }

    async getAverageRating(bookId: number) {
        const book = await this.bookRepo.findOneBy({ id: bookId });
        if (!book) throw new NotFoundException('Book not found');

        const { avg } = await this.reviewRepo
            .createQueryBuilder('r')
            .select('AVG(r.rating)', 'avg')
            .where('r.bookId = :bookId', { bookId })
            .getRawOne();

        return { bookId, averageRating: avg ? Number(avg) : 0 };
    }
}
