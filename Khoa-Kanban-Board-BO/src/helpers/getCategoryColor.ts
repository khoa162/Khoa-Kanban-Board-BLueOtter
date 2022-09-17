import { DefaultTheme } from "styled-components";
import ICategory from "../interfaces/ICategory";

const getCategoryColor = (theme: DefaultTheme, value: ICategory): string => {
  switch (value) {
    case ICategory.ANDROID:
      return theme.colors.ANDROID;

    case ICategory.iOS:
      return theme.colors.iOS;

    case ICategory.WINDOWS:
      return theme.colors.WINDOWS;

    case ICategory.DESKTOP:
      return theme.colors.DESKTOP;

    case ICategory.WEB:
      return theme.colors.WEB;

    default:
      return theme.colors.primary;
  }
}

export default getCategoryColor;