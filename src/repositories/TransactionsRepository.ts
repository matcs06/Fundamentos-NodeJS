import Transaction from '../models/Transaction';

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: {
    transactions: Transaction[];
    balance: { income: number; outcome: number; total: number };
  };

  constructor() {
    this.transactions = {
      transactions: [],
      balance: { income: 0, outcome: 0, total: 0 },
    };
  }

  public all(): { transactions: Transaction[] } {
    // TODO
    return this.transactions;
  }

  public getBalance(type: string): Balance {
    let inc = 0;
    let out = 0;
    if (type === 'income') {
      inc = this.transactions.transactions.reduce(
        (total, item) => (item.type === 'income' ? total + item.value : 0),
        0,
      );
      this.transactions.balance.income = inc;
    } else {
      out = this.transactions.transactions.reduce(
        (total, item) => (item.type === 'outcome' ? total + item.value : 0),
        0,
      );
      this.transactions.balance.outcome = out;
    }
    if (type === 'income' || type === 'outcome')
      this.transactions.balance.total =
        this.transactions.balance.income - this.transactions.balance.outcome;

    return this.transactions.balance;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    // TODO
    const transaction = new Transaction({ title, value, type });

    this.transactions.transactions.push(transaction);
    this.getBalance(type);
    return transaction;
  }
}

export default TransactionsRepository;
