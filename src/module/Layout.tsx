import { Link, Outlet } from "react-router-dom"
import "./Layout.css"

const Layout = () => {
    return (
        <>
            <div className="wrapper-container-header">
                <header className="container header-app">
                    <img src="https://empirica.com.br/wp-content/uploads/2021/07/empirica-logo.png"></img>
                    <nav className="nav-component">
                        <ul>
                            <li className="nav-component__item">
                                <Link to={`/`}>Home</Link>
                            </li>
                            <li className="nav-component__item">
                                <Link to={`/create`}>Cadastro</Link>
                            </li>
                        </ul>
                    </nav>
                </header>
            </div>
            <div className="wrapper-container-section">
                <section className="container section-app">
                    <Outlet/>
                </section>
            </div>

        </>
    )
}

export default Layout