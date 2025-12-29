import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module';
import { LoansModule } from './loans/loans.module';
import { ReviewsModule } from './reviews/reviews.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'bookbuddy',
      autoLoadEntities: true,
      synchronize: true,
      logging: ['error', 'warn']
    }),
    BooksModule,
    LoansModule,
    ReviewsModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
