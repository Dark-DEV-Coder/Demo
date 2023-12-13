import "./KQDKchuyennganh.scss"
import TableDSSV from "./TableDSSV";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useState, useEffect } from "react";
import moment from "moment";
import { fetchDetailChuyenNganh, fetchDetailDSSVChuyenNganh } from "../../GetData_client"
const KQDKchuyennganh = () => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
    const [chuyennganh, setChuyennganh] = useState({})
    const [listChuyenNganh, setListChuyenNganh] = useState({})

    const [data_HTTT, setData_HTTT] = useState([])
    const [data_KHMT, setData_KHMT] = useState([])
    const [data_KTPM, setData_KTPM] = useState([])
    const [data_MMT, setData_MMT] = useState([])
    const [data_LTW, setData_LTW] = useState([])
    const [data_LTUD, setData_LTUD] = useState([])

    // component didmount
    useEffect(() => {
        getDetailChuyenNganh();
    }, []);
    const getDetailChuyenNganh = async () => {
        const headers = { 'x-access-token': accessToken };
        let res = await fetchDetailChuyenNganh(headers);
        // console.log(res)
        if (res && res.data) {
            setChuyennganh(res.data)
            setListChuyenNganh(res.data.ThongTin)
            getDetailDSSV(res.data.MaDKCN, "DCT", "KTPM", setData_KTPM)
        }
    }

    const [valueTable, setValueTable] = useState('KTPM');
    const [listData, setListData] = useState(data_KTPM);
    const handleChangeCNTT = (event, newValue) => {
        setValueTable(newValue);
    };
    const getDetailDSSV = async (MaDKCN, manganh, machuyennganh, setState) => {
        const headers = { 'x-access-token': accessToken };
        let res = await fetchDetailDSSVChuyenNganh(headers, MaDKCN, manganh, machuyennganh);
        // console.log(res)
        if (res && res.data) {
            setState(res.data)
        }
    }
    const handleChangeListData = (maCN) => {
        if (maCN === "HTTT") {
            getDetailDSSV(chuyennganh.MaDKCN, "DCT", "HTTT", setData_HTTT)
            return
        }
        if (maCN === "KHMT") {
            getDetailDSSV(chuyennganh.MaDKCN, "DCT", "KHMT", setData_KHMT)
            return
        }
        if (maCN === "KTPM") {
            getDetailDSSV(chuyennganh.MaDKCN, "DCT", "KTPM", setData_KTPM)
            return
        }

        if (maCN === "MMT") {
            getDetailDSSV(chuyennganh.MaDKCN, "DCT", "MMT", setData_MMT)
            return
        }

        if (maCN === "LTW") {
            getDetailDSSV(chuyennganh.MaDKCN, "DKP", "LTW", setData_LTW)
            return
        }
        if (maCN === "LTUD") {
            getDetailDSSV(chuyennganh.MaDKCN, "DKP", "LTUD", setData_LTUD)
            return
        }
    }
    const isEmpty = (v) => {
        return Object.keys(v).length === 0;
    };
    if (!isEmpty(chuyennganh)) {
        return (
            <div className="container-chuyennganh">
                <ol className="breadcrumb" >
                    <li className="breadcrumb-item"><a href="#">Trang chủ</a></li>
                    <li className="breadcrumb-item">Chuyên ngành</li>
                    <li className="breadcrumb-item active">Kết quả đăng ký chuyên ngành</li>
                </ol>
                <div className="container-tb-update">
                    <h3>{chuyennganh.Ten}</h3>
                    <h6>Ngày cập nhật : {moment(chuyennganh.updatedAt).format("DD/MM/YYYY")}</h6>
                    <h6 className="time-line">Thời gian đăng ký : [{moment(chuyennganh.ThoiGianBD).format("DD/MM/YYYY")} - {moment(chuyennganh.ThoiGianKT).format("DD/MM/YYYY")} ] </h6>
                </div>
                <div className="container-dky">
                    <h5>Danh sách được công bố</h5>
                </div>

                <div className="content-table">
                    <TabContext value={valueTable}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChangeCNTT} aria-label="lab API tabs example">
                                {listChuyenNganh && listChuyenNganh.length > 0 &&
                                    listChuyenNganh.map((item, index) => {
                                        return (
                                            <Tab label={item.ChuyenNganh.TenChuyenNganh} value={item.ChuyenNganh.MaChuyenNganh} onClick={() => handleChangeListData(item.ChuyenNganh.MaChuyenNganh)} />
                                        )
                                    })
                                }
                            </TabList>
                        </Box>

                        <TabPanel value="KTPM">
                            <div className="table">
                                <div className="card4">
                                    {/* <h6 className="card-header">Số lượng: {data_CNCNTT.length}</h6> */}
                                </div>
                                <TableDSSV listData={data_KTPM} />
                            </div>
                        </TabPanel>

                        <TabPanel value="HTTT">
                            <div className="table">
                                <div className="card4">
                                    {/* <h6 className="card-header">Số lượng: {data_CNKTPM.length}</h6> */}
                                </div>
                                <TableDSSV listData={data_HTTT} />
                            </div>
                        </TabPanel>
                        <TabPanel value="KHMT">
                            <div className="table">
                                <div className="card4">
                                    {/* <h6 className="card-header">Số lượng: {data_CNCNTT.length}</h6> */}
                                </div>
                                <TableDSSV listData={data_KHMT} />
                            </div>
                        </TabPanel>

                        <TabPanel value="MMT">
                            <div className="table">
                                <div className="card4">
                                    {/* <h6 className="card-header">Số lượng: {data_CNKTPM.length}</h6> */}
                                </div>
                                <TableDSSV listData={data_MMT} />
                            </div>
                        </TabPanel>
                        <TabPanel value="LTUD">
                            <div className="table">
                                <div className="card4">
                                    {/* <h6 className="card-header">Số lượng: {data_CNCNTT.length}</h6> */}
                                </div>
                                <TableDSSV listData={data_LTUD} />
                            </div>
                        </TabPanel>

                        <TabPanel value="LTW">
                            <div className="table">
                                <div className="card4">
                                    {/* <h6 className="card-header">Số lượng: {data_CNKTPM.length}</h6> */}
                                </div>
                                <TableDSSV listData={data_LTW} />
                            </div>
                        </TabPanel>

                    </TabContext>

                </div>
            </div>
        )
    }
    else
        return (
            <div className="container-taikhoan">
                <ol className="breadcrumb" >
                    <li className="breadcrumb-item"><a href="#">Trang chủ</a></li>
                    <li className="breadcrumb-item">Chuyên ngành</li>
                </ol>
                {/* Thông tin đợt DKCN */}
                <div className="container-tb-update">
                    <h3>Hiện tại không có đợt đăng ký chuyên ngành nào được mở</h3>
                </div>
            </div >
        )

}
export default KQDKchuyennganh