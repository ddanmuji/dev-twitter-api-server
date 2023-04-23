import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
	imports: [
		forwardRef(() => UsersModule),
		PassportModule.register({ defaultStrategy: 'jwt', session: false }),
		JwtModule.register({
			secret: process.env.JWT_SECRET,
			signOptions: {
				// expiresIn: '60s'
				expiresIn: '1y'
			}
		})
	],
	providers: [AuthService, JwtStrategy],
	exports: [AuthService]
})
export class AuthModule {}
