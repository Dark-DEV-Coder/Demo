
import "./Quenmatkhau.scss"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
const Quenmatkhau = () => {

    const [masosv, SetMasosv] = useState("")
    const [email, SetEmail] = useState("")

    const onChangeInput = (event, SetState) => {
        let changeValue = event.target.value;
        SetState(changeValue);
    }


    // check dữ liệu
    const [checkmasosv, SetCheckmasosv] = useState(true)
    const [checkemail, SetCheckemail] = useState(true)
    const checkdulieu = (value, SetDuLieu) => {
        value === '' ? SetDuLieu(false) : SetDuLieu(true)
    }
    return (
        <div className="container-taikhoan">
            <ol className="breadcrumb" >
                <li className="breadcrumb-item"><a href="#">Trang chủ</a></li>
                <li className="breadcrumb-item">Tài khoản</li>
                <li className="breadcrumb-item active">Quên mật khẩu</li>
            </ol>
            <div className="container-tk">
                <h3>Quên mật khẩu</h3>
            </div>
            {/* <h3>Điền đầy đủ thông tin sau</h3> */}
            <div className="content-dkythuctap">
                <div className="container-form">
                    <form className="form-edit">
                        <div className="container-edit">
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label className="inputDK" htmlFor="inputTrinhdo">Mã số sinh viên</label>
                                    <input type="text" className="form-control" id="inputTrinhdo" value={masosv} placeholder="Điền mã số sinh viên của tài khoản ..." onChange={(event) => onChangeInput(event, SetMasosv)} onBlur={() => checkdulieu(masosv, SetCheckmasosv)} />
                                    <div className="invalid-feedback" style={{ display: checkmasosv ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                                </div>
                                <div className="form-group col-md-6">
                                    <label className="inputDK" htmlFor="inputTrinhdo">Email</label>
                                    <input type="text" className="form-control" id="inputTrinhdo" value={email} placeholder="Điền email của tài khoản ..." onChange={(event) => onChangeInput(event, SetEmail)} onBlur={() => checkdulieu(email, SetCheckemail)} />
                                    <div className="invalid-feedback" style={{ display: checkemail ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                                </div>
                            </div>

                            {/* <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label className="inputDK" htmlFor="inputTrinhdo">Mật khẩu mới</label>
                                    <input type="text" className="form-control" id="inputTrinhdo" value={matkhaumoi} placeholder="Điền mật khẩu mới ..." onChange={(event) => onChangeInput(event, SetMatkhaumoi)} onBlur={() => checkdulieu(matkhaumoi, SetCheckmatkhaumoi)} />
                                    <div className="invalid-feedback" style={{ display: checkmatkhaumoi ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu</div>
                                </div>
                                <div className="form-group col-md-6">
                                    <label className="inputDK" htmlFor="inputTrinhdo">Xác nhận mật khẩu mới</label>
                                    <input type="text" className="form-control" id="inputTrinhdo" value={xacnhanmk} placeholder="Điền lại mật khẩu mới ..." onChange={(event) => onChangeInput(event, SetXacnhanmk)} onBlur={() => checkdulieumatkhau(xacnhanmk, SetCheckxacnhanmatkhau, SetCheckxacnhanmatkhau2)} /> */}
                            {/* <div className="invalid-feedback" style={{ display: checkxacnhanmatkhau ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu</div> */}
                            {/* <div className="invalid-feedback" style={{ display: checkxacnhanmatkhau && checkxacnhanmatkhau2 ? 'none' : 'block' }}>Dữ liệu không khớp mật khẩu mới  </div>
                                </div>
                            </div> */}
                        </div>
                        <button type="button" className="btntk btn btn-secondary" >Gửi yêu cầu</button>
                    </form>
                </div>
            </div >
        </div >
    )
}
export default Quenmatkhau