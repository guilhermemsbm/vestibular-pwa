# Vestibular PWA

Aplicativo gratuito de estudos para ENEM e UERJ, com questões autorais, gamificação, estatísticas e funcionamento offline.

## Tecnologias

- HTML, CSS e JavaScript puro
- `localStorage` para salvar o progresso neste dispositivo
- Web App Manifest e Service Worker para instalação e uso offline após o primeiro carregamento
- Sem frameworks, CDNs, APIs pagas, login ou dependências externas

## Como executar localmente

O Service Worker exige HTTPS ou `localhost`; abrir `index.html` diretamente com `file://` não permite testar todos os recursos do PWA.

Uma opção simples é usar o GitHub Pages: em **Settings → Pages**, selecione a branch `main` e a pasta `/ (root)`. Depois de publicar, abra o endereço informado pelo GitHub Pages.

Para testar localmente, execute um servidor estático na pasta do projeto, por exemplo `python -m http.server 8000`, e acesse `http://localhost:8000`.

## Arquivos principais

- `index.html`: estrutura das telas
- `style.css`: visual responsivo
- `app.js`: navegação, questões, gamificação e estatísticas
- `questions.json`: conjunto inicial de questões autorais
- `manifest.json`: metadados de instalação
- `service-worker.js`: cache dos arquivos essenciais
- `PROJECT_SPEC.md`: requisitos funcionais
- `ARCHITECTURE.md`: arquitetura e regras de dados
- `CHANGELOG.md`: histórico de alterações

## Sobre as questões

As questões incluídas nesta primeira versão são exemplos autorais para testar o aplicativo. Elas não são apresentadas como questões oficiais do ENEM ou da UERJ.

## Persistência e privacidade

O progresso fica no `localStorage` do navegador e não é sincronizado entre dispositivos. Limpar os dados do navegador pode apagar o progresso salvo.

## Estado do projeto

Versão inicial em desenvolvimento. O comportamento offline e a instalação devem ser testados após publicar em HTTPS.