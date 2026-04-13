import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Check, Copy, Mail, MapPin, Instagram, Linkedin, MessageCircle } from 'lucide-react';

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
import { Button, type ButtonProps } from '@/components/ui/button';

const CONTACT = {
  email: 'roberto.pascoal@omunga.com',
  whatsapp: '+554789054401',
  whatsappDisplay: '+55 47 8905-4401',
  location: 'Joinville, SC — Brasil',
};

const SOCIALS = [
  { iconType: 'instagram', href: 'https://www.instagram.com/roberto_pascoal/', label: 'Instagram' },
  { iconType: 'linkedin', href: 'https://www.linkedin.com/in/roberto-pascoal/', label: 'LinkedIn' },
  { iconType: 'facebook', href: 'https://www.facebook.com/roberto.pascoal.9', label: 'Facebook' },
  { iconType: 'email', href: 'mailto:atendimento@dazprodutora.com.br', label: 'E-mail' },
];

function CopyButton({ text, className, ...props }: ButtonProps & { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) { console.error('Failed to copy:', err); }
  };

  return (
    <Button variant="ghost" size="icon" className={cn('h-11 w-11 min-w-[44px] min-h-[44px] text-muted-foreground hover:text-foreground', className)} onClick={handleCopy} {...props}>
      <span className={cn('absolute transition-all', copied ? 'scale-100 opacity-100' : 'scale-0 opacity-0')}><Check className="h-4 w-4" /></span>
      <span className={cn('transition-all', copied ? 'scale-0 opacity-0' : 'scale-100 opacity-100')}><Copy className="h-4 w-4" /></span>
    </Button>
  );
}

function ContactBlock({ icon: Icon, label, children }: { icon: React.ElementType; label: string; children: React.ReactNode; }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-muted-foreground" />
        <span className="text-xs uppercase tracking-[0.2em] font-medium text-muted-foreground">{label}</span>
      </div>
      <div>{children}</div>
    </div>
  );
}

const ContactFooter = () => {
  return (
    <footer className="w-full bg-white">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="mb-16">
          <h2 className="font-bold text-foreground leading-[0.95]" style={{ fontSize: 'clamp(32px, 5vw, 64px)', letterSpacing: '-0.04em' }}>Entre em Contato</h2>
          <p className="mt-4 text-muted-foreground text-base md:text-lg max-w-md">Quer saber mais sobre palestras, parcerias ou o trabalho do Omunga? Fale com a gente.</p>
        </div>
        <div className="border-t border-border" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 py-12">
          <ContactBlock icon={Mail} label="E-mail">
            <div className="flex items-center gap-2">
              <a href={`mailto:${CONTACT.email}`} className="text-sm text-foreground hover:underline underline-offset-4 break-all">{CONTACT.email}</a>
              <CopyButton text={CONTACT.email} aria-label="Copiar e-mail" />
            </div>
          </ContactBlock>
          <ContactBlock icon={MessageCircle} label="WhatsApp">
            <div className="flex items-center gap-2">
              <a href={`https://wa.me/${CONTACT.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-foreground border border-border rounded-full px-4 py-2 hover:bg-muted transition-colors min-h-[44px]">{CONTACT.whatsappDisplay}</a>
            </div>
          </ContactBlock>
          <ContactBlock icon={MapPin} label="Localização">
            <span className="text-sm text-foreground">{CONTACT.location}</span>
          </ContactBlock>
        </div>
        <div className="border-t border-border" />
        <div className="pt-12 flex flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-4">
            <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-muted-foreground opacity-60">Encontre online</span>
            <div className="flex items-center gap-3 mt-2">
              {SOCIALS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.iconType === 'email' ? undefined : '_blank'}
                  rel={link.iconType === 'email' ? undefined : 'noopener noreferrer'}
                  aria-label={link.label}
                  className="flex items-center gap-2.5 text-sm text-foreground hover:text-muted-foreground transition-colors px-4 py-2.5 border border-border/20 rounded-full hover:bg-muted/30 min-h-[44px]"
                >
                  {link.iconType === 'instagram' && <Instagram className="h-4 w-4 opacity-70" />}
                  {link.iconType === 'linkedin' && <Linkedin className="h-4 w-4 opacity-70" />}
                  {link.iconType === 'facebook' && <FacebookIcon className="h-4 w-4 opacity-70" />}
                  {link.iconType === 'email' && <Mail className="h-4 w-4 opacity-70" />}
                  <span className="font-light tracking-tight">{link.label}</span>
                </a>
              ))}
            </div>
          </div>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground opacity-50">© {new Date().getFullYear()} Roberto Pascoal. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default ContactFooter;
