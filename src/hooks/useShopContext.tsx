import { useContext } from 'react';
import { ShopContext } from '../providers/ShopContext';

export const useShopContext = () => {
  const shopContext = useContext(ShopContext);

  if (!shopContext) {
    throw 'Erro contexto não encontrado';
  }

  return shopContext;
};
