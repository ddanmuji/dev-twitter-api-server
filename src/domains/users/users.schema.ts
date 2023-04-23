import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Document, SchemaOptions } from 'mongoose';

export interface UserReadonlyData {
	id: string;
	email: string;
	nickname: string;
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

	@Prop()
	@IsString()
	avatarImgSrc: string;

	readonly readonlyData: UserReadonlyData;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('readonlyData').get(function (this: User): UserReadonlyData {
	return {
		id: this.id,
		email: this.email,
		nickname: this.nickname
	};
});
