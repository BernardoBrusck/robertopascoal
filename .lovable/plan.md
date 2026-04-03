

# Plano: Footer/Contato editorial — adaptado ao estilo do site

## O que será feito

Criar um componente `ContactFooter` baseado no layout do `contact-page.tsx` fornecido, mas adaptado à estética editorial do site (fundo branco, tipografia bold, minimalista). Será posicionado após `TestimonialsSection` como footer final do site.

## Conteúdo

- **Título**: "Entre em Contato" (bold, tipografia editorial do site)
- **Subtítulo**: frase curta sobre o Roberto/Omunga
- **Blocos de contato**:
  - E-mail (com botão copiar)
  - WhatsApp (com link direto `wa.me/...` + ícone)
  - Telefone (com botão copiar)
  - Localização (Joinville, SC)
- **Redes sociais**:
  - Instagram Roberto Pascoal
  - Instagram Omunga
  - Site Omunga (omunga.com.br)
  - LinkedIn
- **Separadores** sutis entre blocos (border cinza claro)
- Dados placeholder que o usuário pode trocar depois

## Estilo

- Fundo branco, sem exceção
- Tipografia: títulos em font-weight 700, tracking apertado, uppercase nos labels
- Layout em grid responsivo (empilha no mobile)
- Ícones via `lucide-react` (Mail, Phone, MapPin, Instagram, Globe, Linkedin, MessageCircle para WhatsApp)
- Botão WhatsApp com destaque sutil (border + hover)
- Copy button funcional no e-mail e telefone

## Arquivos

| Arquivo | Ação |
|---|---|
| `src/components/ContactFooter.tsx` | Criar — componente footer/contato editorial |
| `src/pages/Index.tsx` | Importar e adicionar `ContactFooter` após `TestimonialsSection` |

