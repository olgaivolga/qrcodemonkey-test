/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
import './commands';
import './generate';
import 'cypress-plugin-snapshots/commands';

Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('Unexpected token')) {
    return false;
  }
});
