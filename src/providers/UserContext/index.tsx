import { createContext, useEffect, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { IRegisterFormData } from '../../components/Form/RegisterForm';
import api from '../../services/api';

export interface iUser {
  email: string;
  name: string;
  id: number;
}

interface iLoginRes {
  accessToken: string;
  user: iUser;
}

interface IRegisteRes {
  email: string;
  password: string;
  name: string;
  id: string;
}

export interface iLoginFormData {
  email: string;
  password: string;
}

interface IUserContext {
  user: iUser[];
  onSubmitLogin: (data: iLoginFormData) => void;
  onSubmitRegister: (data: IRegisterFormData) => void;
}

interface IUserProviderProps {
  children: ReactNode;
}

export const UserContext = createContext<IUserContext | null>(null);

export const UserProvider = ({ children }: IUserProviderProps) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<iUser[]>([]);
  const token = localStorage.getItem('@TOKEN');

  useEffect(() => {
    if (token) {
      const autologin = async () => {
        try {
          const res = await api.get(`users/${token}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          navigate('/shop');
        } catch (error) {
          localStorage.clear();
          navigate('/');
        }
      };
    } else {
      localStorage.clear();
      navigate('/');
    }
  }, []);

  const onSubmitLogin = async (data: iLoginFormData) => {
    try {
      const res = await api.post<iLoginRes>('/login', data);

      localStorage.setItem('@TOKEN', res.data.accessToken);
      localStorage.setItem('@USERID', JSON.stringify(res.data.user.id));

      setUser([res.data.user]);
      navigate('/shop');
    } catch (error) {}
  };

  const onSubmitRegister = async (data: IRegisterFormData) => {
    try {
      const res = await api.post<IRegisteRes>('/users', data);

      navigate('/');
    } catch (error) {}
  };

  return (
    <UserContext.Provider value={{ user, onSubmitLogin, onSubmitRegister }}>
      {children}
    </UserContext.Provider>
  );
};
