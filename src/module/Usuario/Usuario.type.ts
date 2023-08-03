export interface IUsuario {
  id: number;
  username: string;
  name:{
    firstname: string;
    lastname: string
  },  
  email: string;
}

export enum ApiStatus {
  "loading",
  "ideal",
  "success",
  "error",
}

export interface IUsuarioState {
  list: IUsuario[]
  listStatus: ApiStatus
  createStatus: ApiStatus,
  updateStatus: ApiStatus
}

export interface IUserForm{
  username: string,
  name: string,
  email: string
}

export interface IUpdateUsuario {
  id: number;
  data: IUserForm;
}


