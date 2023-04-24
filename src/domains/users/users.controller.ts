import {
	Body,
	Controller,
	Get,
	Post,
	UploadedFile,
	UseGuards,
	UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { Domain } from '../../shared/constants/domain.constants';
import { CurrentUser } from '../../shared/decorators/user.decorators';
import { multerOptions } from '../../shared/utils/multer.options';
import { AuthService } from '../auth/auth.service';
import { LoginRequestDto } from '../auth/dto/login.request.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { ReadOnlyUserDto } from './dto/users.dto';
import { UserRequestDto } from './dto/users.request.dto';
import { UserReadonlyData } from './users.schema';
import { UsersService } from './users.service';

@Controller(Domain.USERS)
export class UsersController {
	constructor(
		private readonly authService: AuthService,
		private readonly usersService: UsersService
	) {}

	@ApiOperation({ summary: '내 정보 조회', tags: [Domain.USERS] })
	@UseGuards(JwtAuthGuard)
	@Get('me')
	getCurrentUser(@CurrentUser() user: UserReadonlyData) {
		return Promise.resolve(user);
	}

	@ApiOperation({ summary: '회원가입', tags: [Domain.USERS] })
	@ApiResponse({ status: 200, description: 'Success', type: ReadOnlyUserDto })
	@ApiResponse({ status: 500, description: 'Server Error' })
	@Post('signup')
	async signUp(@Body() userRequestDto: UserRequestDto) {
		return await this.usersService.createUser(userRequestDto);
	}

	@ApiOperation({ summary: '로그인', tags: [Domain.USERS] })
	@Post('login')
	async login(@Body() loginRequestDto: LoginRequestDto) {
		return this.authService.login(loginRequestDto);
	}

	@ApiOperation({ summary: '프로필 이미지 업로드', tags: [Domain.USERS] })
	@UseInterceptors(FileInterceptor('image', multerOptions(Domain.USERS)))
	@UseGuards(JwtAuthGuard)
	@Post('me/upload-image')
	async uploadUserImg(
		@UploadedFile() file: Express.Multer.File,
		@CurrentUser() user: UserReadonlyData
	) {
		return this.usersService.uploadImage(user, file);
	}
}
