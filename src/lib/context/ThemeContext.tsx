import React, {createContext, useState, useEffect, useContext} from "react";
import useLocalStorage from "@/lib/hooks/useLocalStorage";

export type ThemeType = "light" | "dark" | null | string
export type ThemeContextType = {
    currentTheme: ThemeType;
    setCurrentTheme: React.Dispatch<React.SetStateAction<ThemeType>>
}


export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme(): ThemeContextType {
    const themeContext = useContext(ThemeContext);
    if (!themeContext) {
        throw new Error("useTheme must be used within an ThemeProvider");
    }
    return themeContext;
}

export default function ThemeProvider({children}: { children: React.ReactNode }) {
    const [currentTheme, setCurrentTheme] = useState<ThemeType>("light");
    const [colorMode, setColorMode] = useLocalStorage("color-theme", "light");

    useEffect(() => {
        const currentThemeMode = localStorage.getItem("color-theme");

        if (currentThemeMode) {
            setCurrentTheme(currentThemeMode);
        }
    }, [colorMode]);
    return (
        <ThemeContext.Provider
            value={{
                currentTheme,
                setCurrentTheme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

