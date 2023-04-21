import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { SchemaOptions } from 'mongoose';

const options: SchemaOptions = {
	timestamps: true
};

@Schema(options)
export class User extends Document {
	@Prop({ required: true, unique: true })
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@Prop({ required: true })
	@IsString()
	@IsNotEmpty()
	nickname: string;

	@Prop({ required: true })
	@IsString()
	@IsNotEmpty()
	password: string;

	@Prop()
	@IsString()
	avatarImgSrc: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
