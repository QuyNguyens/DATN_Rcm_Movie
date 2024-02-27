//import axios from "axios";
import style from './style.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);
function Home() {
    // const getApi = () =>{
    //     axios.get('http://127.0.0.1:5000/member')
    //     .then(result => console.log(result))
    //     .catch(err => console.log(err));
    // }
    // const getApi2 = () =>{
    //     axios.get('https://localhost:7114/WeatherForecast')
    //     .then(result => console.log('result2: ',result))
    //     .catch(err => console.log('err2: ',err));

    // }
    return ( <div >
        <span className={cx('spantag')}>
            Hello Home Page
        </span>
    </div> );
}

export default Home;