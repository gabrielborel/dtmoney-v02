import { MagnifyingGlass } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import { SearchFormContainer } from './styles';

export const SearchForm = () => {
  const { register, handleSubmit } = useForm();

  return (
    <SearchFormContainer>
      <input
        {...register('query')}
        type='text'
        placeholder='Busque por transacoes'
      />

      <button type='submit'>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  );
};
