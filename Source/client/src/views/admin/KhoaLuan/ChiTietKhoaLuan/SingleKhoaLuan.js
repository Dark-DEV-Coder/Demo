import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import "./SingleKhoaLuan.scss"
import TableDSDeTai from "./TableDSDeTai";
import { fetchDetailKhoaLuan, fetchImportKQKhoaLuan } from "../../GetData"
import moment from "moment";
import { toast } from "react-toastify";
const SingleKhoaLuan = () => {

    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
    const khoaluan = useParams();
    const [listData_nganh, SetListData_nganh] = useState([]);

    const [nganh_dt, setNganh_dt] = useState({})
    const [ma, setMa] = useState("")
    const [ten, setTen] = useState("")
    const [nganh, setNganh] = useState("DCT")
    const [khoahoc, setKhoahoc] = useState("")
    const [dsdt, setDsdt] = useState([])
    const [tgbd, setTgbd] = useState("")
    const [tgkt, setTgkt] = useState("")

    const [FileExcel, SetFileExcel] = useState("")

    // component didmount
    useEffect(() => {
        getDetailKhoaLuan();
    }, []);

    // const importKetQuaKL = async () => {
    //     const headers = { 'x-access-token': accessToken };
    //     let value_importKQ = new FormData();
    //     value_importKQ.append("FileExcel", FileExcel);
    //     let res = await fetchImportKQKhoaLuan(headers, khoahoc.MaKLTN, value_importKQ);
    //     console.log(res)
    //     // if (res && res.data && res.data.DanhSach) {
    //     //     SetListData_nganh(res.data.DanhSach)
    //     // }
    // }

    const getDetailKhoaLuan = async () => {
        const headers = { 'x-access-token': accessToken };
        let res = await fetchDetailKhoaLuan(headers, khoaluan.MaKLTN);
        if (res && res.data) {
            setMa(res.data.MaKLTN)
            setTen(res.data.Ten)
            setKhoahoc(res.data.Khoa)
            setDsdt(res.data.DSDeTai)
            setNganh_dt(res.data.Nganh)
            setTgbd(moment(res.data.ThoiGianBD).format("YYYY-MM-DD"))
            setTgkt(moment(res.data.ThoiGianKT).format("YYYY-MM-DD"))
        }
    }

    const [value, setValue] = useState('DCT');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const onChangeFile = async (event, MaKLTN) => {
        const file = event.target.files[0];
        const headers = { 'x-access-token': accessToken };
        let value_importKQ = new FormData();
        value_importKQ.append("FileExcel", file);
        let res = await fetchImportKQKhoaLuan(headers, MaKLTN, value_importKQ);
        if (res && res.status === true) {
            toast.success("Import kết quả khóa luận thành công !")
        }
        else toast.error(res.status)
    }
    return (
        <main className="main2">
            <div className="head-title">
                <div className="left">
                    <h1>THÔNG TIN CHI TIẾT</h1>
                    <ul className="breadcrumb">
                        <li>
                            <Link>Dashboard</Link>
                        </li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li>
                            <Link>Khóa luận</Link>
                        </li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li>
                            <Link className="active">{khoaluan.MaKLTN}</Link>
                        </li>
                    </ul>
                </div>
                <label htmlFor="import" className="btn-download">
                    <i className='bx bxs-cloud-download'></i>
                    <span className="text">Import kết quả</span>
                </label>
                {/* <label htmlFor="import">Test</label> */}
                <input id="import" type="file" accept=".xlsx" hidden onChange={(event) => onChangeFile(event, ma)} />
            </div>



            {/* TabContext */}
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label={nganh_dt.TenNganh} value="DCT" key={nganh_dt.MaNganh} />
                    </TabList>
                </Box>

                <TabPanel value="DCT" >
                    <div className="table">
                        <div className="card4">
                            <h6 className="card-header">Danh sách đề tài</h6>
                        </div>
                        <TableDSDeTai data_detai={dsdt} MaKLTN={khoaluan.MaKLTN} />
                    </div>
                </TabPanel>
                {/* <TabPanel value="DKP" >
                    <div className="table">
                        <div className="card4">
                            <h6 className="card-header">Danh sách đề tài</h6>
                        </div>
                        <TableDSDeTai data_detai={dsdt} />
                    </div>
                </TabPanel>
                <TabPanel value="DCT_C">
                    <div className="table">
                        <div className="card4">
                            <h6 className="card-header">Danh sách đề tài</h6>
                        </div>
                    </div>
                </TabPanel> */}
            </TabContext>
            {/* TabContext */}





        </main >
    )
}
export default SingleKhoaLuan;