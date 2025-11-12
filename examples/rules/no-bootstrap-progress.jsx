// Example violations for no-bootstrap-progress rule
import React from 'react';

export function ProgressExample() {
  return (
    <div>
      <div className="progress">
        <div className="progress-bar" style={{ width: '50%' }}>50%</div>
      </div>
      <div className="progress">
        <div className="progress-bar progress-bar-striped progress-bar-animated" style={{ width: '75%' }}></div>
      </div>
    </div>
  );
}
