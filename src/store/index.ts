import {configureStore} from '@reduxjs/toolkit'
import authReducer from '@/store/authSlice'
import storageSession from 'redux-persist/lib/storage/session'
import persistReducer from 'redux-persist/es/persistReducer'
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist'
import persistStore from 'redux-persist/es/persistStore'


const persistConfig = {
    key: 'auth',
    storage:storageSession,
    whitelist: ['user', 'isAuthenticated']
}

const persistedAuthReducer = persistReducer(persistConfig, authReducer)

const store = configureStore({
    reducer:{
        auth: persistedAuthReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH, REHYDRATE,PAUSE, PERSIST, PURGE,REGISTER
                ]
            }
        })
})
export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export default store