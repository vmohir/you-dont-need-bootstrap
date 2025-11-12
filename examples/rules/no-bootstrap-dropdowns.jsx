// Example violations for no-bootstrap-dropdowns rule
import React from 'react';

export function DropdownsExample() {
  return (
    <div className="dropdown">
      <button className="dropdown-toggle" data-bs-toggle="dropdown">
        Dropdown
      </button>
      <ul className="dropdown-menu">
        <li><a className="dropdown-item" href="#">Action 1</a></li>
        <li><a className="dropdown-item" href="#">Action 2</a></li>
        <li><hr className="dropdown-divider" /></li>
        <li><h6 className="dropdown-header">Header</h6></li>
      </ul>
    </div>
  );
}
