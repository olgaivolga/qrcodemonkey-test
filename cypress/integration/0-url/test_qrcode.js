
describe('QR code data', () => {

    before(() => {
      cy.visit('#url');
    })
    
    it('is correct', () => {
      // create a QR code
      cy.generate_qr_code_for_url('http://example.com');
      // decode QR code and verify the data is correct
      cy.decode_qr_code_from_src().then(function(url) {
        expect(url).to.equal('http://example.com');
      })
    })
  
  })
  