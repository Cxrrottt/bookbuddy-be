import { IsString, IsInt } from 'class-validator';

export class CreateLoanDto {
    @IsInt()
    bookId: number;

    @IsString()
    borrowerName: string;
}