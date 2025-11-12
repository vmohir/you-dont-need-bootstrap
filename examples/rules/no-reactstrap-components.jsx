// Example violations for no-reactstrap-components rule
import React from 'react';
import { Button, Alert, Card, CardBody, Form, FormGroup, Label, Input } from 'reactstrap';
import * as Reactstrap from 'reactstrap';

export function ReactstrapExample() {
  return (
    <div>
      <Button color="primary">Reactstrap Button</Button>
      <Alert color="warning">Reactstrap Alert</Alert>
      <Card>
        <CardBody>Reactstrap Card</CardBody>
      </Card>
      <Form>
        <FormGroup>
          <Label>Email</Label>
          <Input type="email" />
        </FormGroup>
      </Form>
      <Reactstrap.Modal isOpen={true}>
        <Reactstrap.ModalHeader>Title</Reactstrap.ModalHeader>
      </Reactstrap.Modal>
    </div>
  );
}
