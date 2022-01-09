import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: "GLT-StarrySky";
  src: url('./assets/fonts/GLT-StarrySky.otf');
}
@font-face {
  font-family: "KH-Dot-Kabutochou-16";
  src: url('./assets/fonts/KH-Dot-Kabutochou-16.ttf');
}
@font-face {
  font-family: "KH-Dot-Dougenzaka-12";
  src: url('./assets/fonts/KH-Dot-Dougenzaka-12.ttf');
}
@font-face {
  font-family: "BLENDERPRO";
  src: url('./assets/fonts/BLENDERPRO-HEAVY.OTF');
}

body,html{
    padding: 0;
    margin: 0;
}
`;

export default GlobalStyle;
