import "./Nav3.scss"
import avt from "../da.png"

const Nav = (props) => {
    const { changleHidden, changleSwitchMode } = props;
    const TenGV = localStorage.getItem("TenGV")
    const HinhGV = localStorage.getItem("HinhGV")
    const onChangleHidden = () => {
        changleHidden();
    }
    const onChangleSwitchMode = () => {
        changleSwitchMode();
    }
    return (
        <nav className="nav3">
            <i className='bx bx-menu' onClick={() => onChangleHidden()} ></i>
            {/* <a href="#" className="nav-link">Danh mục</a> */}
            <form action="#">
                <div className="form-input">
                    <input type="search" placeholder="Search..." />
                    <button type="submit" className="search-btn"><i className='bx bx-search'></i></button>
                </div>
            </form>
            <input type="checkbox" id="switch-mode" hidden />
            {/* <label htmlFor="switch-mode" className="switch-mode" onClick={() => onChangleSwitchMode()}></label> */}
            <label className="name-gv">Xin chào, {TenGV}</label>
            <a href="#" className="profile">
                <img src={avt} />
            </a>
        </nav>

    )
}
export default Nav;