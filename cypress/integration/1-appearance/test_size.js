describe('Test size option', () => {
  
    const params = require('../../fixtures/test_options.json');
  
    params.forEach((test) => {
  
      let callData;
    
      it('generate QR code', () => {
        cy.visit('#url');
        cy.intercept('/qr/custom').as('custom');
        cy.generate_qr_code_size(test);
        cy.wait(['@custom']).then((call) => {
          callData = call;
        })  
      })

      it('API call is successful', () => {
        expect(callData.response.statusCode).to.equal(200)
      })
    
      it(`QR code size in API request matches the value set in UI: ${test.size}`, () => {
        const requestBody = JSON.parse(callData.request.body)
        expect(requestBody.size).to.equal(test.size)
      });
      
    });
  
})  