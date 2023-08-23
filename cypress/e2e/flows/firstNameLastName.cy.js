import { PORT } from '../../../config'

const WEBSITE = `http://localhost:${PORT}/`

describe('exmpale form', () => {
  beforeEach(() => {
    cy.visit(WEBSITE)
  })

  describe('test the form', () => {
    describe('the starting state', () => {
      it('should have empty data', () => {
        cy.get('#the-app').find('pre code').should('have.text', '{"noData":true}')
        cy.get('#the-app').find('input[name="name"]').invoke('val').should('be.empty')
        cy.get('#the-app').find('input[name="lastName"]').invoke('val').should('be.empty')
      })
    })

    describe('submit data', () => {
      it('should have submitted correctly', () => {
        cy.get('#the-app').find('input[name="name"]').type('Erik')
        cy.get('#the-app').find('input[name="lastName"]').type('Freundorfer')
        cy.get('#the-app').find('#submit').click()

        const firstResult = '{"name":"Erik","lastName":"Freundorfer","fullName":"Erik Freundorfer"}'
        cy.get('#the-app').find('pre code').should('have.text', firstResult)
      })
    })
  })

  context('form data submitted', () => {
    beforeEach(() => {
      cy.get('#the-app').find('input[name="name"]').type('Erik')
      cy.get('#the-app').find('input[name="lastName"]').type('Freundorfer')
      cy.get('#the-app').find('#submit').click()
    })

    describe('editing the form', () => {
      it('should return correct data', () => {
        const firstResult = '{"name":"Erik","lastName":"Freundorfer","fullName":"Erik Freundorfer"}'
        cy.get('#the-app').find('pre code').should('have.text', firstResult)

        cy.get('#the-app').find('input[name="name"]').clear().type('Derf')
        cy.get('#the-app').find('input[name="lastName"]').clear().type('Fred')
        cy.get('#the-app').find('#submit').click()

        const result = '{"name":"Derf","lastName":"Fred","fullName":"Derf Fred"}'
        cy.get('#the-app').find('pre code').should('have.text', result)
      })
    })

    describe('resetting the form', () => {
      it('should return correct data', () => {

        cy.get('#the-app').find('#reset').click()

        const result = '{"name":"Erik","lastName":"Freundorfer","fullName":"Erik Freundorfer"}'
        cy.get('#the-app').find('pre code').should('have.text', result)
        cy.get('#the-app').find('input[name="name"]').invoke('val').should('be.empty')
        cy.get('#the-app').find('input[name="lastName"]').invoke('val').should('be.empty')

        cy.get('#the-app').find('#submit').click()
        cy.get('#the-app').find('pre code').should('have.text', '{"name":"","lastName":"","fullName":" "}')
        cy.get('#the-app').find('input[name="name"]').invoke('val').should('be.empty')
        cy.get('#the-app').find('input[name="lastName"]').invoke('val').should('be.empty')
      })
    })
  })
})
