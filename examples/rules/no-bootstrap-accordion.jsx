// Example violations for no-bootstrap-accordion rule
import React from 'react';

export function AccordionExample() {
  return (
    <div className="accordion" id="accordionExample">
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button className="accordion-button" data-bs-toggle="collapse">
            Item #1
          </button>
        </h2>
        <div className="accordion-collapse collapse show">
          <div className="accordion-body">Content for item 1</div>
        </div>
      </div>
    </div>
  );
}
