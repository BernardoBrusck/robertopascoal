import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  Check,
  Copy,
  Mail,
  MapPin,
  Phone,
  Instagram,
  Globe,
  Linkedin,
  MessageCircle,
} from 'lucide-react';
import { Button, type ButtonProps } from '@/components/ui/button';

const CONTACT = {
  email: 'contato@robertopascoal.com.br',
  whatsapp: '+5547999999999',
  whatsappDisplay: '+55 47 99999-9999',
  phone: '+5547999999999',
  phoneDisplay: '+55 47 99999-9999',
  location: 'Joinville, SC — Brasil',
};

const SOCIALS = [
  { icon: Instagram, href: 'https://instagram.com/robertopascoal', label: 'Instagram Roberto' },
  { icon: Instagram, href: 'https://instagram.com/omunga', label: 'Instagram Omunga' },
  { icon: Globe, href: 'https://omunga.com.br', label: 'omunga.com.br' },
  { icon: Linkedin, href: 'https://linkedin.com/in/robertopascoal', label: 'LinkedIn' },
];

function CopyButton({ text, className, ...props }: ButtonProps & { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn('h-8 w-8 text-muted-foreground hover:text-foreground', className)}
      onClick={handleCopy}
      {...props}
    >
      <span className={cn('absolute transition-all', copied ? 'scale-100 opacity-100' : 'scale-0 opacity-0')}>
        <Check className="h-4 w-4" />
      </span>
      <span className={cn('transition-all', copied ? 'scale-0 opacity-0' : 'scale-100 opacity-100')}>
        <Copy className="h-4 w-4" />
      </span>
    </Button>
  );
}

function ContactBlock({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ElementType;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-muted-foreground" />
        <span className="text-xs uppercase tracking-[0.2em] font-medium text-muted-foreground">
          {label}
        </span>
      </div>
      <div>{children}</div>
    </div>
  );
}

const ContactFooter = () => {
  return (
    <footer className="w-full bg-white">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-20 md:py-28">
        {/* Header */}
        <div className="mb-16">
          <h2
            className="font-bold text-foreground leading-[0.95]"
            style={{
              fontSize: 'clamp(32px, 5vw, 64px)',
              letterSpacing: '-0.04em',
            }}
          >
            Entre em Contato
          </h2>
          <p className="mt-4 text-muted-foreground text-base md:text-lg max-w-md">
            Quer saber mais sobre palestras, parcerias ou o trabalho do Omunga? Fale com a gente.
          </p>
        </div>

        <div className="border-t border-border" />

        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-12">
          <ContactBlock icon={Mail} label="E-mail">
            <div className="flex items-center gap-2">
              <a
                href={`mailto:${CONTACT.email}`}
                className="text-sm text-foreground hover:underline underline-offset-4 break-all"
              >
                {CONTACT.email}
              </a>
              <CopyButton text={CONTACT.email} />
            </div>
          </ContactBlock>

          <ContactBlock icon={MessageCircle} label="WhatsApp">
            <div className="flex items-center gap-2">
              <a
                href={`https://wa.me/${CONTACT.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-foreground border border-border rounded-full px-4 py-2 hover:bg-muted transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                {CONTACT.whatsappDisplay}
              </a>
            </div>
          </ContactBlock>

          <ContactBlock icon={Phone} label="Telefone">
            <div className="flex items-center gap-2">
              <span className="text-sm text-foreground">{CONTACT.phoneDisplay}</span>
              <CopyButton text={CONTACT.phone} />
            </div>
          </ContactBlock>

          <ContactBlock icon={MapPin} label="Localização">
            <span className="text-sm text-foreground">{CONTACT.location}</span>
          </ContactBlock>
        </div>

        <div className="border-t border-border" />

        {/* Socials + Bottom */}
        <div className="pt-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] font-medium text-muted-foreground">
              Encontre online
            </span>
            <div className="flex flex-wrap gap-4 mt-4">
              {SOCIALS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-foreground hover:text-muted-foreground transition-colors"
                >
                  <link.icon className="h-4 w-4" />
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </div>

          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Roberto Pascoal. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default ContactFooter;
