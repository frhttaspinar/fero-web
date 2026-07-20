"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, CheckCircle2, Loader2 } from "lucide-react";

type Status = "idle" | "submitting" | "success" | "error";

const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "";

export function ContactModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const dialogRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    onClose();
    // Reset after the close animation finishes so the form doesn't flash
    // back to its idle state while the success screen is still visible.
    setTimeout(() => setStatus("idle"), 400);
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleClose]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            className="absolute inset-0 bg-void/60 backdrop-blur-sm"
            onClick={handleClose}
            aria-hidden
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            className="relative z-10 w-full max-w-lg rounded-2xl border border-line bg-paper p-8 shadow-[0_30px_80px_rgba(0,0,0,0.25)] sm:p-10"
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              onClick={handleClose}
              aria-label="Kapat"
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full text-graphite transition hover:bg-cloud hover:text-ink"
            >
              <X size={18} />
            </button>

            {status === "success" ? (
              <div className="flex flex-col items-center py-10 text-center">
                <CheckCircle2 className="mb-4 text-signal" size={40} />
                <h3 className="font-display text-2xl font-medium text-ink">
                  Mesajın ulaştı.
                </h3>
                <p className="mt-2 max-w-xs text-graphite">
                  En kısa sürede sana dönüş yapacağım. İstersen bu arada
                  WhatsApp&apos;tan da yazabilirsin.
                </p>
                <button
                  onClick={handleClose}
                  className="mt-8 rounded-full bg-void px-6 py-3 text-sm font-medium text-paper transition hover:bg-ink"
                >
                  Kapat
                </button>
              </div>
            ) : (
              <>
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-ash">
                  İletişim
                </span>
                <h3
                  id="contact-modal-title"
                  className="font-display mt-2 text-3xl font-medium tracking-tight text-ink"
                >
                  Bana ulaş.
                </h3>
                <p className="mt-2 text-graphite">
                  Projeni anlat, 24 saat içinde dönüş yapayım.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                  <input
                    type="hidden"
                    name="access_key"
                    value={WEB3FORMS_ACCESS_KEY}
                  />
                  <input
                    type="hidden"
                    name="subject"
                    value="Yeni proje talebi — ferhattaspinar.dev"
                  />
                  <input
                    type="checkbox"
                    name="botcheck"
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div>
                    <label htmlFor="name" className="sr-only">
                      İsim
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="İsim Soyisim"
                      className="w-full rounded-lg border border-line bg-cloud/60 px-4 py-3 text-ink placeholder:text-ash transition focus:border-signal"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="sr-only">
                      E-posta
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="E-posta adresin"
                      className="w-full rounded-lg border border-line bg-cloud/60 px-4 py-3 text-ink placeholder:text-ash transition focus:border-signal"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="sr-only">
                      Mesaj
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      placeholder="Projenden kısaca bahset..."
                      className="w-full resize-none rounded-lg border border-line bg-cloud/60 px-4 py-3 text-ink placeholder:text-ash transition focus:border-signal"
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-sm text-red-600" role="alert">
                      Bir şeyler ters gitti. Tekrar dener misin, ya da doğrudan
                      frhttaspinar@gmail.com adresine yazabilirsin.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-void px-6 py-3.5 text-sm font-medium text-paper transition hover:bg-ink disabled:opacity-60"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="animate-spin" size={16} />
                        Gönderiliyor...
                      </>
                    ) : (
                      "Mesajı Gönder"
                    )}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
