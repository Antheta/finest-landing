import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode, useLayoutEffect } from 'react';
import * as ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';

// ** Redux
import { Provider } from 'react-redux'
import { store } from './redux/store'

import { BrowserRouter, useLocation }  from 'react-router-dom';
import Router from './router/Router';
import Navbar from './components/Navbar/index';
import Footer from './components/Footer';

import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

const SmoothScrollTop = ({children}) => {
  const location = useLocation();
  useLayoutEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, [location.pathname]);
  return children
}

root.render(
  <StrictMode>
    <ChakraProvider theme={theme} store={store}>
      <Provider store={store}>
          <BrowserRouter>  
            <SmoothScrollTop>
              <ColorModeScript />
              <Navbar />
              <Router />
              <Footer />
            </SmoothScrollTop>
          </BrowserRouter>
      </Provider>
    </ChakraProvider>
  </StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
