import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Book } from '../books/book.entity';

@Entity()
export class Review {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Book, { eager: true, onDelete: 'CASCADE' })
    book: Book;

    @Column()
    reviewerName: string;

    @Column({ type: 'int' })
    rating: number; // 1..5

    @Column({ type: 'text' })
    comment: string;

    @Column({ type: 'timestamptz' })
    createdAt: Date;
}
