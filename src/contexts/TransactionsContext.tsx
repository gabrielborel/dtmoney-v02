import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface ITransaction {
  id: number;
  description: string;
  type: 'income' | 'outcome';
  category: string;
  value: number;
  createdAt: string;
}

interface TransactionContextType {
  transactions: ITransaction[];
}

export const TransactionsContext = createContext({} as TransactionContextType);

interface TransactionsProviderProps {
  children: ReactNode;
}

export const TransactionsProvider = ({ children }: TransactionsProviderProps) => {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  const loadTransactions = async () => {
    const response = await fetch('http://localhost:3000/transactions');
    const transactionsData = await response.json();
    setTransactions(transactionsData);
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  return (
    <TransactionsContext.Provider value={{ transactions }}>{children}</TransactionsContext.Provider>
  );
};
