# Conexão Pet - web  
[![Linkedin Badge](https://img.shields.io/badge/-Carol_Ahn-0077b5?labelColor=0077b5&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/carolina-ahn/)](https://www.linkedin.com/in/carolina-ahn/) 
![React](https://img.shields.io/badge/-React-17B6E7?style=flat-square&logo=React&logoColor=white)
![Redux](https://img.shields.io/badge/-Redux-7248B6?style=flat-square&logo=Redux&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=flat-square&logo=docker&logoColor=white)  

## Sobre  
Este projeto foi desenvolvido no curso de Pós Graduação em Desenvolvimento Full Stack da PUCRS, em 2024.  
Trata-se de uma aplicação web para a divulgação de animais e feiras de adoção, com o diferencial de enviar atualizações por e-mail aos interessados e de fornecer cupons de desconto em lojas do ramo aos usuários cadastrados na plataforma.  
O repositório do back-end encontra-se em: https://github.com/carolahn/conexaopet-api  

Utiliza-se a ferramenta GitHub Actions para realizar as rotinas de CI/CD, fazendo o deploy em uma instância EC2 da AWS, onde ocorre a execução dos contêineres do servidor Nginx e da aplicação React.  
![image](https://github.com/carolahn/conexaopet-web/assets/62309069/a33fb2a1-9d44-467a-9bbc-8743495ca65a)  

## Como reproduzir  

### Desenvolvimento local:

Clonar este repositório  
`git clone https://github.com/carolahn/conexaopet-web.git`

Acessar o diretório do projeto:  
`cd conexaopet-web`  

Executar contêineres  
`docker compose -f docker-compose.dev.yml up --build`  

Acesse a aplicação em    
`http://localhost:3000`  

### Servir na EC2:  

Clonar este repositório  
`git clone https://github.com/carolahn/conexaopet-web.git`

Criar um novo repositório em branco no GitHub.  

Criar uma instância EC2 no site da AWS    
passo a passo: `https://youtu.be/W3CQ485oJKI`  
Configuração do grupo de segurança da instância EC2:  
![image](https://github.com/carolahn/conexaopet-api/assets/62309069/4818ccee-5f59-4ab3-ad44-d5ff44498d9f)  

Inserir os secrets no repositório GitHub, seguindo `.env.example.`  
Usar o endereço IP público da instância EC2 em `EC2_HOST_DNS` (ex: ec2-3-90-29-93.compute-1.amazonaws.com)   
Usar o endereço IP pública da instância EC2 do back-end em `REACT_APP_API_URL` (ex: http://ec2-3-90-29-93.compute-1.amazonaws.com:8008/api)   

Executar o push para o seu repositório e iniciar automaticamente a rotina do GitHub Actions e o deploy na instância AWS  
```
git add .
git commit "Initial commit"
git push origin main
```

Após finalizar o deploy, acesse a aplicação (substitua pelo IP da sua instância EC2)   
`http://ec2-3-90-29-93.compute-1.amazonaws.com`  

#### Usuários para teste:  
username: anamaria          password: 123456  
username: protetorpaulo     password: 123456  
username: cobasi            password: 123456  

