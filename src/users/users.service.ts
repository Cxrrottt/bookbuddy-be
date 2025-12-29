import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly userRepo: Repository<User>,
    ) {}

    findByEmail(email: string) {
        return this.userRepo.findOneBy({ email });
    }

    create(user: Partial<User>) {
        const u = this.userRepo.create(user);
        return this.userRepo.save(u);
    }

    findById(id: number) {
        return this.userRepo.findOneBy({ id });
    }
}
