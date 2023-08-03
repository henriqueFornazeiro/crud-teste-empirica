import "./Modal.css";

interface IProps{
    title: string,
    children: JSX.Element,
    onClose: () => void
}

export const Modal = (props: IProps) => {

    const {title, children, onClose} = props;

    return (
        <div id="myModal" className="modal">

            <div className="modal-content">                
                <div className="modal__header">
                    <span className="close" onClick={onClose}>&times;</span>
                    <h2 className="modal__title">{title}</h2>
                </div>
                <div className="modal__body">
                    {children}
                </div>
            </div>

        </div>
    )
}