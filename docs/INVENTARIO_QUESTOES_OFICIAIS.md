# Inventário de questões oficiais — Vestibular PWA

## Objetivo e regra de bloqueio

Este documento controla a montagem do banco de questões **oficiais** do ENEM e da UERJ. Não criar nem incorporar novas questões autorais enquanto a auditoria do escopo oficial abaixo não estiver concluída.

## Política de liberação em etapas

É permitido liberar no banco ativo uma questão identificada diretamente em uma prova oficial antes de concluir a auditoria de todo o inventário. Ela deve ser marcada como `"origem": "Oficial"` e `"statusVerificacao": "pendente"` até a revisão do gabarito e dos detalhes. Não é necessário esperar o inventário inteiro ficar completo para disponibilizar questões oficiais.

Para entrar como questão de origem oficial, mesmo com revisão pendente, é obrigatório:
- identificar exame, ano, aplicação/etapa e caderno;
- registrar número da questão;
- registrar URL oficial da prova e confirmar que o enunciado/alternativas foram retirados daquele documento;
- registrar URL oficial do gabarito correspondente, se disponível;
- não inventar nem presumir a resposta correta. Se o gabarito ainda não foi conferido, marcar `respostaVerificada: false` e impedir que o item seja apresentado como questão corrigida até revisão;
- manter metadados rastreáveis.

Após a conferência, atualizar o status para `"statusVerificacao": "verificada"`, confirmar a resposta e incluir uma explicação revisada. Questões autorais ou apenas inspiradas/adaptadas continuam fora desta liberação antecipada: elas não contam como questões retiradas da prova oficial.

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
- [x] As 30 questões anteriores foram retiradas do banco ativo e arquivadas em `data/questions-authoral-draft.json` para não apresentar conteúdo autoral/adaptado como oficial.
- [x] O banco ativo `questions.json` está temporariamente vazio até a inclusão de questões oficiais verificadas.
- [x] Os dois itens antes marcados como oficiais foram reclassificados no arquivo de rascunhos: enunciados/alternativas eram adaptações, não reproduções fiéis verificadas da prova. Não contam como questões oficiais incluídas.
- [ ] Incluir questões cuja origem na prova oficial esteja identificada, permitindo status de revisão pendente; não exibir correção como confirmada até conferir o gabarito.
- [x] Criado `data/official-source-inventory.json` com 28 edições ENEM (1998–2025) e 26 anos UERJ (2000–2025), em status pendente ou parcial.
- [x] Página oficial do ENEM 2024 aberta; URLs diretas de prova e gabarito de dois cadernos-base registradas, mas PDFs ainda não auditados.
- [ ] ENEM: inventário por edição, aplicação, área, caderno-base e gabarito.
- [ ] UERJ: inventário por ano, etapa/exame, prova e gabarito.
- [ ] Auditar questões anuladas, retificações e equivalência entre cadernos.
- [ ] Definir uma política de inclusão/publicação de enunciados e textos, com atribuição e respeito a eventuais restrições de reprodução.
- [ ] Só depois da conclusão e revisão do inventário oficial, avaliar lacunas e autorizar a criação de questões autorais.

## Diretório de fontes oficiais por edição — links iniciais verificados

### ENEM
Inventário estruturado por edição: `data/official-source-inventory.json` (28 edições, 1998–2025). O arquivo diferencia links registrados de provas efetivamente auditadas.

Página-mestra com o arquivo histórico completo (1998–2025):  
https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos

Páginas de edição já localizadas:
- [2025 — INEP](https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos/2025)
- [2024 — INEP](https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos/2024)
- [2023 — INEP](https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos/2023)
- [2022 — INEP](https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos/2022)
- [2021 — INEP](https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos/2021)
- [2020 — INEP](https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos/2020)

Essas páginas são pontos de entrada para provas e gabaritos; ainda é necessário registrar cada aplicação, caderno-base e gabarito final na matriz anual. A página oficial de 2024 foi aberta e lista provas e gabaritos por dia, caderno e aplicação. Links diretos de dois cadernos-base foram registrados no JSON de fontes, mas os PDFs não carregaram na consulta automatizada e ainda não contam como auditados.

