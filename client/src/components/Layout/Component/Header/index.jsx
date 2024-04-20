import classNames from 'classnames/bind';
import style from './Header.module.scss';
import { useEffect, useState, useRef, useContext, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LogoutIcon from '@mui/icons-material/Logout';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import CastleIcon from '@mui/icons-material/Castle';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import logo from '../../../../assets/1.jpeg';
import { UserContext } from "../../../../UserContext";
import { MovieContext } from "../../../../MovieContext";
import { notify } from '../Notify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(style);
function Header() {
    const {user,setUser} = useContext(UserContext);
    const {movieCol,setMovieCol,searchMovie,setSearchMovie,isOpenVip,setIsOpenVip} = useContext(MovieContext);
    const [isCountry,setIsCountry] = useState(false);
    const [isGenre,setIsGenre] = useState(false);
    const [isAvatar,setIsAvatar] = useState(false);
    const [country,setCountry] = useState();
    const [genre,setGenre] = useState();
    const [openLogin, setOpenLogin] = useState(false);
    const [openSignUp, setOpenSignUp] = useState(false);
    const [isEmailErr,setIsEmailErr] = useState(false);
    const [isEmailErrLogin,setIsEmailErrLogin] = useState(false);
    const [isPasswordErrLogin,setIsPasswordErrLogin] = useState(false);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const userLogin = useRef({
        Email: '',
        Password: ''
      });
    const userSignUp = useRef({
        Email:'',
        Password:''
    })

    const handleSetLogin = (e, check) =>{
        if(isEmailErrLogin == true){
            setIsEmailErrLogin(false);
            setIsPasswordErrLogin(false);
        }
        switch(check){
            case 0:
                userLogin.current.Email = e.target.value;
                break;
            case 1:
                userLogin.current.Password = e.target.value;
                break;
            case 2:
                userSignUp.current.Email = e.target.value;
                break;
            default :
                userSignUp.current.Password = e.target.value;
        }
    }

    const handleLogout = () =>{
        setUser(null);
    }

    //get user
    const handleLogin = () =>{
        axios.post(import.meta.env.VITE_POST_SIGNIN,userLogin.current)
        .then(data => {
            notify('Login success');
            let listId = [];
            for(let i=12;i<=17;i++){
                listId.push(i.toString())
            }
            axios.post(import.meta.env.VITE_GET_RECOMMEND,listId)
            .then(result => {
                const newMovie = {...movieCol};
                newMovie.movieRcm = result.data;
                setMovieCol(newMovie);
                setSearchMovie([...searchMovie,...result.data])
                })
            .catch(err => console.log('err2: ',err));
            setUser(data.data); 
        })
        .catch(err => {
            if(err.response.data?.status == 400){
                setIsEmailErrLogin(true);
            }else{
                setIsPasswordErrLogin(true);
            }
        });
    }

    //create user
    const handleSignUp = () =>{
        axios.post(import.meta.env.VITE_POST_SIGNUP,userSignUp.current)
        .then(() => {
            notify('Login success');
            setIsEmailErr(false);})
        .catch(() => setIsEmailErr(true));
    }
    //handle Close the dialog login
    function handleClose() {
        setOpenLogin(false);
        setOpenSignUp(false);
        setIsOpenVip(false);
    }
    
    const handleClickOpen = (check) => {
        if(check == 0){
            setOpenSignUp(true);
        }else if(check == 1){
            setOpenLogin(true);
            setOpenSignUp(false);
        }else{
            setIsOpenVip(true);
        }
    };

    // get country and genre
    useEffect(()=> {
        axios.get(import.meta.env.VITE_GET_GENRE)
        .then(result => setGenre(result.data))
        .catch(err => console.log(err));
        axios.get(import.meta.env.VITE_GET_COUNTRY)
        .then(result => setCountry(result.data))
        .catch(err => console.log(err));
    },[])

    //get by country
    const handleColabrate = (colabrate,check) =>{
        if(check == 0){
            console.log('abc: ', (import.meta.env.VITE_GET_BY_COUNTRY+colabrate))
            axios.get(import.meta.env.VITE_GET_BY_COUNTRY+colabrate)
            .then(result =>{
                var newMovieCol = {...movieCol};
                newMovieCol.movieClb = result.data;
                setMovieCol(newMovieCol);
            })
            .catch(err => console.log(err))
        }else{
            axios.get(import.meta.env.VITE_GET_BY_GENRE+colabrate)
            .then(result => setMovieCol(result.data))
            .catch(err => console.log(err))
        }
    }
    const handleDetailMovie =(index) =>{
        axios.post(import.meta.enc.VITE_POST_HISTORY,{userId:user.userId,movieId: index})
        .then(result => console.log('add to history: ',result))
        .catch(err => console.log('failed to add history: ', err));
        setSearch('');
        navigate(`/detail-movie/${index}`);
    }
    const handleToHistory = () =>{
        if(user == null){
            setOpenLogin(true)
        }else{
            navigate('/history')
        }
    }
    return ( <div className={cx('header')}>
                <div className={cx('header-left')}>
                    <Link to="/">
                        <svg width="82px" height="26px" viewBox="0 0 82 26" version="1.1" xmlns="http://www.w3.org/2000/svg"><title>画板</title><g id="画板" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g id="logo-顶导"><rect id="矩形" fill="#D8D8D8" opacity="0" x="0" y="0" width="82" height="26"></rect><path d="M40.730699,25.553536 C40.730699,25.6709712 40.8335468,25.7660629 40.9604205,25.7660629 L46.4314792,25.7660629 C46.5583529,25.7660629 46.6612007,25.6709712 46.6612007,25.553536 L46.6612007,0.922970695 C46.6612007,0.805535552 46.5583529,0.710337902 46.4314792,0.710337902 L40.9604205,0.710337902 C40.8335468,0.710337902 40.730699,0.805535552 40.730699,0.922970695 L40.730699,25.553536 Z M0.508790868,25.553536 C0.508790868,25.6709712 0.611638638,25.7660629 0.738512321,25.7660629 L6.20957109,25.7660629 C6.33644478,25.7660629 6.43929255,25.6709712 6.43929255,25.553536 L6.43929255,10.0477555 C6.43929255,9.93032033 6.33644478,9.83522857 6.20957109,9.83522857 L0.738512321,9.83522857 C0.611638638,9.83522857 0.508790868,9.93032033 0.508790868,10.0477555 L0.508790868,25.553536 Z M24.3947744,20.3676149 C20.4314471,21.0880038 16.6121699,18.3688878 15.8809602,14.3064155 C15.1497505,10.2438372 17.7792181,6.35269945 21.7425454,5.63231056 C25.7058728,4.91202756 29.52515,7.63103764 30.2563597,11.6936159 C30.9875694,15.7560882 28.3581018,19.647226 24.3947744,20.3676149 Z M37.1201838,21.5332831 L34.4135803,19.3501966 C34.3577306,19.3051922 34.3213756,19.2433508 34.3074659,19.176956 C34.2934508,19.1104553 34.3017755,19.0394012 34.3353908,18.9758655 C35.6298395,16.5317532 36.1463967,13.6516801 35.6185642,10.7189783 C34.3684791,3.7734679 27.7362732,-0.835729119 20.8051133,0.424077827 C13.8739534,1.68377888 9.26867052,8.33554261 10.5187557,15.281053 C11.7688408,22.2264576 18.4010467,26.8356546 25.3322066,25.5759535 C27.259127,25.2256601 29.0057477,24.458043 30.4972511,23.3837603 C30.6074752,23.3044465 30.7560565,23.3068821 30.8617495,23.3921258 L33.7649861,25.7338397 C33.863408,25.8132594 34.0091441,25.7951517 34.0903897,25.6933887 L37.15127,21.8613391 C37.2325155,21.7595761 37.2186057,21.6127027 37.1201838,21.5332831 Z M81.7702785,0.710390848 L76.2992198,0.710390848 C76.1723461,0.710390848 76.0694983,0.805588498 76.0694983,0.922917749 L76.0694983,25.553589 C76.0694983,25.6709182 76.1723461,25.7661159 76.2992198,25.7661159 L81.7702785,25.7661159 C81.8971522,25.7661159 82,25.6709182 82,25.553589 L82,0.922917749 C82,0.805588498 81.8971522,0.710390848 81.7702785,0.710390848 Z M3.47406278,0.219238745 C1.55536177,0.219238745 0,1.78221685 0,3.71031342 C0,5.63840998 1.55536177,7.20138809 3.47406278,7.20138809 C5.3927638,7.20138809 6.94812556,5.63840998 6.94812556,3.71031342 C6.94812556,1.78221685 5.3927638,0.219238745 3.47406278,0.219238745 Z M73.1731639,0.710390848 L67.3432971,0.710390848 C67.242873,0.710390848 67.1504575,0.761642976 67.1032487,0.843815808 L61.6862482,10.5227377 C61.6862482,10.5227377 61.656639,10.5774628 61.6129513,10.5921373 L61.5934113,10.5956979 C61.5528675,10.594586 61.5209779,10.5541019 61.507567,10.5339293 L61.5006797,10.5227377 L61.5006797,10.5227377 L56.0836792,0.843815808 C56.0364704,0.761642976 55.9440549,0.710390848 55.8435255,0.710390848 L50.013764,0.710390848 C49.8578063,0.710390848 49.6786657,0.871877407 49.8068039,1.11288948 L58.4715178,15.7632678 C58.5544494,15.9047406 58.5981807,16.0659095 58.5981807,16.2301492 L58.5981807,25.51102 C58.5981807,25.6518575 58.7117769,25.7661159 58.8520335,25.7661159 L64.3348945,25.7661159 C64.4750456,25.7661159 64.5887472,25.6518575 64.5887472,25.51102 L64.5887472,16.2301492 C64.5887472,16.0659095 64.6324786,15.9047406 64.7154101,15.7632678 L73.380124,1.11288948 C73.5081568,0.871877407 73.3290162,0.710390848 73.1731639,0.710390848 Z" id="形状" fill="#00DC5A"></path></g></g></svg>
                    </Link>
                    <div>
                        <button >Đề Xuất</button>
                    </div>
                    <div onMouseEnter={() => setIsCountry(true)} onMouseLeave={() => setIsCountry(false)}>
                        <button>Quốc gia</button>
                        {isCountry && (
                            <ul>
                                {country?.map((item, index) => (
                                    <li key={index} onClick={() => handleColabrate(item.nameContry,0)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                                        </svg>
                                        <span>{item.nameContry}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div onMouseEnter={() => setIsGenre(true)} onMouseLeave={() => setIsGenre(false)}>
                        <button>Thể Loại</button>
                        {isGenre && (
                            <ul>
                                {genre?.map((item, index) => (
                                    <li key={index} onClick={() => handleColabrate(item.nameGenre,1)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                                        </svg>
                                        <span>{item.nameGenre}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
                <ToastContainer/>
                <div className={cx('header-right')}>
                    <div className={cx('header-right-search')}>
                        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm kiếm phim..." />
                        <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg"><title>icon/search</title><g id="控件" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g id="icon/search" fill="#FFFFFF" fillRule="nonzero"><path d="M11.5,4 C15.6421356,4 19,7.35786438 19,11.5 C19,13.2425442 18.4057323,14.8462897 17.408807,16.1196265 L20.1793786,18.890165 C20.3746408,19.0854272 20.3746408,19.4020097 20.1793786,19.5972718 L19.4722718,20.3043786 C19.2770097,20.4996408 18.9604272,20.4996408 18.765165,20.3043786 L15.9775948,17.5173134 C14.7279648,18.4487017 13.1783637,19 11.5,19 C7.35786438,19 4,15.6421356 4,11.5 C4,7.35786438 7.35786438,4 11.5,4 Z M11.5,6 C8.46243388,6 6,8.46243388 6,11.5 C6,14.5375661 8.46243388,17 11.5,17 C14.5375661,17 17,14.5375661 17,11.5 C17,8.46243388 14.5375661,6 11.5,6 Z" id="形状结合"></path></g></g></svg>
                    {search !='' && <ul>
                    {searchMovie
                        .filter((item) => {
                            return search.toLowerCase() === ''
                            ? item
                            : item.title.toLowerCase().includes(search);
                        })
                        .map((item, index) =>{
                            return <li key={index}>
                                <p onClick={() => handleDetailMovie(item.movieId)}>{index} {item.title}</p>
                            </li>
                        })
                    }
                    </ul>}
                    </div>
                    <div className={cx('header-history')}>
                        <p onClick={() => handleToHistory()}>
                            <svg width="32px" height="32px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><title>icon/history</title><g id="控件" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g id="icon/playlist/normal" fill="#FFFFFF"><path d="M16,6 C21.5228475,6 26,10.4771525 26,16 C26,21.5228475 21.5228475,26 16,26 C10.4771525,26 6,21.5228475 6,16 C6,10.4771525 10.4771525,6 16,6 Z M16,8 C11.581722,8 8,11.581722 8,16 C8,20.418278 11.581722,24 16,24 C20.418278,24 24,20.418278 24,16 C24,11.581722 20.418278,8 16,8 Z" id="形状结合" fillRule="nonzero"></path><path d="M15.5,11 L16.5,11 C16.7761424,11 17,11.2238576 17,11.5 L17,13.7 L17,13.7 L17,15.9 C17,16.1761424 16.7761424,16.4 16.5,16.4 L15.5,16.4 C15.2238576,16.4 15,16.1761424 15,15.9 L15,13.7 L15,13.7 L15,11.5 C15,11.2238576 15.2238576,11 15.5,11 Z" id="矩形"></path><path d="M17.0414317,14.2544733 L18.0414317,14.2544733 C18.317574,14.2544733 18.5414317,14.478331 18.5414317,14.7544733 L18.5414317,16.7544733 L18.5414317,16.7544733 L18.5414317,18.7544733 C18.5414317,19.0306157 18.317574,19.2544733 18.0414317,19.2544733 L17.0414317,19.2544733 C16.7652893,19.2544733 16.5414317,19.0306157 16.5414317,18.7544733 L16.5414317,16.7544733 L16.5414317,16.7544733 L16.5414317,14.7544733 C16.5414317,14.478331 16.7652893,14.2544733 17.0414317,14.2544733 Z" id="矩形备份" transform="translate(17.541432, 16.754473) rotate(124.000000) translate(-17.541432, -16.754473) "></path></g></g></svg>
                            <span >Lịch sử xem</span>
                        </p>
                    </div>
                    {user ?
                    <Box sx={{display:'flex',alignItems:'center'}}><span style={{marginRight:'10px'}}>{user.userName}</span> 
                    <Box onMouseEnter={() => setIsAvatar(true)} onMouseLeave={() => setIsAvatar(false)} sx={{position:'relative'}}>
                        <Avatar alt="Remy Sharp" src={logo}/>
                        {
                            isAvatar && <Box sx={{backgroundColor: 'white !important',zIndex:'100',width:'170px', display:'flex',flexDirection:'column', padding:'10px',borderRadius:'10px', position:'absolute',bottom:'-205px',left:'-60px'}}>
                                <Link style={{margin:'5px 0',textDecoration:'none',color:'black',fontWeight:'600',fontSize:'18px'}} to="/profile">
                                    <Button fullWidth variant="outlined" startIcon={<AccountBoxIcon />}>
                                            Profile
                                    </Button>
                                </Link>
                                <Link style={{margin:'5px 0',textDecoration:'none',color:'black',fontWeight:'600',fontSize:'18px'}} to="/favorite">
                                    <Button fullWidth variant="outlined" startIcon={<FavoriteBorderIcon />}>
                                        Sở thích
                                    </Button>   
                                </Link>
                                <Link style={{margin:'5px 0',textDecoration:'none',color:'black',fontWeight:'600',fontSize:'18px'}} to="/statistic">
                                    <Button fullWidth variant="outlined" startIcon={<AutoGraphIcon />}>
                                        Thống kê
                                    </Button>
                                </Link>
                                <Link to="/" style={{margin:'5px 0',textDecoration:'none',color:'black',fontWeight:'600',fontSize:'18px'}} >
                                    <Button onClick={handleLogout} fullWidth variant="outlined" startIcon={<LogoutIcon />}>
                                        Đăng xuất
                                    </Button>   
                                </Link>

                            </Box>
                        }
                    </Box>
                    </Box>:
                    <div>
                        <Tooltip title="Login">
                                <Button onClick={() => setOpenLogin(true)} variant="contained">Login</Button>
                        </Tooltip>         
                        <Dialog
                            open={openLogin}
                            onClose={handleClose}
                            PaperProps={{
                                component: 'form'
                            }}
                            >
                            <DialogTitle textAlign='center' fontSize='30px'>Login</DialogTitle>
                            <DialogContent>
                                <DialogContentText maxWidth='400px'>
                                To subscribe to this website, please enter your email address here. We
                                will send updates occasionally.
                                </DialogContentText>
                                <TextField
                                onChange={(e) => handleSetLogin(e,0)}
                                autoFocus
                                required
                                margin="dense"
                                name="email"
                                label="Email Address"
                                type="email"
                                fullWidth
                                variant="standard"
                                />
                                 {isEmailErrLogin && <span style={{color:'red',fontSize:'14px'}}>The email is wrong!!!. Please try again.</span>}
                                <TextField
                                onChange={(e) => handleSetLogin(e,1)}
                                autoFocus
                                required
                                margin="dense"
                                name="password"
                                label="password"
                                type="password"
                                fullWidth
                                variant="standard"
                                />
                                 {isPasswordErrLogin && <span style={{color:'red',fontSize:'14px'}}>The password is wrong!!!. Please try again.</span>}
                                <div style={{height:"15px"}}></div>
                           
                                <Button fullWidth variant="outlined" color='warning' startIcon={<GoogleIcon />}>
                                    Continue with Google 
                                </Button>
                                <div style={{height:"15px"}}></div>
                                <Button fullWidth variant="outlined" startIcon={<FacebookIcon />}>
                                Continue with Facebook 
                                </Button>
                                <div style={{height:"25px"}}></div>
                                <p style={{textAlign:'center'}}>Don't have any account? 
                                <Fragment>
                                    <Link onClick={() => handleClickOpen(0)}>Sign Up</Link>
                                    <Dialog
                                        open={openSignUp}
                                        onClose={handleClose}
                                        PaperProps={{
                                            component: 'form'
                                        }}
                                        >
                                        <DialogTitle textAlign='center' fontSize='30px'>Sign Up</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText maxWidth='400px'>
                                            Are you ready enjoy the moment with our, please enter your email address here. We
                                            will send updates occasionally.
                                            </DialogContentText>
                                            <TextField
                                            onChange={(e) => handleSetLogin(e,2)}
                                            autoFocus
                                            required
                                            margin="dense"
                                            name="email"
                                            label="Email Address"
                                            type="email"
                                            fullWidth
                                            variant="standard"
                                            />
                                            {isEmailErr && <span style={{color:'red',fontSize:'14px'}}>The email alreay existing!!!. Please try again.</span>}
                                            <TextField
                                            onChange={(e) => handleSetLogin(e,3)}
                                            autoFocus
                                            required
                                            margin="dense"
                                            name="password"
                                            label="password"
                                            type="password"
                                            fullWidth
                                            variant="standard"
                                            />
                                            <div style={{height:"15px"}}></div>
                                    
                                            <Button fullWidth variant="outlined" color='warning' startIcon={<GoogleIcon />}>
                                                Continue with Google 
                                            </Button>
                                            <div style={{height:"15px"}}></div>
                                            <Button fullWidth variant="outlined" startIcon={<FacebookIcon />}>
                                            Continue with Facebook 
                                            </Button>
                                            <div style={{height:"25px"}}></div>
                                            <p style={{textAlign:'center'}}>Already have a account? <Link onClick={() => handleClickOpen(1)}>Login</Link>
                                            </p>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleClose}>Cancel</Button>
                                            <Button variant="contained" color='success' onClick={handleSignUp}>Sign Up</Button>
                                        </DialogActions>
                                        </Dialog>
                                </Fragment>
                                
                                </p>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() =>handleClose(0)}>Cancel</Button>
                                <Button variant="contained" color='primary' onClick={handleLogin}>Login</Button>
                            </DialogActions>
                        </Dialog>
                        
                    </div>
                    
                    }
                    <Tooltip title="VIP" >
                        <Fragment>
                            <Button onClick={() => handleClickOpen(2)} style={{marginLeft:'15px'}} variant="contained" color='warning' startIcon={<CastleIcon />}>
                                VIP
                            </Button>
                            <Dialog
                                open={isOpenVip}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">
                                {"Use Google's location service?"}
                                </DialogTitle>
                                <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Let Google help apps determine location. This means sending anonymous
                                    location data to Google, even when no apps are running.
                                </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                <Button onClick={handleClose}>Disagree</Button>
                                <Button onClick={handleClose} autoFocus>
                                    Agree
                                </Button>
                                </DialogActions>
                            </Dialog>
                            </Fragment>
                    </Tooltip>
                </div>
        </div> );
}

export default Header;