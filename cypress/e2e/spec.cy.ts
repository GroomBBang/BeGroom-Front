describe('My First Test', () => {
  it('Visits BeGoorm', () => {
    cy.visit('localhost:3000')
    cy.contains('로그인').click()

    cy.url().should('include', 'auth?mode=login')

    cy.get('[aria-label="이메일"]').type('mar0722@naver.com')
    cy.get('[aria-label="비밀번호"]').type('1234')
    cy.get('button').contains('로그인').click()
  })
})