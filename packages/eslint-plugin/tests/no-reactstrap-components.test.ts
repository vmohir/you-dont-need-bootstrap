import { RuleTester } from 'eslint';
import { describe, it } from 'vitest';
import noReactstrapComponents from '../src/rules/no-reactstrap-components';

const rule = noReactstrapComponents;

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
});

describe('no-reactstrap-components', () => {
  it('should detect Reactstrap component usage', () => {
    ruleTester.run('no-reactstrap-components', rule, {
      valid: [
        {
          // Native HTML elements should be allowed
          code: `
            function App() {
              return <button>Click me</button>;
            }
          `,
        },
        {
          // Components from other libraries should be allowed
          code: `
            import { Button } from 'my-custom-library';
            function App() {
              return <Button>Click me</Button>;
            }
          `,
        },
        {
          // Custom components should be allowed
          code: `
            import { CustomCard } from './components';
            function App() {
              return <CustomCard>Content</CustomCard>;
            }
          `,
        },
        {
          // No reactstrap import, no violation
          code: `
            function App() {
              return <Alert>Custom Alert</Alert>;
            }
          `,
        },
      ],
      invalid: [
        {
          // Single named import
          code: `
            import { Button } from 'reactstrap';
            function App() {
              return <Button>Click me</Button>;
            }
          `,
          errors: [
            {
              messageId: 'noReactstrapComponents',
            },
          ],
        },
        {
          // Multiple named imports
          code: `
            import { Alert, Card } from 'reactstrap';
            function App() {
              return (
                <>
                  <Alert color="primary">Alert!</Alert>
                  <Card>Card content</Card>
                </>
              );
            }
          `,
          errors: [
            { messageId: 'noReactstrapComponents' },
            { messageId: 'noReactstrapComponents' },
          ],
        },
        {
          // Grid components
          code: `
            import { Container, Row, Col } from 'reactstrap';
            function App() {
              return (
                <Container>
                  <Row>
                    <Col>Column</Col>
                  </Row>
                </Container>
              );
            }
          `,
          errors: [
            { messageId: 'noReactstrapComponents' },
            { messageId: 'noReactstrapComponents' },
            { messageId: 'noReactstrapComponents' },
          ],
        },
        {
          // Complex nested components
          code: `
            import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
            function App() {
              return (
                <Modal isOpen={true}>
                  <ModalHeader>Title</ModalHeader>
                  <ModalBody>Content</ModalBody>
                  <ModalFooter>
                    <Button>Close</Button>
                  </ModalFooter>
                </Modal>
              );
            }
          `,
          errors: [
            { messageId: 'noReactstrapComponents' },
            { messageId: 'noReactstrapComponents' },
            { messageId: 'noReactstrapComponents' },
            { messageId: 'noReactstrapComponents' },
            { messageId: 'noReactstrapComponents' },
          ],
        },
        {
          // Renamed imports
          code: `
            import { Button as RSButton } from 'reactstrap';
            function App() {
              return <RSButton>Click me</RSButton>;
            }
          `,
          errors: [
            { messageId: 'noReactstrapComponents' },
          ],
        },
        {
          // Namespace imports
          code: `
            import * as Reactstrap from 'reactstrap';
            function App() {
              return <Reactstrap.Button>Click me</Reactstrap.Button>;
            }
          `,
          errors: [
            { messageId: 'noReactstrapComponents' },
          ],
        },
        {
          // Mix of components
          code: `
            import { Badge, Spinner, Tooltip } from 'reactstrap';
            function App() {
              return (
                <div>
                  <Badge>New</Badge>
                  <Spinner />
                  <Tooltip>Info</Tooltip>
                </div>
              );
            }
          `,
          errors: [
            { messageId: 'noReactstrapComponents' },
            { messageId: 'noReactstrapComponents' },
            { messageId: 'noReactstrapComponents' },
          ],
        },
      ],
    });
  });
});
