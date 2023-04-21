import { Body, Controller, Get, Post } from '@nestjs/common';

import { UserRequestDto } from './dto/users.request.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	getCurrentUser() {
		return 'getCurrentUser';
	}

	@Post('signup')
	async signUp(@Body() userRequestDto: UserRequestDto) {
		return await this.usersService.createUser(userRequestDto);
	}

	@Post('login')
	async login() {
		return 'login';
	}

	@Post('logout')
	async logout() {
		return 'logout';
	}

	@Post('upload/user')
	async uploadUserImg() {
		return 'uploadUserImg';
	}
}
