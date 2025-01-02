import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web
import authReducer from '../features/auth/authSlice';

const persistConfig = {
  key: 'root', // Key for the persisted state
  storage,     // Storage engine (localStorage)
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedReducer, // Use the persisted reducer
  },
});

export const persistor = persistStore(store);

export default store;

// import { configureStore } from '@reduxjs/toolkit';
// import authReducer from '../features/auth/authSlice';

// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//   },
// });

// export default store;
