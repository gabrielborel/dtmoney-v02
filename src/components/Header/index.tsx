import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles';
import logoSVG from '../../assets/logo.svg';
import * as Dialog from '@radix-ui/react-dialog';
import { NewTransactionModal } from '../NewTransactionModal';

export const Header = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoSVG} alt='' />

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewTransactionButton>Nova transação</NewTransactionButton>
          </Dialog.Trigger>

          <NewTransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  );
};
