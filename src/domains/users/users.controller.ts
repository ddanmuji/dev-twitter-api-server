import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { ReadOnlyUserDto } from './dto/users.dto';
import { UserRequestDto } from './dto/users.request.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@ApiOperation({ summary: '내 정보 조회', tags: ['users'] })
	@Get()
	getCurrentUser() {
		return 'getCurrentUser';
	}

	@ApiOperation({ summary: '회원가입', tags: ['users'] })
	@ApiResponse({ status: 200, description: 'Sussess', type: ReadOnlyUserDto })
	@ApiResponse({ status: 500, description: 'Server Error' })
	@Post('signup')
	async signUp(@Body() userRequestDto: UserRequestDto) {
		return await this.usersService.createUser(userRequestDto);
	}

	@ApiOperation({ summary: '로그인', tags: ['users'] })
	@Post('login')
	async login() {
		return 'login';
	}

	@ApiOperation({ summary: '로그아웃', tags: ['users'] })
	@Post('logout')
	async logout() {
		return 'logout';
	}

	@ApiOperation({ summary: '프로필 이미지 업로드', tags: ['users'] })
	@Post('upload/user')
	async uploadUserImg() {
		return 'uploadUserImg';
	}
}
