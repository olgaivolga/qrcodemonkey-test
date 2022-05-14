import ui from './ui'
import utils from './utils'


Cypress.Commands.add("check_url_format", (url) => {
    let host = 'api.qrcode-monkey.com'
    var re = new RegExp('^//'+host+'/tmp/'+'[A-Za-z0-9-]{32}\.svg', "g");
    return re.test(url);
})

Cypress.Commands.add("generate_qr_code_in_ui", (url) => {
    cy.log('Generate QR code for: '+url)
    // save current image src
    cy.get(ui.QRCodePreview).then(function($img) {
        cy.wrap($img.attr('src')).as('before')
    })
    // generate new QR code
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

Cypress.Commands.add("decode_qr_code", (url='') => {
    if (url) {
        return utils.decode(url);
    } else {
        return cy.get(ui.QRCodePreview).then(function($img) {
            return utils.decode($img.attr('src'));
        })
    }
})

