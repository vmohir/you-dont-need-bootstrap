// Example violations for no-bootstrap-alerts rule
import React from 'react';

export function AlertsExample() {
  return (
    <div>
      <div className="alert alert-success">Success message</div>
      <div className="alert alert-danger alert-dismissible">
        <span>Error message</span>
        <button className="btn-close" data-bs-dismiss="alert"></button>
      </div>
      <div className="alert alert-warning">Warning message</div>
    </div>
  );
}
