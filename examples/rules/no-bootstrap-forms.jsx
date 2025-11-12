// Example violations for no-bootstrap-forms rule
import React from 'react';

export function FormsExample() {
  return (
    <form>
      <div className="form-group">
        <label className="form-label">Email</label>
        <input type="email" className="form-control" />
      </div>
      <div className="form-check">
        <input type="checkbox" className="form-check-input" id="check1" />
        <label className="form-check-label" htmlFor="check1">Check me</label>
      </div>
      <select className="form-select">
        <option>Choose...</option>
      </select>
    </form>
  );
}
