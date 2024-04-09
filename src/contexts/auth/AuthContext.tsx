import React, { createContext, useEffect, useState, useContext, ReactNode } from 'react';
import { getUserData } from './functins';
import { AuthContextType } from './types';
import { initContextData } from './consts';

const AuthContext = createContext<AuthContextType>(initContextData);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  // Пользователь
  const [auth, setAuth] = useState(false); // true - авторизован
  const [userData, setUserData] = useState({}); // объект данных о юзере
  const [handleChangeUserData, setHandleChangeUserData] = useState(false); // слушатель изменений для обновления
  // Лоадеры
  const [statusAuthLoading, setStatusAuthLoading] = useState<'starting' | 'completed'>('starting'); 

  async function getAuth() {
    try {
      setStatusAuthLoading('starting');
      const userData = await getUserData(); // функционал авторизации не реализован на сервере- заглушка
      setUserData(userData.user);
      setAuth(true);
      setStatusAuthLoading('completed');
    }
    catch (err) {
      setAuth(false);
      setStatusAuthLoading('completed');
    }
  }

  useEffect(() => {
    getAuth();
  }, [handleChangeUserData]);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        handleChangeUserData,
        setHandleChangeUserData,
        userData,
        setUserData,
        statusAuthLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
