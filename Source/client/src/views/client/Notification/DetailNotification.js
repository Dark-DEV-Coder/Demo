import './DetailNotification.scss'



const DetailNotification = () => {
    const dulieutest = {
        id: 1,
        date: '21/08/2023',
        title: 'THÔNG BÁO VỀ VIỆC TỔ CHỨC HỘI NGHỊ ĐẠI BIỂU VIÊN CHỨC, NGƯỜI LAO ĐỘNG NĂM 2023-2024',
        text: 'Nội dung và văn bản về việc tổ chức hội nghị đại biểu viên chức, người lao động năm 2023-2024 Nội dung và văn bản về việc tổ chức hội nghị đại biểu viên chức, người lao động năm 2023-2024 Nội dung và văn bản về việc tổ chức hội nghị đại.Nội dung và văn bản về việc tổ chức hội nghị đại biểu viên chức, người lao động năm 2023-2024 Nội dung và văn bản về việc tổ chức hội nghị đại biểu viên chức, người lao động năm 2023-2024 Nội dung và văn bản về việc tổ chức hội nghị đại ',
    }
    // console.log('props: ', thongbao)
    return (

        <div div className="card card2 w-100" >
            <div className="card-body2">
                <h4 className="card-title">{dulieutest.title}</h4>
            </div>
            <div className="card-body2">
                <p className="card-text">{dulieutest.text}</p>
            </div>
            <div className="card-body2">
                <p className="card-text">{dulieutest.date}</p>
            </div>
        </div>

    )

}
export default DetailNotification;