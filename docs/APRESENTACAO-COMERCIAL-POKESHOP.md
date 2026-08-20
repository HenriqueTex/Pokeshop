# PokeShop

## Uma experiência digital feita para transformar fãs em clientes

**Apresentação comercial do MVP**  
Catálogo e experiência de compra para uma loja especializada em Pokémon.

---

## Visão do projeto

A PokeShop não foi concebida como apenas mais uma vitrine de produtos. O projeto combina narrativa, movimento e facilidade de navegação para criar uma loja com identidade própria — capaz de despertar a sensação de descoberta que faz parte do universo Pokémon.

Desde a primeira interação, o visitante é conduzido por uma experiência cinematográfica, encontra produtos e coleções com facilidade e pode montar seu carrinho sem precisar criar uma conta.

> **Proposta de valor:** uma loja memorável, responsiva e preparada para evoluir de um catálogo comercial para uma operação completa de e-commerce.

---

## Principais diferenciais

### 1. Abertura cinematográfica com Pikachu

A experiência começa com um vídeo em tela cheia que apresenta Pikachu e estabelece imediatamente o clima da marca.

- Nome e assinatura da loja em destaque.
- Entrada iniciada pelo CTA **“Sua aventura começa aqui”**.
- Reprodução com áudio após a interação do visitante.
- Controles discretos para ativar/desativar o som ou avançar.
- Redução gradual do volume nos segundos finais.
- Transição suave para a Home, sem cortes bruscos.
- Experiência adaptada para desktop e dispositivos móveis.

Esse momento funciona como uma assinatura digital: gera impacto, diferencia a loja e aumenta a lembrança da marca.

### 2. Adicionar ao carrinho vira uma captura

O botão de compra foi transformado em uma microexperiência inspirada na captura de um Pokémon.

Ao adicionar um produto:

1. o botão inicia uma animação temática;
2. uma **Ultra Ball estilizada** conduz o movimento de captura;
3. o sinal central muda para indicar o sucesso;
4. uma notificação confirma que o item foi adicionado ao carrinho.

Esse detalhe transforma uma ação comum do e-commerce em um momento de marca, oferecendo feedback claro sem perder agilidade.

### 3. Identidade visual premium

O design system foi construído a partir da splash screen para manter consistência em toda a navegação.

- Fundo escuro que valoriza produtos e imagens.
- Branco como cor principal para leitura e elegância.
- Dourado usado com moderação em ações e destaques.
- Tipografia Roboto com hierarquia ampla e limpa.
- Bordas arredondadas e movimentos sutis.
- Cards com zoom suave e estados de interação.
- Navbar transparente e fixa, acompanhando a rolagem.
- Rodapé completo com navegação, atendimento e redes sociais.

### 4. Navegação simples e responsiva

O site foi planejado para funcionar com clareza em monitores, notebooks e celulares.

- Menu desktop direto e objetivo.
- Menu mobile compacto com carrinho sempre acessível.
- Contador de itens atualizado no cabeçalho.
- Áreas de toque adequadas para telas pequenas.
- Layouts que se reorganizam sem perda de conteúdo.
- Navegação consistente em todas as páginas da loja.

### 5. Descoberta de produtos e coleções

O visitante pode encontrar produtos de diferentes formas, reduzindo o esforço até a escolha.

- Página de produtos com filtros por coleção.
- Filtro por tipo de produto.
- Filtro por disponibilidade.
- Ordenação por relevância, novidade e preço.
- Página exclusiva para explorar coleções.
- Página individual de cada coleção com seus respectivos produtos.
- Página detalhada de produto com preço, estoque, descrição e imagens.

### 6. Estados comerciais preparados

Os produtos podem ser apresentados em três situações:

- **Em estoque:** disponível para adicionar ao carrinho.
- **Pré-venda:** ação adaptada para reserva.
- **Esgotado:** substituição da compra por **“Avise-me quando chegar”**.

No produto esgotado, o visitante pode informar e-mail ou WhatsApp. Os dados ficam salvos no navegador para não precisar preencher o formulário novamente em cada solicitação.

---

## Jornada do cliente

| Etapa | Experiência |
| --- | --- |
| Entrada | Splash cinematográfica com Pikachu, som e transição suave |
| Descoberta | Home com banner promocional, destaques e coleções |
| Exploração | Catálogo com filtros, ordenação e disponibilidade |
| Interesse | Detalhe completo do produto e contexto da coleção |
| Ação | Animação de captura com Ultra Ball ao adicionar |
| Confirmação | Notificação visual de sucesso e contador no carrinho |
| Revisão | Carrinho com quantidade, remoção, subtotal e resumo do pedido |

O fluxo atual termina no carrinho, conforme o escopo do MVP. Checkout, pagamento, frete e geração de pedidos podem ser incorporados na próxima fase.

---

## Funcionalidades entregues

### Loja pública

