// Example violations for no-bootstrap-grid rule
import React from 'react';

export function GridExample() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">Column 1</div>
        <div className="col-md-6 offset-2">Column 2</div>
      </div>
      <div className="row g-3">
        <div className="col-12 col-sm-6 col-lg-4">Responsive</div>
      </div>
    </div>
  );
}
