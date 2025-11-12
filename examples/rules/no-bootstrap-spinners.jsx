// Example violations for no-bootstrap-spinners rule
import React from 'react';

export function SpinnersExample() {
  return (
    <div>
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="spinner-grow spinner-grow-sm text-primary"></div>
    </div>
  );
}
