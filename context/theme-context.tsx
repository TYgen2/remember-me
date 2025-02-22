import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAsyncStorage } from '~/hooks/use-async-storage';

type Theme = "light" | "dark"

interface ThemeContextProviderProps {
    children: React.ReactNode;
}

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeContextProvider = ({ children }: ThemeContextProviderProps) => {
    const [theme, setTheme] = useState<Theme>("light");
    const { setAsyncValue, getAsyncValue } = useAsyncStorage("theme")

    useEffect(() => {
        const loadTheme = async () => {
            const savedTheme = await getAsyncValue();
            if (savedTheme) {
                setTheme(savedTheme as Theme);
            } else {
                await setAsyncValue("light");
            }
        };

        loadTheme();
    }, []);

    const toggleTheme = async () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        await setAsyncValue(newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useThemeContext must be used within a ThemeContextProvider");
    }
    return context;
};