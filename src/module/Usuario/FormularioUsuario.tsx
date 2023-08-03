import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import "./Usuario.css"
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { createUserAction, updateUserAction } from "./UsuarioSlice";
import { ApiStatus, IUpdateUsuario, IUserForm } from "./Usuario.type";
import { RootState } from "../../app/store";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";

interface IProps {
    isEditPage? : boolean     
}

const FormularioCadastro = (props:IProps) => {

    const {isEditPage} = props;
    const [username, setUsername] = useState("");
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState(false);
    const [erro, setErro] = useState(false);

    const { createStatus, updateStatus } = useAppSelector((state: RootState) => state.user)
    const dispatch = useAppDispatch();

    const params = useParams()
    const usuarioId = useRef(parseInt(params.id || ""));

    const {list} = useAppSelector((state: RootState)=>state.user);
    
    const handleShowAlert = () => {
        setStatus(true)

        setTimeout(() => {
            setStatus(false)
        }, 2000)
    }
    
    const onSubmitForm = (e: React.FormEvent) => {
        e.preventDefault();
        if (nome === "" || email === "" || username === "") {
            setErro(true);
            return
        }
        
        setErro(false);
        const data: IUserForm = { username, name: nome, email }

        if(isEditPage){
            const updateData : IUpdateUsuario = {id:usuarioId.current, data}
            dispatch(updateUserAction(updateData))
            handleShowAlert()
        }else{            
            dispatch(createUserAction(data))
        }
        
    }

    useEffect(() => {
        if (createStatus === ApiStatus.success) {
            setUsername("");
            setNome("");
            setEmail("");
            handleShowAlert();
        }
        
    }, [createStatus]);
    
    useEffect(() => {
        if(isEditPage && usuarioId.current){
            const infoUsuario = list.filter(user => user.id === usuarioId.current);

            if(infoUsuario.length){
                setUsername(infoUsuario[0].username);
                setNome(infoUsuario[0].name.firstname +" "+ infoUsuario[0].name.lastname);
                setEmail(infoUsuario[0].email);
            }
        }else{
            setUsername("");
            setNome("");
            setEmail("");
        }
    }, [isEditPage])

    return (
        <>

            <h2 className="section-app__header">{isEditPage? "Editar" : "Cadastro"}</h2>
            {erro && <p className="alert alert--danger"><FaTimesCircle/> Todos os campos precisam ser preenchidos. Tente novamente.</p>}
            {status && <p className="alert alert--success"><FaCheckCircle/>{isEditPage ? " Usuário editado com sucesso!" : " Usuário criado com sucesso!"} </p>}
            <div className="form-container">
                <form className="form" onSubmit={onSubmitForm}>
                    <div className="form__input-group">
                        <label className="form__label" htmlFor="username">Username:</label>
                        <input
                            type="text"
                            value={username}
                            id="username"
                            className="form__input"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => { setUsername(e.target.value) }} />
                    </div>
                    <div className="form__input-group">
                        <label className="form__label" htmlFor="nome">Nome:</label>
                        <input
                            type="text"
                            value={nome}
                            id="nome"
                            className="form__input"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => { setNome(e.target.value) }} />
                    </div>
                    <div className="form__input-group">
                        <label className="form__label" htmlFor="email">E-mail:</label>
                        <input
                            type="email"
                            value={email}
                            id="email"
                            className="form__input"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => { setEmail(e.target.value) }} />
                    </div>
                    <div className="form__input-group form-group--btn">
                        <a href="/" className="form__input--btns form__input__voltar">Voltar</a>
                        <input type="submit" value="Salvar" className="form__input--btns form__input__submit" disabled={createStatus === ApiStatus.loading || updateStatus === ApiStatus.loading} />
                    </div>
                </form>
            </div>
        </>

    )
}

export default FormularioCadastro