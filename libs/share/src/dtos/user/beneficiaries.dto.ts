import { IsNotEmpty, IsString } from 'class-validator';
import { JoiSchema,CREATE, UPDATE } from 'nestjs-joi';
import * as Joi from 'joi';

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

    
    @JoiSchema(Joi.string().required())
    @JoiSchema([CREATE], Joi.string().required())
    @JoiSchema([UPDATE], Joi.string().optional())
    user!: string  

}
