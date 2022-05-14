
describe('QR code image', () => {

    before(() => {
      cy.visit('#url');
    })
    
    it('data is correct', () => {
      cy.generate_qr_code_in_ui('http://example.com');
      // decode QR code at image src and verify the data is correct
      cy.decode_qr_code().then(function(url) {
        expect(url).to.equal('http://example.com');
      })
    })
  
  })
  