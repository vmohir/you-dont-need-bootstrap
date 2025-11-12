// Example violations for no-bootstrap-buttons rule
import React from 'react';

export function ButtonsExample() {
  return (
    <div>
      <button className="btn btn-primary">Primary</button>
      <button className="btn btn-secondary">Secondary</button>
      <button className="btn btn-success btn-lg">Large Success</button>
      <button className="btn btn-outline-danger btn-sm">Small Danger</button>
      <div className="btn-group">
        <button className="btn btn-info">Group 1</button>
        <button className="btn btn-warning">Group 2</button>
      </div>
    </div>
  );
}
