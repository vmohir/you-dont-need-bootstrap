// Example violations for no-bootstrap-offcanvas rule
import React from 'react';

export function OffcanvasExample() {
  return (
    <div>
      <button data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample">
        Open Offcanvas
      </button>
      <div className="offcanvas offcanvas-start" id="offcanvasExample">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Offcanvas</h5>
          <button data-bs-dismiss="offcanvas"></button>
        </div>
        <div className="offcanvas-body">
          Content goes here...
        </div>
      </div>
    </div>
  );
}
