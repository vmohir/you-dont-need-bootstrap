// Example violations for no-bootstrap-vue-components rule
// Note: This is a .vue file shown as .jsx for consistency

import { BButton, BAlert, BCard, BForm, BModal } from 'bootstrap-vue';
import * as BootstrapVue from 'bootstrap-vue';

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
      <BButton variant="primary">Bootstrap Vue Button</BButton>
      <BAlert variant="warning">Bootstrap Vue Alert</BAlert>
      <BCard>
        <template #header>Card Header</template>
        Content
      </BCard>
    </div>
  `
};
