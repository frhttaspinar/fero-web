"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { ContactModal } from "./ContactModal";

const ContactModalContext = createContext<{ open: () => void } | null>(null);

export function ContactModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <ContactModalContext.Provider value={{ open }}>
      {children}
      <ContactModal isOpen={isOpen} onClose={close} />
    </ContactModalContext.Provider>
  );
}

export function useContactModal() {
  const ctx = useContext(ContactModalContext);
  if (!ctx) {
    throw new Error("useContactModal must be used within ContactModalProvider");
  }
  return ctx;
}
