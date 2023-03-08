import { MdShoppingCart, MdLogout } from 'react-icons/md';

import SearchForm from './SearchForm';
import { StyledHeader } from './style';
import LogoKenzieBurguer from '../../assets/LogoKenzieBurguer.svg';
import { StyledContainer } from '../../styles/grid';
import { useShopContext } from '../../hooks/useShopContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { setModalOpen } = useShopContext();
  const navigate = useNavigate();

  return (
    <StyledHeader>
      <StyledContainer containerWidth={1300}>
        <div className='flexGrid'>
          <img
            src={LogoKenzieBurguer}
            alt='Kenzie Burguer Logo'
            className='logo'
          />
          <nav className='nav' role='navigation'>
            <SearchForm />
            <div className='buttons'>
              <button
                type='button'
                onClick={() => {
                  setModalOpen(true);
                }}
              >
                <MdShoppingCart size={28} />
              </button>
              <button
                type='button'
                onClick={() => {
                  localStorage.clear();
                  navigate('/');
                }}
              >
                <MdLogout size={28} />
              </button>
            </div>
          </nav>
        </div>
      </StyledContainer>
    </StyledHeader>
  );
};

export default Header;
