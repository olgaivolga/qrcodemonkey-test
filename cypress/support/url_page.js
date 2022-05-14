import ui from './ui'
import utils from './utils'

Cypress.Commands.add("generate_qr_code_for_url", (url) => {
    cy.log('Generate QR code for: '+url)
    // save current image src
    cy.get(ui.QRCodePreview).then(function($img) {
        cy.wrap($img.attr('src')).as('before')
    })
    // create new QR code
    cy.get(ui.QRCodeUrl).click().clear().type(url);
    cy.get(ui.CreateQRCode).click();
    cy.get(ui.CreateQRCode).should('be.disabled');
    // verify that image src has changed
    cy.get('@before').then(function(before) {
        cy.get(ui.QRCodePreview, {timeout: 5000}).should(function($img) {
            const after = $img.attr('src');
            expect(after).to.not.equal(before);
        })
    })
})

Cypress.Commands.add("decode_qr_code_from_src", () => {
    return cy.get(ui.QRCodePreview).then(function($img) {
        return utils.decode($img.attr('src'));
    })
})

Cypress.Commands.add("decode_qr_code_from_path", (path) => {
    return utils.decode(path);
})
