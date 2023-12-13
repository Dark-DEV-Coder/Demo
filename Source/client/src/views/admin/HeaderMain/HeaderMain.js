import { useState } from "react"
import "../Tongquan/Tongquan.scss"

import { Link } from "react-router-dom";
const HeaderMain = (props) => {
    const title = props

    return (
        <div className="head-title">
            <div className="left">
                <h1>Dashboard</h1>
                <ul className="breadcrumb">
                    <li>
                        <Link to="/home" >Dashboard</Link>
                        {/* <a href="#">Dashboard</a> */}
                    </li>
                    <li><i className='bx bx-chevron-right'></i></li>
                    <li>
                        <a className="active" href="#">{title.title}</a>
                    </li>
                </ul>
            </div>
            <a href="#" className="btn-download">
                <i className='bx bxs-cloud-download'></i>
                <span className="text">Create Data</span>
            </a>
        </div>
    )
}
export default HeaderMain;