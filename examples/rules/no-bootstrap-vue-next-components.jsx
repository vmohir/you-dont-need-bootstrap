// Example violations for no-bootstrap-vue-next-components rule
// Note: This is a .vue file shown as .jsx for consistency

import { BButton, BAlert, BCard, BForm, BModal } from 'bootstrap-vue-next';
import * as BootstrapVueNext from 'bootstrap-vue-next';

export default {
  components: {
    BButton,
    BAlert,
    BCard,
    BForm,
    BModal,
  },
  template: `
    <div>
      <BButton variant="primary">Bootstrap Vue Next Button</BButton>
      <BAlert variant="warning">Bootstrap Vue Next Alert</BAlert>
      <BCard>
        <template #header>Card Header</template>
        Content
      </BCard>
    </div>
  `
};
