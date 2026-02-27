# Roteiro de Atividade: Automação de Testes com Playwright

**Pré-requisitos:** Noções básicas de teste de software, familiaridade com terminal/linha de comando

---

## 1. Objetivos de Aprendizagem

Ao final desta atividade, o aluno deverá ser capaz de:

- Relembrar e aplicar os conceitos fundamentais de teste de software no contexto da automação.
- Compreender o papel da automação de testes dentro do ciclo de vida do desenvolvimento moderno.
- Instalar, configurar e utilizar o Playwright como ferramenta de automação de testes end-to-end (E2E).
- Escrever, executar e interpretar testes automatizados para aplicações web reais.
- Analisar relatórios de teste gerados pelo Playwright e propor melhorias com base nos resultados.

---

## 2. Revisão Teórica — Fundamentos de Teste de Software

Antes de mergulhar na prática, é essencial revisitar os conceitos que sustentam qualquer estratégia de automação. Esta seção deve ser conduzida de forma dialogada, incentivando a participação dos alunos.

### 2.1 O que é Teste de Software?

Teste de software é o processo de avaliar um sistema ou componente com o objetivo de verificar se ele atende aos requisitos especificados e identificar defeitos. Envolve a execução de um programa sob condições controladas e a comparação dos resultados obtidos com os resultados esperados.

**Pergunta disparadora para a turma:** *"Se vocês tivessem que testar um aplicativo de e-commerce antes de ele ir ao ar, por onde começariam? O que verificariam?"*

### 2.2 Níveis de Teste

Relembrando a Pirâmide de Testes, os níveis se organizam da seguinte forma:

```
        /‾‾‾‾‾‾‾‾‾‾‾\
       /   E2E / UI    \        ← Poucos, lentos, caros (é aqui que o Playwright atua)
      /‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾\
     /    Integração        \    ← Quantidade intermediária
    /‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾\
   /       Unitários            \  ← Muitos, rápidos, baratos
  /‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾\
```

- **Testes Unitários:** Validam unidades isoladas de código (funções, métodos). São rápidos e baratos.
- **Testes de Integração:** Verificam a comunicação entre módulos ou serviços.
- **Testes End-to-End (E2E):** Simulam o comportamento real do usuário em toda a aplicação. São mais lentos e custosos, porém validam fluxos completos.

### 2.3 Por que Automatizar?

A automação de testes oferece benefícios concretos que justificam o investimento inicial:

- **Repetibilidade:** testes executados da mesma forma, sempre, sem fadiga humana.
- **Velocidade:** suítes completas rodam em minutos, viabilizando feedback rápido em pipelines CI/CD.
- **Cobertura de regressão:** garantia de que funcionalidades existentes não quebraram após novas alterações.
- **Documentação viva:** os scripts de teste descrevem o comportamento esperado do sistema.

### 2.4 Quando NÃO Automatizar?

Nem tudo deve ser automatizado. É importante que os alunos compreendam que:

- Testes exploratórios e de usabilidade dependem de percepção humana.
- Funcionalidades instáveis ou em constante mudança geram testes frágeis (*flaky tests*).
- O custo de manutenção dos testes deve ser considerado na decisão.

**Reflexão para a turma:** *"Automatizar tudo é viável? Qual seria o critério de decisão para escolher o que automatizar primeiro?"*

---

## 3. Introdução ao Playwright

### 3.1 O que é o Playwright?

O Playwright é um framework de automação de testes E2E desenvolvido pela Microsoft. Ele permite escrever testes que controlam navegadores reais (Chromium, Firefox e WebKit) de forma programática.

Características que o tornam relevante para o aprendizado:

- Suporte nativo a múltiplos navegadores (*cross-browser testing*).
- API moderna e intuitiva com *auto-wait* (espera automática por elementos).
- Geração automática de código via *Codegen*.
- Relatórios HTML integrados e rastreamento visual (*Trace Viewer*).
- Suporte a linguagens: JavaScript/TypeScript, Python, Java e C#.

### 3.2 Playwright vs. Outras Ferramentas

| Característica         | Playwright         | Selenium           | Cypress            |
|------------------------|--------------------|--------------------|--------------------|
| Multi-browser nativo   | ✅ Sim             | ✅ Sim             | ⚠️ Parcial         |
| Auto-wait              | ✅ Nativo          | ❌ Manual          | ✅ Nativo          |
| Velocidade             | Rápido             | Moderado           | Rápido             |
| Geração de código      | ✅ Codegen         | ❌ Não             | ❌ Não             |
| Trace Viewer           | ✅ Sim             | ❌ Não             | ⚠️ Limitado        |
| Curva de aprendizado   | Moderada           | Alta               | Baixa              |

