import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string,

    colors: {
      primary: string,
      iOS: string,
      ANDROID: string,
      WEB: string,
      WINDOWS: string,
      DESKTOP: string,
      text_primary: string,
      text_secondary: string,
      text_tertiary: string,
      placeholder: string,
      background: string,
      components_background: string,
      border: string,
      switch: string,
      scrollbar_background: string,
      scrollbar_thumb: string,
      scrollbar_thumb_hover: string,
    }
  }
}