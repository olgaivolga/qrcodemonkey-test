import ui from './ui'
import utils from './utils'


Cypress.Commands.add("check_url_format", (url) => {
    const host = 'api.qrcode-monkey.com'
    const re = new RegExp('^//'+host+'/tmp/'+'[A-Za-z0-9-]{32}\.svg', "g");
    return re.test(url);
})

Cypress.Commands.add("generate_qr_code_size", (options) => {
    // save current image src
    cy.get(ui.QRCodePreview).then(function($img) {
        cy.wrap($img.attr('src')).as('before')
    })
    // generate new QR code with size options
    const currentValue  = 1000;
    const targetValue = options.size;
    const increment = 25;
    let arrows;
    switch (true) {
        case targetValue < currentValue:
            arrows = '{leftArrow}'.repeat((currentValue - targetValue) / increment);     
            break;
        case targetValue > currentValue:
            arrows = '{rightArrow}'.repeat((targetValue - currentValue) / increment);     
            break;
        default:
            arrows = 0;
    }
    cy.get(ui.QRCodeSize)
        .should('have.attr', 'aria-valuenow', currentValue)
        .type(arrows, {delay: 20})
    cy.get(ui.QRCodeSize)
        .should('have.attr', 'aria-valuenow', targetValue)
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

Cypress.Commands.add("generate_qr_code_url", (options) => {
    // save current image src
    cy.get(ui.QRCodePreview).then(function($img) {
        cy.wrap($img.attr('src')).as('before')
    })
    // generate new QR code for URL
    cy.get(ui.QRCodeUrl).click().clear().type(options.data);
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

Cypress.Commands.add("generate_qr_code_text", (options) => {
    // save current image src
    cy.get(ui.QRCodePreview).then(function($img) {
        cy.wrap($img.attr('src')).as('before')
    })
    // generate new QR code for URL
    cy.get(ui.QRCodeText).click().clear().type(options.data);
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

Cypress.Commands.add("generate_qr_code_logo", (options) => {
    // save current image src
    cy.get(ui.QRCodePreview).then(function($img) {
        cy.wrap($img.attr('src')).as('before')
    })
    // generate new QR code with logo option
    if (options.config.logo) {
        cy.get(ui.QRCodeLogoPane).click();
        switch (true) {
            case options.config.logo == '#facebook':
                cy.get(ui.QRCodeLogoFacebook).click();
                break;
            case options.config.logo == '#facebook-circle':
                cy.get(ui.QRCodeLogoFacebookCircle).click();
                break;
            default:
              console.log( "logo preset unknown");
        }
    }
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

Cypress.Commands.add("generate_qr_code_color", (options) => {
    // save current image src
    cy.get(ui.QRCodePreview).then(function($img) {
        cy.wrap($img.attr('src')).as('before')
    })
    // generate new QR code
    cy.get(ui.QRCodeColorPane).click();
    cy.get(ui.QRCodeBodyColor).click().clear().type(options.config.bodyColor);
    cy.focused().blur();
    cy.get(ui.QRCodeBgColor).click().clear().type(options.config.bgColor)
    if (options.config.gradientColor1 || options.config.gradientColor2) {
        cy.get(ui.QRCodeBgGradientRadio).click();
        cy.get(ui.QRCodeGradientType).select(options.config.gradientType);
    }
    if (options.config.gradientColor1) {
        cy.get(ui.QRCodeGradientColor1).click().clear().type(options.config.gradientColor1);
    }
    if (options.config.gradientColor2) {
        cy.get(ui.QRCodeGradientColor2).click().clear().type(options.config.gradientColor2);
    }
    // TBD: eye color options
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

Cypress.Commands.add("compare_qr_code_image", () => {
    cy.get(ui.QRCodePreview).toMatchImageSnapshot();
})
