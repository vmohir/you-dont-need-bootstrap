// Example violations for no-bootstrap-close rule
import React from 'react';

export function CloseExample() {
  return (
    <div>
      <button type="button" className="btn-close" aria-label="Close"></button>
      <button type="button" className="btn-close btn-close-white"></button>
    </div>
  );
}
