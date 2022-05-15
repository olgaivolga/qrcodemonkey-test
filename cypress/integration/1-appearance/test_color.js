describe('Test color options', () => {
  
    const params = require('../../fixtures/test_options.json');
  
    params.forEach((test) => {
  
      let callData;
    
      it('generate QR code', () => {
        cy.visit('#url');
        cy.intercept('/qr/custom').as('custom');
        cy.generate_qr_code_color(test);
        cy.wait(['@custom']).then((call) => {
          callData = call;
        })  
      })

      it('API call is successful', () => {
        expect(callData.response.statusCode).to.equal(200)
      })
    
      it(`QR code color options in API request match values set in UI`, () => {
        // TBD: eye color options
        const requestBody = JSON.parse(callData.request.body)
        expect(requestBody.config.bodyColor).to.equal(test.config.bodyColor)
        expect(requestBody.config.bgColor).to.equal(test.config.bgColor)
        expect(requestBody.config.gradientColor1).to.equal(test.config.gradientColor1)
        expect(requestBody.config.gradientColor2).to.equal(test.config.gradientColor2)
        expect(requestBody.config.gradientType).to.equal(test.config.gradientType)
        expect(requestBody.config.gradientOnEyes).to.equal(test.config.gradientOnEyes)
      });
      
    });
  
})  