import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { Domain } from '../../shared/enums/domain.enums';
import { UserRequestDto } from './dto/users.request.dto';
import { UsersRepository } from './users.repository';
import { UserReadonlyData } from './users.schema';

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

	async uploadImage(user: UserReadonlyData, file: Express.Multer.File) {
		const fileName = `${Domain.USERS}/${file.filename}`;
		const newUser = await this.usersRepository.findByIdAndUpdateImage(user.id, fileName);
		return newUser;
	}
}
