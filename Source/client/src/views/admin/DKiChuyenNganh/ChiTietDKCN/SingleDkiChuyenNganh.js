import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import FormControl from '@mui/material/FormControl';
import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CardNganh from "./CardNganh";
import TableCTDKCN from "./TableCTDKCN";
import "./SingleDkiChuyenNganh.scss"
import { useEffect, useState } from "react";
import { fetchDetailDangKyCN, fetchDetailDSSVDangKyCN } from "../../GetData"
import { toast } from "react-toastify";
import moment from "moment";
const SingleDkiChuyenNganh = () => {
    const [data_CNTT, setData_CNTT] = useState([])
    const [data_HTTT, setData_HTTT] = useState([])
    const [data_KHMT, setData_KHMT] = useState([])
    const [data_KTPM, setData_KTPM] = useState([])
    const [data_MMT, setData_MMT] = useState([])
    const [data_CNKTPM, setData_CNKTPM] = useState([])
    const [data_LTW, setData_LTW] = useState([])
    const [data_LTUD, setData_LTUD] = useState([])

    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
    const dkichuyennganh = useParams();
    const [MaDKCN, SetMaDKCN] = useState('')
    const [Ten, SetTen] = useState('')
    const [Khoa, SetKhoa] = useState('')
    const [tgbd, SetTgbd] = useState('')
    const [tgkt, SetTgkt] = useState('')

    const [httt, SetHttt] = useState({})
    const [khmt, SetKhmt] = useState({})
    const [ktpm, SetKtpm] = useState({})
    const [mmt, SetMmt] = useState({})
    const [ltw, SetLtw] = useState({})
    const [ltud, SetLtud] = useState({})
    useEffect(() => {
        getDetailDangKyChuyenNganh();
        getDetailDSSV();
        getDetailDSSV("DCT", "Tất cả", setData_CNTT)
        getDetailDSSV("DKP", "Tất cả", setData_CNKTPM)
    }, []);

    const getDetailDangKyChuyenNganh = async () => {
        const headers = { 'x-access-token': accessToken };
        let res = await fetchDetailDangKyCN(headers, dkichuyennganh.MaDKCN);
        // console.log(res)
        if (res && res.data) {
            SetMaDKCN(res.data.MaDKCN)
            SetTen(res.data.Ten)
            SetKhoa(res.data.Khoa)
            SetTgbd(moment(res.data.ThoiGianBD).format("DD-MM-YYYY"))
            SetTgkt(moment(res.data.ThoiGianKT).format("DD-MM-YYYY"))
            res.data.ThongTin.map((item, index) => {
                if (item.ChuyenNganh.MaChuyenNganh === "KTPM") {
                    SetKtpm(item)
                }
                if (item.ChuyenNganh.MaChuyenNganh === "HTTT") {
                    SetHttt(item)
                }
                if (item.ChuyenNganh.MaChuyenNganh === "KHMT") {
                    SetKhmt(item)
                }
                if (item.ChuyenNganh.MaChuyenNganh === "MMT") {
                    SetMmt(item)
                }
                if (item.ChuyenNganh.MaChuyenNganh === "LTUD") {
                    SetLtud(item)
                }
                if (item.ChuyenNganh.MaChuyenNganh === "LTW") {
                    SetLtw(item)
                }
            })
        }
    }
    const getDetailDSSV = async (manganh, machuyennganh, setState) => {
        const headers = { 'x-access-token': accessToken };
        let res = await fetchDetailDSSVDangKyCN(headers, dkichuyennganh.MaDKCN, manganh, machuyennganh);
        if (res && res.data) {
            setState(res.data)
        }
    }

    const [value, setValue] = useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [valueTableCNTT, setValueTableCNTT] = useState('CNTT');
    const [listData, setListData] = useState(data_CNTT);
    const handleChangeCNTT = (event, newValue) => {
        setValueTableCNTT(newValue);
    };
    const handleChangeTest = (maCN) => {
        if (maCN === "CNTT") {
            getDetailDSSV("DCT", "Tất cả", setData_CNTT)
            return
        }
        if (maCN === "HTTT") {
            getDetailDSSV("DCT", "HTTT", setData_HTTT)
            return
        }
        if (maCN === "KHMT") {
            getDetailDSSV("DCT", "KHMT", setData_KHMT)
            return
        }
        if (maCN === "KTPM") {
            getDetailDSSV("DCT", "KTPM", setData_KTPM)
            return
        }

        if (maCN === "MMT") {
            getDetailDSSV("DCT", "MMT", setData_MMT)
            return
        }
    }


    const [listData_KTPM, setListData_KTPM] = useState(data_CNKTPM);
    const [valueTableKTPM, setValueTableKTPM] = useState('KTPM');
    const handleChangeKTPM = (event, newValue) => {
        setValueTableKTPM(newValue);
    };
    const handleChange_KTPM = (maCN) => {
        if (maCN === "KTPM") {
            getDetailDSSV("DKP", "Tất cả", setData_CNKTPM)
            return
        }
        if (maCN === "LTW") {
            getDetailDSSV("DKP", "LTW", setData_LTW)
            return
        }
        if (maCN === "LTUD") {
            getDetailDSSV("DKP", "LTUD", setData_LTUD)
            return
        }
    }

    return (
        <main className="main2">
            {/* <HeaderMain title={'Chuyên ngành'} /> */}
            <div className="head-title">
                <div className="left">
                    <h1>THÔNG TIN CHI TIẾT</h1>
                    <ul className="breadcrumb">
                        <li>
                            <Link>Dashboard</Link>
                        </li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li>
                            <Link >Đăng ký chuyên ngành</Link>
                        </li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li>
                            <Link className="active" >{dkichuyennganh.MaDKCN}</Link>
                        </li>
                    </ul>
                </div>
            </div>
            {/* TabContext */}
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Công nghệ thông tin" value="1" />
                        <Tab label="Kỹ thuật phần mềm" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <TabContext value={valueTableCNTT}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChangeCNTT} aria-label="lab API tabs example">
                                <Tab label="Công nghệ thông tin" value="CNTT" onClick={() => handleChangeTest("CNTT")} />
                                <Tab label="Hệ thống thông tin" value="HTTT" onClick={() => handleChangeTest("HTTT")} />
                                <Tab label="Khoa học máy tính" value="KHMT" onClick={() => handleChangeTest("KHMT")} />
                                <Tab label="Kỹ thuật phần mềm" value="KTPM" onClick={() => handleChangeTest("KTPM")} />
                                <Tab label="Mạng máy tính" value="MMT" onClick={() => handleChangeTest("MMT")} />
                            </TabList>
                        </Box>
                        <TabPanel value="CNTT">
                            <div className="table">
                                <div className="card4">
                                    <h6 className="card-header"></h6>
                                </div>
                                <TableCTDKCN listData={data_CNTT} />

                            </div>
                        </TabPanel>
                        <TabPanel value="HTTT">
                            <div className="table">
                                <div className="card4">
                                    <h6 className="card-header">Số lượng: {httt.ToiDa - httt.ConLai}/{httt.ToiDa}</h6>
                                </div>
                                <TableCTDKCN listData={data_HTTT} />

                            </div>
                        </TabPanel>
                        <TabPanel value="KHMT">
                            <div className="table">
                                <div className="card4">
                                    <h6 className="card-header">Số lượng:{khmt.ToiDa - khmt.ConLai}/{khmt.ToiDa}</h6>
                                </div>
                                <TableCTDKCN listData={data_KHMT} />

                            </div>
                        </TabPanel>
                        <TabPanel value="KTPM">
                            <div className="table">
                                <div className="card4">
                                    <h6 className="card-header">Số lượng: {ktpm.ToiDa - ktpm.ConLai}/{ktpm.ToiDa}</h6>
                                </div>
                                <TableCTDKCN listData={data_KTPM} />

                            </div>
                        </TabPanel>
                        <TabPanel value="MMT">
                            <div className="table">
                                <div className="card4">
                                    <h6 className="card-header">Số lượng: {mmt.ToiDa - mmt.ConLai}/{mmt.ToiDa}</h6>
                                </div>
                                <TableCTDKCN listData={data_MMT} />
                            </div>
                        </TabPanel>

                    </TabContext>
                </TabPanel>
                <TabPanel value="2">
                    <TabContext value={valueTableKTPM}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChangeKTPM} aria-label="lab API tabs example">
                                <Tab label="Kỹ thuật phần mềm" value="KTPM" onClick={() => handleChange_KTPM("KTPM")} />
                                <Tab label="Lập trình web" value="LTW" onClick={() => handleChange_KTPM("LTW")} />
                                <Tab label="Lập trình ứng dụng" value="LTUD" onClick={() => handleChange_KTPM("LTUD")} />
                            </TabList>
                        </Box>
                        <TabPanel value="KTPM">
                            <div className="table">
                                <div className="card4">
                                    <h6 className="card-header"></h6>
                                </div>
                                <TableCTDKCN listData={data_CNKTPM} />

                            </div>
                        </TabPanel>
                        <TabPanel value="LTW">
                            <div className="table">
                                <div className="card4">
                                    <h6 className="card-header">Số lượng: {ltw.ToiDa - ltw.ConLai}/{ltw.ToiDa}</h6>
                                </div>
                                <TableCTDKCN listData={data_LTW} />

                            </div>
                        </TabPanel>
                        <TabPanel value="LTUD">
                            <div className="table">
                                <div className="card4">
                                    <h6 className="card-header">Số lượng: {ltud.ToiDa - ltud.ConLai}/{ltud.ToiDa}</h6>
                                </div>
                                <TableCTDKCN listData={data_LTUD} />

                            </div>
                        </TabPanel>

                    </TabContext>
                </TabPanel>

            </TabContext>
            {/* TabContext */}





        </main >
    )
}
export default SingleDkiChuyenNganh;