import Vue from 'vue'
// Register the component globally.
import { extend, ValidationProvider } from 'vee-validate';
// import { required, email } from 'vee-validate/dist/rules';

extend('required', {
  validate: value => !!value,
  message: 'This field is required' // the error message

});
// extend('required', required);

Vue.component('ValidationProvider', ValidationProvider);
// Vue.use(VeeValidate);

