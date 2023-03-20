import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';


export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    firstName!: string;

    @IsNotEmpty()
    @IsString()
    lastName!: string;

    @IsOptional()
    role?: string;

    @IsNotEmpty()
    @IsString()
    phone!: string;

    @IsOptional()
    @IsString()
    avatar?: string;
   
    @IsNotEmpty()
    @IsEmail()
    email!: string;
    
    @IsNotEmpty()
    @IsString()
    password!: string;

}

