// Example violations for no-bootstrap-utilities rule
import React from 'react';

export function UtilitiesExample() {
  return (
    <div>
      <div className="d-flex justify-content-center align-items-center">
        <p className="text-center text-primary fw-bold">Title</p>
      </div>
      <div className="mt-3 mb-4 p-2">
        <span className="text-muted">Description</span>
      </div>
      <div className="w-100 h-100">Full size</div>
    </div>
  );
}
