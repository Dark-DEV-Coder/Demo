import './Notification.scss'
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import { eventWrapper } from '@testing-library/user-event/dist/utils';
import { data_thongbao } from "../data.js"
const Notification = () => {
    const [search, SetSearch] = useState('')
    const onChangSearch = (event) => {
        let result = event.target.value;
        SetSearch(result);
    }
    return (
        <>
            <div className='container-list-nofication'>
                <div className='container-nofication'>
                    <MarkUnreadChatAltIcon sx={{ color: 'tomato', fontSize: '45px', marginTop: '3px', marginLeft: '11%' }} />
                    <h5>THÔNG BÁO MỚI</h5>
                </div>
                <div className='container-search'>
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Tìm kiếm ..." aria-label="Recipient's username" aria-describedby="button-addon2" onChange={(event) => onChangSearch(event)} />
                        {/* <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="button" id="button-addon2"><SearchIcon sx={{ fontSize: '21px' }} /></button>
                        </div> */}
                    </div>
                </div>
                <div className='container-container-list-notification'>
                    <div className='container-list-notification'>
                        {
                            data_thongbao.filter((item) => {
                                return search.toLocaleLowerCase() === '' ? item : item.title.toLocaleLowerCase().includes(search)
                            }).map((item, index) => {
                                return (
                                    <Link className='notifi' to="/thongbao/chitiet">

                                        <div className="card card2 w-100" key={item.id} >
                                            <div className="card-body2">
                                                <h4 className="card-title">{item.title}</h4>
                                            </div>
                                            <div className="card-body2">
                                                <p className="card-text">{item.text}</p>
                                            </div>
                                            <div className="card-body2">
                                                <h6 className="card-text">{item.date}</h6>
                                            </div>
                                            <div className='space'></div>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
export default Notification;