describe('Test invalid url option', () => {
  
  const invalidUrls = [
      'aaa',
      '123',
      'http://',
    //   'http://example.com'
  ]

  invalidUrls.forEach((test) => {
    before(() => {
        cy.visit('#url');
    })
    it(`${test}`, () => {
        cy.type_invalid_url(test)
    })
  })

})  
  
  