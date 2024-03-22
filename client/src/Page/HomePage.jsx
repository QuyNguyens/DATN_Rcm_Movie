import { useState, useEffect } from 'react';
import './homePage.scss';
import banner1 from './anh1.jpg';import banner2 from './anh2.jpg';import banner3 from './anh3.jpeg';import banner4 from './anh4.jpg';import banner5 from './anh5.jpg';import banner6 from './anh6.jpg';import banner7 from './anh7.jpg';import banner8 from './anh8.jpg';import banner9 from './anh9.jpg';import banner10 from './anh10.jpg';import banner11 from './anh11.jpg';import banner12 from './anh12.jpg';import banner13 from './anh13.jpg';import banner14 from './anh14.jpg';import banner15 from './anh15.jpg';import banner16 from './anh16.jpg';import banner17 from './anh17.jpg';import banner18 from './anh18.jpg';import banner19 from './anh19.jpg';import banner20 from './anh20.jpg';import banner21 from './anh21.jpg';import banner22 from './anh22.jpg';import banner23 from './anh23.jpg';
function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentImageIndexDexuat, setCurrentImageIndexDexuat] = useState(0);
  const [currentImageIndexPhimMoi, setCurrentImageIndexPhimMoi] = useState(0);
  const [currentImageIndexChoVIP, setCurrentImageIndexChoVIP] = useState(0);
  const image = [banner1, banner2, banner3, banner4, banner5];
  const [imagesDeXuat,setImagesDeXuat] = useState([banner6, banner7, banner8, banner9, banner10, banner11]);
  const [imagesPhimMoi,setImagesPhimMoi] = useState([banner12, banner13, banner14, banner15, banner16, banner17]);
  const [imagesChoVIP,setImagesChoVIP] = useState([banner18, banner19, banner20, banner21, banner22, banner23]);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prevSlide => (prevSlide + 1) % 5);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  const nextImageDeXuat = () => {
    setCurrentImageIndexDexuat(prevIndex => {
      const nextIndex = (prevIndex) % imagesDeXuat.length;
      const newImages = [...imagesDeXuat.slice(1), imagesDeXuat[0]];
      setImagesDeXuat(newImages);
      return nextIndex;
    });
    setCurrentSlide(prevSlide => (prevSlide + 1) % 5);
  };
  
  const prevImageDeXuat = () => {
    setCurrentImageIndexChoVIP(prevIndex => {
      const nextIndex = (prevIndex + imagesDeXuat.length) % imagesDeXuat.length;
      const newImages = [imagesDeXuat[imagesDeXuat.length - 1], ...imagesDeXuat.slice(0, imagesDeXuat.length - 1)];
      setImagesDeXuat(newImages);
      return nextIndex;
    });
    setCurrentSlide(prevSlide => (prevSlide - 1 + 5) % 5);
  };

  const nextImagePhimMoi = () => {
    setCurrentImageIndexChoVIP(prevIndex => {
      const nextIndex = (prevIndex) % imagesPhimMoi.length;
      const newImages = [...imagesPhimMoi.slice(1), imagesPhimMoi[0]];
      setImagesPhimMoi(newImages);
      return nextIndex;
    });
    setCurrentSlide(prevSlide => (prevSlide + 1) % 5);
  };
  const prevImagePhimmoi = () => {
    setCurrentImageIndexPhimMoi(prevIndex => {
      const nextIndex = (prevIndex + imagesPhimMoi.length) % imagesPhimMoi.length;
      const newImages = [imagesPhimMoi[imagesPhimMoi.length - 1], ...imagesPhimMoi.slice(0, imagesPhimMoi.length - 1)];
      setImagesPhimMoi(newImages);
      return nextIndex;
    });
    setCurrentSlide(prevSlide => (prevSlide - 1 + 5) % 5);
  };
  const nextImageChoVIP = () => {
    setCurrentImageIndexChoVIP(prevIndex => {
      const nextIndex = (prevIndex) % imagesChoVIP.length;
      const newImages = [...imagesChoVIP.slice(1), imagesChoVIP[0]];
      setImagesChoVIP(newImages);
      return nextIndex;
    });
    setCurrentSlide(prevSlide => (prevSlide + 1) % 5);
  };
  const prevImageChoVIP = () => {
    setCurrentImageIndexChoVIP(prevIndex => {
      const nextIndex = (prevIndex + imagesChoVIP.length) % imagesChoVIP.length;
      const newImages = [imagesChoVIP[imagesChoVIP.length - 1], ...imagesChoVIP.slice(0, imagesChoVIP.length - 1)];
      setImagesChoVIP(newImages);
      return nextIndex;
    });
    setCurrentSlide(prevSlide => (prevSlide - 1 + 5) % 5);
  };

  return (
    <>
      <div className="show-Container">
        <div className="slideshowContainer">
        <img src={image[0]} className={currentSlide === 0 ? "slide active" : "slide"} alt="Banner1" />
        <img src={image[1]} className={currentSlide === 1 ? "slide active" : "slide"} alt="Banner2" />
        <img src={image[2]} className={currentSlide === 2 ? "slide active" : "slide"} alt="Banner3" />
        <img src={image[3]} className={currentSlide === 3 ? "slide active" : "slide"} alt="Banner4" />
        <img src={image[4]} className={currentSlide === 4 ? "slide active" : "slide"} alt="Banner5" />
        </div>
        <div className="dots-container">
          {[0, 1, 2, 3, 4].map(index => (
            <span key={index} className={index === currentSlide ? "dot active" : "dot"} onClick={() => handleDotClick(index)}></span>
          ))}
        </div>
      </div>
      <div className='dexuat-Container'>
        <p>
          <div className="gach"></div>
        </p>
        <p><h1>Đề Xuất</h1></p>
        <p></p>

        <div className="carousel-container">
          <button className="prev" onClick={prevImageDeXuat}>&#10094;</button>
          <div className="carousel-slide">
            {imagesDeXuat.slice(currentImageIndexDexuat, currentImageIndexDexuat + 5).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Slide ${index}`}
                className={index === 0 ? 'active' : ''}
              />
            ))}
          </div>
          <button className="next" onClick={nextImageDeXuat}>&#10095;</button>
        </div>

        <p>
          <div className="gach"></div>
        </p>
      </div>
      <div className='phimmoi-Container'>
        <p>
          <div className="gach"></div>
        </p>
        <p><h1>Phim Mới</h1></p>
        <p></p>

        <div className="phimmoi-container">
          <button className="prev" onClick={prevImagePhimmoi}>&#10094;</button>
          <div className="phimmoi-slide">
            {imagesPhimMoi.slice(currentImageIndexPhimMoi, currentImageIndexPhimMoi + 5).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Slide ${index}`}
                className={index === 0 ? 'active' : ''}
              />
            ))}
          </div>
          <button className="next" onClick={nextImagePhimMoi}>&#10095;</button>
        </div>

        <p>
          <div className="gach"></div>
        </p>
      </div>
      <div className='choVIP-Container'>
        <p>
          <div className="gach"></div>
        </p>
        <p><h1>Dành Cho VIP</h1></p>
        <p></p>

        <div className="choVIP-container">
          <button className="prev" onClick={prevImageChoVIP}>&#10094;</button>
          <div className="choVIP-slide">
            {imagesChoVIP.slice(currentImageIndexChoVIP, currentImageIndexChoVIP + 5).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Slide ${index}`}
                className={index === 0 ? 'active' : ''}
              />
            ))}
          </div>
          <button className="next" onClick={nextImageChoVIP}>&#10095;</button>
        </div>

        <p>
          <div className="gach"></div>
        </p>
      </div>
    </>
  );
}

export default HomePage;
