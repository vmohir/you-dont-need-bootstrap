// Example violations for no-bootstrap-tooltips rule
import React from 'react';

export function TooltipsExample() {
  return (
    <div>
      <button data-bs-toggle="tooltip" data-bs-placement="top" title="Tooltip text">
        Hover me (tooltip)
      </button>
      <button data-bs-toggle="popover" data-bs-content="Popover content">
        Click me (popover)
      </button>
      <div className="tooltip bs-tooltip-top">
        <div className="tooltip-arrow"></div>
        <div className="tooltip-inner">Tooltip</div>
      </div>
      <div className="popover">
        <div className="popover-arrow"></div>
        <h3 className="popover-header">Title</h3>
        <div className="popover-body">Content</div>
      </div>
    </div>
  );
}