- Splash screen interativa com vídeo, áudio e avanço.
- Home com banner, produtos em destaque e coleções.
- Catálogo público responsivo.
- Filtros e ordenação de produtos.
- Página de coleções.
- Página individual de coleção.
- Página individual de produto.
- Estados de estoque, pré-venda e esgotado.
- Solicitação de aviso de reposição.
- Carrinho persistente no navegador.
- Alteração de quantidade e remoção de itens.
- Resumo de valores no carrinho.
- Navbar e rodapé compartilhados.

### Gestão administrativa

- Login exclusivo para administrador.
- Cadastro, edição e exclusão de produtos.
- Cadastro, edição e exclusão de coleções.
- Gestão de banners promocionais.
- Definição de estoque, disponibilidade e destaque.
- Associação de produtos a coleções.
- Upload de imagens pelo painel.

---

## Tecnologia e capacidade de evolução

A solução foi construída com tecnologias modernas e amplamente utilizadas no mercado:

- **React + TypeScript:** interface rápida, componentizada e segura.
- **Vite:** carregamento e build eficientes.
- **AdonisJS:** API organizada para regras de negócio e administração.
- **PostgreSQL:** estrutura confiável para produtos, coleções e evolução comercial.
- **TanStack Query:** cache e sincronização dos dados do catálogo.
- **Zustand:** carrinho leve, rápido e persistente.
- **Framer Motion e CSS próprio:** animações com personalidade sem aparência genérica.

A separação entre frontend, API e banco permite evoluir o projeto sem reconstruir a experiência atual.

---

## Pontos fortes para o negócio

- **Diferenciação:** detalhes temáticos que não são encontrados em templates comuns.
- **Reconhecimento de marca:** a experiência visual cria uma assinatura própria.
- **Conversão:** filtros, estados claros e respostas visuais reduzem dúvidas durante a compra.
- **Retenção:** coleções e avisos de reposição incentivam o retorno do visitante.
- **Gestão simplificada:** o catálogo pode ser atualizado sem editar código.
- **Preparação para crescimento:** arquitetura pronta para receber checkout, pagamentos e contas de cliente.
- **Mobile first:** experiência adequada ao principal canal de acesso do público consumidor.

---

## Próximas oportunidades

O MVP cria uma base sólida para as seguintes expansões:

1. Checkout com endereço, frete e pagamento.
2. Integração com Pix, cartão e gateways de pagamento.
3. Cadastro e área do cliente.
4. Histórico e acompanhamento de pedidos.
5. Cupons e campanhas promocionais.
6. Busca por nome, número ou raridade da carta.
7. Favoritos e lista de desejos.
8. Disparo real dos avisos de reposição.
9. Integração com estoque e logística.
10. Métricas de conversão e comportamento.

---

## Escopo comercial sugerido

### Entrega atual

Licenciamento e entrega do MVP PokeShop, incluindo:

- código-fonte do frontend e backend;
- banco de dados e estrutura do catálogo;
- interface pública responsiva;
- painel administrativo;
- componentes visuais e animações personalizadas;
- documentação técnica existente;
- apoio para configuração do ambiente de demonstração.

### Itens para personalização da proposta

| Item | Definição |
| --- | --- |
| Cliente | `[Nome do cliente]` |
| Investimento | `[R$ valor]` |
| Prazo de publicação | `[prazo]` |
| Hospedagem e domínio | `[inclusos / contratados à parte]` |
| Suporte inicial | `[período e condições]` |
| Validade da proposta | `[data]` |

---

## Roteiro recomendado para demonstração

1. **Comece pela splash:** mostre o vídeo do Pikachu, o início com som e a transição suave.
2. **Apresente a Home:** destaque a identidade visual, o banner e a navegação fixa.
3. **Abra Produtos:** demonstre filtros, coleções e disponibilidades.
4. **Entre em um produto:** mostre preço, estoque e informações detalhadas.
5. **Adicione ao carrinho:** reserve esse momento para valorizar a animação da Ultra Ball e a notificação de sucesso.
6. **Mostre um item esgotado:** abra o formulário “Avise-me quando chegar”.
7. **Finalize no carrinho:** altere quantidades e apresente o resumo do pedido.
8. **Encerre pelo admin:** explique como produtos, coleções, banners e imagens podem ser gerenciados.

---

## Resumo para apresentação verbal

> A PokeShop é uma experiência de e-commerce criada para o público Pokémon. Ela combina uma entrada cinematográfica, navegação simples, catálogo completo e momentos interativos — como a Ultra Ball que captura o produto ao adicioná-lo ao carrinho. O MVP já entrega toda a jornada de descoberta e intenção de compra, além de uma administração própria, e está preparado para receber checkout e pagamentos na próxima fase.

---

## Observação sobre marca e publicação

Pokémon e seus elementos visuais são marcas de seus respectivos titulares. Antes da publicação comercial, o comprador deve validar as licenças e permissões de uso das imagens, personagens, nomes e demais materiais protegidos utilizados na demonstração.

