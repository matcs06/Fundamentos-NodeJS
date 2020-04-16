import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: TransactionDTO): Transaction {
    // TODO
    if (type === 'outcome') {
      const balance = this.transactionsRepository.getBalance(type);
      if (balance.total < value) {
        throw Error('You can not outcome a value greater than your total');
      }
    }

    const appointment = this.transactionsRepository.create({
      title,
      value,
      type,
    });
    return appointment;
  }
}

export default CreateTransactionService;
