import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { CurrentUser } from '../../shared/decorators/user.decorators';
import { AuthService } from '../auth/auth.service';
import { LoginRequestDto } from '../auth/dto/login.request.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { ReadOnlyUserDto } from './dto/users.dto';
import { UserRequestDto } from './dto/users.request.dto';
import { UserReadonlyData } from './users.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(
		private readonly authService: AuthService,
		private readonly usersService: UsersService
	) {}

	@ApiOperation({ summary: '내 정보 조회', tags: ['users'] })
	@UseGuards(JwtAuthGuard)
	@Get('me')
	getCurrentUser(@CurrentUser() user: UserReadonlyData): Promise<UserReadonlyData> {
		return Promise.resolve(user);
	}

	@ApiOperation({ summary: '회원가입', tags: ['users'] })
	@ApiResponse({ status: 200, description: 'Success', type: ReadOnlyUserDto })
	@ApiResponse({ status: 500, description: 'Server Error' })
	@Post('signup')
	async signUp(@Body() userRequestDto: UserRequestDto): Promise<ReadOnlyUserDto> {
		return await this.usersService.createUser(userRequestDto);
	}

	@ApiOperation({ summary: '로그인', tags: ['users'] })
	@Post('login')
	async login(@Body() loginRequestDto: LoginRequestDto): Promise<{ access_token: string }> {
		return this.authService.login(loginRequestDto);
	}

	@ApiOperation({ summary: '프로필 이미지 업로드', tags: ['users'] })
	@Post('me/upload-image')
	async uploadUserImg(): Promise<string> {
		return 'uploadUserImg';
	}
}
