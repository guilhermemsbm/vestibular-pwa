# Especificação do projeto — Vestibular PWA

## Objetivo
Aplicativo gratuito e instalável para praticar questões de preparação para ENEM e UERJ, com correção, explicações, gamificação e estatísticas.

## Restrições
- HTML, CSS e JavaScript puro; sem frameworks ou bibliotecas externas.
- Sem APIs pagas, backend, login ou dependências de CDN.
- Persistência local via `localStorage`; sem sincronização entre dispositivos.
- PWA com manifest e service worker para cache offline após o primeiro acesso por HTTPS/localhost.
- Questões iniciais autorais, sem atribuí-las falsamente a provas oficiais.

## Funcionalidades
- Navegação entre Início, Estudar, Estatísticas e Configurações.
- Filtros por vestibular, disciplina e matéria.
- Questões de múltipla escolha com correção e explicação.
- XP, pontos, níveis, sequência diária, conquistas e histórico de tentativas.
- Mensagem de recompensa configurável nas configurações.
- Salvamento do progresso e das preferências no dispositivo.

## Regras iniciais de gamificação
- Primeira resposta correta a uma questão: +10 XP e +10 pontos.
- Primeira resposta incorreta a uma questão: +2 XP e 0 pontos.
- Respostas posteriores à mesma questão ficam no histórico, mas não dão XP/pontos adicionais.
- Nível: `Math.floor(xp / 100) + 1`.
- A sequência conta dias locais em que o usuário respondeu a pelo menos uma questão.
- A mensagem de recompensa pode aparecer a cada novo múltiplo de 10 questões respondidas corretamente pela primeira vez.

## Critérios de aceitação
- Interface responsiva em celular e desktop.
- App funciona sem erros se os arquivos essenciais forem servidos por HTTPS ou localhost.
- Progresso persiste ao recarregar a página.
- Service worker faz cache do núcleo do app para acesso offline depois da primeira visita online.
- Filtros não exibem questões fora dos critérios escolhidos.
- A resposta correta e a explicação são exibidas após enviar uma resposta.

## Fora do escopo inicial
Contas, banco remoto, sincronização, pagamentos, rankings online e integração com APIs externas.