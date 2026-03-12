import { test, expect } from '@playwright/test';

test.describe('QS Acadêmico — Testes do Sistema de Notas', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://rudivanlf.github.io/02-TesteAutomatizado/');
    page.on('dialog', async dialog => { await dialog.accept(); });
  });

  // ========== GRUPO 1: Cadastro de Alunos ==========

  test.describe('Cadastro de Alunos', () => {

    test('deve cadastrar um aluno com dados válidos', async ({ page }) => {
      await page.getByLabel('Nome do Aluno').fill('João Silva');
      await page.getByLabel('Nota 1').fill('7');
      await page.getByLabel('Nota 2').fill('8');
      await page.getByLabel('Nota 3').fill('6');

      await page.getByRole('button', { name: 'Cadastrar' }).click();

      // Verificar que o aluno aparece na tabela
      await expect(page.locator('#tabela-alunos tbody tr')).toHaveCount(1);
      await expect(page.locator('#tabela-alunos').getByText('João Silva')).toBeVisible();
    });

    test('deve exibir mensagem de sucesso após cadastro', async ({ page }) => {
      await page.getByLabel('Nome do Aluno').fill('Ana Costa');
      await page.getByLabel('Nota 1').fill('9');
      await page.getByLabel('Nota 2').fill('8');
      await page.getByLabel('Nota 3').fill('10');

      await page.getByRole('button', { name: 'Cadastrar' }).click();

      await expect(page.locator('#mensagem')).toContainText('cadastrado com sucesso');
    });

    test('não deve cadastrar aluno sem nome', async ({ page }) => {
      await page.getByLabel('Nota 1').fill('7');
      await page.getByLabel('Nota 2').fill('8');
      await page.getByLabel('Nota 3').fill('6');

      await page.getByRole('button', { name: 'Cadastrar' }).click();

      // A tabela deve continuar sem dados reais
      await expect(page.locator('#tabela-alunos tbody td.texto-central')).toBeVisible();
    });

  });

  // ========== GRUPO 2: Cálculo de Média ==========

  test.describe('Cálculo de Média', () => {

    test('deve calcular a média aritmética das três notas', async ({ page }) => {
      await page.getByLabel('Nome do Aluno').fill('Pedro Santos');
      await page.getByLabel('Nota 1').fill('8');
      await page.getByLabel('Nota 2').fill('6');
      await page.getByLabel('Nota 3').fill('10');

      await page.getByRole('button', { name: 'Cadastrar' }).click();
      const celulaMedia = page.locator('#tabela-alunos tbody tr').first().locator('td').nth(4);
      await expect(celulaMedia).toHaveText('8.00');
    });

  });
});

test.describe('Teste de validação de notas', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://rudivanlf.github.io/02-TesteAutomatizado/');
    page.on('dialog', async dialog => { await dialog.accept(); });
  });

  test('rejeita nota maior que 10', async ({ page }) => {
    await page.getByLabel('Nome do Aluno').fill('Aluno Invalido');
    await page.getByLabel('Nota 1').fill('11');
    await page.getByLabel('Nota 2').fill('5');
    await page.getByLabel('Nota 3').fill('5');

    await page.getByRole('button', { name: 'Cadastrar' }).click();

    await expect(page.locator('#mensagem')).toContainText('As notas devem estar entre 0 e 10');
    await expect(page.locator('#tabela-alunos tbody td.texto-central')).toBeVisible();
  });

  test('rejeita nota negativa', async ({ page }) => {
    await page.getByLabel('Nome do Aluno').fill('Aluno Negativo');
    await page.getByLabel('Nota 1').fill('-1');
    await page.getByLabel('Nota 2').fill('5');
    await page.getByLabel('Nota 3').fill('5');

    await page.getByRole('button', { name: 'Cadastrar' }).click();

    await expect(page.locator('#mensagem')).toContainText('As notas devem estar entre 0 e 10');
    await expect(page.locator('#tabela-alunos tbody td.texto-central')).toBeVisible();
  });

});

test.describe('Busca por nome', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://rudivanlf.github.io/02-TesteAutomatizado/');
  });

  test('filtra e exibe somente o aluno correspondente', async ({ page }) => {
    await page.getByLabel('Nome do Aluno').fill('Carlos Silva');
    await page.getByLabel('Nota 1').fill('7');
    await page.getByLabel('Nota 2').fill('7');
    await page.getByLabel('Nota 3').fill('7');
    await page.getByRole('button', { name: 'Cadastrar' }).click();

    await page.getByLabel('Nome do Aluno').fill('Maria Souza');
    await page.getByLabel('Nota 1').fill('9');
    await page.getByLabel('Nota 2').fill('9');
    await page.getByLabel('Nota 3').fill('9');
    await page.getByRole('button', { name: 'Cadastrar' }).click();

    await page.getByLabel('Buscar por nome').fill('Maria');

      await expect(page.locator('#tabela-alunos tbody tr')).toHaveCount(1);
    await expect(page.locator('#tabela-alunos').getByText('Maria Souza')).toBeVisible();
  });

});

