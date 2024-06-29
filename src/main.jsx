import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import App from './App.jsx'
import store from './redux/store.js'


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter basename=''>
      <HelmetProvider>
        <App />
      </HelmetProvider>
      <Toaster />
    </BrowserRouter>
  </Provider>
)
