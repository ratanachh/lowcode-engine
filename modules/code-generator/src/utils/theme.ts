/**
 * Get theme info
 * @param theme theme shaped like @alife/theme-97 or @alife/theme-97@^1.0.0
 */

export interface ThemeInfo {
  name: string;
  version?: string;
}

export function getThemeInfo(theme: string): ThemeInfo {
  const sepIdx = theme.indexOf('@', 1);
  if (sepIdx === -1) {
    return { name: theme };
  }
  return {
    name: theme.slice(0, sepIdx),
    version: theme.slice(sepIdx + 1),
  };
}