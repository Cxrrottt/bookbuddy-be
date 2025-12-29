import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Book } from '../books/book.entity';

@Entity()
export class Loan {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Book, { eager: true })
    book: Book;

    @Column()
    borrowerName: string;

    @Column({ type: 'timestamptz' })
    loanDate: Date;

    @Column({ type: 'timestamptz', nullable: true })
    returnDate: Date; // ⬅️ brez "| null"
}