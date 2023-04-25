import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class BenficiariesDto {

    @IsNotEmpty()
    @IsString()
    bankName!: string;

    @IsNotEmpty()
    @IsString()
    accountName!: string;

    @IsNotEmpty()
    @IsString()
    accountNumber!: string;

    @IsNotEmpty()
    @IsString()
    user!: string 
  

}
