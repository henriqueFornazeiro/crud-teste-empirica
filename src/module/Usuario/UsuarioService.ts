import httpService from "../../service/HttpService";
import ApiConfig from "../../service/ApiConfig";
import { IUserForm, IUsuario } from "./Usuario.type";

export const getUsuarios = async () =>{
    return await httpService.get<IUsuario[]>(ApiConfig.user)
}

export const createUsuario = async (data:IUserForm) =>{
   return await httpService.post<IUsuario>(ApiConfig.user, data)
}

export const updateUsuario = async (id: number, data:IUserForm) =>{
    const url = `${ApiConfig.user}/${id}`
    return await httpService.put(url, data)
 }

export const deleteUsuario = async (id: number) =>{
    const url = `${ApiConfig.user}/${id}`
    return await httpService.delete(url)
 }
