describe('Test logo option', () => {
  
    const params = require('../../fixtures/test_data.json');
  
    params.forEach((test) => {
  
      let callData;
  
      it('generate QR code', () => {
        cy.visit('#url');
        cy.intercept('/qr/custom').as('custom');
        cy.generate_qr_code_logo(test);
        cy.wait(['@custom']).then((call) => {
          callData = call;
        })  
      })

      it('API call is successful', () => {
        expect(callData.response.statusCode).to.equal(200)
      })
    
      it(`QR code logo in API call matches the value set in UI: ${test.config.logo}`, () => {
        const requestBody = JSON.parse(callData.request.body)
        expect(requestBody.config.logo).to.equal(test.config.logo)
      });
  
      it('URL fromat in API response is correct', () => {
        const imageUrl = callData.response.body.imageUrl;
        cy.check_url_format(imageUrl).then(function(format_is_valid){
          expect(format_is_valid,'URL format must be valid: '+imageUrl)
            .to.be.true;
        })
      })
    
    });
  
})  