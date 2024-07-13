import useLocalStorage from "@/lib/hooks/useLocalStorage";
import React, { createContext, useContext, useEffect, useState } from "react";

export type ThemeType = "light" | "dark" | null | string
export type ThemeContextType = {
    currentTheme: ThemeType;
    setCurrentTheme: React.Dispatch<React.SetStateAction<ThemeType>>
    setColorMode: React.Dispatch<React.SetStateAction<ThemeType>>
    colorMode: ThemeType
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
    const [colorMode, setColorMode] = useLocalStorage<ThemeType>("color-theme", "light");

    useEffect(() => {
        const currentThemeMode = localStorage.getItem("color-theme");
        const bodyClass = window.document.body.classList;
        if (currentThemeMode) {
            setCurrentTheme(currentThemeMode);
        }
        const className = "dark";
        colorMode === "dark"
      ? bodyClass.add(className)
      : bodyClass.remove(className);
    }, [colorMode]);
    return (
        <ThemeContext.Provider
            value={{
                currentTheme,
                colorMode,
                setCurrentTheme,
                setColorMode
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

