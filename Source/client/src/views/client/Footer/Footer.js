import './Footer.scss'
import logo from '../logotruong.jpg'
import CallIcon from '@mui/icons-material/Call';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
const Footer = () => {

    return (
        <div className="container2">
            <footer className=" text-center text-lg-start text-white">
                <div className="container p-4">
                    <div className="my-4">
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'start' }}>
                            <img src={logo} height="100" alt=""
                                loading="lazy" />

                        </div>
                        <div className='container-infor'>
                            <div className='container-left'>
                                <h6 >Phòng D301, Số 273 An Dương Vương, Phường 3, Quận 5, TP. HCM</h6>
                                <div className='left-left'>
                                    <CallIcon />
                                    <h6 >(028) 38382 664</h6>
                                </div>
                                <div className='left-left'>
                                    <MarkEmailUnreadIcon />
                                    <h6 >vpkcntt@sgu.edu.vn</h6>
                                </div>



                            </div>
                            <div className='container-right'>
                                <h6 >GIỜ MỞ CỬA</h6>
                                <div className='right-right'>

                                    <h6 >THỨ HAI - THỨ SÁU:&nbsp;&nbsp;&nbsp;&nbsp; 08:00 - 11:30 | 14:00 - 16:30</h6>
                                </div>
                                <div className='right-right'>

                                    <h6 >THỨ BẢY: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;08:00 - 11:30 </h6>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                {/* style="background-color: rgba(0, 0, 0, 0.2)" */}
                <div className="text-center p-3" >
                    © 2020 Copyright:
                    <a className="text-white" href="https://mdbootstrap.com/">CodeSML.com</a>
                </div>

            </footer>

        </div>
    )
}
export default Footer;