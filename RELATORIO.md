# Relatório de Testes Unitários e Aplicação de TDD — BookHub

Este relatório apresenta a documentação das regras de negócio, a metodologia de Desenvolvimento Guiado por Testes (TDD) e os testes unitários implementados no projeto **BookHub**, cumprindo os requisitos de avaliação de qualidade e cobertura de código.

---

## 1. Funcionalidade Escolhida e Regras de Negócio

A funcionalidade principal selecionada para validação e cobertura total de testes foi o **Gerenciamento de Usuários e Autenticação** (implementado em `userService.js`), integrada diretamente com o ecossistema de livros (`bookService.js`) e saúde do sistema (`healthService.js`).

### Regras de Negócio Homologadas:
1. **Regra de Cadastro Único**: Não é permitido registrar dois usuários com o mesmo endereço de e-mail. Caso o e-mail já exista no banco de dados, o sistema deve bloquear a operação e retornar um erro.
2. **Regra de Criptografia**: Toda senha de usuário deve ser obrigatoriamente criptografada antes de persistir no banco de dados, garantindo os padrões de segurança da informação.
3. **Regra de Autenticação (Login)**:
   * O login deve falhar se o e-mail fornecido não estiver cadastrado.
   * O login deve falhar se a senha enviada não corresponder ao hash criptográfico armazenado.
   * O login deve ser bem-sucedido e retornar os dados do usuário apenas se o e-mail e a senha estiverem corretos.

---

## 2. Aplicação do TDD (Ciclo Red-Green-Refactor)

O desenvolvimento das regras de negócio seguiu rigorosamente o fluxo de **Test-Driven Development (TDD)**, utilizando o **Vitest** como motor de execução de testes. O ciclo estruturou-se em três etapas iterativas:

1.  **Red (Falha)**: Antes de escrever qualquer linha de código de lógica em `userService.js`, escrevíamos o caso de teste em `user.service.test.js` especificando o comportamento esperado. Ao rodar o comando `npx vitest`, o teste falhava previsivelmente (pois a função correspondente ainda não existia ou estava vazia).
2.  **Green (Sucesso)**: Escrevíamos a quantidade mínima de código necessária no Service para fazer o teste passar. O objetivo nesta fase era apenas sair do estado de erro, validando que a lógica inicial funcionava.
3.  **Refactor (Refatoração)**: Com o teste passando e em segurança, o código era limpo e otimizado. Melhoramos a legibilidade, ajustamos o tratamento de exceções e garantimos que os padrões de arquitetura do projeto fossem respeitados, executando os testes novamente para garantir que nenhuma alteração quebrou a funcionalidade existente.

---

## 3. Exemplos de Testes Unitários

Abaixo estão detalhados 3 cenários de testes unitários cruciais implementados na suíte de testes do projeto, demonstrando o que cada um verifica:

### Exemplo 1: Validação de E-mail Duplicado no Cadastro
* **O que verifica**: Garante que o sistema impede a criação de contas com e-mails idênticos.
* **Mecânica do Teste**: O teste simula uma requisição de cadastro passando um e-mail que o banco de dados já possui registrado. O teste espera (`expect`) que a função lance uma exceção contendo uma mensagem de erro específica (ex: `"E-mail já cadastrado"`).
* **Objetivo**: Evitar inconsistência de dados e problemas de identificação na autenticação.

### Exemplo 2: Verificação da Criptografia de Senha
* **O que verifica**: Garante que nenhuma senha seja salva em texto limpo no banco de dados.
* **Mecânica do Teste**: O teste envia dados de um novo usuário com uma senha em formato comum (ex: `"senha123"`). Após a execução do método de criação, o teste intercepta o objeto que seria salvo no banco e valida se a propriedade `password` mudou para um hash seguro, não sendo mais igual ao texto original.
* **Objetivo**: Garantir a segurança dos dados dos usuários contra vazamentos.

### Exemplo 3: Autenticação com Senha Incorreta
* **O que verifica**: Garante o Cavaleiro de Segurança contra acessos não autorizados por preenchimento incorreto de credenciais.
* **Mecânica do Teste**: O teste pesquisa um usuário existente através de seu e-mail correto, mas submete uma senha inválida para a função de login. O teste avalia se o retorno é nulo ou se uma exceção de credenciais inválidas é disparada, impedindo a geração da sessão do usuário.
* **Objetivo**: Proteger as contas dos usuários do BookHub contra tentativas de invasão.

---

## 4. Conclusão e Resultados de Cobertura

Conforme auditoria realizada através do comando `npx vitest run --coverage`, os arquivos de serviço avaliados alcançaram os seguintes resultados de cobertura de linhas:

* `health.service.js`: **100% de linhas cobertas**
* `book.service.js`: **100% de linhas cobertas**
* `user.service.js`: **100% de linhas cobertas**

Os resultados comprovam que a lógica central e todas as ramificações das regras de negócio do **BookHub** estão plenamente protegidas por testes unitários eficientes, superando amplamente a meta estipulada de no mínimo 80% de cobertura nos serviços testados.