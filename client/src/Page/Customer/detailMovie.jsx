import classNames from "classnames/bind";
import styles from './style.module.scss';
import { useContext, useEffect, useRef, useState } from "react";
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useParams,useNavigate } from 'react-router-dom';
import { MovieContext } from "../../MovieContext";
import  axios from "axios";
import { UserContext } from "../../UserContext";
import ReactPlayer from 'react-player';
const cx = classNames.bind(styles);

function DetailMovie() {
    const [descMore,setDescMore] = useState(false);
    const [valuerating,setvaluerating] = useState(2);
    const [movieDisplay, setMovieDisplay] = useState();
    const { id } = useParams(); 
    const navigate = useNavigate();
    const {movieCol,setIsOpenVip} = useContext(MovieContext);
    const {user} = useContext(UserContext);
    const videoRef = useRef(null);
    const [currentMinute, setCurrentMinute] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        let intervalId;
    
        if (isPlaying) {
          intervalId = setInterval(() => {
            setCurrentMinute(prevMinute => prevMinute + 1);
          }, 1000);
        } else {
          clearInterval(intervalId);
        }
    
        return () => clearInterval(intervalId);
      }, [isPlaying]);

    // Get the movie 
    useEffect(()=>{
        window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
        axios.get(import.meta.env.VITE_GET_MOVIE_BY_ID+id)
        .then(result => setMovieDisplay(result.data))
        .catch(err => console.log("errDetail: ", err))
    },[id])
    
    const handleRating = (movieId,newValue) =>{
        setvaluerating(newValue);
        const dataRating = {
                userId: user.userId,
                movieId: movieId,
                rating: newValue
        }
        axios.post(import.meta.env.VITE_POST_RATING,dataRating)
        .then(result => console.log('you are rated the movie: ', result))
        .catch(err => console.log('failed to rating: ',err));
    }

    const handleTransferPage = (movieId) =>{
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        navigate(`/detail-movie/${movieId}`);
    }
    
    return ( 
        <div className={cx('detail-movie')}>
            <div className={cx('detail-movie-box')}>
                <div className={cx('detail-movie-left')}>
                    <div className={cx('detail-movie-left-fr')}>                           
                        <ReactPlayer
                            onPlay={() => setIsPlaying(true)}
                            onPause={() => setIsPlaying(false)}
                            ref = {videoRef}
                            url='https://imdb-video.media-imdb.com/vi1611315993/1434659607842-pgv4ql-1535575980897.mp4?Expires=1713360130&amp;Signature=pnfR7TAlzgvZlfibo8Hc190WuYQgPELzoJIJOaM8MYvrGFzmsgAlap~C5Cll7RqkkvkY3Vpx~JxkiMo9OA69zN-CeGlbPE~gP21GXePeIjRwTEudtvSgkXggADc4YphXFhriDlpSZNwbL0Z4wjOpY4t2mmEy44TmF1p2jEOYLV4kHOGO7YdysP0WSKXkWxA15tZc4Nt1skVvokIpjpmw-NPO5dKnf2xc5ujEufty~-4k-63srf~78w-ux9RaoWo4zUl-gPB836g0b~CCXaMxW3uW1MI2MRKof6yFIdw~MWQmvArdLNOhLJTMunUAIJ-mhb7anlV0XRa58A9sekN4Tg__&amp;Key-Pair-Id=APKAIFLZBVQZ24NQH3KA'
                            controls={true}
                            width='100%'
                            height='100%'
                        />
                    </div>
                    <h2>{movieDisplay?.title}</h2>
                    <p className={cx('detail-movie-left-rt')}>
                        <svg width="16px" height="16px" viewBox="0 0 28 27" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="V1.12.0_UI_4391_Watch-Page-Add-Rating" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g id="4391-6_1920_info" transform="translate(-948.000000, -906.000000)" fill="#1CC749" fillRule="nonzero"><g id="Group-10-Copy-10" transform="translate(906.000000, 880.000000)"><g id="ic/star_green" transform="translate(40.000000, 24.000000)"><path d="M16.7983826,2.56356746 L19.7968803,11.2875241 L29.1657516,11.3941138 C29.9719564,11.4033379 30.3057022,12.4128653 29.6590696,12.8853446 L22.1424877,18.3829131 L24.9344802,27.1724634 C25.17436,27.9288402 24.3014061,28.55198 23.643301,28.0938493 L16.0005215,22.7674392 L8.35669898,28.0928244 C7.69963687,28.5509551 6.82563997,27.9267904 7.06551979,27.1714385 L9.85751226,18.3818882 L2.34093036,12.8843197 C1.69429781,12.4118404 2.02804364,11.402313 2.83424842,11.3930889 L12.2031197,11.2864992 L15.2016174,2.56254256 C15.4602704,1.81231509 16.5407725,1.81231509 16.7983826,2.56356746 Z" id="Star"></path></g></g></g></g></svg>
                        <span>{movieDisplay?.voteAverage}</span> 
                        ({movieDisplay?.voteCount} người đã đánh giá)                       
                    </p>
                    <div className={cx('detail-movie-left-gr')}>
                        {
                            movieDisplay?.genres.map((item, index) =>{
                                return <span key={index}>{item}</span>
                            })
                        }
                    </div>
                    <div className={cx('detail-movie-left-ds')}>
                        <p style={{ maxHeight: descMore ? 'none' : '2.6em' }}>
                            <span>Miêu tả: </span>
                            {movieDisplay?.descriptions}
                        </p>
                        <div>
                            <span></span>
                            <button onClick={() => setDescMore(pre => !pre)}>{ descMore ?'Thu gọn' :'Hiển thị thêm ...'}</button>
                        </div>
                    </div>
                    <ul>
                        {movieCol?.movieNew.map((item,index) =>{
                            return <li key={index} >
                                    <div>
                                        <img src={item.urls} alt="" />
                                    </div>
                                    <b>{item.title}</b>
                                    <span>Diễn viên chính</span>
                                    </li>
                        })}
                    </ul>
                    <div className={cx('detail-movie-left-dx')}>
                        <h3>Đề xuất cho bạn</h3>
                        <ul>
                            {movieCol?.movieRcm.map((item,index) =>{
                                return <li key={index} onClick={() => handleTransferPage(item.movieId)}>
                                    <div>
                                        <img src={item.urls} alt="" />
                                    </div>
                                    <b>{item.title}</b>
                                    <Box className={cx('div-icon')} sx={{ '& > :not(style)': { m: 1 }, display:'flex' }}>
                                        <Fab onClick={() => setIdMovie(item.movieId)} color="success" aria-label="add">
                                            <PlayCircleIcon />
                                        </Fab>

                                        <Fab color="primary" aria-label="add">
                                            <BookmarkAddIcon />
                                        </Fab>
                                    </Box>
                                </li>
                            })}
                        </ul>
                    </div>
                </div>
                <div className={cx('detail-movie-right')}>
                    <div className={cx('detail-movie-right-on')}>
                        <h1>{movieDisplay?.title}</h1>
                        <p>Diễn viên: 
                            {
                                movieDisplay?.actors.map((item,index) =>{
                                    return <span key={index}>{item} ,</span>
                                })
                            }
                        </p>
                        <p>Thể loại: 
                            {
                                movieDisplay?.genres.map((item,index) =>{
                                    return <span key={index}>{item} ,</span>
                                })
                            }
                        </p>
                        <p>Quốc gia: 
                        {
                                movieDisplay?.countrys.map((item,index) =>{
                                    return <span key={index}>{item} ,</span>
                                })
                            }
                        </p>
                        <p>Năm sản xuất: <span>2024</span></p>
                        <p>Vote count: <span>{movieDisplay?.voteCount}</span></p>
                        <p>Vote average: <span>{movieDisplay?.voteAverage}</span></p>
                        <div>
                            <Typography component="legend">Đánh giá phim: </Typography>
                            <Rating
                                name="simple-controlled"
                                valuerating={valuerating}
                                onChange={(event, newValue) => handleRating(movieDisplay?.movieId,newValue)}
                            />
                        </div>
                    </div>
                    <Box sx={{width: '100%', padding: '30px 0', borderTop: '1px solid var(--borderLeftbar)',borderBottom: '1px solid var(--borderLeftbar)'}}>
                        <Button onClick={() => setIsOpenVip(2)} fullWidth variant="contained" color='warning'>Gia Nhập VIP</Button>
                    </Box>
                    <div className={cx('detail-movie-right-ht')}>
                        <h3>Phim Hot</h3>
                        <ul>
                            {movieCol?.movieHot.map((item,index) =>{
                                return <li key={index} onClick={() => handleTransferPage(item.movieId)}>
                                    <div>
                                        <img src={item.urls} alt="" />
                                    </div>
                                    <p>
                                        <b>{item.title}</b><br />
                                        <span>{item.descriptions}</span>
                                    </p>
                                </li>
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default DetailMovie;