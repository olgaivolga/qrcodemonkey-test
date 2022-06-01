describe('Test QR code text', () => {
  const params = require('../../fixtures/test_text.json');

  params.forEach((test) => {
    describe(test.data, () => {
      let callData;

      before(() => {
        cy.visit('#text');
        cy.intercept('/qr/custom').as('custom');
        cy.generate_qr_code_in_ui(test, ['text']);
        cy.wait(['@custom']).then((call) => {
          callData = call;
        });
      });

      it('API call is successful', () => {
        expect(callData.response.statusCode).to.equal(200);
      });

      it(`QR code text in API call matches the value set in UI: ${test.data}`, () => {
        const requestBody = JSON.parse(callData.request.body);
        expect(requestBody.data).to.equal(test.data);
      });

      it('URL fromat in API response is correct', () => {
        const { imageUrl } = callData.response.body;
        cy.check_url_format(imageUrl).then((formatIsValid) => {
          expect(formatIsValid, `URL format must be valid: ${imageUrl}`).to.be.true;
        });
      });

      it('imageUrl data is correct', () => {
        const { imageUrl } = callData.response.body;
        cy.decode_qr_code(imageUrl).then((url) => {
          expect(url).to.equal(test.data);
        });
      });

      it('image data is correct', () => {
        cy.decode_qr_code().then((url) => {
          expect(url).to.equal(test.data);
        });
      });

      it('image matches snapshot', () => {
        cy.compare_qr_code_image();
      });
    });
  });
});
