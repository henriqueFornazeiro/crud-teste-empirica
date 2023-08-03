import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiStatus, IUpdateUsuario, IUserForm, IUsuarioState } from "./Usuario.type";
import {
  getUsuarios,
  createUsuario,
  deleteUsuario,
  updateUsuario,
} from "./UsuarioService";

const initialState: IUsuarioState = {
  list: [],
  listStatus: ApiStatus.ideal,
  createStatus: ApiStatus.ideal,
  updateStatus: ApiStatus.ideal,
};

export const getUsersAction = createAsyncThunk(
  "user/getUsersAction",
  async () => {
    const response = await getUsuarios();
    return response.data;
  }
);

export const createUserAction = createAsyncThunk(
  "user/createUserAction",
  async (data: IUserForm) => {
    const response = await createUsuario(data);
    return response.data;
  }
);

export const updateUserAction = createAsyncThunk(
  "user/updateUserAction",
  async ({ id, data }: IUpdateUsuario) => {
    const response = await updateUsuario(id, data);
    return response.data;
  }
);

export const deleteUserAction = createAsyncThunk(
  "user/deleteUserAction",
  async (id: number) => {
    await deleteUsuario(id);
    return id;
  }
);

const usuarioSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsersAction.pending, (state) => {
      state.listStatus = ApiStatus.loading;
    });
    builder.addCase(getUsersAction.fulfilled, (state, action) => {
      state.listStatus = ApiStatus.ideal;
      state.list = action.payload;
    });
    builder.addCase(getUsersAction.rejected, (state) => {
      state.listStatus = ApiStatus.error;
    });

    builder.addCase(createUserAction.pending, (state) => {
      state.createStatus = ApiStatus.loading;
    });
    builder.addCase(createUserAction.fulfilled, (state) => {
      state.createStatus = ApiStatus.success;
    });
    builder.addCase(createUserAction.rejected, (state) => {
      state.createStatus = ApiStatus.error;
    });    
    builder.addCase(updateUserAction.pending, (state) => {
      state.updateStatus = ApiStatus.loading;
    });
    builder.addCase(updateUserAction.fulfilled, (state) => {
      state.updateStatus = ApiStatus.ideal;
    });
    builder.addCase(updateUserAction.rejected, (state) => {
      state.updateStatus = ApiStatus.error;
    });
    builder.addCase(deleteUserAction.rejected, (state, action) => {
      const newList = state.list.filter((i) => i.id !== action.payload);
      state.list = newList;
    });


  },
});

export default usuarioSlice.reducer;
