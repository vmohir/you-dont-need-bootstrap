// Example violations for no-bootstrap-carousel rule
import React from 'react';

export function CarouselExample() {
  return (
    <div className="carousel slide" id="carouselExample">
      <div className="carousel-indicators">
        <button data-bs-slide-to="0"></button>
        <button data-bs-slide-to="1"></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <div className="carousel-caption">Slide 1</div>
        </div>
        <div className="carousel-item">
          <div className="carousel-caption">Slide 2</div>
        </div>
      </div>
      <button className="carousel-control-prev" data-bs-slide="prev">
        <span className="carousel-control-prev-icon"></span>
      </button>
      <button className="carousel-control-next" data-bs-slide="next">
        <span className="carousel-control-next-icon"></span>
      </button>
    </div>
  );
}
