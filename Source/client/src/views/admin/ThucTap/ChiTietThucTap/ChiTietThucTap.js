import "./ChiTietThucTap.scss"
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import TableDSCtyThucTap from "./TableDSCtyThucTap";
import TableDSSinhVienThucTap from "./TableDSSinhVienThucTap";
import { fetchDetailThucTap, fetchGetDSSVThucTap, fetchExportFileDSSV_Cty } from "../../GetData"
import moment from "moment";
import { Button } from "@mui/material";
const ChiTietThucTap = () => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
    const thuctap = useParams();
    // lấy tên rồi add tên vào breacrum
    const [tenTT, setTenTT] = useState("")
    const [CongTyNgoaiDS, setCongTyNgoaiDS] = useState([])
    const [CongTyTrongDS, setCongTyTrongDS] = useState([])
    const [DSSVThucTap, setDSSVThucTap] = useState([])

    // component didmount
    useEffect(() => {
        getDetailThucTap();
    }, []);
    const getDetailThucTap = async () => {
        const headers = { 'x-access-token': accessToken };
        let res = await fetchDetailThucTap(headers, thuctap.MaDKTT);
        // console.log(res)
        if (res && res.data) {
            setTenTT(res.data.Ten)
            setCongTyNgoaiDS(res.data.CongTyNgoaiDS)
            setCongTyTrongDS(res.data.CongTyTrongDS)
            let res2 = await fetchGetDSSVThucTap(headers, thuctap.MaDKTT);
            // console.log(thuctap.MaDKTT)
            // console.log(res2)
            if (res2 && res2.data) {
                setDSSVThucTap(res2.data)
            }
            // setNganh_dt(res.data.Nganh)
            // setTgbd(moment(res.data.ThoiGianBD).format("YYYY-MM-DD"))
            // setTgkt(moment(res.data.ThoiGianKT).format("YYYY-MM-DD"))
        }
    }

    const handleExportFile = async () => {
        const headers = { 'x-access-token': accessToken }
        let res = await fetchExportFileDSSV_Cty(headers, thuctap.MaDKTT)
        console.log(res)
        const url = URL.createObjectURL(new Blob([res]));
        const aTag = document.createElement('a')
        aTag.href = url
        aTag.setAttribute('download', `DSThucTap_${thuctap.MaDKTT}.xlsx`)
        document.body.appendChild(aTag)
        aTag.click();
        aTag.remove();
    }

    const [value, setValue] = useState('dsSV');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>
            <main className="main2">
                {/* <HeaderMain title={'Chuyên ngành'} /> */}
                <div className="head-title">
                    <div className="left">
                        <h1>DANH SÁCH </h1>
                        <ul className="breadcrumb">
                            <li>
                                <Link>Dashboard</Link>
                            </li>
                            <li><i className='bx bx-chevron-right'></i></li>
                            <li>
                                <Link >Thực tập tốt nghiệp</Link>
                            </li>
                            <li><i className='bx bx-chevron-right'></i></li>
                            <li>
                                <Link className="active" >{tenTT}</Link>
                            </li>
                        </ul>
                    </div>
                    <Button className="btn-download" style={{ fontFamily: "Montserrat", fontWeight: '400' }}
                        onClick={() => handleExportFile()}
                    >
                        <i className='bx bxs-cloud-download'></i>
                        <span className="text">Export Data</span>
                    </Button>
                </div>

                {/* Tab */}
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Danh sách sinh viên" value="dsSV" />
                            <Tab label="Danh sách công ty" value="dsCTy" />
                        </TabList>
                    </Box>

                    <TabPanel value="dsSV" >
                        <div className="table">
                            <div className="card4">
                                <h6 className="card-header">Danh sách sinh viên tham gia thực tập</h6>
                            </div>
                            <TableDSSinhVienThucTap DSSVThucTap={DSSVThucTap} MaDKTT={thuctap.MaDKTT} />

                        </div>
                    </TabPanel>
                    <TabPanel value="dsCTy">
                        <div className="table">
                            <div className="card4">
                                <h6 className="card-header">Danh sách công ty thực tập</h6>
                            </div>
                            <TableDSCtyThucTap CongTyNgoaiDS={CongTyNgoaiDS} CongTyTrongDS={CongTyTrongDS} MaDKTT={thuctap.MaDKTT} />

                        </div>
                    </TabPanel>
                </TabContext>
            </main >
        </>
    )
}
export default ChiTietThucTap;