import "./Contact.scss"
import { Link } from "react-router-dom";
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import PermPhoneMsgOutlinedIcon from '@mui/icons-material/PermPhoneMsgOutlined';
import AttachEmailOutlinedIcon from '@mui/icons-material/AttachEmailOutlined';
const Contact = () => {
    return (
        <div className="container-lienhe">
            <ol className="breadcrumb" >
                <li className="breadcrumb-item"><a href="#">Trang chủ</a></li>
                <li className="breadcrumb-item active">Liên hệ</li>
            </ol>
            {/* <div className="container-tb-update">
                <h3>THÔNG TIN LIÊN HỆ</h3>
            </div> */}

            <div className="container-contact">
                <div className="map-cntt">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.6697269761835!2d106.67968337553383!3d10.759917089387894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1b7c3ed289%3A0xa06651894598e488!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBTw6BpIEfDsm4!5e0!3m2!1svi!2s!4v1697570400315!5m2!1svi!2s"
                        style={{ width: '100%', height: '350px', border: '0' }}
                        allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
                <div className="content-contact">
                    <div className="left-side">
                        <div className="address details">
                            <i className="fas fa-map-marker-alt"><BusinessOutlinedIcon style={{ fontSize: '40px' }} /></i>
                            <div className="topic tes">Địa chỉ</div>
                            <div className="text-one tes">Phòng D301,Số 273 An Dương Vương</div>
                            <div className="text-two tes">Phường 3, Quận 5, TP. HCM</div>
                        </div>
                        <div className="phone details">
                            <i className="fas fa-phone-alt"><PermPhoneMsgOutlinedIcon style={{ fontSize: '40px' }} /> </i>
                            <div className="topic tes">Điện thoại</div>
                            <div className="text-one tes">(028) 38382 664</div>
                            {/* <div className="text-two tes">+0096 3434 5678</div> */}
                        </div>
                        <div className="email details">
                            <i className="fas fa-phone-alt"><AttachEmailOutlinedIcon style={{ fontSize: '40px' }} /></i>
                            <div className="topic tes">Email</div>
                            <div className="text-one tes">vpkcntt@sgu.edu.vn</div>
                            <div className="text-two tes">info.codinglab@gmail.com</div>
                        </div>
                    </div>
                    <div className="right-side">
                        <div className="topic-text">Phản hồi đến chúng tôi</div>
                        <p>Nếu bạn có bất kỳ loại câu hỏi nào liên quan đến hướng dẫn của tôi hoặc bạn phát hiện lỗ hỏng đến từ hệ thống, bạn có thể gửi tin nhắn cho tôi từ đây. Tôi rất hân hạnh được giúp đỡ bạn.</p>
                        <form action="#">
                            <div className="input-box">
                                <input type="text" placeholder="Email của bạn..." />
                            </div>
                            <div className="input-box">
                                <input type="text" placeholder="Nội dung phản hồi..." />
                            </div>
                            <div className="input-box message-box">
                            </div>
                            <div className="button">
                                <input type="button" value="Gửi đi " />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>


    )
}
export default Contact