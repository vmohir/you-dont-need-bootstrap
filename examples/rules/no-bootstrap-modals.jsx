// Example violations for no-bootstrap-modals rule
import React from 'react';

export function ModalsExample() {
  return (
    <div>
      <button data-bs-toggle="modal" data-bs-target="#myModal">
        Open Modal
      </button>
      <div className="modal fade" id="myModal">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Modal Title</h5>
            </div>
            <div className="modal-body">Modal content</div>
            <div className="modal-footer">
              <button data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
