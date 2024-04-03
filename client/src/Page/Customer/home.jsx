import axios from "axios";
import style from './style.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState, useContext } from 'react';
import { MovieContext } from "../../MovieContext";
import Fab from '@mui/material/Fab';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import Box from '@mui/material/Box';
const cx = classNames.bind(style);
function Home() {
    const {movieCol,setMovieCol} = useContext(MovieContext);
    const [indexbg,setIndexbg] = useState(0);
    const [indexht,setIndexht] = useState(0);
    const [indexnew,setIndexnew] = useState(0);
    const [indexrcm,setIndexrcm] = useState(0);
    //----------------------------------------
    const [imageRender,setImageRender] = useState();
    const handleIndexht = (index,check) =>{
        switch(check){
            case "ht":
                if(index==1){
                    if(indexht == imageRender.length-6){
                        setIndexht(0);
                    }else{
                        setIndexht(pre => pre + 6);
                    }
                }else{
                    if(indexht == 0){
                        setIndexht(imageRender.length-6);
                    }else{
                        setIndexht(pre => pre - 6);
                    }
                }
                break;
            case "rcm":
                if(index==1){
                    if(indexrcm == imageRender.length-6){
                        setIndexrcm(0);
                    }else{
                        setIndexrcm(pre => pre + 6);
                    }
                }else{
                    if(indexrcm == 0){
                        setIndexrcm(imageRender.length-6);
                    }else{
                        setIndexrcm(pre => pre - 6);
                    }
                }
                break;
            case "new":
                if(index==1){
                    if(indexnew == imageRender.length-6){
                        setIndexnew(0);
                    }else{
                        setIndexnew(pre => pre + 6);
                    }
                }else{
                    if(indexnew == 0){
                        setIndexnew(imageRender.length-6);
                    }else{
                        setIndexnew(pre => pre - 6);
                    }
                }
                break;
            default :
                if(index==1){
                    if(indexbg == imageRender.length-1){
                        setIndexbg(0);
                    }else{
                        setIndexbg(pre => pre + 1);
                    }
                }else{
                    if(indexbg == 0){
                        setIndexbg(imageRender.length-1);
                    }else{
                        setIndexbg(pre => pre - 1);
                    }
                }
        }
    }

    // useEffect(()=>{
    //     const timer = setTimeout(() => {
    //         if(indexbg == imagebg.length-1){
    //             setIndexbg(0);
    //         }else{
    //             setIndexbg(pre => pre + 1); 
    //         }
    //     }, 2000);

    //     return () => clearTimeout(timer); 
    // });

    // useEffect(()=>{
    //     console.log('??????????????????')
    //     axios.get('http://127.0.0.1:5000/recommend?id=2')
    //     .then(result => console.log('rmd: ',result.data))
    //     .catch(err => console.log('err:',err));
    // },[])

    useEffect(()=>{
        let listId = [];
        for(let i=11;i<=28;i++){
            listId.push(i.toString())
        }
        listId.push('6')
        axios.post('https://localhost:7135/api/Movie/get-movie-recommend',listId)
        .then(result => setImageRender(result.data))
        .catch(err => console.log('err2: ',err));
    },[])

    const handleAddFavorite = (index) =>{
        // axios.
    }
    return ( 
        <div className={cx("home-page")}>
            { imageRender && <div className={cx('home-adv')} style={{ backgroundImage: `url(${imageRender[indexbg]?.urls})` }}>
                <div onClick={() => handleIndexht(0,"a")}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </div>

                <div className={cx('home-inf')}>
                    <h1>{imageRender[indexbg]?.title}</h1>
                    <p>
                        <svg width="16px" height="16px" viewBox="0 0 28 27" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="V1.12.0_UI_4391_Watch-Page-Add-Rating" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g id="4391-6_1920_info" transform="translate(-948.000000, -906.000000)" fill="#1CC749" fillRule="nonzero"><g id="Group-10-Copy-10" transform="translate(906.000000, 880.000000)"><g id="ic/star_green" transform="translate(40.000000, 24.000000)"><path d="M16.7983826,2.56356746 L19.7968803,11.2875241 L29.1657516,11.3941138 C29.9719564,11.4033379 30.3057022,12.4128653 29.6590696,12.8853446 L22.1424877,18.3829131 L24.9344802,27.1724634 C25.17436,27.9288402 24.3014061,28.55198 23.643301,28.0938493 L16.0005215,22.7674392 L8.35669898,28.0928244 C7.69963687,28.5509551 6.82563997,27.9267904 7.06551979,27.1714385 L9.85751226,18.3818882 L2.34093036,12.8843197 C1.69429781,12.4118404 2.02804364,11.402313 2.83424842,11.3930889 L12.2031197,11.2864992 L15.2016174,2.56254256 C15.4602704,1.81231509 16.5407725,1.81231509 16.7983826,2.56356746 Z" id="Star"></path></g></g></g></g></svg>
                        <span>{imageRender[indexbg]?.voteAverage}</span>
                        <b>2024</b>
                    </p>
                    <div>
                        <span>Trung Quốc</span>
                        <span>Fiction</span>
                        <span>Action</span>
                    </div>
                    <p className={cx('home-inf-desc')}>{imageRender[indexbg]?.descriptions}</p>
                    <Box sx={{ '& > :not(style)': { m: 1 } }}>
                        <Fab color="success" aria-label="add">
                            <PlayCircleIcon />
                        </Fab>
                        <Fab onClick={() => handleAddFavorite(indexbg)} color="primary" aria-label="add">
                            <BookmarkAddIcon />
                        </Fab>
                    </Box>
                </div>
                <div className={cx('home-adv-lt')} onClick={() => handleIndexht(1,"a")}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </div>
            </div>}
            {movieCol && imageRender && <div className={cx('home-movie')}>
                <h3>Phim chọn lọc</h3>
                <ul>
                    <div onClick={() => handleIndexht(0,"ht")}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                    </div>

                    <div className={cx('home-movie-uld')} onClick={() => handleIndexht(1,"ht")}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    </div>
                    { imageRender.slice(indexht,indexht+6).map((item,index) =>{
                            return <li key={index}>
                                    <img src={item.urls} alt="" />
                                    <span>{item.title}</span>
                                </li>
                    })
                    }
                </ul>
            </div>}
            {imageRender&&<div className={cx('home-movie')}>
                <h3>Đề xuất hot</h3>
                <ul>
                    <div onClick={() => handleIndexht(0,"ht")}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                    </div>

                    <div className={cx('home-movie-uld')} onClick={() => handleIndexht(1,"ht")}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    </div>
                    { imageRender.slice(indexht,indexht+6).map((item,index) =>{
                            return <li key={index}>
                                    <img src={item.urls} alt="" />
                                    <span>{item.title}</span>
                                </li>
                    })
                    }
                </ul>
            </div>}
            {imageRender && <div className={cx('home-movie')}>
                <h3>Phim Mới</h3>
                <ul>
                    <div onClick={() => handleIndexht(0,"new")}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                    </div>

                    <div className={cx('home-movie-uld')} onClick={() => handleIndexht(1,"new")}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    </div>
                    { imageRender.slice(indexnew,indexnew+6).map((item,index) =>{
                            return <li key={index}>
                                    <img src={item.urls} alt="" />
                                    <span>{item.title}</span>
                                </li>
                    })
                    }
                </ul>
            </div>}
            {imageRender && <div className={cx('home-movie')}>
                <h3>Phim Recommend</h3>
                <ul>
                    <div onClick={() => handleIndexht(0,"rcm")}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                    </div>

                    <div className={cx('home-movie-uld')} onClick={() => handleIndexht(1,"rcm")}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    </div>
                    { imageRender.slice(indexrcm,indexrcm+6).map((item,index) =>{
                            return <li key={index}>
                                    <img src={item.urls} alt="" />
                                    <span>{item.title}</span>
                                </li>
                    })
                    }
                </ul>
            </div>}
    </div> );
}

export default Home;