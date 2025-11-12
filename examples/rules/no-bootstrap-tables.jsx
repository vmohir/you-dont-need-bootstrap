// Example violations for no-bootstrap-tables rule
import React from 'react';

export function TablesExample() {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <caption className="caption-top">Users</caption>
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John</td>
            <td>john@example.com</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
