# Arquitetura inicial

## Estrutura
- `index.html`: layout e telas.
- `style.css`: tema visual responsivo.
- `app.js`: navegação, renderização, questões e gamificação.
- `questions.json`: banco de questões autorais.
- `manifest.json`: metadados do PWA.
- `service-worker.js`: cache de arquivos essenciais.
- `icon.svg`: ícone vetorial do aplicativo.

## Modelo de questão
Cada questão contém `id`, `vestibular`, `disciplina`, `materia`, `dificuldade`, `enunciado`, `alternativas` (array de strings), `respostaCorreta` (índice começando em zero) e `explicacao`.

## Persistência
- `vestibularPwa.progress.v1`: XP, pontos, sequência, tentativas, estatísticas e IDs já premiados.
- `vestibularPwa.settings.v1`: mensagem de recompensa e limite de recompensa.

## Regras de segurança e compatibilidade
Não inserir scripts externos. Os dados do JSON são validados antes de renderizar. Conteúdo textual de questões é colocado no DOM como texto, não interpretado como HTML. O service worker só pode ser registrado em contexto seguro (HTTPS ou localhost).