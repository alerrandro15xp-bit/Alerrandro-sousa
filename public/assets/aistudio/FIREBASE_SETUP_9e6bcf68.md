# Configuração do Firebase

1. Crie um app Web no console do Firebase e copie os valores de configuração para `firebase-config.js`, substituindo todos os valores de exemplo (`SUA_...` e `SEU_...`). A configuração do app Web é pública; nunca coloque credenciais de conta de serviço no navegador.
2. Ative o provedor **E-mail/senha** em Authentication e crie um banco Firestore.
3. Publique `firestore.rules` no banco. Regras permitem a cada usuário acessar somente `users/{uid}` e `users/{uid}/attempts/{id}` correspondentes ao próprio UID. Exercícios ativos podem ser lidos por usuários autenticados; escrita de exercícios é negada ao cliente.
4. Cadastre documentos na coleção `exercises` com `topicId`, `order` (número), `active` (booleano), `prompt`, `options` (array de `{ id, text }`), `correctOptionId` e, opcionalmente, `explanation`. Os tópicos disponíveis são `fracoes`, `ciencias` e `historia`; cada documento deve ter um desses valores em `topicId`.
5. Sirva os arquivos por HTTP(S) (por exemplo, Live Server). O aplicativo não funciona de forma confiável abrindo `index.html` diretamente como `file://`.

A consulta de exercícios combina filtros por `topicId` e `active` com ordenação por `order`. Caso o Firebase solicite um índice composto, crie-o pelo link indicado no erro do console.

**Limite de segurança do exercício:** a consulta envia `correctOptionId` e `explanation` ao navegador para correção e feedback. Isso serve apenas para prática no MVP; não protege gabaritos de avaliações. Para avaliações seguras, faça a correção em backend confiável e não entregue o gabarito ao cliente.
