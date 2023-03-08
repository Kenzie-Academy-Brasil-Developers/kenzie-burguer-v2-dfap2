import { useContext } from 'react';
import { UserContext } from '../providers/UserContext';

export const useUserContext = () => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw 'Erro contexto não encontrado';
  }

  return userContext;
};
