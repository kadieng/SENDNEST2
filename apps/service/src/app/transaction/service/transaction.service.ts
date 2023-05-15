import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { Fincra } from 'fincra-node-sdk';

@Injectable()
export class TransactionService {
  
  constructor(
    
  ) {
    
    const fincra = new Fincra(process.env.PUBLIC_KEY, process.env.PRIVATE_KEY, { sandbox: true });
    const business = fincra.business.getBusinessId();
    console.log(business)

   }
  
  create(createTransactionDto: CreateTransactionDto) {
    return 'This action adds a new transaction';
  }

  findAll() {
    return `This action returns all transaction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
