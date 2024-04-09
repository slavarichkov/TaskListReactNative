import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import {
  saveSelectedThemeAsyncStore,
  getSelectedThemeAsyncStore,
} from '../../utils/asyncStoreFunctions';
import { ITheme } from './types';
import { initThemeContext } from './consts';

/**
 * Контекст для работы с темой.
 *
 */
const ThemeContext = createContext<ITheme>(initThemeContext);

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ITheme['theme']>('light');
  const [colorText, setColorText] = useState<ITheme['colorText']>({ color: '#ffffff' });
  const [backgroundColor, setBackgroundColor] = useState<ITheme['backgroundColor']>({ backgroundColor: '#c1c7cf' });

  /** Изменить тему  */
  async function changeTheme(theme: 'light' | 'dark') {
    if (theme === 'light' || theme === 'dark') {
      await saveSelectedThemeAsyncStore(theme);
      setTheme(theme);
      controlBackgrondColorTextColor(theme);
    }
  }

  function controlBackgrondColorTextColor(theme: ITheme['theme']) {
    setBackgroundColor({ backgroundColor: theme === 'light' ? '#c1c7cf' : 'grey' });
    setColorText({ color: theme === 'light' ? 'rgba(0,0,0,1)' : 'rgba(255,255,255,1)' });
  }

  async function getTheme() {
    const theme = await getSelectedThemeAsyncStore();
    controlBackgrondColorTextColor(theme);
    setTheme(theme);
  }

  useEffect(() => {
    getTheme();
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        colorText,
        backgroundColor,
        changeTheme,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
