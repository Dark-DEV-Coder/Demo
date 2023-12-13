import "./Nav.scss";
import logotruong from './logo.png'
import CallIcon from '@mui/icons-material/Call';
import SchoolIcon from '@mui/icons-material/School';
const Nav = () => {
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light" id="mainNav">
                <div className="container-fluid">
                    <a className="navbar-brand js-scroll-trigger" target="#">
                        <img src={logotruong} />
                    </a>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active">
                                <CallIcon sx={{ fontSize: 32 }}></CallIcon>
                            </li>
                            <li className="nav-item2">
                                <span>(028) 38382 664</span>
                            </li>
                            <li className="nav-item1 nav-padding">
                                <SchoolIcon sx={{ fontSize: 32 }}></SchoolIcon>
                            </li>
                            <li className="nav-item2">
                                <span>Phòng D301, Số 273 An Dương Vương<br />Phường 3, Quận 5, TP. HCM</span>

                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}
export default Nav;