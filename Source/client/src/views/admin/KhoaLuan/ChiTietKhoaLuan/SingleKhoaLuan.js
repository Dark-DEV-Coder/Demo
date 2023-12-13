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
import { fetchDetailKhoaLuan } from "../../GetData"
import moment from "moment";
const SingleKhoaLuan = () => {

    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
    const khoaluan = useParams();
    const [listData_nganh, SetListData_nganh] = useState([]);

    const [nganh_dt, setNganh_dt] = useState({})
    const [ten, setTen] = useState("")
    const [nganh, setNganh] = useState("DCT")
    const [khoahoc, setKhoahoc] = useState("")
    const [dsdt, setDsdt] = useState([])
    const [tgbd, setTgbd] = useState("")
    const [tgkt, setTgkt] = useState("")

    // component didmount
    useEffect(() => {
        getDetailKhoaLuan();
    }, []);

    // const getListNganh = async () => {
    //     const headers = { 'x-access-token': accessToken };
    //     let res = await fetchAllNganh(headers);
    //     if (res && res.data && res.data.DanhSach) {
    //         SetListData_nganh(res.data.DanhSach)
    //     }
    // }
    const getDetailKhoaLuan = async () => {
        const headers = { 'x-access-token': accessToken };
        let res = await fetchDetailKhoaLuan(headers, khoaluan.MaKLTN);
        if (res && res.data) {
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
                {/* <a href="#" className="btn-download">
                    <i className='bx bxs-cloud-download'></i>
                    <span className="text">Export Data</span>
                </a> */}
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