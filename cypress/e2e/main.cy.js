describe('Login Api', () => {

  it("should handle successful login api", () => {
    const loginData = {
      username: 'mor_2314',
      password: '83r5^_'
    }

    cy.request('POST', '/auth/login', loginData)
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('token')

        const token = response.body.token
        cy.wrap(token).as('authToken')
      })
  })

  it("should handle invalid login api", () => {
    cy.fixture('invalidCreds.json').as('invalidCreds')

    cy.get('@invalidCreds').then((invalidCreds) => {
      cy.request({
        method: 'POST',
        url: '/auth/login',
        body: invalidCreds,
        failOnStatusCode: false
      })
        .then((response) => {
          expect(response.status).to.eq(401)
          expect(response.body).to.eq('username or password is incorrect')
        })
    })
  })
})