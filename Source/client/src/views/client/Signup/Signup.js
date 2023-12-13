
import "./Signup.scss"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
const Signup = () => {

    const [suadoi, SetSuadoi] = useState(true)
    const [holotsinhvien, SetHolotinhvien] = useState("")
    const [tensinhvien, SetTensinhvien] = useState("")
    const [mssvsinhvien, SetMssvsinhvien] = useState("")
    const [lopsinhvien, SetLopsinhvien] = useState("")
    const [nganhsinhvien, SetNganhsinhvien] = useState("")
    const [chuyennganhsinhvien, SetChuyennganhsinhvien] = useState("")
    const [emailsinhvien, SetEmailsinhvien] = useState("")
    const [sdtsinhvien, SetSdtsinhvien] = useState("")
    const [diachithuongtrusinhvien, SetDiachithuongtrusinhvien] = useState("")
    const [diachilienhesinhvien, SetDiachilienhesinhvien] = useState("")
    const [gioitinh, SetGioitinh] = useState('Nam')
    const [ngaysinh, SetNgaysinh] = useState("2000-01-01")
    const [khoa, SetKhoa] = useState("")

    const onClickSuaDoi = () => {
        SetSuadoi(!suadoi)
    }
    const onChangeInput = (event, SetState) => {
        let changeValue = event.target.value;
        SetState(changeValue);
    }

    const onChangeSelect = (event, SetSelect) => {
        let changeValue = event.target.value;
        SetSelect(changeValue);
    }


    // check dữ liệu
    const [checkmssvsinhvien, SetCheckmssvsinhvien] = useState(true)
    const [checkholotsinhvien, SetCheckholotsinhvien] = useState(true)
    const [checktensinhvien, SetChecktensinhvien] = useState(true)
    const [checkemailsinhvien, SetCheckemailsinhvien] = useState(true)
    const [checksdtsinhvien, SetChecksdtsinhvien] = useState(true)
    const [checknganhsinhvien, SetChecknganhsinhvien] = useState(true)
    const [checkchuyennganhsinhvien, SetCheckchuyennganhsinhvien] = useState(true)
    const [checklopsinhvien, SetChecklopsinhvien] = useState(true)
    const [checkdiachithuongtrusinhvien, SetCheckdiachithuongtrusinhvien] = useState(true)
    const [checkdiachilienhesinhvien, SetCheckdiachilienhesinhvien] = useState(true)
    const [checkdulieuKhoa, SetCheckdulieuKhoa] = useState(true)
    const [checkdtlsinhvien, SetCheckdtlsinhvien] = useState(true)
    const checkdulieu = (value, SetDuLieu) => {
        value === '' ? SetDuLieu(false) : SetDuLieu(true)
    }
    const checkdulieuSo = (value, SetDuLieu) => {
        value == 0 ? SetDuLieu(false) : SetDuLieu(true)
    }

    // const checkdulieuDetai = (SetDuLieu) => {
    //     detai === '' ? SetDuLieu(false) : SetDuLieu(true)
    //     console.log(checkdetai)
    // }

    return (
        <div className="container-taikhoan">
            <ol className="breadcrumb" >
                <li className="breadcrumb-item"><a href="#">Trang chủ</a></li>
                <li className="breadcrumb-item active">Đăng ký</li>
            </ol>
            <div className="container-tk">
                <h3>Đăng ký tài khoản</h3>
            </div>
            {/* <h3>Điền đầy đủ thông tin sau</h3> */}
            <div className="content-dkythuctap">
                <div className="container-form">
                    <form className="form-edit">
                        <div className="container-edit">
                            <div className="form-row">
                                <div className="form-group col-md-4">
                                    <label className="inputDK" htmlFor="inputTrinhdo">Họ lót</label>
                                    <input type="text" className="form-control" id="inputTrinhdo" value={holotsinhvien} placeholder="Điền họ lót ..." onChange={(event) => onChangeInput(event, SetHolotinhvien)} onBlur={() => checkdulieu(holotsinhvien, SetCheckholotsinhvien)} />
                                    <div className="invalid-feedback" style={{ display: checkholotsinhvien ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                                </div>
                                <div className="form-group col-md-4">
                                    <label className="inputDK" htmlFor="inputTrinhdo">Tên</label>
                                    <input type="text" className="form-control" id="inputTrinhdo" value={tensinhvien} placeholder="Điền tên ..." onChange={(event) => onChangeInput(event, SetTensinhvien)} onBlur={() => checkdulieu(tensinhvien, SetChecktensinhvien)} />
                                    <div className="invalid-feedback" style={{ display: checktensinhvien ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                                </div>
                                <div className="form-group col-md-4">
                                    <label className="inputDK" htmlFor="inputTrinhdo">Mã số sinh viên</label>
                                    <input type="text" className="form-control" id="inputTrinhdo" value={mssvsinhvien} placeholder="Điền mã số sinh viên ..." onChange={(event) => onChangeInput(event, SetMssvsinhvien)} onBlur={() => checkdulieu(mssvsinhvien, SetCheckmssvsinhvien)} />
                                    <div className="invalid-feedback" style={{ display: checkmssvsinhvien ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-4">
                                    <label className="inputSV" htmlFor="inputGioitinhGV">Giới tính</label>
                                    <select value={gioitinh} onChange={(event) => onChangeSelect(event, SetGioitinh)} id="inputGioitinhGV" className="form-control"  >
                                        <option value='Nam'>Nam</option>
                                        <option value='Nữ'>Nữ</option>
                                    </select>
                                </div>
                                <div className="form-group col-md-4">
                                    <label className="inputSV" htmlFor="inputNgaysinh">Ngày sinh</label>
                                    <input type="date" className="form-control" id="inputNgaysinh" value={ngaysinh} onChange={(event) => onChangeInput(event, SetNgaysinh)} />
                                </div>
                                <div className="form-group col-md-4">
                                    <label className="inputSV" htmlFor="inputKhoa">Khóa</label>
                                    <input type="text" className="form-control" id="inputKhoa" placeholder="Điền khóa ..." value={khoa} onChange={(event) => onChangeInput(event, SetKhoa)} onBlur={() => checkdulieu(khoa, SetCheckdulieuKhoa)} />
                                    <div className="invalid-feedback" style={{ display: checkdulieuKhoa ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-4">
                                    <label className="inputDK" htmlFor="inputTrinhdo">Lớp</label>
                                    <input type="text" className="form-control" id="inputTrinhdo" value={lopsinhvien} placeholder="Điền lớp ..." onChange={(event) => onChangeInput(event, SetLopsinhvien)} onBlur={() => checkdulieu(lopsinhvien, SetChecklopsinhvien)} />
                                    <div className="invalid-feedback" style={{ display: checklopsinhvien ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu</div>
                                </div>
                                <div className="form-group col-md-4">
                                    <label className="inputDK" htmlFor="inputTrinhdo">Chuyên ngành</label>
                                    <input type="text" className="form-control" id="inputTrinhdo" value={chuyennganhsinhvien} placeholder="Điền chuyên ngành ..." onChange={(event) => onChangeInput(event, SetChuyennganhsinhvien)} onBlur={() => checkdulieu(chuyennganhsinhvien, SetCheckchuyennganhsinhvien)} />
                                    <div className="invalid-feedback" style={{ display: checkchuyennganhsinhvien ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu</div>
                                </div>
                                <div className="form-group col-md-4">
                                    <label className="inputDK" htmlFor="inputTrinhdo">Ngành</label>
                                    <input type="text" className="form-control" id="inputTrinhdo" value={nganhsinhvien} placeholder="Điền ngành ..." onChange={(event) => onChangeInput(event, SetNganhsinhvien)} onBlur={() => checkdulieu(nganhsinhvien, SetChecknganhsinhvien)} />
                                    <div className="invalid-feedback" style={{ display: checknganhsinhvien ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu</div>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label className="inputDK" htmlFor="inputTrinhdo">Email</label>
                                    <input type="text" className="form-control" id="inputTrinhdo" value={emailsinhvien} placeholder="Điền email ..." onChange={(event) => onChangeInput(event, SetEmailsinhvien)} onBlur={() => checkdulieu(emailsinhvien, SetCheckemailsinhvien)} />
                                    <div className="invalid-feedback" style={{ display: checkemailsinhvien ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                                </div>
                                <div className="form-group col-md-6">
                                    <label className="inputDK" htmlFor="inputTrinhdo">Số điện thoại</label>
                                    <input type="text" className="form-control" id="inputTrinhdo" value={sdtsinhvien} placeholder="Điền số điện thoại ..." onChange={(event) => onChangeInput(event, SetSdtsinhvien)} onBlur={() => checkdulieu(sdtsinhvien, SetChecksdtsinhvien)} />
                                    <div className="invalid-feedback" style={{ display: checksdtsinhvien ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label className="inputDK" htmlFor="inputTrinhdo">Địa chỉ thường trú</label>
                                    <input type="text" className="form-control" id="inputTrinhdo" value={diachithuongtrusinhvien} placeholder="Điền địa chỉ thường trú ..." onChange={(event) => onChangeInput(event, SetDiachithuongtrusinhvien)} onBlur={() => checkdulieu(diachithuongtrusinhvien, SetCheckdiachithuongtrusinhvien)} />
                                    <div className="invalid-feedback" style={{ display: checkdiachithuongtrusinhvien ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                                </div>
                                <div className="form-group col-md-6">
                                    <label className="inputDK" htmlFor="inputTrinhdo">Địa chỉ liên hệ</label>
                                    <input type="text" className="form-control" id="inputTrinhdo" value={diachilienhesinhvien} placeholder="Điền địa chỉ liên hệ ..." onChange={(event) => onChangeInput(event, SetDiachilienhesinhvien)} onBlur={() => checkdulieu(diachilienhesinhvien, SetCheckdiachilienhesinhvien)} />
                                    <div className="invalid-feedback" style={{ display: checkdiachilienhesinhvien ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                                </div>
                            </div>
                        </div>
                        <button type="button" className="btntk btn btn-secondary">Đăng ký</button>
                    </form>
                </div>
            </div >
        </div >
    )
}
export default Signup