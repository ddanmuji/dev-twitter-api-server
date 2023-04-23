import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { ReadOnlyUserDto } from '../../domains/users/dto/users.dto';

export const CurrentUser = createParamDecorator(
	(data: unknown, ctx: ExecutionContext): ReadOnlyUserDto => {
		const request = ctx.switchToHttp().getRequest();
		return request.user.readonlyData as ReadOnlyUserDto;
	}
);
