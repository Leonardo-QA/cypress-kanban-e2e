/// <reference types="cypress" />

describe('Teste E2E - Kanban App', () => {
  const taskName = 'Tarefa de Teste QA';

  beforeEach(() => {
    // Visitar a aplicação antes de cada teste
    cy.visit('https://kanban-dusky-five.vercel.app');
  });

  it('Deve criar uma nova tarefa', () => {
    // Digitar o nome da tarefa
    cy.get('[data-cy="input-tarefa"]').should('be.visible').type(taskName);

    // Clicar em "Adicionar tarefa"
    cy.get('[data-cy="btn-adicionar"]').click();

    // Verificar se a tarefa foi adicionada na coluna "A Fazer"
    cy.get('[data-cy="lista-tarefas"]').contains(taskName).should('exist');

    // Screenshot da tarefa criada
    cy.screenshot('tarefa-criada');
  });

  it('Deve mover a tarefa para "Em progresso"', () => {
    // Encontrar a tarefa na coluna "A Fazer" e clicar para mover
    cy.get('[data-cy="lista-tarefas"]')
      .contains(taskName)
      .parent()
      .find('[data-cy="btn-mover-em-progresso"]')
      .click();

    // Verificar se a tarefa está na coluna "Em Progresso"
    cy.get('[data-cy="lista-tarefas-em-progresso"]')
      .contains(taskName)
      .should('exist');

    // Screenshot da tarefa em progresso
    cy.screenshot('tarefa-em-progresso');
  });

  it('Deve mover a tarefa para "Concluído"', () => {
    // Encontrar a tarefa na coluna "Em Progresso" e clicar para mover
    cy.get('[data-cy="lista-tarefas-em-progresso"]')
      .contains(taskName)
      .parent()
      .find('[data-cy="btn-mover-concluido"]')
      .click();

    // Verificar se a tarefa está na coluna "Concluído"
    cy.get('[data-cy="lista-tarefas-concluido"]')
      .contains(taskName)
      .should('exist');

    // Screenshot da tarefa concluída
    cy.screenshot('tarefa-concluida');
  });

  it('Deve deletar a tarefa', () => {
    // Encontrar a tarefa na coluna "Concluído" e clicar para deletar
    cy.get('[data-cy="lista-tarefas-concluido"]')
      .contains(taskName)
      .parent()
      .find('[data-cy="btn-deletar"]')
      .click();

    // Verificar se a tarefa não existe mais
    cy.get('[data-cy="lista-tarefas"]')
      .contains(taskName)
      .should('not.exist');

    // Screenshot da tarefa deletada
    cy.screenshot('tarefa-deletada');
  });
});
