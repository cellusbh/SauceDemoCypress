/// <reference types="cypress" />

import assert from 'assert'

describe('sauce demo test', () => {

  const username = 'visual_user'
  const password = 'secret_sauce'
  const colorError = 'rgb(226, 35, 26)'
  const colorBtn = 'rgb(61, 220, 145)'

  it('sign up success', () => {

    login(username, password)

  })

  it('sign up fail', () => {

    login('teste', 'teste')

    cy.get('.error_icon').should('have.attr', 'xmlns', 'http://www.w3.org/2000/svg')
    cy.get('.error_icon').should('have.css', 'color', colorError)
    cy.get('.error-message-container.error').should('have.css', 'background-color', colorError)
    cy.get('div.login_logo')
      .should('have.text', 'Swag Labs')
      .should('be.visible')
      .should('exist')
    cy.title().should('eq', 'Swag Labs')

  })

  it('add to cart and do checkout', () => {

    // login correto
    login(username, password)

    // adicionar item ao carrinho e ir para o carrinho
    cy.get('#add-to-cart-sauce-labs-backpack').click()
    cy.get('a.shopping_cart_link').click()

    // validar se o nome do produto está correto
    cy.get('.inventory_item_name').should('contain', 'Sauce Labs Backpack')

    // clicar no botão de checkout
    cy.get('#checkout').click()

    // digitar os dados necessários
    cy.get('#first-name').type("Diego")
    cy.get('#last-name').type("Diego")
    cy.get('#postal-code').type("31000000")

    // validar o background color do botão de continue
    cy.get('#continue').should('have.css', 'background-color', colorBtn)

    // clicar no botão continue
    cy.get('#continue').click()

    // validar se o nome do produto está correto no checkout
    cy.get('.inventory_item_name').should('contain', 'Sauce Labs Backpack')

    // validar o texto "Payment Information:"
    cy.get('.summary_info_label').should('contain', 'Payment Information:')

    // validar o texto "Shipping Information:"
    cy.get('.summary_info_label').should('contain', 'Shipping Information:')

    // validar o texto "Price Total"
    cy.get('.summary_info_label').should('contain', 'Price Total')

    // validar o background color do botão de finish
    cy.get('#finish').should('have.css', 'background-color', colorBtn)

    // clicar no botão finish
    cy.get('#finish').click()

    // validar o texto "Checkout: Complete!"
    cy.get('.title').should('contain', 'Checkout: Complete!')

    // validar o texto "Thank you for your order!"
    cy.get('.complete-header').should('contain', 'Thank you for your order!')

    // validar o background color do botão de back home
    cy.get('#back-to-products').should('have.css', 'background-color', colorBtn)

    // clicar no botão back home
    cy.get('#back-to-products').click()

  })

  it('add to cart and remove by click', () => {

    login(username, password)
    cy.get('#add-to-cart-sauce-labs-backpack').click()
    cy.get('#remove-sauce-labs-backpack').click()

  });

  it('add to cart and remove by cart', () => {

    login(username, password)
    cy.get('#add-to-cart-sauce-labs-backpack').click()
    cy.get('a.shopping_cart_link').click()
    cy.get('#remove-sauce-labs-backpack').click()
    cy.get('#continue-shopping').click()

  });

  it('sign up success and logout', () => {

    login(username, password)
    cy.get('#react-burger-menu-btn').click()
    cy.get('a#logout_sidebar_link').click()
    cy.wait(100);
    cy.get('div.login_logo')
      .should('have.text', 'Swag Labs')
      .should('be.visible')
      .should('exist')
    cy.title().should('eq', 'Swag Labs')

  });

  it('reset app state', () => {

    login(username, password)

    cy.get('#add-to-cart-sauce-labs-backpack').click()
    cy.get('#add-to-cart-sauce-labs-bike-light').click()
    cy.get('#add-to-cart-sauce-labs-bolt-t-shirt').click()
    cy.get('#add-to-cart-sauce-labs-fleece-jacket').click()
    cy.get('#add-to-cart-sauce-labs-onesie').click()
    cy.get('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]').click()

    cy.get('#react-burger-menu-btn').click()
    cy.get('a#reset_sidebar_link').click()


  });

})

function login(username, password) {

  cy.visit('/'),
    cy.get('[data-test="username"]').type(username),
    cy.get('[data-test="password"]').type(password),
    cy.get('#login-button').click()

}
