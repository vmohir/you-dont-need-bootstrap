/**
 * Example React component showing Bootstrap vs Modern CSS
 * Run ESLint on this file to see the plugin in action:
 *   npx eslint examples/example.jsx
 */

import { Button, Alert, Form, FormGroup, Label, Input } from 'reactstrap';
import React from 'react';

// ❌ Bootstrap Version
export function BootstrapCard() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center fw-bold text-primary mb-3">Bootstrap Card</h2>
              <p className="text-muted">This uses Bootstrap classes that could be replaced.</p>
              <div className="d-flex justify-content-between align-items-center mt-4">
                <button className="btn btn-primary">Action</button>
                <span className="text-secondary">Info</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ✅ Modern CSS Version
export function ModernCard() {
  return (
    <div>
      <div className="card-grid">
        <div className="card">
          <h2 className="card-title">Modern Card</h2>
          <p className="card-text">This uses modern CSS with custom properties and CSS Grid.</p>
          <div className="card-actions">
            <button className="btn-primary">Action</button>
            <span className="info-text">Info</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/*
Corresponding CSS:

:root {
  --color-primary: #0d6efd;
  --color-text-muted: #6c757d;
  --space-3: 1rem;
  --space-4: 1.5rem;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin-inline: auto;
  padding-inline: 1rem;
}

.card-grid {
  display: grid;
  place-items: center;
  min-height: 50vh;
}

.card {
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: var(--space-4);
  max-width: 600px;
  width: 100%;
}

.card-title {
  text-align: center;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: var(--space-3);
}

.card-text {
  color: var(--color-text-muted);
}

.card-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: var(--space-4);
}

.btn-primary {
  background: var(--color-primary);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
}

.info-text {
  color: var(--color-text-muted);
}
*/

export const MessageEditor = props => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="ml-auto">
              <div className="card-body h-100 w-100">
                <h2 className="text-center fw-bold text-primary mb-3">Bootstrap Card</h2>
                <p className="text-muted">This uses Bootstrap classes that could be replaced.</p>
                <div className="d-flex justify-content-between align-items-center mt-4">
                  <button className="btn btn-primary">Action</button>
                  <span className="text-secondary">Info</span>
                  <span {...{ className: isFetching ? 'pb-0' : 'pb-4' }}>test</span>
                  <span className={isFetching ? 'pb-0' : 'pb-4'}>test</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <StyledMessageEditorContainer $hasVisualBox={!!props.showMultipleMessagesUi}>
        {props.showMultipleMessagesUi && (
          <StyledMessageEditorTitle>
            <Ds.Text weight="bold">{props.editorTitle}</Ds.Text>
            <Ds.Button
              className="ml-auto"
              appearance="secondary"
              size="small"
              onClick={props.onClickRemove}
            >
              Remove
            </Ds.Button>
          </StyledMessageEditorTitle>
        )}
        <Ds.Flex flexDirection="column" gap="1">
          <ComposeTextArea onUserTyping={onUserTyping} />
          <MessageComponentActionStack
            assigneeLabel={
              assigneeSelector ?? (
                <Ds.Badge color="greyscale" data-testid="assignee-label">
                  <strong>{assigneeLabel}</strong>
                </Ds.Badge>
              )
            }
          />
        </Ds.Flex>
        <StillLoadingErrors />
        <ScheduledSendInfo />
        {props.showMultipleMessagesUi && patient && (
          <Ds.Flex
            data-testid="message-actions-control-bar"
            justifyContent="flex-start"
            flexWrap={'wrap'}
            gap={'1'}
          >
            <MessageActionsControlBar patientExternalIds={patient.externalIds} />
          </Ds.Flex>
        )}
      </StyledMessageEditorContainer>
    </>
  );
};

export const ComponentWithReactstrapComponents = () => {
  return (
    <div>
      <Button color="primary">Click Me</Button>
      <Alert color="warning">This is a warning alert!</Alert>
      <Form>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input type="email" name="email" id="exampleEmail" placeholder="Enter your email" />
        </FormGroup>
        <Button color="success">Submit</Button>
      </Form>
    </div>
  );
};
