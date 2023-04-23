import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from '../auth/auth.module';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { User, UserSchema } from './users.schema';
import { UsersService } from './users.service';

@Module({
	imports: [
		forwardRef(() => AuthModule),
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
	],
	providers: [UsersService, UsersRepository],
	controllers: [UsersController],
	exports: [UsersService, UsersRepository]
})
export class UsersModule {}
