# AGENTS.md — instruções permanentes para qualquer IA que trabalhe neste repositório

Este arquivo fica na RAIZ do repositório `vestibular-pwa`. Leia-o inteiro antes de qualquer tarefa.
O dono do projeto está aprendendo programação: explique em linguagem simples e comente o código em português.

## O que é o projeto
"Trilha Vestibular": app pessoal e gratuito de estudos para ENEM e UERJ, para uso do dono e de um amigo.
HTML, CSS e JavaScript puros. PWA instalável e offline. Publicado no GitHub Pages em
`https://guilhermemsbm.github.io/vestibular-pwa/` (subdiretório: todo caminho é relativo, nunca começa com "/").

## Proibido (a menos que o dono peça expressamente)
- Frameworks, bibliotecas, CDNs, fontes ou imagens remotas, APIs de terceiros, IA em tempo de execução.
- Login, cadastro, pagamento, backend, banco remoto, telemetria, sincronização entre usuários.
- Usar `innerHTML` ou `eval` com texto de questões: use `textContent` e `createElement`.
- Renomear arquivos, IDs HTML, propriedades de questão, funções ou chaves do localStorage (veja "Contratos").
- Remover funcionalidades que já funcionam para facilitar uma mudança.
- Inventar fatos: gabaritos, fontes, anos ou números de questão. Se não souber, escreva "pendente".

## Arquivos (a fonte da verdade é o código; estes documentos descrevem o que existe)
`index.html`, `style.css`, `app.js`, `questions.json`, `manifest.json`, `service-worker.js`, `icon.svg`,
`PROJECT_SPEC.md`, `ARCHITECTURE.md`, `README.md`, `CHANGELOG.md`.
Pasta `docs/` e `data/`: inventário e rascunhos de questões. NÃO são carregados pelo app.

## Contratos (não mudar sem autorização do dono)
**localStorage:** `vestibularPwa.progress.v1` (xp, points, level, streak, attempts, answeredQuestionIds,
correctQuestionIds, questionStats, subjectStats, achievements) e `vestibularPwa.settings.v1`
(rewardMessage, rewardThreshold ∈ {5,10,20}).

**Questão em `questions.json`** (array de objetos): `id` (string única), `vestibular` ("ENEM" ou "UERJ"),
`disciplina`, `materia`, `dificuldade`, `enunciado`, `textoApoio` (opcional), `alternativas` (array de strings,
mínimo 2; o rascunho atual usa 5), `respostaCorreta` (ÍNDICE começando em 0), `explicacao`.
Campos extras permitidos nos rascunhos: `origem`, `anoProva`, `numeroQuestao`, `fonteUrl`, `fonteDescricao`, `observacao`.
`origem` deve dizer a verdade: "Autoral", "Autoral adaptada de questão oficial" ou "Oficial".

**IDs HTML usados pelo app.js:** screen-home, screen-study, screen-stats, screen-settings, home-xp, home-level,
home-streak, home-points, filter-vestibular, filter-disciplina, filter-materia, question-counter, question-tags,
question-enunciado, question-texto-apoio, question-alternativas, question-feedback, question-explicacao,
button-submit-answer, button-next-question, study-empty, stats-overview, stats-by-subject, stats-history,
stats-achievements, settings-reward-message, settings-reward-threshold, settings-save, settings-reset-progress,
nav-home, nav-study, nav-stats, nav-settings, app-message.

**Regras de gamificação (PROJECT_SPEC.md):** 1ª resposta correta a uma questão = +10 XP e +10 pontos; 1ª incorreta = +2 XP;
respostas seguintes à mesma questão só entram no histórico; nível = floor(xp/100)+1; sequência = dias seguidos com
pelo menos 1 resposta; recompensa a cada novo múltiplo de `rewardThreshold` de questões acertadas pela 1ª vez.

## Como trabalhar (obrigatório)
1. **Uma tarefa por vez.** Se o pedido tiver várias partes, proponha a ordem e faça a primeira.
2. **Leia antes de mexer:** abra os arquivos que a tarefa toca. Se faltar algum, PEÇA; não suponha o conteúdo.
3. **Mudança mínima.** Altere só o necessário e só os arquivos da tarefa.
4. **Entregue arquivos inteiros** prontos para substituir (sem "...", sem trechos omitidos), com o nome exato do arquivo.
5. **Cache do PWA:** o service worker serve arquivos do cache primeiro. Toda vez que qualquer arquivo listado em
   `APP_SHELL` mudar (inclusive `questions.json`), aumente o número em `CACHE_NAME` (hoje `trilha-vest-static-v2`)
   e avise o dono. Sem isso, quem já abriu o app continua vendo a versão antiga.
6. **Testes honestos.** Nunca diga que testou no navegador se não pôde. Separe "verifiquei lendo o código" de
   "o dono precisa testar", com o resultado esperado de cada teste.
7. **Conflito ou lacuna** entre documentos e código: pare, explique, proponha solução e espere a decisão.
8. **Atualize o CHANGELOG.md** com uma linha por mudança aprovada.

## Como testar (para o dono)
Abra um terminal na pasta do projeto: `python -m http.server 8000` e acesse `http://localhost:8000`
(abrir o arquivo direto não funciona: `fetch` e service worker exigem servidor). Abra o Console com F12 e confirme
que não há erros em vermelho. Para o PWA: F12 → Application → Manifest / Service Workers / Cache Storage;
depois Network → Offline → recarregar.

## Formato da resposta ao dono
A. Resumo em até 5 linhas.  B. Arquivos alterados.  C. Conteúdo integral de cada um.
D. Como salvar/substituir (pelo site do GitHub: abrir o arquivo → lápis → colar → Commit).
E. Testes: o que verifiquei lendo / o que o dono precisa testar, com o resultado esperado.
F. Pendências e riscos.  G. Confirmação de que os contratos acima foram respeitados.

## Estado atual (atualize ao fim de cada tarefa)
- `questions.json` está VAZIO (`[]`): o app abre sem nenhuma questão.
- `data/questions-authoral-draft.json` tem 30 questões no formato do contrato, fora do banco ativo.
- `docs/INVENTARIO_QUESTOES_OFICIAIS.md` define uma regra de bloqueio (sem autorais até auditar o escopo oficial);
  decisão do dono pendente sobre mantê-la, ajustá-la ou ativar as autorais já.
- Pendências técnicas conhecidas: validação questão a questão (hoje uma questão inválida derruba o banco todo),
  dados corrompidos do progresso tratados só em parte, ícone apenas SVG (avaliar PNG 192/512), sem exportar/importar
  progresso, sem modo aleatório, sem página de testes.
