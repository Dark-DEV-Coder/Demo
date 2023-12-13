import "./Thuctap.scss"
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchDetailSinhVien, fetchDetailThucTap, fetchSinhVienDangKyThucTapTrongDS, fetchSinhVienDangKyThucTapNgoaiDS, fetchSinhVienHuyDangKyThucTap } from "../../GetData_client"
import { toast } from "react-toastify";
import moment from "moment";
const Thuctap = () => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
    const [thongtin, setThongtin] = useState({})
    const [thuctap, setThuctap] = useState({})
    let navigate = useNavigate();
    const [holotsinhvien, setHolotsinhvien] = useState("")
    const [tensinhvien, setTensinhvien] = useState("")
    const [mssvsinhvien, setMssvsinhvien] = useState("")
    const [lopsinhvien, setLopsinhvien] = useState("")
    const [gioitinhsinhvien, setGioitinhsinhvien] = useState("")
    const [nganhsinhvien, setNganhsinhvien] = useState("")
    const [dtlsinhvien, setDtlsinhvien] = useState(0)
    const [emailsinhvien, setEmailsinhvien] = useState("")
    const [sdtsinhvien, setSdtsinhvien] = useState("")
    const [khoasinhvien, setKhoasinhvien] = useState("")
    const [diachithuongtrusinhvien, setDiachithuongtrusinhvien] = useState("")
    const [diachilienhesinhvien, setDiachilienhesinhvien] = useState("")


    const [tencty, setTencty] = useState("")
    const [vitri, setVitri] = useState("")
    const [emailcongty, setEmailcongty] = useState("")
    const [website, setWebsite] = useState("")
    const [diachicty, setDiachicty] = useState("")
    const [honguoilienhe, setHonguoilienhe] = useState("")
    const [tennguoilienhe, setTennguoilienhe] = useState("")
    const [sdtnguoilienhe, setSdtnguoilienhe] = useState("")

    const [radioCty, setRadioCty] = useState('')


    // component didmount
    useEffect(() => {
        let thongtin = JSON.parse(localStorage.getItem("ThongTin"))
        setThongtin(thongtin)
        getDetailSinhVien(thongtin.MaSo)
        getDetailThucTap()
    }, []);
    const getDetailThucTap = async () => {
        const headers = { 'x-access-token': accessToken };
        let ress = await fetchDetailThucTap(headers)
        // console.log("DetailThucTap ", ress)
        if (ress && ress.data) {
            setThuctap(ress.data)
        }
    }
    const getDetailSinhVien = async (MaSo) => {
        const headers = { 'x-access-token': accessToken };
        let res = await fetchDetailSinhVien(headers, MaSo);
        if (res && res.data) {
            setMssvsinhvien(res.data.MaSV)
            setHolotsinhvien(res.data.HoSV)
            setTensinhvien(res.data.TenSV)
            setEmailsinhvien(res.data.Email)
            setSdtsinhvien(res.data.SoDienThoai)
            setGioitinhsinhvien(res.data.GioiTinh)
            setNganhsinhvien(moment(res.data.NgaySinh).format("YYYY-MM-DD"))
            setLopsinhvien(res.data.Lop)
            setKhoasinhvien(res.data.Khoa)
            setNganhsinhvien(res.data.Nganh)
        }
    }

    const handleDangKyThucTap = async () => {
        const headers = { 'x-access-token': accessToken };
        if (radioCty === "") {
            toast.error("Vui lòng điền công ty !")
        }
        if (radioCty === "1") {
            if (!headers || !vitri || !emailcongty) {
                toast.error("Vui lòng điền đầy đủ thông tin !")
                return;
            }
            let res2 = await fetchSinhVienDangKyThucTapTrongDS(headers, thuctap.MaDKTT, vitri, emailcongty, thongtin.MaSo)
            if (res2.status === true) {
                toast.success(res2.message)
                navigate("/thuctap")
                return;
            }
            if (res2.status === false) {
                toast.error(res2.message)
                return;
            }
        }

        if (radioCty === "0") {
            if (!headers || !vitri || !emailcongty || !honguoilienhe || !tennguoilienhe || !tencty || !website || !sdtnguoilienhe || !diachicty) {
                toast.error("Vui lòng điền đầy đủ thông tin !")
                return;
            }
            let res2 = await fetchSinhVienDangKyThucTapNgoaiDS(headers, thuctap.MaDKTT, honguoilienhe, tennguoilienhe, tencty, website, sdtnguoilienhe, diachicty, emailcongty, vitri, thongtin.MaSo)
            // console.log(res2)
            if (res2.status === true) {
                toast.success(res2.message)
                navigate("/thuctap")
                return;
            }
            if (res2.status === false) {
                toast.error(res2.message)
                return;
            }
        }
    }

    const handleDeleteRows = async () => {
        const headers = { 'x-access-token': accessToken };
        let res = await fetchSinhVienHuyDangKyThucTap(headers, thuctap.MaDKTT, thongtin.MaSo)
        // console.log(res)
        if (res.status === true) {
            toast.success(res.message)
            navigate("/thuctap")
            return;
        }
        if (res.status === false) {
            toast.error(res.message)
            return;
        }
    }

    const onChangeInputSL = (event, setState) => {
        let changeValue = event.target.value;
        setState(changeValue);
    }


    // check dữ liệu
    const [checkmssvsinhvien, setCheckmssvsinhvien] = useState(true)
    const [checkholotsinhvien, setCheckholotsinhvien] = useState(true)
    const [checktensinhvien, setChecktensinhvien] = useState(true)
    const [checkemailsinhvien, setCheckemailsinhvien] = useState(true)
    const [checksdtsinhvien, setChecksdtsinhvien] = useState(true)
    const [checknganhsinhvien, setChecknganhsinhvien] = useState(true)
    const [checklopsinhvien, setChecklopsinhvien] = useState(true)
    const [checkdiachithuongtrusinhvien, setCheckdiachithuongtrusinhvien] = useState(true)
    const [checkdiachilienhesinhvien, setCheckdiachilienhesinhvien] = useState(true)
    const [checkdtlsinhvien, setCheckdtlsinhvien] = useState(true)

    const [checkTencty, setCheckTencty] = useState(true)
    const [checkVitri, setCheckVitri] = useState(true)
    const [checkEmailcongty, setCheckEmailcongty] = useState(true)
    const [checkdiachicty, setCheckdiachicty] = useState(true)
    const [checkwebsite, setCheckwebsite] = useState(true)
    const [checkholienhe, setCheckholienhe] = useState(true)
    const [checktenlienhe, setChecktenlienhe] = useState(true)
    const [checkdienthoailienhe, setCheckdienthoailienhe] = useState(true)



    const [checkdetai, setCheckdetai] = useState(true)
    const checkdulieu = (value, setDuLieu) => {
        value === '' ? setDuLieu(false) : setDuLieu(true)
    }
    const checkdulieuSo = (value, setDuLieu) => {
        value == 0 ? setDuLieu(false) : setDuLieu(true)
    }

    // const checkdulieuDetai = (setDuLieu) => {
    //     detai === '' ? setDuLieu(false) : setDuLieu(true)
    //     console.log(checkdetai)
    // }

    const isEmpty = (v) => {
        return Object.keys(v).length === 0;
    };
    if (!isEmpty(thuctap)) {
        return (
            <div className="container-thuctap">
                <ol className="breadcrumb" >
                    <li className="breadcrumb-item"><a href="#">Trang chủ</a></li>
                    <li className="breadcrumb-item">Thực tập tốt nghiệp</li>
                    <li className="breadcrumb-item active">Thực tập tốt nghiệp học kỳ 1 năm học 2023-2024</li>
                </ol>
                <div className="container-tb-update">
                    <h3>Đăng ký thực tập tốt nghiệp học kỳ 1 năm học 2023-2024</h3>
                    {/* <h6>Ngày cập nhật : 10/09/2023</h6> */}
                    <h6 className="time-line">Thời gian đăng ký : [ 10/09/2023 - 22/10/2023 ] </h6>
                </div>
                {/* <div className="container-dky">
                    <h5>Danh sách công ty được công bố</h5>
                    <Link to="/thuctap/dky-thuctap">
                        <button type="button" className="btn btn-outline-primary">Xem danh sách</button>
                    </Link>
                </div> */}
                <div className="container-dky" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h3>Điền đầy đủ thông tin sau</h3>
                    <button type="button" style={{ marginLeft: '0.5rem' }} className="btn btn-outline-danger" onClick={() => { handleDeleteRows() }}>Hủy đăng ký</button>
                </div>


                <div className="content-dkythuctap">
                    <div className="container-form">
                        <form className="form-edit">
                            <div className="container-edit">
                                <label className="inputDK" htmlFor="inputTrinhdo">Thông tin sinh viên đăng ký thực tập</label>
                                <div className="form-row">
                                    <div className="form-group col-md-4">
                                        <label className="inputDK" htmlFor="inputTrinhdo">Mã số sinh viên</label>
                                        <input type="text" className="form-control" id="inputTrinhdo" value={mssvsinhvien} placeholder="Điền mã số sinh viên ..." onChange={(event) => onChangeInputSL(event, setMssvsinhvien)} onBlur={() => checkdulieu(mssvsinhvien, setCheckmssvsinhvien)} disabled={true} />
                                        <div className="invalid-feedback" style={{ display: checkmssvsinhvien ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label className="inputDK" htmlFor="inputTrinhdo">Họ lót</label>
                                        <input type="text" className="form-control" id="inputTrinhdo" value={holotsinhvien} placeholder="Điền họ lót ..." onChange={(event) => onChangeInputSL(event, setHolotsinhvien)} onBlur={() => checkdulieu(holotsinhvien, setCheckholotsinhvien)} disabled={true} />
                                        <div className="invalid-feedback" style={{ display: checkholotsinhvien ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label className="inputDK" htmlFor="inputTrinhdo">Tên</label>
                                        <input type="text" className="form-control" id="inputTrinhdo" value={tensinhvien} placeholder="Điền tên ..." onChange={(event) => onChangeInputSL(event, setTensinhvien)} onBlur={() => checkdulieu(tensinhvien, setChecktensinhvien)} disabled={true} />
                                        <div className="invalid-feedback" style={{ display: checktensinhvien ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                                    </div>

                                </div>

                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label className="inputDK" htmlFor="inputTrinhdo">Lớp</label>
                                        <input type="text" className="form-control" id="inputTrinhdo" value={lopsinhvien} placeholder="Điền lớp ..." onChange={(event) => onChangeInputSL(event, setLopsinhvien)} onBlur={() => checkdulieu(lopsinhvien, setChecklopsinhvien)} disabled={true} />
                                        <div className="invalid-feedback" style={{ display: checklopsinhvien ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu</div>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label className="inputDK" htmlFor="inputTrinhdo">Ngành</label>
                                        <input type="text" className="form-control" id="inputTrinhdo" value={nganhsinhvien} placeholder="Điền ngành ..." onChange={(event) => onChangeInputSL(event, setNganhsinhvien)} onBlur={() => checkdulieu(nganhsinhvien, setChecknganhsinhvien)} disabled={true} />
                                        <div className="invalid-feedback" style={{ display: checknganhsinhvien ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu</div>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label className="inputDK" htmlFor="inputTrinhdo">Email</label>
                                        <input type="text" className="form-control" id="inputTrinhdo" value={emailsinhvien} placeholder="Điền email ..." onChange={(event) => onChangeInputSL(event, setEmailsinhvien)} onBlur={() => checkdulieu(emailsinhvien, setCheckemailsinhvien)} disabled={true} />
                                        <div className="invalid-feedback" style={{ display: checkemailsinhvien ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label className="inputDK" htmlFor="inputTrinhdo">Số điện thoại</label>
                                        <input type="text" className="form-control" id="inputTrinhdo" value={sdtsinhvien} placeholder="Điền số điện thoại ..." onChange={(event) => onChangeInputSL(event, setSdtsinhvien)} onBlur={() => checkdulieu(sdtsinhvien, setChecksdtsinhvien)} disabled={true} />
                                        <div className="invalid-feedback" style={{ display: checksdtsinhvien ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                                    </div>
                                </div>

                                <label className="inputDK" htmlFor="inputTrinhdo">Thông tin công ty đăng ký thực tập <a href="#">( Danh sách công ty thực tập )</a></label>

                                <div className="form-row">
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value='1' onClick={(event) => onChangeInputSL(event, setRadioCty)} />
                                        <label className="inputDK" htmlFor="gridRadios1">Trong sanh sách</label>
                                    </div>
                                    <div className="form-check" style={{ marginLeft: '3rem' }}>
                                        <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value='0' onClick={(event) => onChangeInputSL(event, setRadioCty)} />
                                        <label className="inputDK" htmlFor="gridRadios1">Ngoài danh sách</label>
                                    </div>
                                </div>


                                <div style={radioCty === '' ? { display: 'none' } : { display: 'block' }}>
                                    <div className="form-row">
                                        <div className="form-group col-md-12">
                                            <label className="inputDK" htmlFor="inputTrinhdo">Tên công ty thực tập</label>
                                            <input type="text" className="form-control" id="inputTrinhdo" value={tencty} placeholder="Điền tên công ty thực tập ..." onChange={(event) => onChangeInputSL(event, setTencty)} onBlur={() => checkdulieu(tencty, setCheckTencty)} />
                                            <div className="invalid-feedback" style={{ display: checkTencty ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label className="inputDK" htmlFor="inputTrinhdo">Vị trí thực tập</label>
                                            <input type="text" className="form-control" id="inputTrinhdo" value={vitri} placeholder="Điền vị trí thực tập ..." onChange={(event) => onChangeInputSL(event, setVitri)} onBlur={() => checkdulieu(vitri, setCheckVitri)} />
                                            <div className="invalid-feedback" style={{ display: checkVitri ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label className="inputDK" htmlFor="inputTrinhdo">Email công ty</label>
                                            <input type="text" className="form-control" id="inputTrinhdo" value={emailcongty} placeholder="Điền email công ty thực tập ..." onChange={(event) => onChangeInputSL(event, setEmailcongty)} onBlur={() => checkdulieu(emailcongty, setCheckEmailcongty)} />
                                            <div className="invalid-feedback" style={{ display: checkEmailcongty ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                                        </div>
                                    </div>
                                    <div style={radioCty === '1' ? { display: 'none' } : { display: 'block' }}>
                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <label className="inputDK" htmlFor="inputTrinhdo">Website</label>
                                                <input type="text" className="form-control" id="inputTrinhdo" value={website} placeholder="Điền website công ty ..." onChange={(event) => onChangeInputSL(event, setWebsite)} onBlur={() => checkdulieu(website, setCheckwebsite)} />
                                                <div className="invalid-feedback" style={{ display: checkwebsite ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu</div>
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label className="inputDK" htmlFor="inputTrinhdo">Địa chỉ công ty</label>
                                                <input type="text" className="form-control" id="inputTrinhdo" value={diachicty} placeholder="Điền địa chỉ công ty ..." onChange={(event) => onChangeInputSL(event, setDiachicty)} onBlur={() => checkdulieu(diachicty, setCheckdiachicty)} />
                                                <div className="invalid-feedback" style={{ display: checkdiachicty ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu</div>
                                            </div>

                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <label className="inputDK" htmlFor="inputTrinhdo">Họ người liên hệ</label>
                                                <input type="text" className="form-control" id="inputTrinhdo" value={honguoilienhe} placeholder="Điền họ người liên hệ ..." onChange={(event) => onChangeInputSL(event, setHonguoilienhe)} onBlur={() => checkdulieu(honguoilienhe, setCheckholienhe)} />
                                                <div className="invalid-feedback" style={{ display: checkholienhe ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu</div>
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label className="inputDK" htmlFor="inputTrinhdo">Tên người liên hệ</label>
                                                <input type="text" className="form-control" id="inputTrinhdo" value={tennguoilienhe} placeholder="Điền tên người liên hệ ..." onChange={(event) => onChangeInputSL(event, setTennguoilienhe)} onBlur={() => checkdulieu(tennguoilienhe, setChecktenlienhe)} />
                                                <div className="invalid-feedback" style={{ display: checktenlienhe ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu</div>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-md-12">
                                                <label className="inputDK" htmlFor="inputTrinhdo">Số điện thoại</label>
                                                <input type="text" className="form-control" id="inputTrinhdo" value={sdtnguoilienhe} placeholder="Điền số điện thoại ..." onChange={(event) => onChangeInputSL(event, setSdtnguoilienhe)} onBlur={() => checkdulieu(sdtnguoilienhe, setCheckdienthoailienhe)} />
                                                <div className="invalid-feedback" style={{ display: checkdienthoailienhe ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>



                            </div>
                            <button type="button" className="btn btn-outline-primary" onClick={() => handleDangKyThucTap()} >Đăng ký</button>
                        </form>
                    </div>
                </div >
            </div >
        )
    }
    else {
        return (
            <div className="container-taikhoan">
                <ol className="breadcrumb" >
                    <li className="breadcrumb-item"><a href="#">Trang chủ</a></li>
                    <li className="breadcrumb-item">Thực tập tốt nghiệp</li>
                </ol>
                {/* Thông tin đợt DKCN */}
                <div className="container-tb-update">
                    <h3>Hiện tại không có đợt đăng ký thực tập tốt nghiệp nào được mở</h3>
                </div>
            </div >
        )
    }


}
export default Thuctap