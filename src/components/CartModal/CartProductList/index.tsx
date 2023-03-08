import CartProductCard from './CartProductCard';
import { StyledCartProductList } from './style';
import { StyledButton } from '../../../styles/button';
import { StyledParagraph } from '../../../styles/typography';
import { useShopContext } from '../../../hooks/useShopContext';
import { useEffect, useState } from 'react';

const CartProductList = () => {
  const { cart, isOnCart } = useShopContext();
  const [counter, setCounter] = useState(1);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const total = () => {
      const init = 0;
      const sum = cart.reduce((acc, item) => acc + item.price, init);

      setCartTotal(sum);
    };

    total();

    localStorage.setItem('@CART', JSON.stringify(cart));
  }, [cart]);

  const count = () => {
    setCounter(counter + 1);
  };

  return (
    <StyledCartProductList>
      <ul>
        {cart.map((item) =>
          isOnCart(item, cart.indexOf(item)) ? null : (
            <CartProductCard
              key={crypto.randomUUID()}
              id={item.id}
              name={item.name}
              img={item.img}
            />
          )
        )}
      </ul>

      <div className='totalBox'>
        <StyledParagraph>
          <strong>Total</strong>
        </StyledParagraph>
        <StyledParagraph className='total'>
          R$ {cartTotal.toFixed(2)}
        </StyledParagraph>
      </div>
      <StyledButton $buttonSize='default' $buttonStyle='gray'>
        Remover todos
      </StyledButton>
    </StyledCartProductList>
  );
};

export default CartProductList;
