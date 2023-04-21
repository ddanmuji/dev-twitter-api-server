import { Controller, Get, Post } from '@nestjs/common';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	getCurrentUser() {
		return 'getCurrentUser';
	}

	@Post()
	async signUp() {
		return 'signUp';
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
