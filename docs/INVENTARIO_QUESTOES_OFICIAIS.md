# Inventário de questões oficiais — Vestibular PWA

## Objetivo e regra de bloqueio

Este documento controla a montagem do banco de questões **oficiais** do ENEM e da UERJ. Não criar nem incorporar novas questões autorais enquanto a auditoria do escopo oficial abaixo não estiver concluída.

Uma questão só pode entrar como `"origem": "Oficial"` quando houver:
- prova oficial identificada por exame, ano, aplicação/etapa e caderno;
- número da questão na prova;
- URL direta da prova oficial;
- URL direta do gabarito oficial correspondente;
- alternativa correta conferida no gabarito final (retificações devem prevalecer);
- explicação revisada e compatível com o enunciado;
- metadados que permitam rastrear a origem.

## Escopo de cobertura

### ENEM
- Edições de 1998 a 2025, conforme provas e gabaritos disponibilizados oficialmente pelo INEP.
- A partir de 2009: provas objetivas de Linguagens, Ciências Humanas, Ciências da Natureza e Matemática, incluindo aplicações regulares e outras aplicações oficiais que tenham prova e gabarito disponíveis.
- De 1998 a 2008: provas antigas devem ser inventariadas separadamente, pois a estrutura e a matriz eram diferentes.
- Cadernos de cores diferentes geralmente repetem as mesmas questões em ordens diferentes. Não duplicar questões equivalentes: usar um caderno-base por aplicação e registrar os cadernos equivalentes quando conferidos.
- Provas adaptadas/acessíveis só entram como novas questões quando trouxerem conteúdo distinto; versões equivalentes devem ser registradas como variantes, não duplicadas.
- A edição de 2026 só poderá entrar após a aplicação e publicação oficial de prova e gabarito definitivos.

Fonte-mestra do INEP: https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos

### UERJ
- Inventariar os Exames de Qualificação objetivos de todos os anos disponibilizados oficialmente, incluindo 1º e 2º exames quando houver.
- Incluir provas objetivas de Língua Portuguesa/Literatura, língua estrangeira, História, Geografia, Matemática, Ciências da Natureza e itens interdisciplinares, respeitando a organização de cada edição.
- Inventariar o Exame Discursivo em uma trilha separada. Questões discursivas não devem ser forçadas para o formato atual de múltipla escolha; exigir uma adaptação de esquema e interface antes de incorporá-las.
- Usar gabarito definitivo/retificado quando houver e registrar questões anuladas ou com resposta alterada.

Portal oficial: https://sistema.vestibular.uerj.br/portal_vestibular_uerj/index_portal.php
Exemplo de página oficial de provas e gabaritos da UERJ 2015: https://sistema.vestibular.uerj.br/portal_vestibular_uerj/2015/exame_de_qualificacao/eq_prova_e_gabarito.php
Arquivo de questões comentadas da Revista do Vestibular: https://www.revista.vestibular.uerj.br/

## Status inicial do repositório

- [x] O arquivo `questions.json` foi inspecionado antes da criação deste inventário.
- [x] Existem 30 questões atualmente no banco.
- [x] Duas questões estão marcadas como oficiais: UERJ 2015, 1º Exame de Qualificação, questões 4 e 7.
- [x] Ambas têm referência ao PDF oficial de questões comentadas e campo `gabaritoVerificado: true`.
- [ ] Conferir se cada uma das duas questões oficiais tem link separado para o gabarito oficial definitivo. Até isso ser verificado, não considerar a auditoria completa de metadados finalizada.
- [ ] ENEM: inventário por edição, aplicação, área, caderno-base e gabarito.
- [ ] UERJ: inventário por ano, etapa/exame, prova e gabarito.
- [ ] Auditar questões anuladas, retificações e equivalência entre cadernos.
- [ ] Definir uma política de inclusão/publicação de enunciados e textos, com atribuição e respeito a eventuais restrições de reprodução.
- [ ] Só depois da conclusão e revisão do inventário oficial, avaliar lacunas e autorizar a criação de questões autorais.

## Modelo de registro por prova

| Campo | O que registrar |
|---|---|
| Exame | ENEM ou UERJ |
| Ano | Ano oficial da edição |
| Etapa/aplicação | Regular, reaplicação/PPL, 1º EQ, 2º EQ, discursiva etc. |
| Área/disciplina | Conforme a prova |
| Caderno-base | Cor/tipo e dia, quando aplicável |
| URL da prova | Link oficial direto |
| URL do gabarito | Link oficial direto e final |
| Questões inventariadas | Numeração/intervalo e exceções |
| Situação | Não iniciado / em auditoria / verificado / bloqueado |
| Observações | Anulações, retificações, versões equivalentes, limitações |

## Regra de atualização

Atualizar este documento a cada lote. Não declarar “banco oficial completo” com base apenas em uma amostra ou em uma contagem de questões. A conclusão exige cobertura de todo o escopo, fontes verificadas, deduplicação e revisão de gabaritos.
