// in src/MyAppBar.js
import { AppBar, ToggleThemeButton } from "react-admin";
import myTheme from "./Theme";

export const MyAppBar = () => (
  <AppBar toolbar={<ToggleThemeButton />} sx={{ background: "#C8D3D5" }} />
);