test.describe('Exclusão de alunos', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://rudivanlf.github.io/02-TesteAutomatizado/');
    page.on('dialog', async dialog => { await dialog.accept(); });
  });

  test('deve excluir um aluno cadastrado e deixar a tabela vazia', async ({ page }) => {
    const nome = 'Remover Aluno';

    await page.getByLabel('Nome do Aluno').fill(nome);
    await page.getByLabel('Nota 1').fill('7');
    await page.getByLabel('Nota 2').fill('7');
    await page.getByLabel('Nota 3').fill('7');
    await page.getByRole('button', { name: 'Cadastrar' }).click();

    await expect(page.locator('#tabela-alunos').getByText(nome)).toBeVisible();

    await page.getByRole('button', { name: `Excluir ${nome}` }).click();

    await expect(page.locator('#tabela-alunos tbody td.texto-central')).toBeVisible();
  });

});

test.describe('Aprovação', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://rudivanlf.github.io/02-TesteAutomatizado/');
    page.on('dialog', async dialog => { await dialog.accept(); });
  });

  test('totais dos cards refletem os alunos cadastrados por situação', async ({ page }) => {
    // Aprovado
    await page.getByLabel('Nome do Aluno').fill('Aluno Aprovado');
    await page.getByLabel('Nota 1').fill('9');
    await page.getByLabel('Nota 2').fill('9');
    await page.getByLabel('Nota 3').fill('9');
    await page.getByRole('button', { name: 'Cadastrar' }).click();

    // Recuperação
    await page.getByLabel('Nome do Aluno').fill('Aluno Recuperacao');
    await page.getByLabel('Nota 1').fill('6');
    await page.getByLabel('Nota 2').fill('5');
    await page.getByLabel('Nota 3').fill('5');
    await page.getByRole('button', { name: 'Cadastrar' }).click();

    // Reprovado
    await page.getByLabel('Nome do Aluno').fill('Aluno Reprovado');
    await page.getByLabel('Nota 1').fill('2');
    await page.getByLabel('Nota 2').fill('2');
    await page.getByLabel('Nota 3').fill('2');
    await page.getByRole('button', { name: 'Cadastrar' }).click();

    await expect(page.locator('#stat-total')).toHaveText('3');
    await expect(page.locator('#stat-aprovados')).toHaveText('1');
    await expect(page.locator('#stat-recuperacao')).toHaveText('1');
    await expect(page.locator('#stat-reprovados')).toHaveText('1');
  });

});

test.describe('Situação do aluno', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://rudivanlf.github.io/02-TesteAutomatizado/');
    page.on('dialog', async dialog => { await dialog.accept(); });
  });

  test('Aprovado quando média >= 7', async ({ page }) => {
    await page.getByLabel('Nome do Aluno').fill('Aluno Aprovado2');
    await page.getByLabel('Nota 1').fill('8');
    await page.getByLabel('Nota 2').fill('7');
    await page.getByLabel('Nota 3').fill('9');
    await page.getByRole('button', { name: 'Cadastrar' }).click();

    const situacao = page.locator('#tabela-alunos tbody tr').first().locator('td').nth(5);
    await expect(situacao).toContainText('Aprovado');
  });

  test('Reprovado quando média < 5', async ({ page }) => {
    await page.getByLabel('Nome do Aluno').fill('Aluno Reprovado2');
    await page.getByLabel('Nota 1').fill('2');
    await page.getByLabel('Nota 2').fill('3');
    await page.getByLabel('Nota 3').fill('4');
    await page.getByRole('button', { name: 'Cadastrar' }).click();

    const situacao = page.locator('#tabela-alunos tbody tr').first().locator('td').nth(5);
    await expect(situacao).toContainText('Reprovado');
  });

  test('Recuperação quando média >=5 e <7', async ({ page }) => {
    await page.getByLabel('Nome do Aluno').fill('Aluno Recuperacao2');
    await page.getByLabel('Nota 1').fill('6');
    await page.getByLabel('Nota 2').fill('5');
    await page.getByLabel('Nota 3').fill('5');
    await page.getByRole('button', { name: 'Cadastrar' }).click();

    const situacao = page.locator('#tabela-alunos tbody tr').first().locator('td').nth(5);
    await expect(situacao).toContainText('Recuperação');
  });

});

test.describe('Múltiplos cadastros', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://rudivanlf.github.io/02-TesteAutomatizado/');
    page.on('dialog', async dialog => { await dialog.accept(); });
  });

  test('cadastrar 3 alunos consecutivos e verificar a tabela', async ({ page }) => {
    for (let i = 1; i <= 3; i++) {
      await page.getByLabel('Nome do Aluno').fill(`Aluno ${i}`);
      await page.getByLabel('Nota 1').fill('7');
      await page.getByLabel('Nota 2').fill('7');
      await page.getByLabel('Nota 3').fill('7');
      await page.getByRole('button', { name: 'Cadastrar' }).click();
    }

    await expect(page.locator('#tabela-alunos tbody tr')).toHaveCount(3);
  });

});