### UERJ
O inventário estruturado registra os anos de 2000 a 2025. Para 2012–2019 foram registrados links de páginas por edição, mas é necessário abrir cada página e verificar as etapas, provas e gabaritos finais.
- [Portal oficial do vestibular estadual](https://sistema.vestibular.uerj.br/portal_vestibular_uerj/index_portal.php)
- [2019 — 1º e 2º Exames de Qualificação](https://sistema.vestibular.uerj.br/portal_vestibular_uerj/2019/exame_de_qualificacao/eq_prova_e_gabarito.php)
- [2018 — 1º e 2º Exames de Qualificação](https://sistema.vestibular.uerj.br/portal_vestibular_uerj/2018/exame_de_qualificacao/eq_prova_e_gabarito.php)
- [2017 — 1º e 2º Exames de Qualificação](https://sistema.vestibular.uerj.br/portal_vestibular_uerj/2017/exame_de_qualificacao/eq_prova_e_gabarito.php)
- [2016 — 1º e 2º Exames de Qualificação](https://sistema.vestibular.uerj.br/portal_vestibular_uerj/2016/exame_de_qualificacao/eq_prova_e_gabarito.php)
- [2015 — 1º e 2º Exames de Qualificação](https://sistema.vestibular.uerj.br/portal_vestibular_uerj/2015/exame_de_qualificacao/eq_prova_e_gabarito.php)
- [2014 — 1º e 2º Exames de Qualificação](https://sistema.vestibular.uerj.br/portal_vestibular_uerj/2014/exame_de_qualificacao/eq_prova_e_gabarito.php)
- [2013 — 1º e 2º Exames de Qualificação](https://sistema.vestibular.uerj.br/portal_vestibular_uerj/2013/exame_de_qualificacao/eq_prova_e_gabarito.php)
- [2012 — 1º e 2º Exames de Qualificação](https://sistema.vestibular.uerj.br/portal_vestibular_uerj/2012/exame_de_qualificacao/eq_prova_e_gabarito.php)

## Matriz anual de cobertura — ENEM

Marque cada edição como concluída somente após registrar as provas e os gabaritos oficiais, os cadernos equivalentes e as questões anuladas/retificadas. O status inicial é pendente; não significa que a edição não tenha material publicado.

| Ano | Provas/gabaritos inventariados | Questões deduplicadas e conferidas | Status |
|---:|---|---|---|
| 1998 | [ ] | [ ] | Pendente |
| 1999 | [ ] | [ ] | Pendente |
| 2000 | [ ] | [ ] | Pendente |
| 2001 | [ ] | [ ] | Pendente |
| 2002 | [ ] | [ ] | Pendente |
| 2003 | [ ] | [ ] | Pendente |
| 2004 | [ ] | [ ] | Pendente |
| 2005 | [ ] | [ ] | Pendente |
| 2006 | [ ] | [ ] | Pendente |
| 2007 | [ ] | [ ] | Pendente |
| 2008 | [ ] | [ ] | Pendente |
| 2009 | [ ] | [ ] | Pendente |
| 2010 | [ ] | [ ] | Pendente |
| 2011 | [ ] | [ ] | Pendente |
| 2012 | [ ] | [ ] | Pendente |
| 2013 | [ ] | [ ] | Pendente |
| 2014 | [ ] | [ ] | Pendente |
| 2015 | [ ] | [ ] | Pendente |
| 2016 | [ ] | [ ] | Pendente |
| 2017 | [ ] | [ ] | Pendente |
| 2018 | [ ] | [ ] | Pendente |
| 2019 | [ ] | [ ] | Pendente |
| 2020 | [ ] | [ ] | Pendente |
| 2021 | [ ] | [ ] | Pendente |
| 2022 | [ ] | [ ] | Pendente |
| 2023 | [ ] | [ ] | Pendente |
| 2024 | [ ] | [ ] | Pendente |
| 2025 | [ ] | [ ] | Pendente |

## Matriz de cobertura — UERJ

A página de cada edição deve ser aberta para verificar quais etapas e exames foram realmente aplicados naquele ano. Não presumir que todos os anos têm duas qualificações nem que o formato foi idêntico.

| Ano | 1º Exame de Qualificação | 2º Exame de Qualificação | Exame Discursivo | Status geral |
|---:|---|---|---|---|
| 2025 | [ ] | [ ] | [ ] | Pendente |
| 2024 | [ ] | [ ] | [ ] | Pendente |
| 2023 | [ ] | [ ] | [ ] | Pendente |
| 2022 | [ ] | [ ] | [ ] | Pendente |
| 2021 | [ ] | [ ] | [ ] | Pendente |
| 2020 | [ ] | [ ] | [ ] | Pendente |
| 2019 | [ ] | [ ] | [ ] | Pendente |
| 2018 | [ ] | [ ] | [ ] | Pendente |
| 2017 | [ ] | [ ] | [ ] | Pendente |
| 2016 | [ ] | [ ] | [ ] | Pendente |
| 2015 | [ ] | [ ] | [ ] | Pendente |
| 2014 | [ ] | [ ] | [ ] | Pendente |
| 2013 | [ ] | [ ] | [ ] | Pendente |
| 2012 | [ ] | [ ] | [ ] | Pendente |
| 2011 | [ ] | [ ] | [ ] | Pendente |
| 2010 | [ ] | [ ] | [ ] | Pendente |
| 2009 | [ ] | [ ] | [ ] | Pendente |
| 2008 | [ ] | [ ] | [ ] | Pendente |
| 2007 | [ ] | [ ] | [ ] | Pendente |
| 2006 | [ ] | [ ] | [ ] | Pendente |
| 2005 | [ ] | [ ] | [ ] | Pendente |
| 2004 | [ ] | [ ] | [ ] | Pendente |
| 2003 | [ ] | [ ] | [ ] | Pendente |
| 2002 | [ ] | [ ] | [ ] | Pendente |
| 2001 | [ ] | [ ] | [ ] | Pendente |
| 2000 | [ ] | [ ] | [ ] | Pendente |

Para anos anteriores a 2000, registrar as edições encontradas no portal oficial em uma linha adicional, preservando a nomenclatura histórica usada pela UERJ.

## Ordem operacional dos lotes

1. **Lote de inventário:** listar provas e gabaritos por edição, sem copiar enunciados para o banco.
2. **Lote de validação:** conferir numeração, caderno-base, alternativa correta, anulações e retificações.
3. **Lote de inclusão antecipada:** incorporar itens identificados diretamente na prova oficial com metadados e status de revisão pendente; bloquear a exibição de resposta como confirmada até validar o gabarito.
4. **Lote de validação:** conferir alternativa correta, anulações/retificações, explicação e política de uso/reprodução.
5. **Lote de testes:** validar JSON, ids únicos, alternativas, status de verificação, fontes e compatibilidade com o aplicativo.
6. Repetir até cobrir o escopo. Somente então avaliar lacunas pedagógicas e liberar conteúdo autoral.

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
