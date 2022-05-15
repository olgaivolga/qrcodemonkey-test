import './commands'
import 'cypress-plugin-snapshots/commands';

Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes("Unexpected token ')'")) {
      return false
    }
})