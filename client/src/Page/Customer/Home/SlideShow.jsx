import  { useState, useEffect } from 'react';
import './slideshow.css';
import image1 from '../../../assets/anh8.jpg';
import image2 from '../../../assets/anh9.jpg';
import image3 from '../../../assets/anh10.jpg';
import image4 from '../../../assets/anh11.jpg';
import image5 from '../../../assets/anh12.jpg';

const images = [
  image1,image2,image3,image4,image5
];

const SlideShow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (<div className='container'>
            <div className="slideshow-container">
              <h1 style={{margin:'20px 0', color:'white', textAlign:'center'}}>Our Movies</h1>
              <div className="slides">
                {images.map((image, index) => (
                  <div
                    className={`slide ${index === currentIndex ? 'active' : ''}`}
                    key={index}
                  >
                    <img src={image} alt={`Slide ${index + 1}`} />
                  </div>
                ))}
              </div>
              <div className="dots">
                {images.map((_, index) => (
                  <span
                    key={index}
                    className={`dot ${index === currentIndex ? 'active' : ''}`}
                    onClick={() => goToSlide(index)}
                  ></span>
                ))}
              </div>
            </div>
          </div>
  );
};

export default SlideShow;