---

## 4. Preparação do Ambiente

### 4.1 Pré-requisitos de Instalação

Antes de iniciar, certifique-se de que o ambiente possui:

- **Node.js** (versão 18 ou superior): [https://nodejs.org](https://nodejs.org)
- **VS Code** (recomendado): [https://code.visualstudio.com](https://code.visualstudio.com)
- **Git** (para versionamento): [https://git-scm.com](https://git-scm.com)

Verifique a instalação no terminal:

```bash
node --version
npm --version
```

### 4.2 Criando o Projeto

Abra o terminal e execute os seguintes comandos:

```bash
# Criar e acessar o diretório do projeto
mkdir atividade-playwright
cd atividade-playwright

# Inicializar o projeto Playwright
npm init playwright@latest
```

Durante a inicialização, selecione as seguintes opções:

- Linguagem: **TypeScript** (recomendado) ou JavaScript
- Diretório de testes: **tests**
- Adicionar GitHub Actions: **Não** (por enquanto)
- Instalar navegadores: **Sim**

### 4.3 Estrutura do Projeto Gerada

Após a instalação, a estrutura será semelhante a:

```
atividade-playwright/
├── tests/
│   └── example.spec.ts        ← Arquivo de exemplo
├── tests-examples/
│   └── demo-todo-app.spec.ts  ← Exemplo completo de TODO app
├── playwright.config.ts        ← Configuração central
├── package.json
└── package-lock.json
```

### 4.4 Executando o Teste de Exemplo

Para validar que tudo está funcionando:

```bash
# Executar todos os testes
npx playwright test

# Executar com interface visual (modo headed)
npx playwright test --headed

# Abrir o relatório HTML
npx playwright show-report
```

**Checkpoint:** todos os alunos devem ter o relatório HTML aberto no navegador antes de prosseguir.

---

## 5. Atividade Prática — Mão na Massa

### 5.1 Parte 1: Explorando o Codegen (20 min)

O Codegen é uma ferramenta que grava as interações do usuário no navegador e gera código de teste automaticamente. É um excelente ponto de partida para iniciantes.

```bash
npx playwright codegen https://demo.playwright.dev/todomvc
```

**Tarefa:** Com o Codegen aberto, o aluno deve realizar as seguintes ações no aplicativo TODO:

1. Adicionar três itens à lista (ex: "Estudar Playwright", "Fazer exercício", "Ler artigo").
2. Marcar o segundo item como concluído.
3. Filtrar pelos itens ativos.
4. Excluir o primeiro item.

Ao finalizar, o aluno deve copiar o código gerado e salvá-lo em `tests/todo-codegen.spec.ts`.

### 5.2 Parte 2: Escrevendo Testes Manualmente (40 min)

Agora é hora de escrever testes com intenção e estrutura. Crie o arquivo `tests/todo-manual.spec.ts` com o seguinte conteúdo inicial:

```typescript
import { test, expect } from '@playwright/test';

// Bloco de configuração: executado antes de cada teste
test.beforeEach(async ({ page }) => {
  // Navegar para a aplicação TODO
  await page.goto('https://demo.playwright.dev/todomvc');
});

// ---------- GRUPO 1: Adicionar itens ----------

test.describe('Adicionar itens à lista', () => {

  test('deve permitir adicionar um novo item', async ({ page }) => {
    // Localizar o campo de entrada e digitar o texto
    await page.locator('.new-todo').fill('Estudar Playwright');
    await page.locator('.new-todo').press('Enter');

    // Verificar que o item aparece na lista
    await expect(page.locator('.todo-list li')).toHaveCount(1);
    await expect(page.locator('.todo-list li')).toHaveText('Estudar Playwright');
  });

  test('deve permitir adicionar múltiplos itens', async ({ page }) => {
    const itens = ['Item 1', 'Item 2', 'Item 3'];

    for (const item of itens) {
      await page.locator('.new-todo').fill(item);
      await page.locator('.new-todo').press('Enter');
    }

    await expect(page.locator('.todo-list li')).toHaveCount(3);
  });

});

// ---------- GRUPO 2: Marcar como concluído ----------

test.describe('Marcar itens como concluídos', () => {

  test('deve riscar o item ao marcá-lo como concluído', async ({ page }) => {
    // Adicionar um item
    await page.locator('.new-todo').fill('Tarefa para concluir');
    await page.locator('.new-todo').press('Enter');

    // Clicar no checkbox para marcar como concluído
    await page.locator('.todo-list li .toggle').click();

    // Verificar que o item possui a classe 'completed'
    await expect(page.locator('.todo-list li')).toHaveClass(/completed/);
  });

});
```

**Tarefa para o aluno:** Complementar o arquivo acima adicionando os seguintes testes:

1. **Teste de filtragem:** Verificar que o filtro "Active" exibe apenas itens não concluídos.
2. **Teste de exclusão:** Verificar que é possível remover um item da lista.
3. **Teste de edição:** Verificar que um duplo-clique sobre um item permite editá-lo.
4. **Teste de contagem:** Verificar que o contador de itens restantes atualiza corretamente.

### 5.3 Parte 3: Asserções e Boas Práticas (20 min)

O Playwright oferece asserções ricas que vão além da verificação de texto. Apresente os exemplos abaixo e peça aos alunos que os integrem nos testes:

```typescript
// Verificar visibilidade
await expect(page.locator('.main')).toBeVisible();

// Verificar atributo
await expect(page.locator('.new-todo')).toHaveAttribute('placeholder', 'What needs to be done?');

// Verificar URL após navegação
await expect(page).toHaveURL(/.*todomvc/);

// Verificar título da página
await expect(page).toHaveTitle(/TodoMVC/);

// Verificar que elemento NÃO existe
await expect(page.locator('.todo-list li')).toHaveCount(0);
```

**Boas práticas a destacar:**

- Prefira seletores acessíveis (`getByRole`, `getByText`, `getByLabel`) em vez de seletores CSS frágeis.
- Evite `page.waitForTimeout()` — confie no *auto-wait* do Playwright.
- Agrupe testes relacionados com `test.describe()`.
- Use `test.beforeEach()` para eliminar repetição de setup.
- Nomeie os testes de forma descritiva: descreva o comportamento esperado, não a implementação.

### 5.4 Parte 4: Trace Viewer e Depuração (20 min)

O Trace Viewer permite inspecionar cada passo do teste com screenshots, rede, console e DOM.

```bash
# Executar testes com trace habilitado
npx playwright test --trace on

# Abrir o relatório (o trace estará disponível nos testes que falharam ou em todos)
npx playwright show-report
```

**Tarefa:** O professor deve introduzir propositalmente um erro em um dos testes (por exemplo, alterar o texto esperado de uma asserção). Os alunos devem:

1. Executar os testes e observar a falha.
2. Abrir o Trace Viewer pelo relatório HTML.
3. Navegar pelos passos do teste para identificar o momento exato da falha.
4. Corrigir o teste e executar novamente para confirmar.

---

## 6. Desafio Extra (para Alunos Avançados)

Para alunos que finalizarem as atividades anteriores, proponha o seguinte desafio:

### Desafio: Testar uma Aplicação Diferente

Escolha um dos sites abaixo e escreva uma suíte com pelo menos 5 testes:

- **Sauce Demo** (e-commerce fictício): [https://www.saucedemo.com](https://www.saucedemo.com)
  - Login com credenciais válidas e inválidas.
  - Adicionar produto ao carrinho.
  - Finalizar uma compra.
  - Ordenar produtos por preço.
  
- **The Internet (Heroku)**: [https://the-internet.herokuapp.com](https://the-internet.herokuapp.com)
  - Testar autenticação HTTP.
  - Testar upload de arquivo.
  - Testar drag and drop.

---

## 7. Entregáveis

Cada aluno (ou dupla) deverá entregar:

| Item | Descrição | Formato |
|------|-----------|---------|
| 1 | Repositório Git com o projeto Playwright completo | Link do GitHub |
| 2 | Arquivo `tests/todo-manual.spec.ts` com todos os testes solicitados | Código-fonte |
| 3 | Screenshot ou PDF do relatório HTML do Playwright mostrando todos os testes passando | Imagem ou PDF |
| 4 | Documento reflexivo (máx. 1 página) respondendo: *"Quais as vantagens e limitações que você percebeu ao automatizar testes com o Playwright?"* | PDF ou Markdown |

---

## 8. Recursos Complementares

Para aprofundamento e consulta:

- **Documentação oficial do Playwright:** [https://playwright.dev/docs/intro](https://playwright.dev/docs/intro)
- **Playlist de vídeos — Playwright (canal oficial):** [https://www.youtube.com/c/Abornedev](https://www.youtube.com/c/Playwrightdev)
- **Repositório de exemplos do Playwright:** [https://github.com/microsoft/playwright](https://github.com/microsoft/playwright)
- **Artigo — Pirâmide de Testes (Martin Fowler):** [https://martinfowler.com/bliki/TestPyramid.html](https://martinfowler.com/bliki/TestPyramid.html)
- **Norma ISO/IEC 25010** — Modelo de qualidade de produto de software

---

