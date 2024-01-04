import "./ChiTietCBHT.scss"
import { Link, useNavigate } from "react-router-dom";
import TableDSSVCanhBao from "./TableDSSVCanhBao";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import TableDSSVCanhBao_DRL from "./TableDSSVCanhBao_DRL";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Chart from "react-apexcharts";
import { fetchDetailCanhBao, fetchStatisticalCanhBao, fetchAllNganh } from "../../GetData"
const ChiTietCBHT = () => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
    const [value, setValue] = useState('ds');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const canhbao = useParams();
    let navigate = useNavigate();
    const [listData_nganh, SetListData_nganh] = useState([]);

    // Table xem chi tiết
    const [MaCBHT, setMaCBHT] = useState("")
    const [Ten, setTen] = useState("")
    const [Dot, setDot] = useState("")
    const [NienKhoa, setNienKhoa] = useState("")
    const [KieuCanhBao, setKieuCanhBao] = useState("")
    const [data_SV, setData_SV] = useState([])
    // Table xem chi tiết

    const [nam, setNam] = useState([])

    //3 select
    const [select_thongke, setSelect_thongke] = useState("Lớp")
    const [select_nganh, setSelect_nganh] = useState("Tất cả")
    const [select_khoa, setSelect_khoa] = useState("Tất cả")
    // Bảng thống kê
    const [thongke_khoa, setThongke_khoa] = useState([])
    const [thongke_canhbao, setThongke_canhbao] = useState([])
    const [thongke_buocthoihoc, setThongke_buocthoihoc] = useState([])


    useEffect(() => {
        getDetailCanhBao();
        getStatisticalCanhBao('Lớp', 'Tất cả', 'Tất cả');
        getListNganh();
        getNam();
    }, []);
    const getNam = () => {
        var d = new Date();
        let namhientai = d.getFullYear();
        let namtru = [];
        for (var i = 0; i < 6; i++) {
            let res = namhientai - i
            namtru = [...namtru, res.toString()]
        }
        setNam(namtru)
    }
    const getStatisticalCanhBao = async (thongketheo, nganh, khoa) => {
        const headers = { 'x-access-token': accessToken };
        let res = await fetchStatisticalCanhBao(headers, canhbao.MaCBHT, thongketheo, nganh, khoa);
        // console.log(res)
        if (res && res.data) {
            let ds_khoa = [];
            let ds_canhbao = [];
            let ds_buocthoihoc = [];
            res.data.map((item, index) => {
                ds_khoa = [...ds_khoa, item.Khoa]
                ds_canhbao = [...ds_canhbao, item.ThongKe.CC]
                ds_buocthoihoc = [...ds_buocthoihoc, item.ThongKe.BTH]
            })
            setThongke_khoa(ds_khoa)
            setThongke_canhbao(ds_canhbao)
            setThongke_buocthoihoc(ds_buocthoihoc)

        }
    }
    const getListNganh = async () => {
        const headers = { 'x-access-token': accessToken };
        let res = await fetchAllNganh(headers);
        if (res && res.data && res.data.DanhSach) {
            SetListData_nganh(res.data.DanhSach)
        }
    }
    const getDetailCanhBao = async () => {
        const headers = { 'x-access-token': accessToken };
        let res = await fetchDetailCanhBao(headers, canhbao.MaCBHT);
        if (res && res.data) {
            setMaCBHT(res.data.MaCBHT)
            setTen(res.data.Ten)
            setDot(res.data.Dot)
            setNienKhoa(res.data.NienKhoa)
            setKieuCanhBao(res.data.KieuCanhBao)
            setData_SV(res.data.ThongTin)
        }
    }

    const changleSelectThongKe = (event) => {
        const res = event.target.value;

        if (res === 'Ngành') {
            setSelect_thongke("Ngành")
            setSelect_nganh("Tất cả")
            setSelect_khoa("Tất cả")
            getStatisticalCanhBao('Ngành', 'Tất cả', 'Tất cả');
            return
        }
        if (res === 'Khóa') {
            setSelect_thongke("Khóa")
            setSelect_khoa("Tất cả")
            getStatisticalCanhBao('Khóa', 'Tất cả', 'Tất cả');
            return
        }
        if (res === 'Lớp') {
            setSelect_thongke("Lớp")
            setSelect_khoa("Tất cả")
            setSelect_nganh("Tất cả")
            getStatisticalCanhBao('Lớp', 'Tất cả', 'Tất cả');
            return
        }


    }

    const changleSelect_nganh = (event) => {
        const res = event.target.value;
        setSelect_nganh(res)
        getStatisticalCanhBao(select_thongke, res, select_khoa)
    }
    const changleSelect_khoa = (event) => {
        const res = event.target.value;
        setSelect_khoa(res)
        getStatisticalCanhBao(select_thongke, select_nganh, res)
    }
    // const [value_table, setValue_table] = useState({})

    let value_table = {
        series: [{
            name: 'Buộc thôi học',
            data: thongke_buocthoihoc,
        }, {
            name: 'Cảnh cáo',
            data: thongke_canhbao,
        },
        ],
        options: {
            chart: {
                type: 'bar',
                height: 350,
                stacked: true,
                toolbar: {
                    show: true
                },
                zoom: {
                    enabled: true
                }
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    legend: {
                        position: 'bottom',
                        offsetX: -10,
                        offsetY: 0
                    }
                }
            }],
            plotOptions: {
                bar: {
                    horizontal: false,
                    borderRadius: 0,
                    dataLabels: {
                        total: {
                            enabled: true,
                            style: {
                                fontSize: '13px',
                                fontWeight: 900
                            }
                        }
                    }
                },
            },
            xaxis: {
                // type: 'datetime',
                categories: thongke_khoa,
            },
            legend: {
                position: 'right',
                offsetY: 40
            },
            fill: {
                opacity: 1
            }
        },
    }
    return (
        <>
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
                                <Link >Cảnh báo học tập</Link>
                            </li>
                            <li><i className='bx bx-chevron-right'></i></li>
                            <li>
                                <Link className="active" >{Ten}</Link>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Tab */}
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Danh sách" value="ds" />
                            <Tab label="Thống kê" value="tk" />
                        </TabList>
                    </Box>

                    <TabPanel value="ds" >
                        {KieuCanhBao === "Điểm học tập" ?
                            <TableDSSVCanhBao list_data={data_SV} />
                            : <TableDSSVCanhBao_DRL list_data={data_SV} />

                        }
                    </TabPanel>
                    <TabPanel value="tk">
                        {KieuCanhBao === "Điểm học tập" ?
                            <div className="table">
                                <div className="form-row">
                                    <div className="form-group col-md-4">
                                        <label className="inputGV" htmlFor="inputGioitinhGV">Thống kê theo</label>
                                        <select value={select_thongke} id="inputGioitinhGV" className="form-control" onChange={(event) => changleSelectThongKe(event)}>
                                            <option value='Ngành'>Ngành</option>
                                            <option value='Khóa'>Khóa</option>
                                            <option value='Lớp'>Lớp</option>
                                        </select>
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label className="inputGV" htmlFor="inputGioitinhGV">Lọc theo ngành</label>
                                        <select value={select_nganh} id="inputGioitinhGV" className="form-control" onChange={(event) => changleSelect_nganh(event)} disabled={select_thongke === "Ngành" ? true : false}>
                                            <option value="Tất cả">Tất cả</option>
                                            {listData_nganh && listData_nganh.length > 0 &&
                                                listData_nganh.map((item, index) => {
                                                    return (
                                                        <option key={item.MaNganh} value={item.TenNganh}>{item.TenNganh}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label className="inputGV" htmlFor="inputGioitinhGV">Lọc theo khóa</label>
                                        <select value={select_khoa} id="inputGioitinhGV" className="form-control" onChange={(event) => changleSelect_khoa(event)} disabled={select_thongke === "Ngành" || select_thongke === "Khóa" ? true : false}>
                                            <option value="Tất cả">Tất cả</option>
                                            {nam && nam.length > 0 &&
                                                nam.map((item, index) => {
                                                    return (
                                                        <option key={item} value={item}>{item}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div id="chart">
                                    {thongke_khoa.length === 0 ?
                                        <>
                                            <label style={{ color: 'red' }}>Không có dữ liệu cho đợt tìm kiếm : </label>
                                            <h6> Thống kê theo: {select_thongke}</h6>
                                            <h6> Lọc theo ngành: {select_nganh}</h6>
                                            <h6> Lọc theo khóa: {select_khoa}</h6>
                                        </>
                                        :
                                        <Chart options={value_table.options} series={value_table.series} type="bar" height={350} />
                                    }

                                </div>

                            </div>
                            :

                            <div className="table">
                                <div className="form-row">
                                    <div className="form-group col-md-4">
                                        <label className="inputGV" htmlFor="inputGioitinhGV">Thống kê theo</label>
                                        <select value={select_thongke} id="inputGioitinhGV" className="form-control" onChange={(event) => changleSelectThongKe(event)}>
                                            <option value='Lớp'>Lớp</option>
                                        </select>
                                    </div>
                                </div>
                                <div id="chart">
                                    {thongke_khoa.length === 0 ?
                                        <>
                                            <label style={{ color: 'red' }}>Không có dữ liệu cho đợt tìm kiếm : </label>
                                            <h6> Thống kê theo: {select_thongke}</h6>
                                            <h6> Lọc theo ngành: {select_nganh}</h6>
                                            <h6> Lọc theo khóa: {select_khoa}</h6>
                                        </>
                                        :
                                        <Chart options={value_table.options} series={value_table.series} type="bar" height={350} />
                                    }

                                </div>

                            </div>

                        }
                    </TabPanel>
                </TabContext>
            </main >
        </>
    )
}
export default ChiTietCBHT;