// Example violations for no-bootstrap-collapse rule
import React from 'react';

export function CollapseExample() {
  return (
    <div>
      <button data-bs-toggle="collapse" data-bs-target="#collapseExample">
        Toggle Collapse
      </button>
      <div className="collapse" id="collapseExample">
        <div className="card card-body">
          This content is collapsible.
        </div>
      </div>
      <div className="collapsing">Collapsing...</div>
    </div>
  );
}
