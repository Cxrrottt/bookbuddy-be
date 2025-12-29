import { IsInt, IsString, Max, Min } from 'class-validator';

export class CreateReviewDto {
    @IsInt()
    bookId: number;

    @IsString()
    reviewerName: string;

    @IsInt()
    @Min(1)
    @Max(5)
    rating: number;

    @IsString()
    comment: string;
}