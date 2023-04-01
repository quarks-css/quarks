import { createContext, useContext } from 'react';

const theme = {};

const ThemeContext = createContext(theme);
const useTheme = () => useContext(ThemeContext);

export default useTheme;
