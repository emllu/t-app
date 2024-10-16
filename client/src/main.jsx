import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux';
import { store,persistor } from './redux/store'
import ThemeProvider from './components/ThemeProvider.jsx';
import {PersistGate} from 'redux-persist/integration/react'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PersistGate persistor={persistor}>
<Provider store={store}>
  <ThemeProvider>
  <App />
  </ThemeProvider>
   
    </Provider>
    </PersistGate>
  </StrictMode>
  
)
