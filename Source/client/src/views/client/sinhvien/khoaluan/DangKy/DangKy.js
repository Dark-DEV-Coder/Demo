import "./DangKy.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchDetailKhoaLuan, fetchDSDeTaiChuaDangKy, fetchSinhVienDangKyKhoaLuan } from "../../../GetData_client"
import { toast } from "react-toastify";
const DangKy = () => {
    const [hidden, setHidden] = useState(false)
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
    let navigate = useNavigate();
    const [khoaluan, setKhoaluan] = useState({})
    const [dsdetai, setDSdetai] = useState([])
    const [mssvsinhvien1, SetMssvsinhvien1] = useState("")
    const [holotsinhvien1, SetHolotinhvien1] = useState("")
    const [tensinhvien1, SetTensinhvien1] = useState("")
    const [emailsinhvien1, SetEmailsinhvien1] = useState("")
    const [sdtsinhvien1, SetSdtsinhvien1] = useState("")
    const [stcsinhvien1, SetStcsinhvien1] = useState(0)
    const [dtlsinhvien1, SetDtlsinhvien1] = useState(0)

    const [mssvsinhvien2, SetMssvsinhvien2] = useState("")
    const [holotsinhvien2, SetHolotinhvien2] = useState("")
    const [tensinhvien2, SetTensinhvien2] = useState("")
    const [emailsinhvien2, SetEmailsinhvien2] = useState("")
    const [sdtsinhvien2, SetSdtsinhvien2] = useState("")
    const [stcsinhvien2, SetStcsinhvien2] = useState(0)
    const [dtlsinhvien2, SetDtlsinhvien2] = useState(0)

    const [detai, SetDetai] = useState("")
    const [MaGV, setMaGV] = useState("")

    // component didmount
    useEffect(() => {
        getDetailKhoaLuan();
    }, []);
    const getDetailKhoaLuan = async () => {
        const headers = { 'x-access-token': accessToken };
        let res = await fetchDetailKhoaLuan(headers);
        // console.log(res)
        if (res && res.data) {
            setKhoaluan(res.data)
            let res2 = await fetchDSDeTaiChuaDangKy(headers, res.data.MaKLTN);
            // console.log(res2)
            if (res2 && res2.data) {
                setDSdetai(res2.data)
            }
        }
    }

    const handleDangKyKhoaLuan = async () => {
        const headers = { 'x-access-token': accessToken };
        if (!detai) {
            toast.error("Vui lòng chọn đề tài muốn đăng ký khóa luận !")
            return;
        }
        if (!headers || !mssvsinhvien1 || !holotsinhvien1 || !tensinhvien1 || !emailsinhvien1 || !sdtsinhvien1 || !stcsinhvien1 || !dtlsinhvien1) {
            toast.error("Vui lòng nhập đầy đủ dữ liệu !")
            return;
        }
        if (mssvsinhvien1 && holotsinhvien1 && tensinhvien1 && emailsinhvien1 && sdtsinhvien1 && stcsinhvien1 && dtlsinhvien1 && mssvsinhvien2 && holotsinhvien2 && tensinhvien2 && emailsinhvien2 && sdtsinhvien2 && stcsinhvien2 && dtlsinhvien2) {
            // console.log("Chạy 2")
            let res = await fetchSinhVienDangKyKhoaLuan(headers, khoaluan.MaKLTN, detai, MaGV, mssvsinhvien1, holotsinhvien1, tensinhvien1, emailsinhvien1, sdtsinhvien1, dtlsinhvien1, stcsinhvien1)
            // console.log(res)
            let res2 = await fetchSinhVienDangKyKhoaLuan(headers, khoaluan.MaKLTN, detai, MaGV, mssvsinhvien2, holotsinhvien2, tensinhvien2, emailsinhvien2, sdtsinhvien2, dtlsinhvien2, stcsinhvien2)
            // console.log(res)
            if (res.status === true && res2.status === true) {
                // console.log("Chạy 2")
                toast.success(res2.message)
                navigate("/khoaluan")
                return;
            }
            if (res.status === false && res2.status === false) {
                toast.error(res2.message)
                return;
            }
        }
        if (mssvsinhvien1 && holotsinhvien1 && tensinhvien1 && emailsinhvien1 && sdtsinhvien1 && stcsinhvien1 && dtlsinhvien1 && !mssvsinhvien2 && !holotsinhvien2 && !tensinhvien2 && !emailsinhvien2 && !sdtsinhvien2 && !stcsinhvien2 && !dtlsinhvien2) {
            // console.log("ChạySV1")
            let res2 = await fetchSinhVienDangKyKhoaLuan(headers, khoaluan.MaKLTN, detai, MaGV, mssvsinhvien1, holotsinhvien1, tensinhvien1, emailsinhvien1, sdtsinhvien1, dtlsinhvien1, stcsinhvien1)
            // console.log(res)
            if (res2.status === true) {
                // console.log("ChạySV1")
                toast.success(res2.message)
                navigate("/khoaluan")
                return;
            }
            if (res2.status === false) {
                toast.error(res2.message)
                return;
            }
        }
        if (!mssvsinhvien1 && !holotsinhvien1 && !tensinhvien1 && !emailsinhvien1 && !sdtsinhvien1 && !stcsinhvien1 && !dtlsinhvien1 && mssvsinhvien2 && holotsinhvien2 && tensinhvien2 && emailsinhvien2 && sdtsinhvien2 && stcsinhvien2 && dtlsinhvien2) {
            // console.log("ChạySV2")
            let res2 = await fetchSinhVienDangKyKhoaLuan(headers, khoaluan.MaKLTN, detai, MaGV, mssvsinhvien2, holotsinhvien2, tensinhvien2, emailsinhvien2, sdtsinhvien2, dtlsinhvien2, stcsinhvien2)
            if (res2.status === true) {
                toast.success(res2.message)
                navigate("/khoaluan")
                return;
            }
            if (res2.status === false) {
                toast.error(res2.message)
                return;
            }
        }

        // let res = await fetchEditMatKhau(headers, tendangnhap, matkhaucu, matkhaumoi, xacnhanmk)
        // console.log(res)
        // if (res.status === true) {
        //     window.localStorage.clear();
        //     navigate("/dangnhap")
        //     window.location.reload()
        //     return;
        // }
        // if (res.status === false) {
        //     toast.error(res.message)
        //     return;
        // }
    }

    const onHidden = () => {
        setHidden(true)
    }

    const onChangeInputSL = (event, SetState) => {
        let changeValue = event.target.value;
        SetState(changeValue);
    }


    const onChangeInputDeTai = (event, item, SetState) => {
        let changeValue = event.target.value;
        SetState(changeValue);
        setMaGV(item)
    }

    // check dữ liệu
    const [checkmssvsinhvien1, SetCheckmssvsinhvien1] = useState(true)
    const [checkholotsinhvien1, SetCheckholotsinhvien1] = useState(true)
    const [checktensinhvien1, SetChecktensinhvien1] = useState(true)
    const [checkemailsinhvien1, SetCheckemailsinhvien1] = useState(true)
    const [checksdtsinhvien1, SetChecksdtsinhvien1] = useState(true)
    const [checkstcsinhvien1, SetCheckstcsinhvien1] = useState(true)
    const [checkdtlsinhvien1, SetCheckdtlsinhvien1] = useState(true)

    const [checkmssvsinhvien2, SetCheckmssvsinhvien2] = useState(true)
    const [checkholotsinhvien2, SetCheckholotsinhvien2] = useState(true)
    const [checktensinhvien2, SetChecktensinhvien2] = useState(true)
    const [checkemailsinhvien2, SetCheckemailsinhvien2] = useState(true)
    const [checksdtsinhvien2, SetChecksdtsinhvien2] = useState(true)
    const [checkstcsinhvien2, SetCheckstcsinhvien2] = useState(true)
    const [checkdtlsinhvien2, SetCheckdtlsinhvien2] = useState(true)


    const [checkdetai, SetCheckdetai] = useState(true)
    const checkdulieu = (value, SetDuLieu) => {
        value === '' ? SetDuLieu(false) : SetDuLieu(true)
    }
    const checkdulieuSo = (value, SetDuLieu) => {
        value == 0 ? SetDuLieu(false) : SetDuLieu(true)
    }

    const checkdulieuDetai = (SetDuLieu) => {
        detai === '' ? SetDuLieu(false) : SetDuLieu(true)
    }
    const isEmpty = (v) => {
        return Object.keys(v).length === 0;
    };
    if (!isEmpty(khoaluan)) {
        return (
            <div className="container-dangky">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="#">Trang chủ</a></li>
                    <li className="breadcrumb-item">Khóa luận tốt nghiệp</li>
                    <li className="breadcrumb-item active">Đăng ký đề tài khóa luận tốt nghiệp</li>
                </ol>
                {/* <div className="container-tb-update">
                    <h3>Khóa luận học kỳ 1 năm học 2023-2024</h3>
                    <h6>Ngày cập nhật : 10/09/2023</h6>
                </div> */}

                <h3>Điền đầy đủ thông tin sau</h3>
                <div className="content" >
                    <div className="container-form">
                        <form className="form-edit">
                            <div className="container-edit">
                                {/* Sv1 */}
                                <div className="form-row">
                                    <div className="form-group col-md-12">
                                        <label className="inputDK" htmlFor="inputTrinhdo">Sinh viên 1</label>
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label className="inputDK" htmlFor="inputTrinhdo">Mã số sinh viên</label>
                                        <input type="text" className="form-control" id="inputTrinhdo" value={mssvsinhvien1} placeholder="Điền mã số sinh viên ..." onChange={(event) => onChangeInputSL(event, SetMssvsinhvien1)} onBlur={() => checkdulieu(mssvsinhvien1, SetCheckmssvsinhvien1)} />
                                        <div className="invalid-feedback" style={{ display: checkmssvsinhvien1 ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label className="inputDK" htmlFor="inputTrinhdo">Họ lót</label>
                                        <input type="text" className="form-control" id="inputTrinhdo" value={holotsinhvien1} placeholder="Điền họ lót ..." onChange={(event) => onChangeInputSL(event, SetHolotinhvien1)} onBlur={() => checkdulieu(holotsinhvien1, SetCheckholotsinhvien1)} />
                                        <div className="invalid-feedback" style={{ display: checkholotsinhvien1 ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label className="inputDK" htmlFor="inputTrinhdo">Tên</label>
                                        <input type="text" className="form-control" id="inputTrinhdo" value={tensinhvien1} placeholder="Điền tên ..." onChange={(event) => onChangeInputSL(event, SetTensinhvien1)} onBlur={() => checkdulieu(tensinhvien1, SetChecktensinhvien1)} />
                                        <div className="invalid-feedback" style={{ display: checktensinhvien1 ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                                    </div>

                                </div>

                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label className="inputDK" htmlFor="inputTrinhdo">Số tín chỉ tích lỹ</label>
                                        <input type="number" className="form-control" id="inputTrinhdo" value={stcsinhvien1} onChange={(event) => onChangeInputSL(event, SetStcsinhvien1)} onBlur={() => checkdulieuSo(stcsinhvien1, SetCheckstcsinhvien1)} />
                                        <div className="invalid-feedback" style={{ display: checkstcsinhvien1 ? 'none' : 'block' }}>Số tín chỉ tích lỹ không hợp lệ</div>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label className="inputDK" htmlFor="inputTrinhdo">Điểm TB tích lỹ hệ 4</label>
                                        <input type="number" className="form-control" id="inputTrinhdo" value={dtlsinhvien1} min="0" max="4" onChange={(event) => onChangeInputSL(event, SetDtlsinhvien1)} onBlur={() => checkdulieuSo(dtlsinhvien1, SetCheckdtlsinhvien1)} />
                                        <div className="invalid-feedback" style={{ display: checkdtlsinhvien1 ? 'none' : 'block' }}>Điểm TB tích lỹ hệ 4 không hợp lệ</div>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label className="inputDK" htmlFor="inputTrinhdo">Email</label>
                                        <input type="text" className="form-control" id="inputTrinhdo" value={emailsinhvien1} placeholder="Điền email ..." onChange={(event) => onChangeInputSL(event, SetEmailsinhvien1)} onBlur={() => checkdulieu(emailsinhvien1, SetCheckemailsinhvien1)} />
                                        <div className="invalid-feedback" style={{ display: checkemailsinhvien1 ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label className="inputDK" htmlFor="inputTrinhdo">Số điện thoại</label>
                                        <input type="text" className="form-control" id="inputTrinhdo" value={sdtsinhvien1} placeholder="Điền số điện thoại ..." onChange={(event) => onChangeInputSL(event, SetSdtsinhvien1)} onBlur={() => checkdulieu(sdtsinhvien1, SetChecksdtsinhvien1)} />
                                        <div className="invalid-feedback" style={{ display: checksdtsinhvien1 ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                                    </div>
                                </div>
                                <div type="button" onClick={() => onHidden()} style={{ display: hidden ? 'none' : 'block', border: 'solid 2px black', padding: '0.3rem', color: 'blue' }}>Thêm Sinh Viên</div>

                                {/* SV2 */}
                                <div style={{ display: hidden ? 'block' : 'none' }}>
                                    <div className="form-row">
                                        <div className="form-group col-md-12">
                                            <label className="inputDK" htmlFor="inputTrinhdo">Sinh viên 2</label>
                                        </div>
                                        <div className="form-group col-md-12">
                                            <label className="inputDK" htmlFor="inputTrinhdo">Mã số sinh viên</label>
                                            <input type="text" className="form-control" id="inputTrinhdo" value={mssvsinhvien2} placeholder="Điền mã số sinh viên ..." onChange={(event) => onChangeInputSL(event, SetMssvsinhvien2)} onBlur={() => checkdulieu(mssvsinhvien2, SetCheckmssvsinhvien2)} />
                                            <div className="invalid-feedback" style={{ display: checkmssvsinhvien2 ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                                            {/* <div className="invalid-feedback" style={{ display: checkdulieuTrinhDo ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div> */}
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label className="inputDK" htmlFor="inputTrinhdo">Họ lót</label>
                                            <input type="text" className="form-control" id="inputTrinhdo" value={holotsinhvien2} placeholder="Điền họ lót ..." onChange={(event) => onChangeInputSL(event, SetHolotinhvien2)} onBlur={() => checkdulieu(holotsinhvien2, SetCheckholotsinhvien2)} />
                                            <div className="invalid-feedback" style={{ display: checkholotsinhvien2 ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label className="inputDK" htmlFor="inputTrinhdo">Tên</label>
                                            <input type="text" className="form-control" id="inputTrinhdo" value={tensinhvien2} placeholder="Điền tên ..." onChange={(event) => onChangeInputSL(event, SetTensinhvien2)} onBlur={() => checkdulieu(tensinhvien2, SetChecktensinhvien2)} />
                                            <div className="invalid-feedback" style={{ display: checktensinhvien2 ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                                        </div>

                                    </div>

                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label className="inputDK" htmlFor="inputTrinhdo">Số tín chỉ tích lỹ</label>
                                            <input type="number" className="form-control" id="inputTrinhdo" value={stcsinhvien2} onChange={(event) => onChangeInputSL(event, SetStcsinhvien2)} onBlur={() => checkdulieuSo(stcsinhvien2, SetCheckstcsinhvien2)} />
                                            <div className="invalid-feedback" style={{ display: checkstcsinhvien2 ? 'none' : 'block' }}>Số tín chỉ tích lỹ không hợp lệ</div>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label className="inputDK" htmlFor="inputTrinhdo">Điểm TB tích lỹ hệ 4</label>
                                            <input type="number" className="form-control" id="inputTrinhdo" value={dtlsinhvien2} onChange={(event) => onChangeInputSL(event, SetDtlsinhvien2)} onBlur={() => checkdulieuSo(dtlsinhvien2, SetCheckdtlsinhvien2)} />
                                            <div className="invalid-feedback" style={{ display: checkdtlsinhvien2 ? 'none' : 'block' }}>Điểm TB tích lỹ hệ 4 không hợp lệ</div>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label className="inputDK" htmlFor="inputTrinhdo">Email</label>
                                            <input type="text" className="form-control" id="inputTrinhdo" value={emailsinhvien2} placeholder="Điền email ..." onChange={(event) => onChangeInputSL(event, SetEmailsinhvien2)} onBlur={() => checkdulieu(emailsinhvien2, SetCheckemailsinhvien2)} />
                                            <div className="invalid-feedback" style={{ display: checkemailsinhvien2 ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label className="inputDK" htmlFor="inputTrinhdo">Số điện thoại</label>
                                            <input type="text" className="form-control" id="inputTrinhdo" value={sdtsinhvien2} placeholder="Điền số điện thoại ..." onChange={(event) => onChangeInputSL(event, SetSdtsinhvien2)} onBlur={() => checkdulieu(sdtsinhvien2, SetChecksdtsinhvien2)} />
                                            <div className="invalid-feedback" style={{ display: checksdtsinhvien2 ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <button type="button" className="btn btn-outline-primary" onClick={() => handleDangKyKhoaLuan()}>Đăng ký</button>
                        </form>
                    </div>
                    <div className="container-list-detai">
                        <fieldset className="form-group">
                            <div className="row">
                                <div className="col-sm-12">
                                    {dsdetai && dsdetai.length > 0 &&
                                        dsdetai.map((item, index) => {
                                            return (
                                                <div className="form-check" key={item._id}>
                                                    <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value={item.TenDeTai} onClick={(event) => onChangeInputDeTai(event, item.GVHD.MaGV, SetDetai)} />
                                                    <label className="inputDK" htmlFor="gridRadios1">{item.TenDeTai}</label>
                                                    <label className="inputDK" htmlFor="gridRadios1">- GVHD : {item.GVHD.HoGV + " " + item.GVHD.TenGV}</label>
                                                </div>

                                            )
                                        })
                                    }
                                    <div className="invalid-feedback" style={{ display: checkdetai ? 'none' : 'block' }}>Vui lòng chọn 1 đề tài </div>
                                </div>
                            </div>
                        </fieldset>



                    </div>

                </div>
            </div>
        )
    }

    else {
        return (
            <div className="container-taikhoan">
                <ol className="breadcrumb" >
                    <li className="breadcrumb-item"><a href="#">Trang chủ</a></li>
                    <li className="breadcrumb-item">Khóa luận tốt nghiệp</li>
                    <li className="breadcrumb-item active">Đăng ký đề tài khóa luận tốt nghiệp</li>
                </ol>
                {/* Thông tin đợt DKCN */}
                <div className="container-tb-update">
                    <h3>Hiện tại không có đợt đăng ký khóa luận tốt nghiệp nào được mở</h3>
                </div>
            </div >
        )
    }


}
export default DangKy