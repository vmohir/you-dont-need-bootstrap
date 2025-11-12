// Example violations for no-ngx-bootstrap-components rule
// Note: This is an Angular component shown as .jsx for consistency

import { Component } from '@angular/core';
import { ButtonsModule, AlertModule, ModalModule, CarouselModule } from 'ngx-bootstrap';
import * as NgxBootstrap from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-example',
  template: `
    <button type="button" class="btn btn-primary" btnCheckbox>
      NGX Bootstrap Button
    </button>
    <alert type="warning">
      NGX Bootstrap Alert
    </alert>
    <carousel>
      <slide>Slide 1</slide>
      <slide>Slide 2</slide>
    </carousel>
  `,
  imports: [ButtonsModule, AlertModule, ModalModule, CarouselModule]
})
export class ExampleComponent {}
