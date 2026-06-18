import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Check, Loader2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function ContactModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    assunto: "",
    mensagem: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      // Reset state when opening
      setSubmitSuccess(false);
      setFormData({
        nome: "",
        email: "",
        assunto: "",
        mensagem: "",
      });
    };

    window.addEventListener("open-contact-modal", handleOpen);
    return () => {
      window.removeEventListener("open-contact-modal", handleOpen);
    };
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Salvar o lead no Supabase
      const { error: dbError } = await supabase
        .from("leads")
        .insert({
          name: formData.nome,
          email: formData.email,
          message: `[Assunto: ${formData.assunto}] ${formData.mensagem}`,
          source: "contato",
        });

      if (dbError) {
        console.error("Erro ao salvar lead no Supabase:", dbError);
      }

      // 2. Enviar o email via FormSubmit.co
      const response = await fetch("https://formsubmit.co/ajax/atendimento@dazprodutora.com.br", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          Nome: formData.nome,
          Email: formData.email,
          Assunto: formData.assunto,
          Mensagem: formData.mensagem,
          _subject: `Roberto Pascoal - Novo contato de E-mail: ${formData.assunto}`,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar o e-mail via FormSubmit");
      }

      setIsSubmitting(false);
      setSubmitSuccess(true);
      toast.success("Mensagem enviada com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      toast.error("Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.");
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px] bg-white p-6 md:p-10 rounded-2xl border border-gray-150/60 shadow-[0_8px_30px_rgb(0,0,0,0.08)] text-black">
        {submitSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6 py-6"
          >
            <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto text-neutral-900">
              <Check className="w-8 h-8 text-neutral-900" />
            </div>
            <h3 className="text-3xl font-light tracking-tight text-neutral-900">Mensagem Enviada!</h3>
            <p className="text-neutral-500 font-light leading-relaxed text-sm md:text-base max-w-md mx-auto">
              Sua mensagem foi enviada com sucesso para <span className="text-neutral-900 font-normal">atendimento@dazprodutora.com.br</span>. Retornaremos o contato o mais breve possível.
            </p>
            <div className="pt-4">
              <button
                onClick={() => setIsOpen(false)}
                className="px-8 py-3.5 bg-neutral-950 text-white text-xs uppercase tracking-wider font-semibold hover:bg-neutral-900 transition-all rounded-xl shadow-md"
              >
                Fechar
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="space-y-6">
            <DialogHeader className="space-y-3 text-center sm:text-left">
              <DialogTitle className="text-2xl md:text-3xl font-light tracking-tight text-black">
                Entre em <span className="italic font-medium">Contato</span>
              </DialogTitle>
              <DialogDescription className="text-neutral-500 font-light text-sm md:text-base leading-relaxed">
                Preencha os campos abaixo para nos enviar uma mensagem direta.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-800">
                    Nome completo
                  </label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    className="w-full bg-gray-50/50 border border-gray-200/80 focus:border-neutral-500 focus:bg-white focus:ring-1 focus:ring-neutral-500/25 px-4 py-3 rounded-xl text-neutral-900 placeholder-neutral-400 focus:outline-none text-sm transition-all"
                    placeholder="Como gostaria de ser chamado?"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-800">
                    E-mail
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-gray-50/50 border border-gray-200/80 focus:border-neutral-500 focus:bg-white focus:ring-1 focus:ring-neutral-500/25 px-4 py-3 rounded-xl text-neutral-900 placeholder-neutral-400 focus:outline-none text-sm transition-all"
                    placeholder="seu-email@empresa.com.br"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-800">
                  Assunto
                </label>
                <input
                  type="text"
                  name="assunto"
                  value={formData.assunto}
                  onChange={handleInputChange}
                  className="w-full bg-gray-50/50 border border-gray-200/80 focus:border-neutral-500 focus:bg-white focus:ring-1 focus:ring-neutral-500/25 px-4 py-3 rounded-xl text-neutral-900 placeholder-neutral-400 focus:outline-none text-sm transition-all"
                  placeholder="Ex: Contato comercial ou Dúvidas"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-800">
                  Mensagem
                </label>
                <textarea
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleInputChange}
                  className="w-full bg-gray-50/50 border border-gray-200/80 focus:border-neutral-500 focus:bg-white focus:ring-1 focus:ring-neutral-500/25 px-4 py-3 rounded-xl text-neutral-900 placeholder-neutral-400 focus:outline-none text-sm min-h-[120px] resize-y leading-relaxed transition-all"
                  placeholder="Escreva sua mensagem aqui..."
                  required
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-neutral-950 text-white hover:bg-neutral-900 disabled:bg-neutral-200 disabled:text-neutral-500 disabled:cursor-not-allowed transition-all rounded-xl font-semibold text-sm flex items-center justify-center gap-2 group shadow-md"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Enviando Mensagem...
                    </>
                  ) : (
                    <>
                      Enviar Mensagem
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
