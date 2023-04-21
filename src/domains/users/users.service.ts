import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

import { UserRequestDto } from './dto/users.request.dto';
import { User } from './users.schema';

@Injectable()
export class UsersService {
	constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

	async checkEmailExists(email: string) {
		return await this.userModel.exists({ email });
	}

	async createUser(userRequestDto: UserRequestDto) {
		const { email, nickname, password } = userRequestDto;
		const isEmailExist = await this.checkEmailExists(email);

		if (isEmailExist) {
			throw new UnauthorizedException('이미 존재하는 이메일 입니다.');
		}

		const newUser = await this.userModel.create({
			email,
			nickname,
			password: await bcrypt.hash(password, 10)
		});

		return newUser.readonlyData;
	}
}
