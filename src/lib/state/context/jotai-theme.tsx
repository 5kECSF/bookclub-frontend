import { atom, useAtom } from "jotai/index";
import { ThemeType } from "@/lib/state/context/ThemeContext";
import useLocalStorage from "@/lib/state/hooks/useLocalStorage";
import { useEffect } from "react";

export const themeAtom = atom<ThemeType>(null);
themeAtom.debugLabel = "theme";

export const useTheme = () => {
  const [theme, setTheme] = useAtom(themeAtom);

  const [colorMode, setColorMode] = useLocalStorage<ThemeType>(
    "color-theme",
    "light",
  );

  useEffect(() => {
    const bodyClass = window.document.body.classList;
    if (colorMode) {
      setTheme(colorMode);
    }
    const className = "dark";
    colorMode === "dark"
      ? bodyClass.add(className)
      : bodyClass.remove(className);
  }, [colorMode, setTheme]);

  return {
    theme,
    setTheme,
    colorMode,
    setColorMode,
  };
};
