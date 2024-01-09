import "./HuongDanDK_TT.scss"
const HuongDanDK_TT = () => {
    const BuocDK = [
        { id: '1', title: 'Bước 1', content: 'Fight aliens, wear a head crab, learn about gravity' },
        { id: '2', title: 'Bước 2', content: 'Fight aliens, wear an AI, learn about screen peeking siblings' },
        { id: '3', title: 'Bước 3', content: 'Ski, slip, and slide your way to victory' },
        { id: '4', title: 'Bước 4', content: 'Các trường hợp khai báo sai điểm trung bình tích lũy, tổng số tín chỉ tích lũy (khai báo trong link excel và phiếu đăng ký) sẽ chịu mọi hình thức xử lý của hội đồng.' },
        { id: '5', title: 'Bước 5', content: 'Sinh viên đủ điều kiện làm khóa luận tốt nghiệp không cần đăng ký học 3 môn thay thế, danh sách thực hiện khóa luận sẽ được gửi về phòng đào tạo và sẽ cập nhật sau cho sinh đóng học phí.' },
    ]

    return (
        <div className="container-huongdan">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="#">Trang chủ</a></li>
                <li className="breadcrumb-item">Thực tập</li>
                <li className="breadcrumb-item active">Hướng dẫn đăng ký thực tập tốt nghiệp</li>
            </ol>
            <div className="container-tb-update">
                <h3>CÁCH THỨC ĐĂNG KÝ THỰC TẬP TỐT NGHIỆP</h3>
                <h6>Ngày cập nhật : 10/09/2023</h6>
            </div>


            <div className="content">
                <ol className="alternating-colors">
                    {BuocDK &&
                        BuocDK.map((item, index) => {
                            return (
                                <li key={item.id}>
                                    <strong>{item.title}</strong>
                                    <p>{item.content}</p>
                                </li>
                            )
                        })
                    }
                </ol>
            </div>
        </div>
    )
}
export default HuongDanDK_TT