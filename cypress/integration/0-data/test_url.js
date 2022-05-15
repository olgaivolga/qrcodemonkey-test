describe('Test QR code data', () => {
  
  const params = require('../../fixtures/test_data.json');

  params.forEach((test) => {

    let callData;

    it('Generate QR code', () => {
      cy.visit('#url');
      cy.intercept('/qr/custom').as('custom');
      cy.generate_qr_code_url(test);
      cy.wait(['@custom']).then((call) => {
        callData = call;
      })
    })

    it('API call is successful', () => {
      expect(callData.response.statusCode).to.equal(200)
    })
  
    it(`QR code url in API call matches the value set in UI: ${test.data}`, () => {
      const requestBody = JSON.parse(callData.request.body)
      expect(requestBody.data).to.equal(test.data)
    });

    it('URL fromat in API response is correct', () => {
      const imageUrl = callData.response.body.imageUrl;
      cy.check_url_format(imageUrl).then(function(format_is_valid){
        expect(format_is_valid,'URL format must be valid: '+imageUrl)
          .to.be.true;
      })
    })
  
    it('QR code data in API response is correct', () => {
      const imageUrl = callData.response.body.imageUrl;
      cy.decode_qr_code(imageUrl).then(function(url) {
        expect(url).to.equal(test.data);
      })
    })
  
    it('QR code displayed on page data is correct', () => {
      cy.decode_qr_code().then(function(url) {
        expect(url).to.equal(test.data);
      })
    })

    it('QR code image matches snapshot', () => {
      cy.compare_qr_code_image();
    })

  });

})  
