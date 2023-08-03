import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import "./Usuario.css"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { RootState } from "../../app/store"
import { ApiStatus, IUsuario } from "./Usuario.type"
import { useEffect } from "react"
import { deleteUserAction, getUsersAction } from "./UsuarioSlice"
import { FaCheckCircle, FaPen, FaTrashAlt, FaUserPlus } from 'react-icons/fa';
import { Modal } from "../../components/Modal"
import { deleteUsuario } from "./UsuarioService";

const ListaUsuarios = () => {

    const navigator = useNavigate();
    const [viewModal, setViewModal] = useState<IUsuario | null>(null);
    const [status, setStatus] = useState(false);

    const handleShowAlert = () => {
        setStatus(true)

        setTimeout(() => {
            setStatus(false)
        }, 2000)
    }

    const { list, listStatus } = useAppSelector((state: RootState) => state.user)
    const dispatch = useAppDispatch();


    const deleteUsuarioClick = (id:number) =>{
        dispatch(deleteUserAction(id));
        setViewModal(null)
        handleShowAlert()
    }

    useEffect(() => {
        dispatch(getUsersAction())
    }, [])

    return (
        <>
            <div className="section-app__header">
                <h2 className="section-app__titulo">Usuários</h2>
                <Link to={`/create`} className="add--btn">Novo usuário <FaUserPlus /></Link>
            </div>
            {status && <p className="alert alert--success"><FaCheckCircle /> Usuário removido com sucesso!</p>}
            <div className="table-scroll">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Nome</th>
                            <th>E-mail</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listStatus === ApiStatus.loading && <span>Carregando lista...</span>}
                        {listStatus === ApiStatus.error && <span>Erro ao carregar lista, tente novamente.</span>}
                        {
                            listStatus === ApiStatus.ideal && list.map((usuario: IUsuario, index: number) => {
                                return (
                                    <tr>
                                        <td>{usuario.id}</td>
                                        <td>{usuario.username}</td>
                                        <td>{usuario.name.firstname} {usuario.name.lastname}</td>
                                        <td>{usuario.email}</td>
                                        <td className="actions">
                                            <a className="input--btn input--btn--edit" onClick={()=>{
                                                navigator(`/edit/${usuario.id}`)
                                            }}>Editar <FaPen /></a>
                                            <a className="input--btn input--btn--remove" onClick={() => { setViewModal(usuario) }}>Excluir <FaTrashAlt /> </a>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>


                </table>
            </div>
            {
                viewModal && <Modal title="Remover usuário" onClose={() => { setViewModal(null) }}>

                    <div>
                        <p>Deseja remover o usuário <span className="user-bold">{viewModal.id} - {viewModal.name.firstname} {viewModal.name.lastname}?</span></p>
                        <div className="btn-container">
                            <button className="btn btn--cancelar" onClick={() => { setViewModal(null) }}>Cancelar</button>
                            <button className="btn btn--confirmar" onClick={() => { deleteUsuarioClick(viewModal.id)  }}>Confirmar</button>
                        </div>
                    </div>
                </Modal>
            }

        </>
    )
}

export default ListaUsuarios