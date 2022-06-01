describe('Test logo option', () => {
  const params = require('../../fixtures/test_options.json');

  params.forEach((test) => {
    describe(test.data, () => {
      let callData;

      before(() => {
        cy.visit('#url');
        cy.intercept('/qr/custom').as('custom');
        cy.generate_qr_code_in_ui(test, ['logo']);
        cy.wait(['@custom']).then((call) => {
          callData = call;
        });
      });

      it('API call is successful', () => {
        expect(callData.response.statusCode).to.equal(200);
      });

      it(`QR code logo in API request matches the value set in UI: ${test.config.logo}`, () => {
        const requestBody = JSON.parse(callData.request.body);
        expect(requestBody.config.logo).to.equal(test.config.logo);
      });
    });
  });
});
