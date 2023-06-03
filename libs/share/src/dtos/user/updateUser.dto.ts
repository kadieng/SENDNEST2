import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
// import { JoiSchema,UPDATE } from 'nestjs-joi';
// import * as Joi from 'joi';

export class UpdateUserDto {

    @IsString()
    @IsOptional()   
    username?: string;

    @IsString()
    @IsOptional()    
    phone?: string;

    @IsString()
    @IsOptional()   
    firstName?: string;

    @IsString()
    @IsOptional()    
    lastName?: string;

    @IsString()
    @IsOptional()   
    middleName?: string;

    @IsString()
    @IsOptional()   
    country?: string;

    @IsString()
    @IsOptional()   
    state?: string;

    @IsOptional()
    @IsString()    
    address?: string;
}