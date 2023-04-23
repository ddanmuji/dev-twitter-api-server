import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersRepository } from '../users/users.repository';
import { UsersService } from '../users/users.service';
import { LoginRequestDto } from './dto/login.request.dto';

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly usersRepository: UsersRepository,
		private readonly jwtService: JwtService
	) {}

	async login(loginRequestDto: LoginRequestDto) {
		const { email, password } = loginRequestDto;

		const user = await this.usersRepository.findUserByEmail(email);
		if (!user) {
			throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.');
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.');
		}

		const payload = { email, sub: user.id };
		const access_token = this.jwtService.sign(payload, { secret: process.env.JWT_SECRET });

		return { access_token };
	}
}
