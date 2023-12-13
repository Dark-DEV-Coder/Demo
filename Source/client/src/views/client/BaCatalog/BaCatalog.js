import './BaCatalog.scss'
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import SchoolIcon from '@mui/icons-material/School';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';;

const BaCatalog = () => {

    return (
        <div className='container-catalog'>
            <div className="card" >
                <div className="card-body">
                    <CollectionsBookmarkIcon sx={{ fontSize: 40, color: 'white' }} />
                    <h5 className="card-title" >ĐĂNG KÝ KHÓA LUẬN</h5>
                    {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a> */}
                </div>
            </div>
            <div className="card card2" >
                <div className="card-body">
                    <SchoolIcon sx={{ fontSize: 40, color: 'white' }} />
                    <h5 className="card-title">ĐĂNG KÝ CHUYÊN NGÀNH</h5>
                    {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a> */}
                </div>
            </div>
            <div className="card card2" >
                <div className="card-body">
                    <WorkHistoryIcon sx={{ fontSize: 40, color: 'white' }} />
                    <h5 className="card-title">ĐĂNG KÝ THỰC TẬP</h5>
                    {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a> */}
                </div>
            </div>
        </div>
    )
}
export default BaCatalog;