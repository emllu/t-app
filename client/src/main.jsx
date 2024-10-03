import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux';
import { store } from './redux/store'
import ThemeProvider from './components/ThemeProvider.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
<Provider store={store}>
  <ThemeProvider>
  <App />
  </ThemeProvider>
   
    </Provider>
  </StrictMode>,
)
