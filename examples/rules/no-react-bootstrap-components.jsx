// Example violations for no-react-bootstrap-components rule
import React from 'react';
import { Button, Alert, Card, Form, Modal, Navbar } from 'react-bootstrap';
import * as ReactBootstrap from 'react-bootstrap';

export function ReactBootstrapExample() {
  return (
    <div>
      <Button variant="primary">React Bootstrap Button</Button>
      <Alert variant="warning">React Bootstrap Alert</Alert>
      <Card>
        <Card.Body>React Bootstrap Card</Card.Body>
      </Card>
      <Form>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" />
        </Form.Group>
      </Form>
      <Modal show={true}>
        <Modal.Header>Title</Modal.Header>
      </Modal>
      <ReactBootstrap.Navbar>
        <ReactBootstrap.Navbar.Brand>Brand</ReactBootstrap.Navbar.Brand>
      </ReactBootstrap.Navbar>
    </div>
  );
}
