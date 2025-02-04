import React, { createContext, useState, useEffect, useContext } from 'react';
import { useLocalStorage } from '~/hooks/use-local-storage';

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
    const { setItem, getItem } = useLocalStorage("theme")

    useEffect(() => {
        const loadTheme = async () => {
            const savedTheme = await getItem();
            if (savedTheme) {
                setTheme(savedTheme as Theme);
            } else {
                await setItem("light");
            }
        };

        loadTheme();
    }, []);

    const toggleTheme = async () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        await setItem(newTheme);
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