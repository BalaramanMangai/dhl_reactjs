import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web
import authReducer from '../features/auth/authSlice';
import salesReducer from '../features/auth/saleSlice';
const persistConfig = {
  key: 'root',
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedSalesReducer = persistReducer(persistConfig, salesReducer);


const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,  // Persisted auth reducer
    sales: persistedSalesReducer, // Persisted sales reducer (add this line)
  },
});

export const persistor = persistStore(store);

export default store;

