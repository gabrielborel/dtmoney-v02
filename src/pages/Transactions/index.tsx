import { Header } from '../../components/Header';
import { Summary } from '../../components/Summary';
import { useTransactions } from '../../contexts/TransactionsContext';
import { SearchForm } from './components/SearchForm';
import { PriceHighlight, TransactionsContainer, TransactionsTable } from './styles';

export const Transactions = () => {
  const { transactions } = useTransactions();

  return (
    <div>
      <Header />

      <Summary />

      <TransactionsContainer>
        <SearchForm />

        <TransactionsTable>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.description}</td>
                <td>
                  <PriceHighlight variant={transaction.type}>{transaction.value}</PriceHighlight>
                </td>
                <td>{transaction.category}</td>
                <td>{transaction.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  );
};
