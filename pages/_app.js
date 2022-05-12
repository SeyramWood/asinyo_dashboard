
import "primereact/resources/themes/lara-dark-blue/theme.css";  //theme
import "primereact/resources/themes/lara-light-blue/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons

import PrimeReact from 'primereact/api';
PrimeReact.ripple = true;
PrimeReact.inputStyle = 'filled';
PrimeReact.autoZIndex = true;
PrimeReact.zIndex = {
  modal: 1100,    // dialog, sidebar
  overlay: 1000,  // dropdown, overlaypanel
  menu: 1000,     // overlay menus
  tooltip: 1100,  // tooltip
  toast: 1200     // toast
}

import '../sass/app.scss';

function Asinyo({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default Asinyo
