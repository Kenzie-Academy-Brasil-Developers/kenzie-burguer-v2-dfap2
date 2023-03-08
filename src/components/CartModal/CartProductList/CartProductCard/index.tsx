import { MdDelete } from 'react-icons/md';
import { StyledCartProductCard } from './style';
import { StyledTitle } from '../../../../styles/typography';
import { useShopContext } from '../../../../hooks/useShopContext';

interface ICartProductCardProps {
  id: string;
  name: string;
  img: string;
}

const CartProductCard = ({ id, name, img }: ICartProductCardProps) => {
  const { removeCart } = useShopContext();

  return (
    <StyledCartProductCard id={id}>
      <div className='imageBox'>
        <img src={img} alt={name} />
      </div>
      <div className='contentBox'>
        <StyledTitle tag='h3' $fontSize='three'>
          {name}
        </StyledTitle>
        <button
          type='button'
          aria-label='Remover'
          onClick={() => {
            removeCart(id);
          }}
        >
          <MdDelete size={24} />
        </button>
      </div>
    </StyledCartProductCard>
  );
};

export default CartProductCard;
