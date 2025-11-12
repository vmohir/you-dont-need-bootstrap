// Example violations for no-bootstrap-list-group rule
import React from 'react';

export function ListGroupExample() {
  return (
    <ul className="list-group">
      <li className="list-group-item active">Active item</li>
      <li className="list-group-item">Second item</li>
      <li className="list-group-item list-group-item-action">Action item</li>
      <li className="list-group-item disabled">Disabled item</li>
    </ul>
  );
}
