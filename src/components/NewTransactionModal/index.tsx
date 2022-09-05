import * as Dialog from '@radix-ui/react-dialog';
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react';
import {
  CloseButton,
  Content,
  Overlay,
  TransactionType,
  TransactionTypeButton,
} from './styles';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useContextSelector } from 'use-context-selector';
import { TransactionsContext } from '../../contexts/TransactionsContext';

const newTransactionFormSchema = z.object({
  description: z.string(),
  value: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
});

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>;

export const NewTransactionModal = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
  });

  const createTransaction = useContextSelector(
    TransactionsContext,
    (context) => context.createTransaction
  );

  const handleCreateNewTransaction = async (
    newTransactionData: NewTransactionFormInputs
  ) => {
    await createTransaction(newTransactionData);

    reset();
  };

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Nova transação</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            type='text'
            {...register('description')}
            placeholder='Descricao'
            required
          />
          <input
            type='number'
            {...register('value', { valueAsNumber: true })}
            placeholder='Preco'
            required
          />
          <input
            type='text'
            {...register('category')}
            placeholder='Categoria'
            required
          />

          <Controller
            control={control}
            name='type'
            render={({ field }) => (
              <TransactionType
                onValueChange={field.onChange}
                value={field.value}
              >
                <TransactionTypeButton variant='income' value='income'>
                  <ArrowCircleUp size={24} />
                  Entrada
                </TransactionTypeButton>

                <TransactionTypeButton variant='outcome' value='outcome'>
                  <ArrowCircleDown size={24} />
                  Saida
                </TransactionTypeButton>
              </TransactionType>
            )}
          />

          <button type='submit' disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  );
};
