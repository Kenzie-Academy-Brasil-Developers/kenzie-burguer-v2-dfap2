import { StyledProductCard } from './style';
import { StyledButton } from '../../../styles/button';
import { StyledParagraph, StyledTitle } from '../../../styles/typography';
import { useShopContext } from '../../../hooks/useShopContext';

interface IProducrCardProps {
  id: string;
  name: string;
  category: string;
  price: number;
  img: string;
}

const ProductCard = ({ id, name, category, price, img }: IProducrCardProps) => {
  const { cart, setCart } = useShopContext();

  return (
    <StyledProductCard id={id}>
      <div className='imageBox'>
        <img src={img} alt={name} />
      </div>
      <div className='content'>
        <StyledTitle tag='h3' $fontSize='three'>
          {name}
        </StyledTitle>
        <StyledParagraph className='category'>{category}</StyledParagraph>
        <StyledParagraph className='price'>{price}</StyledParagraph>
        <StyledButton
          $buttonSize='medium'
          $buttonStyle='green'
          onClick={() =>
            setCart([
              ...cart,
              {
                id: id,
                name: name,
                category: category,
                price: price,
                img: img,
              },
            ])
          }
        >
          Adicionar
        </StyledButton>
      </div>
    </StyledProductCard>
  );
};

export default ProductCard;
