import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';


export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    firstName!: string;

    @IsNotEmpty()
    @IsString()
    lastName!: string;

    @IsNotEmpty()
    @IsString()
    middleName!: string;

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
    @IsEmail()
    email!: string;
    
    @IsNotEmpty()
    @IsString()
    password!: string;

}

