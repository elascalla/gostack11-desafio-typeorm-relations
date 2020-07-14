import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Customer from '../infra/typeorm/entities/Customer';
import ICustomersRepository from '../repositories/ICustomersRepository';

interface IRequest {
  name: string;
  email: string;
}

@injectable()
class CreateCustomerService {
  constructor(
    @inject('CustomerRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ name, email }: IRequest): Promise<Customer> {
    const findCustomerWithName = this.customersRepository.findByEmail(email);

    if (findCustomerWithName) {
      throw new AppError('Existing customer with the same email');
    }

    return this.customersRepository.create({ name, email });
  }
}

export default CreateCustomerService;
