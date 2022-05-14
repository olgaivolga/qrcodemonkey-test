
describe('API', () => {

  before(() => {
    cy.visit('#url');
  })

  it('request data is correct', () => {
    // prepare to intercept a call to API
    cy.intercept('/qr/custom').as('custom');
    cy.generate_qr_code_in_ui('http://example.com');
    cy.wait(['@custom']).then((call) => {
      expect(call.response.statusCode).to.equal(200)
      // verify request data
      let requestBody = JSON.parse(call.request.body)
      cy.fixture('url_example_com').then((expected) => {
        expect(requestBody, 'Request body').to.deep.equal(expected)
      })
    });
  })

  it('response URL fromat is correct', () => {
    // prepare to intercept a call to API
    cy.intercept('/qr/custom').as('custom');
    cy.generate_qr_code_in_ui('http://example.com');
    cy.wait(['@custom']).then((call) => {
      expect(call.response.statusCode).to.equal(200)
      // verify response format
      const imageUrl = call.response.body.imageUrl;
      cy.check_url_format(imageUrl).then(function(format_is_valid){
        expect(format_is_valid,'URL format must be valid: '+imageUrl)
          .to.be.true;
      })
    });
  })

  it('response QR code data is correct', () => {
    // prepare to intercept a call to API
    cy.intercept('/qr/custom').as('custom');
    cy.generate_qr_code_in_ui('http://example.com');
    cy.wait(['@custom']).then((call) => {
      expect(call.response.statusCode).to.equal(200)
      // decode QR code at imageUrl and verify the data is correct
      const imageUrl = call.response.body.imageUrl;
      cy.decode_qr_code(imageUrl).then(function(url) {
        expect(url).to.equal('http://example.com');
      })
    });
  })

})
