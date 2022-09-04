import { MagnifyingGlass } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import { SearchFormContainer } from './styles';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const searchForSchema = z.object({
  query: z.string(),
});

type SearchFormInputs = z.infer<typeof searchForSchema>;

export const SearchForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchForSchema),
  });

  const handleSubmitSearch = async (data: SearchFormInputs) => {
    await new Promise((res) => setTimeout(res, 2000));

    console.log(data);
  };

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSubmitSearch)}>
      <input
        {...register('query')}
        type='text'
        placeholder='Busque por transacoes'
      />

      <button type='submit' disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  );
};
