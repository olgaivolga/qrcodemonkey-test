import ui from './ui';
import utils from './utils';

Cypress.Commands.add('check_url_format', (url) => {
  const host = 'api.qrcode-monkey.com';
  // eslint-disable-next-line
  const re = new RegExp('^//' + host + '/tmp/' + '[A-Za-z0-9-]{32}\.svg', "g");
  return re.test(url);
});

Cypress.Commands.add('decode_qr_code', (url = '') => {
  if (url) {
    return utils.decode(url);
  }
  return cy.get(ui.QRCodePreview)
    .then(($img) => utils.decode($img.attr('src')));
});

Cypress.Commands.add('compare_qr_code_image', () => {
  cy.get(ui.QRCodePreview).toMatchImageSnapshot();
});

Cypress.Commands.add('type_invalid_url', (url) => {
  cy.intercept('/qr/custom', cy.spy().as('custom'));
  cy.get(ui.QRCodeDataError).should('not.be', 'visible');
  cy.get(ui.QRCodeUrl).click().clear().type(url);
  cy.get(ui.CreateQRCode).click();
  cy.get('@custom').should('not.have.been.called');
  cy.get(ui.QRCodeDataError).should('be.visible');
  cy.get(ui.QRCodeDataError).should('contain', 'Enter a valid URL');
  cy.get(ui.QRCodeDataAlert).should('be.visible');
  cy.get(ui.QRCodeDataAlert).should('contain', 'There are errors you have to fix before generating.');
});
