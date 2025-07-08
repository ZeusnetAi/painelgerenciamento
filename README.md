# Sistema de Gestão - Crédito Rural

Sistema web para gestão de clientes e processos de crédito rural, com suporte a múltiplos bancos e linhas de crédito.

## Funcionalidades

- Cadastro e gestão de clientes
- Gestão de propriedades rurais
- Acompanhamento de status de processos
- Geração de relatórios
- Filtros avançados
- Suporte a modo escuro
- Armazenamento local dos dados

## Requisitos

- Node.js 14.x ou superior
- Navegador web moderno (Chrome, Firefox, Edge)

## Instalação

1. Clone o repositório:
```bash
git clone [url-do-repositorio]
cd sistema-credito-rural
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm start
```

4. Acesse o sistema no navegador:
```
http://localhost:3000
```

## Tecnologias Utilizadas

- HTML5
- CSS3 (com variáveis CSS para temas)
- JavaScript (ES6+)
- Local Storage para persistência de dados
- date-fns para manipulação de datas

## Estrutura do Projeto

- `index.html` - Estrutura da página principal
- `style.css` - Estilos e temas (claro/escuro)
- `app.js` - Lógica da aplicação
- `package.json` - Configuração e dependências

## Contribuição

1. Faça o fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request 