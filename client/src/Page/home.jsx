import axios from "axios";
import style from './style.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

const cx = classNames.bind(style);
function Home() {
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

    useEffect(()=>{
        console.log('??????????????????')
        axios.get('http://127.0.0.1:5000/recommend?id=2')
        .then(result => console.log('rmd: ',result.data))
        .catch(err => console.log('err:',err));
    },[])

    useEffect(()=>{
        console.log('into Here')
        let listId = [];
        for(let i=11;i<=28;i++){
            listId.push(i.toString())
        }
        listId.push('6')
        axios.post('https://localhost:7135/api/Movie/get-movie-recommend',listId)
        .then(result => setImageRender(result.data))
        .catch(err => console.log('err2: ',err));
    },[])
    //console.log('imageRender: ',imageRender);
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
                    <div className={cx('home-inf-btn')}>
                        <svg width="60px" height="60px" viewBox="0 0 60 60" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="Btn/Play/Normal" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><circle id="bg" fill="#1CC749" cx="30" cy="30" r="30"></circle><path d="M35.7461509,22.4942263 L45.1405996,36.5858994 C46.059657,37.9644855 45.6871354,39.8270935 44.3085493,40.7461509 C43.8157468,41.0746859 43.2367237,41.25 42.6444487,41.25 L23.8555513,41.25 C22.198697,41.25 20.8555513,39.9068542 20.8555513,38.25 C20.8555513,37.657725 21.0308654,37.078702 21.3594004,36.5858994 L30.7538491,22.4942263 C31.6729065,21.1156403 33.5355145,20.7431187 34.9141006,21.662176 C35.2436575,21.8818806 35.5264463,22.1646695 35.7461509,22.4942263 Z" id="Triangle" fill="#FFFFFF" transform="translate(33.250000, 30.000000) rotate(-270.000000) translate(-33.250000, -30.000000) "></path></g></svg>
                        <svg width="60px" height="60px" viewBox="0 0 60 60" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="Btn/Add/Normal" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><circle id="bg" fillOpacity="0.8" fill="#FFFFFF" cx="30" cy="30" r="30"></circle><path d="M29.3055556,17.25 C29.6890866,17.25 30,17.5609134 30,17.9444444 L30,19.3888889 C30,19.77242 29.6890866,20.0833333 29.3055556,20.0833333 L22.9166667,20.0833333 L22.9166667,39.724 L28.6396082,34.9562398 C29.3713667,34.346441 30.4106369,34.302884 31.1863257,34.8255686 L31.3603918,34.9562398 L37.0833333,39.7254167 L37.0833333,33.5277778 C37.0833333,33.1442467 37.3942467,32.8333333 37.7777778,32.8333333 L39.2222222,32.8333333 C39.6057533,32.8333333 39.9166667,33.1442467 39.9166667,33.5277778 L39.9166667,41.2376789 C39.9166667,42.4112764 38.9652794,43.3627321 37.7916667,43.3627321 C37.3655561,43.3627321 36.9510168,43.2346313 36.6007867,42.9976358 L36.4312748,42.8701491 L30,37.50975 L23.5687252,42.8701491 C22.7234861,43.574515 21.4929682,43.5114751 20.7233835,42.7579578 L20.5758631,42.5980707 C20.3030814,42.2707327 20.1360669,41.8703014 20.0939154,41.4495208 L20.0833333,41.2376789 L20.0833333,20.0833333 C20.0833333,18.5896541 21.2391602,17.3659327 22.7052117,17.2577715 L22.9166667,17.25 L29.3055556,17.25 Z M39.2222222,17.25 C39.6057533,17.25 39.9166667,17.5609134 39.9166667,17.9444444 L39.9163333,21.499 L43.4722222,21.5 C43.8557533,21.5 44.1666667,21.8109134 44.1666667,22.1944444 L44.1666667,23.6388889 C44.1666667,24.02242 43.8557533,24.3333333 43.4722222,24.3333333 L39.9163333,24.333 L39.9166667,27.8888889 C39.9166667,28.27242 39.6057533,28.5833333 39.2222222,28.5833333 L37.7777778,28.5833333 C37.3942467,28.5833333 37.0833333,28.27242 37.0833333,27.8888889 L37.0823333,24.333 L33.5277778,24.3333333 C33.1442467,24.3333333 32.8333333,24.02242 32.8333333,23.6388889 L32.8333333,22.1944444 C32.8333333,21.8109134 33.1442467,21.5 33.5277778,21.5 L37.0823333,21.499 L37.0833333,17.9444444 C37.0833333,17.5609134 37.3942467,17.25 37.7777778,17.25 L39.2222222,17.25 Z" fill="#111319" fillRule="nonzero"></path></g></svg>
                    </div>
                </div>
                <div className={cx('home-adv-lt')} onClick={() => handleIndexht(1,"a")}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </div>
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