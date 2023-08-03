import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import usuarioReducer from "../module/Usuario/UsuarioSlice"

export const store = configureStore({
  reducer: {
    user: usuarioReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
