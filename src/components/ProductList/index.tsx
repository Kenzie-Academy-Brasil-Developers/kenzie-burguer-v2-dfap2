import { useShopContext } from '../../hooks/useShopContext';
import ProductCard from './ProductCard';
import { StyledProductList } from './style';

const ProductList = () => {
  const { products } = useShopContext();

  return (
    <StyledProductList>
      {products?.map((prod) => (
        <ProductCard
          key={crypto.randomUUID()}
          id={prod.id}
          name={prod.name}
          category={prod.category}
          price={prod.price}
          img={prod.img}
        />
      ))}
    </StyledProductList>
  );
};

export default ProductList;
