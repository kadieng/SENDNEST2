import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
// import { JoiSchema,CREATE, UPDATE } from 'nestjs-joi';
// import * as Joi from 'joi';

export class CreateUserDto {

    @IsNotEmpty()        
    @IsString()    
    firstName!: string;

    @IsNotEmpty()
    @IsString() 
    lastName!: string;

    @IsString()
    @IsOptional()
    otp?: string;

    @IsOptional()
    @IsString()
    middleName?: string;

    @IsNotEmpty()
    @IsString()   
    country!: string;

    @IsNotEmpty()
    @IsString()   
    state!: string;

    @IsNotEmpty()
    @IsString()    
    address!: string;

    @IsOptional()
    role?: string;

    @IsOptional()
    postalCode?: string;

    @IsNotEmpty()
    @IsString()
    
    phone!: string;

    @IsOptional()
    @IsString()
    avatar?: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()    
    email!: string;

    @IsNotEmpty()
    @IsString()     
    password!: string;

    @IsNotEmpty()
    @IsString()     
    username!: string;

}

