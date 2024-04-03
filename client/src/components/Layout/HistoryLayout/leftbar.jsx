import classNames from 'classnames/bind';
import styles from './style.module.scss';
import images from '../../../assets/3.jpg';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';
const cx = classNames.bind(styles);
function Leftbar() {
    return ( <div className={cx('history-left')}>
                <div>
                    <img src={images} alt="" />
                    <span>Quy Nguyen</span>
                </div>
                <div className={cx('history-left-btn')}>
                     <Button variant="contained" color='warning'>Gia Nhập VIP</Button>
                </div>
                <ul>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/history">Lịch sử xem</Link></li>
                    <li><Link to="/favorite">Sưu tập của tôi</Link></li>
                    <li><Link to="/statistic">Thống kê</Link></li>
                    <li><Link to="/logout">Đăng xuất</Link></li>
                </ul>
            </div> );
}

export default Leftbar;