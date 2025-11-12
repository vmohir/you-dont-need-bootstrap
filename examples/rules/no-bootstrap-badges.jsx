// Example violations for no-bootstrap-badges rule
import React from 'react';

export function BadgesExample() {
  return (
    <div>
      <span className="badge bg-primary">Primary</span>
      <span className="badge bg-secondary">Secondary</span>
      <span className="badge rounded-pill bg-success">Pill Badge</span>
      <span className="badge text-bg-danger">Text Background</span>
    </div>
  );
}
