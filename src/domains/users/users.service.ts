import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserRequestDto } from './dto/users.request.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
	constructor(private readonly usersRepository: UsersRepository) {}

	async createUser(userRequestDto: UserRequestDto) {
		const { email, nickname, password } = userRequestDto;
		const isEmailExist = await this.usersRepository.existsByEmail(email);

		if (isEmailExist) {
			throw new UnauthorizedException('이미 존재하는 이메일 입니다.');
		}

		const newUser = await this.usersRepository.createUser({
			email,
			nickname,
			password: await bcrypt.hash(password, 10)
		});

		return newUser.readonlyData;
	}
}
