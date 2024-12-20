# clima-em-tempo-real
Aplicação web interativa que mostra o clima em tempo real de qualquer cidade, com design responsivo e informações detalhadas.

🌦️ Clima em Tempo Real

Olá! Eu sou o Daniel Alves, e este é o meu projeto Clima em Tempo Real. Se você já se pegou curioso sobre o clima em outra cidade ou apenas quer saber se vai precisar de um guarda-chuva amanhã, este aplicativo é para você!

☁️ Por Que Criei Este Projeto?
Sempre fui fascinado por tecnologia e pelo poder das APIs em trazer informações úteis para nossas mãos. Combinei essa paixão com meu interesse por meteorologia e surgiu a ideia de criar uma aplicação que fornecesse informações climáticas em tempo real de maneira simples e visualmente atraente.

🚀 Funcionalidades que Fazem a Diferença
🔍 Pesquisa Intuitiva
Busca Simples: Digite o nome da cidade e descubra instantaneamente o clima atual.
Suporte a Enter: Pressione "Enter" no teclado para uma busca rápida.
🌡️ Informações Detalhadas
Temperatura Atual: Veja a temperatura em Celsius de forma clara e destacada.
Descrição do Clima: Receba uma descrição detalhada do clima com ícones representativos.
Dados Adicionais:
Umidade: Mantenha-se informado sobre a umidade do ar.
Velocidade do Vento: Saiba quão forte está o vento na sua localização.
Horários de Nascer e Pôr do Sol: Planeje seu dia com base nos horários do sol.
📅 Previsão para os Próximos 5 Dias
Visão Geral: Obtenha uma visão rápida das condições climáticas para os próximos dias.
Ícones e Temperaturas: Cada dia vem acompanhado de um ícone e a temperatura prevista.
🎨 Design Responsivo e Atraente
Adaptável a Dispositivos: Seja no celular ou no desktop, a interface se ajusta perfeitamente.
Feedback Visual: O fundo muda dinamicamente de acordo com as condições climáticas atuais, proporcionando uma experiência imersiva.

🛠️ Tecnologias Utilizadas
HTML5 & CSS3: Estrutura e estilização modernas para uma interface limpa.
JavaScript (ES6+): Lógica interativa e consumo eficiente da API.
FontAwesome: Ícones elegantes para representar o clima.
Google Fonts: Fonte Roboto para uma leitura confortável.
OpenWeatherMap API: Fonte confiável de dados meteorológicos.

📂 Estrutura do Projeto

clima-em-tempo-real/
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── index.html
└── README.md
🖥️ Como Começar

1. Clone o Repositório
git clone https://github.com/seu-usuario/clima-em-tempo-real.git

2. Navegue até a Pasta do Projeto
cd clima-em-tempo-real

3. Abra o Aplicativo
Método Simples: Clique duas vezes no arquivo index.html.
Usando um Servidor Local: Para uma melhor experiência, utilize um servidor local como o Live Server no VS Code.

🔑 Configuração da API
Para que o Clima em Tempo Real funcione corretamente, é necessário configurar sua própria chave da API do OpenWeatherMap.

Passo a Passo:
Obtenha Sua Chave da API:

Registre-se em OpenWeatherMap e obtenha sua chave gratuita.
Configure a Chave no Código:

Abra o arquivo js/script.js.
Substitua 'SUA_CHAVE_AQUI' pela sua chave da API:
javascript
Copiar código
const apiKey = 'SUA_CHAVE_AQUI';
