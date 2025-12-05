import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import '../styles/carousel.css';

const Carousel = ({ items, autoPlayInterval = 5000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, autoPlayInterval);

        return () => clearInterval(interval);
    }, [currentIndex, autoPlayInterval]);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    if (!items || items.length === 0) return null;

    return (
        <div className="carousel-container">
            {items.map((item, index) => (
                <div
                    key={index}
                    className={`carousel-slide ${index === currentIndex ? 'active' : ''}`}
                >
                    <img src={item.image} alt={item.text} className="carousel-image" />
                    <div className="carousel-overlay">
                        <p className="carousel-text">{item.text}</p>
                    </div>
                </div>
            ))}

            <button className="carousel-button prev" onClick={prevSlide}>
                <ChevronLeft size={24} />
            </button>
            <button className="carousel-button next" onClick={nextSlide}>
                <ChevronRight size={24} />
            </button>

            <div className="carousel-dots">
                {items.map((_, index) => (
                    <button
                        key={index}
                        className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => goToSlide(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;
