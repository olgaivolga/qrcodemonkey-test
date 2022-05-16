import ui from './ui'

function fill_url_option(options) {
    cy.get(ui.QRCodeUrl).click().clear().type(options.data);
}

function fill_text_option(options) {
    cy.get(ui.QRCodeText).click().clear().type(options.data);
}

function fill_color_options(options) {
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
}

function fill_logo_options(options) {
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
}

function fill_size_options(options) {
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
}

Cypress.Commands.add("generate_qr_code_in_ui", (options,mode=['url']) => {
    // save current image src
    cy.get(ui.QRCodePreview).then(function($img) {
        cy.wrap($img.attr('src')).as('before')
    })
    // generate new QR code 
    if (mode.includes('url')) {
        fill_url_option(options);
    }
    if (mode.includes('text')) {
        fill_text_option(options);
    }
    if (mode.includes('color')) {
        fill_color_options(options);
    }
    if (mode.includes('logo')) {
        fill_logo_options(options);
    }
    if (mode.includes('size')) {
        fill_size_options(options);
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
