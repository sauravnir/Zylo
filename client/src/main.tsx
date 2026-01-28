import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { store } from './store/store.tsx'
import { Provider } from 'react-redux'

import { ProductProvider } from "./context/ProductContext";
import { PRODUCTS_LIST } from "./objects/Objects";

createRoot(document.getElementById('root')!).render(
  // Wrapping the app with Context Provider and Redux Provider
  <ProductProvider data={PRODUCTS_LIST}>
    <Provider store={store}>
    <App />
  </Provider>
  </ProductProvider>
)
