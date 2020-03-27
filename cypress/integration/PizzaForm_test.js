import { object } from "prop-types"

//arrange
describe('Tests all form inputs', function () {
  beforeEach(function () {
    cy.visit('localhost:3000/pizza')
  })
    it('Successfully submit form', function() {
      // first name input
      cy.get('[for="name"] > input')
        .type('Pepp')
        .should('have.value', 'Pepp')

      // checkbox
      cy.get('[for="Pepperoni"] > input')
        .check()
      cy.get('[for="Three Cheese"] > input')
        .check()

      // submit form
      cy.get('button')
        .click()
    })
  })