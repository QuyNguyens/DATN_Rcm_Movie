import classNames from "classnames/bind";
import styles from './style.module.scss';
import images from '../../assets/3.jpg';
import Tooltip from '@mui/material/Tooltip';
import { useState } from "react";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const cx = classNames.bind(styles);
function HistoryPage() {
  const [image,setImage] = useState([images,images,images,images,images,images,images,images,images,images]);
    return ( <div className={cx('history')}>
          <div className={cx('history-box')}>
          <h1>Lịch sử xem</h1>
          <div className={cx('history-edit')}>
            <span></span>
            <Tooltip title="Remove All">
            <button type="button" className="btn btn-danger">Remove All</button>
            </Tooltip>
          </div>
          <ul>
            {image && image.map((item,index) =>{
              return <li key = {index}>  
              <div>
                <span></span>
                <p>
                <Tooltip title="Remove" >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                  </svg>
                </Tooltip>

                </p>
              </div>
              <img src={item} alt="" />      
              <span>Trường phong độ</span>
              <div className={cx('history-icon-last')}>
              <Tooltip title="Watch">
                <svg width="60px" height="60px" viewBox="0 0 60 60" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="Btn/Play/Normal" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><circle id="bg" fill="#1CC749" cx="30" cy="30" r="30"></circle><path d="M35.7461509,22.4942263 L45.1405996,36.5858994 C46.059657,37.9644855 45.6871354,39.8270935 44.3085493,40.7461509 C43.8157468,41.0746859 43.2367237,41.25 42.6444487,41.25 L23.8555513,41.25 C22.198697,41.25 20.8555513,39.9068542 20.8555513,38.25 C20.8555513,37.657725 21.0308654,37.078702 21.3594004,36.5858994 L30.7538491,22.4942263 C31.6729065,21.1156403 33.5355145,20.7431187 34.9141006,21.662176 C35.2436575,21.8818806 35.5264463,22.1646695 35.7461509,22.4942263 Z" id="Triangle" fill="#FFFFFF" transform="translate(33.250000, 30.000000) rotate(-270.000000) translate(-33.250000, -30.000000) "></path></g></svg>
              </Tooltip>
              </div>
            </li>
            })}        
          </ul>
        </div>
    </div> );
}

export default HistoryPage;