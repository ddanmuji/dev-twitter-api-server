import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserRequestDto } from './dto/users.request.dto';
import { User } from './users.schema';

@Injectable()
export class UsersRepository {
	constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

	async existsByEmail(email: string) {
		return await this.userModel.exists({ email });
	}

	async findUserByEmail(email: string) {
		return await this.userModel.findOne({ email });
	}

	async findUserByIdWithoutPassword(userId: string) {
		return await this.userModel.findById(userId).select('-password');
	}

	async createUser(userRequestDto: UserRequestDto) {
		return await this.userModel.create(userRequestDto);
	}
}
