// Example violations for no-bootstrap-toasts rule
import React from 'react';

export function ToastsExample() {
  return (
    <div className="toast-container">
      <div className="toast" data-bs-toggle="toast">
        <div className="toast-header">
          <strong>Bootstrap</strong>
          <button data-bs-dismiss="toast"></button>
        </div>
        <div className="toast-body">
          Hello, world! This is a toast message.
        </div>
      </div>
    </div>
  );
}
