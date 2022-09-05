import { createContext, ReactNode, useEffect, useState } from 'react';
import { api } from '../libs/axios';

interface ITransaction {
  id: number;
  description: string;
  type: 'income' | 'outcome';
  category: string;
  value: number;
  createdAt: string;
}

type CreateTransactionInput = Omit<ITransaction, 'id' | 'createdAt'>;

interface TransactionContextType {
  transactions: ITransaction[];
  fetchTransactions: (query?: string) => Promise<void>;
  createTransaction: (data: CreateTransactionInput) => Promise<void>;
}

export const TransactionsContext = createContext({} as TransactionContextType);

interface TransactionsProviderProps {
  children: ReactNode;
}

export const TransactionsProvider = ({
  children,
}: TransactionsProviderProps) => {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  const fetchTransactions = async (query?: string) => {
    const response = await api.get('/transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      },
    });

    setTransactions(response.data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const createTransaction = async (data: CreateTransactionInput) => {
    const response = await api.post('/transactions', {
      ...data,
      createdAt: new Date(),
    });

    setTransactions((state) => [...state, response.data]);
  };

  return (
    <TransactionsContext.Provider
      value={{ transactions, fetchTransactions, createTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};
