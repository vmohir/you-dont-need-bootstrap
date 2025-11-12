// Example violations for no-bootstrap-breadcrumbs rule
import React from 'react';

export function BreadcrumbsExample() {
  return (
    <nav>
      <ol className="breadcrumb">
        <li className="breadcrumb-item"><a href="#">Home</a></li>
        <li className="breadcrumb-item"><a href="#">Library</a></li>
        <li className="breadcrumb-item active">Data</li>
      </ol>
    </nav>
  );
}
