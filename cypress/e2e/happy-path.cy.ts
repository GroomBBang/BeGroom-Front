describe('Happy-path', () => {
  it('Visits BeGoorm', () => {
    // 페이지 이동
    cy.visit('localhost:3000');

    // 로그인
    cy.contains('로그인').click();
    cy.url().should('include', 'auth?mode=login');

    cy.get('[aria-label="이메일"]').type('mar0722@naver.com');
    cy.get('[aria-label="비밀번호"]').type('1234');
    cy.get('button').contains('로그인').click();
    cy.contains('정윤석 님').should('exist');

    // 상품 상세 페이지 이동
    cy.get('[data-testid="wish-product-card"]').first().click();
    cy.url().should('include', 'products');

    // 장바구니 담기 후 이동
    cy.get('button').contains('장바구니 담기').click();
    cy.get('[aria-label="장바구니"]').click();
    cy.url().should('include', 'cart');
    cy.contains('장바구니가 비어있습니다').should('not.exist');

    // 결제
    cy.get('button').contains('상품 주문하기').click();
    cy.get('button').contains('결제하기').click();

    // 성공 페이지 확인
    cy.contains('주문이 완료되었습니다').should('exist');
  });
});
