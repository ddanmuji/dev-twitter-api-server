import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserRequestDto } from './dto/users.request.dto';
import { User } from './users.schema';

@Injectable()
export class UsersRepository {
	constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

	async existsByEmail(email: string) {
		const result = await this.userModel.exists({ email });
		return result;
	}

	async createUser(userRequestDto: UserRequestDto) {
		const result = await this.userModel.create(userRequestDto);
		return result;
	}
}
