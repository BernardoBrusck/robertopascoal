
## Plano corrigido: ajustar o timing real entre História e Zoom no mobile

### O que está errado agora
- O ajuste com `opacity` no `ZoomParallax` foi a direção errada.
- Ele só esconde a entrada visual, mas não corrige o momento em que o zoom começa.
- O bug real é de **timing de scroll**: no mobile, o `scrollYProgress` do zoom está preso ao container inteiro (`h-[300vh]`), então o efeito entra cedo demais em relação ao fim visual de **“Inspirar para agir”**.

### Comportamento que vou alinhar
Regra exata:
- enquanto **“Inspirar para agir”** ainda estiver visível, o próximo bloco pode até começar a subir por baixo;
- porém o **zoom não pode começar ainda**;
- o zoom só começa quando **“Inspirar para agir” some da tela** e o mosaico do próximo bloco assume o topo.

### Implementação

#### 1) `src/components/ui/zoom-parallax.tsx`
- Remover o fade de opacidade adicionado no último ajuste.
- Separar o comportamento **mobile** do **desktop**.
- No mobile, deixar de usar o container inteiro como gatilho da animação.
- Criar um **trigger interno/sentinel** para iniciar o `scrollYProgress` só mais tarde, no ponto certo da transição.
- Resultado:
  - as imagens continuam entrando como próxima seção;
  - a escala fica travada em `1` no começo;
  - o zoom só inicia quando o gatilho mobile atingir o topo da viewport.

#### 2) `src/components/ui/zoom-parallax.tsx` — faixa de transição mobile
- Ajustar a estrutura para existir uma **zona de entrada** antes do início real do zoom.
- Essa zona não será feita com `opacity`.
- Será um atraso real do começo da escala, calibrado em viewport (`vh/svh`), para o mosaico aparecer primeiro e só depois iniciar o parallax.

#### 3) `src/components/HorizontalScrollSection.tsx`
- Se ainda ficar curto demais no mobile, ajustar só o final do `MobilePanelHoje`.
- Opções de ajuste:
  - `min-h-screen` no último painel, ou
  - padding inferior adicional só nele.
- Isso dá a folga necessária para **“Inspirar para agir”** sair completamente antes do zoom assumir.
- Não vou mexer no comportamento desktop.

### O que não vou repetir
- Não vou tentar resolver isso com mais `z-index`.
- Não vou insistir em `opacity` para mascarar a transição.
- `TextRevealBlock` e `ServicesSection` não são a causa principal desse bug específico.

### Validação esperada
Em 390px:
1. A seção História termina normalmente.
2. O próximo mosaico começa a entrar por baixo.
3. Enquanto **“Inspirar para agir”** ainda estiver visível, o zoom não acontece.
4. Quando **“Inspirar para agir”** some e o mosaico assume o topo, o zoom começa.
5. O restante da home continua sem regressão.

### Detalhe técnico
A correção certa é trocar o início da animação de um gatilho genérico do container para um **gatilho visual real do mobile**. Em resumo: parar de esconder o erro e passar a iniciar o zoom no ponto certo do scroll.
