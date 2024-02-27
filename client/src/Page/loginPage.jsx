import style from './style.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);
function LoginPage() {
    return ( <div className={cx('login')}>
        <span>Hello Loogin</span>
    </div> );
}

export default LoginPage;