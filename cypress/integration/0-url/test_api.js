
describe('API', () => {

  let callData;

  before(() => {
    cy.visit('#url');
    // intercept a call to API
    cy.intercept('/qr/custom').as('custom');
    // TBD generate in API
    cy.generate_qr_code_in_ui('http://example.com');
    cy.wait(['@custom']).then((call) => {
      callData = call;
    })
  })

  it('request is successful', () => {
    expect(callData.response.statusCode).to.equal(200)
  })

  it('request data is correct', () => {
    let requestBody = JSON.parse(callData.request.body)
    cy.fixture('url_example_com').then((expected) => {
      expect(requestBody, 'Request body').to.deep.equal(expected)
    })
  })

  it('response URL fromat is correct', () => {
    const imageUrl = callData.response.body.imageUrl;
    cy.check_url_format(imageUrl).then(function(format_is_valid){
      expect(format_is_valid,'URL format must be valid: '+imageUrl)
        .to.be.true;
    })
  })

  it('response QR code data is correct', () => {
    const imageUrl = callData.response.body.imageUrl;
    cy.decode_qr_code(imageUrl).then(function(url) {
      expect(url).to.equal('http://example.com');
    })
  })

})
