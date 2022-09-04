import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles';
import logoSVG from '../../assets/logo.svg';

export const Header = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoSVG} alt='' />

        <NewTransactionButton>Nova transação</NewTransactionButton>
      </HeaderContent>
    </HeaderContainer>
  );
};
