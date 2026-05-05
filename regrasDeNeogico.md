# BookHub – Regras de Negócio

## 1. Módulo de Autenticação e Conta

- RN-01 – O email do usuário deve ser único no sistema.
- RN-02 – A senha do usuário deve ser armazenada de forma criptografada.
- RN-03 – A senha deve atender a critérios mínimos de segurança (ex: tamanho mínimo).
- RN-04 – O usuário só pode acessar funcionalidades autenticadas após login válido.
- RN-05 – Usuários bloqueados não podem realizar login.
- RN-06 – A recuperação de senha deve ser feita por meio de token temporário enviado ao email.
- RN-07 – O usuário só pode alterar seus próprios dados.
- RN-08 – A exclusão da conta deve invalidar todos os dados de sessão do usuário.

---

## 2. Módulo de Exploração de Livros

- RN-09 – Apenas livros ativos devem ser exibidos para usuários.
- RN-10 – Cada livro deve estar associado a pelo menos uma categoria.
- RN-11 – A busca deve retornar resultados relevantes com base nos critérios informados.
- RN-12 – Livros excluídos não devem aparecer em listagens ou buscas.

---

## 3. Módulo de Leitura Online

- RN-13 – O usuário deve estar autenticado para acessar a leitura online.
- RN-14 – O progresso de leitura deve ser salvo automaticamente ao navegar entre páginas/capítulos.
- RN-15 – Cada usuário possui um progresso individual por livro.
- RN-16 – O sistema deve carregar o ponto de leitura mais recente ao retomar um livro.

---

## 4. Módulo de Favoritos

- RN-17 – Um livro não pode ser adicionado mais de uma vez aos favoritos do mesmo usuário.
- RN-18 – Apenas o usuário autenticado pode gerenciar sua lista de favoritos.
- RN-19 – A remoção de um livro dos favoritos deve ser imediata.

---

## 5. Módulo de Histórico de Leitura

- RN-20 – O histórico deve registrar apenas acessos realizados por usuários autenticados.
- RN-21 – O histórico deve ser específico por usuário.
- RN-22 – O sistema deve manter o registro de progresso vinculado ao histórico.
- RN-23 – A limpeza do histórico deve remover todos os registros do usuário.

---

## 6. Módulo de Avaliações e Comentários

- RN-24 – Um usuário pode avaliar um livro apenas uma vez.
- RN-25 – O usuário pode atualizar sua própria avaliação.
- RN-26 – Apenas usuários autenticados podem comentar.
- RN-27 – O usuário só pode editar ou excluir seus próprios comentários.
- RN-28 – Comentários excluídos não devem ser exibidos.
- RN-29 – A média de avaliações deve ser recalculada sempre que uma avaliação for criada, alterada ou removida.

---

## 7. Módulo Administrativo – Dashboard

- RN-30 – Apenas usuários com perfil de administrador podem acessar o painel administrativo.
- RN-31 – Os dados exibidos no dashboard devem refletir informações atualizadas do sistema.
- RN-32 – Estatísticas devem considerar apenas dados válidos (ex: livros ativos, usuários ativos).

---

## 8. Módulo Administrativo – Gerenciamento de Livros

- RN-33 – Apenas administradores podem cadastrar, editar ou excluir livros.
- RN-34 – Um livro deve possuir informações obrigatórias (título, autor, conteúdo, categoria).
- RN-35 – O conteúdo do livro deve estar em formato suportado pela plataforma.
- RN-36 – Ao excluir um livro, ele não deve mais estar disponível para leitura.
- RN-37 – Alterações em livros devem ser refletidas imediatamente na plataforma.

---

## 9. Módulo Administrativo – Categorias

- RN-38 – O nome da categoria deve ser único.
- RN-39 – Categorias não podem ser excluídas se houver livros vinculados a elas.
- RN-40 – Alterações em categorias devem refletir nos livros associados.

---

## 10. Módulo Administrativo – Usuários

- RN-41 – Apenas administradores podem gerenciar usuários.
- RN-42 – Usuários bloqueados não podem acessar o sistema.
- RN-43 – A exclusão de um usuário deve remover ou anonimizar seus dados, conforme política do sistema.
- RN-44 – Permissões de usuário devem ser respeitadas em todas as operações.

---

## 11. Módulo de Notificações

- RN-45 – Notificações devem ser enviadas apenas para usuários relevantes ao evento.
- RN-46 – O usuário deve poder visualizar apenas suas próprias notificações.
- RN-47 – Notificações devem ser marcadas como lidas após visualização.