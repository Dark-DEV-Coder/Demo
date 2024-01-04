
import { Link, useNavigate } from "react-router-dom";
import TableDSSVTotNghiep from "./TableDSSVTotNghiep";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Chart from "react-apexcharts";
import { fetchDetailTotNghiep, fetchStatisticalTotNghiep, fetchAllNganh } from "../../GetData"
const ChiTietTotNghiep = () => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
    const [value, setValue] = useState('ds');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const totnghiep = useParams();
    let navigate = useNavigate();
    const [listData_nganh, SetListData_nganh] = useState([]);

    // Table xem chi tiết
    const [MaTN, setMaTN] = useState("")
    const [Ten, setTen] = useState("")
    const [NienKhoa, setNienKhoa] = useState("")
    const [data_SV, setData_SV] = useState([])
    // Table xem chi tiết


    //2 select
    const [select_thongke, setSelect_thongke] = useState("Ngành")
    const [select_nganh, setSelect_nganh] = useState("Tất cả")

    // Bảng thống kê theo số lượng tốt nghiệp
    const [thongke_khoa, setThongke_khoa] = useState([])
    const [thongke_totnghiep, setThongke_totnghiep] = useState([])
    const [thongke_chuatotnghiep, setThongke_chuatotnghiep] = useState([])

    // Bảng thống kê theo thành tích tốt nghiệp
    const [thongke_khoa2, setThongke_khoa2] = useState([])
    const [thongke_xuatsac, setThongke_xuatsac] = useState([])
    const [thongke_gioi, setThongke_gioi] = useState([])
    const [thongke_kha, setThongke_kha] = useState([])
    const [thongke_trungbinh, setThongke_trungbinh] = useState([])


    useEffect(() => {
        getDetailTotNghiep();
        getStatisticalTotNghiep_SL(select_thongke, select_nganh);
        getStatisticalTotNghiep_TT(select_thongke, select_nganh);
        getListNganh();
    }, []);
    const getListNganh = async () => {
        const headers = { 'x-access-token': accessToken };
        let res = await fetchAllNganh(headers);
        if (res && res.data && res.data.DanhSach) {
            SetListData_nganh(res.data.DanhSach)
        }
    }
    const getDetailTotNghiep = async () => {
        const headers = { 'x-access-token': accessToken };
        let res = await fetchDetailTotNghiep(headers, totnghiep.MaTN);
        // console.log(res)
        if (res && res.data) {
            setMaTN(res.data.MaTN)
            setTen(res.data.Ten)
            setNienKhoa(res.data.NienKhoa)
            setData_SV(res.data.ThongTin)
        }
    }
    // Tab thống kê theo số lượng
    const getStatisticalTotNghiep_SL = async (thongketheo, nganh) => {
        const headers = { 'x-access-token': accessToken };
        let res = await fetchStatisticalTotNghiep(headers, totnghiep.MaTN, thongketheo, nganh, "Tốt nghiệp");
        // console.log(res)
        if (res && res.data && res.data.length > 0) {
            let ds_khoa = [];
            let ds_totnghiep = [];
            let ds_chuatotnghiep = [];
            res.data.map((item, index) => {
                ds_khoa = [...ds_khoa, item.Khoa]
                ds_totnghiep = [...ds_totnghiep, item.ThongKe.TN]
                ds_chuatotnghiep = [...ds_chuatotnghiep, item.ThongKe.CTN]
            })
            setThongke_khoa(ds_khoa)
            setThongke_totnghiep(ds_totnghiep)
            setThongke_chuatotnghiep(ds_chuatotnghiep)
        }
    }
    const changleSelectThongKe_SL = (event) => {
        const res = event.target.value;
        if (res === 'Ngành') {
            setSelect_thongke("Ngành")
            setSelect_nganh("Tất cả")
            getStatisticalTotNghiep_SL('Ngành', 'Tất cả');
            return
        }
        if (res === 'Lớp') {
            setSelect_thongke("Lớp")
            setSelect_nganh("Tất cả")
            getStatisticalTotNghiep_SL('Lớp', 'Tất cả');
            return
        }
    }

    const changleSelect_nganh_SL = (event) => {
        const res = event.target.value;
        setSelect_nganh(res)
        getStatisticalTotNghiep_SL(select_thongke, res)
    }
    // const [value_table, setValue_table] = useState({})

    let value_table_thongkeSLTotNghiep = {
        series: [{
            name: 'Đã tốt nghiệp',
            data: thongke_totnghiep,
        }, {
            name: 'Chưa tốt nghiệp',
            data: thongke_chuatotnghiep,
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

    // Tab thống kê theo thành tích
    const getStatisticalTotNghiep_TT = async (thongketheo, nganh) => {
        const headers = { 'x-access-token': accessToken };
        let res = await fetchStatisticalTotNghiep(headers, totnghiep.MaTN, thongketheo, nganh, "Xếp loại");
        // console.log(res)
        if (res && res.data && res.data.length > 0) {
            let ds_khoa = [];
            let ds_xuatsac = [];
            let ds_gioi = [];
            let ds_kha = [];
            let ds_trungbinh = [];
            res.data.map((item, index) => {
                ds_khoa = [...ds_khoa, item.Khoa]
                ds_xuatsac = [...ds_xuatsac, item.ThongKe.XuatSac]
                ds_gioi = [...ds_gioi, item.ThongKe.Gioi]
                ds_kha = [...ds_kha, item.ThongKe.Kha]
                ds_trungbinh = [...ds_trungbinh, item.ThongKe.TrungBinh]
            })
            setThongke_khoa2(ds_khoa)
            setThongke_xuatsac(ds_xuatsac)
            setThongke_gioi(ds_gioi)
            setThongke_kha(ds_kha)
            setThongke_trungbinh(ds_trungbinh)
        }
    }
    const changleSelectThongKe_TT = (event) => {
        const res = event.target.value;
        if (res === 'Ngành') {
            setSelect_thongke("Ngành")
            setSelect_nganh("Tất cả")
            getStatisticalTotNghiep_TT('Ngành', 'Tất cả');
            return
        }
        if (res === 'Lớp') {
            setSelect_thongke("Lớp")
            setSelect_nganh("Tất cả")
            getStatisticalTotNghiep_TT('Lớp', 'Tất cả');
            return
        }
    }

    const changleSelect_nganh_TT = (event) => {
        const res = event.target.value;
        setSelect_nganh(res)
        getStatisticalTotNghiep_TT(select_thongke, res)
    }
    // const [value_table, setValue_table] = useState({})

    let value_table_thongkeTTTotNghiep = {
        series: [
            {
                name: ' Xuất sắc',
                data: thongke_xuatsac,
            },
            {
                name: 'Giỏi',
                data: thongke_gioi,
            },
            {
                name: 'Khá',
                data: thongke_kha,
            },
            {
                name: 'Trung bình',
                data: thongke_trungbinh,
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
                categories: thongke_khoa2,
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
                                <Link >Tốt nghiệp</Link>
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
                            <Tab label="Thống kê theo số lượng" value="tksl" />
                            <Tab label="Thống kê theo thành tích" value="tktt" />
                        </TabList>
                    </Box>

                    {/* Tab danh sách */}
                    <TabPanel value="ds" >
                        <TableDSSVTotNghiep list_data={data_SV} />
                    </TabPanel>
                    {/* Tab thống kê tốt nghiệp theo số lượng */}
                    <TabPanel value="tksl">
                        <div className="table">
                            <div className="form-row">
                                <div className="form-group col-md-4">
                                    <label className="inputGV" htmlFor="inputGioitinhGV">Thống kê theo</label>
                                    <select value={select_thongke} id="inputGioitinhGV" className="form-control" onChange={(event) => changleSelectThongKe_SL(event)}>
                                        <option value='Ngành'>Ngành</option>
                                        <option value='Lớp'>Lớp</option>
                                    </select>
                                </div>
                                <div className="form-group col-md-4">
                                    <label className="inputGV" htmlFor="inputGioitinhGV">Lọc theo ngành</label>
                                    <select value={select_nganh} id="inputGioitinhGV" className="form-control" onChange={(event) => changleSelect_nganh_SL(event)} disabled={select_thongke === "Ngành" ? true : false}>
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
                                {/* <div className="form-group col-md-4">
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
                                </div> */}
                            </div>
                            <div id="chart">
                                {thongke_khoa.length === 0 ?
                                    <>
                                        <label style={{ color: 'red' }}>Không có dữ liệu cho đợt tìm kiếm : </label>
                                        <h6> Thống kê theo: {select_thongke}</h6>
                                        <h6> Lọc theo ngành: {select_nganh}</h6>
                                        {/* <h6> Lọc theo khóa: {select_khoa}</h6> */}
                                    </>
                                    :
                                    <Chart options={value_table_thongkeSLTotNghiep.options} series={value_table_thongkeSLTotNghiep.series} type="bar" height={350} />
                                }
                            </div>
                        </div>

                    </TabPanel>
                    {/* Tab thống kê tốt nghiệp theo thành tích */}
                    <TabPanel value="tktt">
                        <div className="table">
                            <div className="form-row">
                                <div className="form-group col-md-4">
                                    <label className="inputGV" htmlFor="inputGioitinhGV">Thống kê theo</label>
                                    <select value={select_thongke} id="inputGioitinhGV" className="form-control" onChange={(event) => changleSelectThongKe_TT(event)}>
                                        <option value='Ngành'>Ngành</option>
                                        <option value='Lớp'>Lớp</option>
                                    </select>
                                </div>
                                <div className="form-group col-md-4">
                                    <label className="inputGV" htmlFor="inputGioitinhGV">Lọc theo ngành</label>
                                    <select value={select_nganh} id="inputGioitinhGV" className="form-control" onChange={(event) => changleSelect_nganh_TT(event)} disabled={select_thongke === "Ngành" ? true : false}>
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
                            </div>
                            <div id="chart">
                                {thongke_khoa.length === 0 ?
                                    <>
                                        <label style={{ color: 'red' }}>Không có dữ liệu cho đợt tìm kiếm : </label>
                                        <h6> Thống kê theo: {select_thongke}</h6>
                                        <h6> Lọc theo ngành: {select_nganh}</h6>
                                        {/* <h6> Lọc theo khóa: {select_khoa}</h6> */}
                                    </>
                                    :
                                    <Chart options={value_table_thongkeTTTotNghiep.options} series={value_table_thongkeTTTotNghiep.series} type="bar" height={350} />
                                }

                            </div>

                        </div>

                    </TabPanel>
                </TabContext>
            </main >
        </>
    )
}
export default ChiTietTotNghiep;
