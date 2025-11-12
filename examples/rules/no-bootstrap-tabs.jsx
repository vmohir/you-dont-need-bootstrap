// Example violations for no-bootstrap-tabs rule
import React from 'react';

export function TabsExample() {
  return (
    <div>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a className="nav-link active" data-bs-toggle="tab" href="#home">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" data-bs-toggle="tab" href="#profile">Profile</a>
        </li>
      </ul>
      <div className="tab-content">
        <div className="tab-pane active" id="home">Home content</div>
        <div className="tab-pane" id="profile">Profile content</div>
      </div>
      <ul className="nav nav-pills">
        <li className="nav-item">
          <a className="nav-link" data-bs-toggle="pill" href="#pill1">Pill 1</a>
        </li>
      </ul>
    </div>
  );
}
