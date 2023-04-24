import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Document, SchemaOptions } from 'mongoose';

export interface UserReadOnlyData {
	id: string;
	email: string;
	nickname: string;
	avatarImgUrl: string;
}

const options: SchemaOptions = {
	timestamps: true
};

@Schema(options)
export class User extends Document {
	@ApiProperty({ example: 'wry5533@gmail.com', description: 'email', required: true })
	@Prop({ required: true, unique: true })
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@ApiProperty({ example: 'chan9yu', description: 'nickname', required: true })
	@Prop({ required: true })
	@IsString()
	@IsNotEmpty()
	nickname: string;

	@ApiProperty({ example: '1q2w3e4r!', description: 'password', required: true })
	@Prop({ required: true })
	@IsString()
	@IsNotEmpty()
	password: string;

	@Prop({ default: 'https://avatars.githubusercontent.com/u/80776262?v=4' })
	@IsString()
	avatarImgUrl: string;

	readonly readOnlyData: UserReadOnlyData;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('readOnlyData').get(function (this: User): UserReadOnlyData {
	return {
		id: this.id,
		email: this.email,
		nickname: this.nickname,
		avatarImgUrl: this.avatarImgUrl
	};
});
