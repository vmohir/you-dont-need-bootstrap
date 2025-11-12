// Example violations for no-bootstrap-navs rule
import React from 'react';

export function NavsExample() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">Brand</a>
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link active" href="#">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">About</a>
          </li>
        </ul>
      </nav>
      <ul className="nav nav-pills">
        <li className="nav-item"><a className="nav-link" href="#">Link</a></li>
      </ul>
    </div>
  );
}
