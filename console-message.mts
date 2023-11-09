import logSymbols from "log-symbols";
import { errorMessageTheme, infoMessageTheme } from "./color-theme.mjs";

export const getDecoratedErrorMessage = (base: string): string => {
  return `${logSymbols.error} ${errorMessageTheme(base)}`;
};

export const getDecoratedInfoMessage = (base: string): string => {
  return `${logSymbols.info} ${infoMessageTheme(base)}`;
};
