// Example violations for no-bootstrap-cards rule
import React from 'react';

export function CardsExample() {
  return (
    <div className="card">
      <div className="card-header">Card Header</div>
      <div className="card-body">
        <h5 className="card-title">Card Title</h5>
        <p className="card-text">Card content goes here.</p>
      </div>
      <div className="card-footer">Card Footer</div>
    </div>
  );
}
