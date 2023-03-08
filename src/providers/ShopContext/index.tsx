import { createContext, useEffect, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../hooks/useUserContext';
import api from '../../services/api';

export interface IProductsRes {
  id: string;
  name: string;
  category: string;
  price: number;
  img: string;
}

interface IProductState {}

interface IShopContext {
  products: IProductsRes[];
  modalOpen: boolean;
  setModalOpen: any;
  cart: IProductsRes[];
  setCart: any;
  removeCart: (id: string) => void;
  isOnCart: (item: any, from: number) => boolean;
}

interface IShopProviderProps {
  children: ReactNode;
}

export const ShopContext = createContext<IShopContext | null>(null);

export const ShopProvider = ({ children }: IShopProviderProps) => {
  const token = localStorage.getItem('@TOKEN');
  const [products, setProducts] = useState<IProductsRes[]>([]);
  const [cart, setCart] = useState<IProductsRes[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const oldCart = localStorage.getItem('@CART');

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await api.get<IProductsRes>('/products', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProducts(res.data);
      } catch (error) {}
    };

    getProducts();

    if (oldCart) {
      setCart(JSON.parse(oldCart));
    }
  }, [token]);

  const removeCart = (id: string) => {
    const newCart = cart.filter((prod) => prod.id != id);

    setCart(newCart);
  };

  const isOnCart = (item: any, from: number) => {
    const bool = cart.includes(item.id, from);
    return bool;
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        modalOpen,
        setModalOpen,
        cart,
        setCart,
        removeCart,
        isOnCart,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
