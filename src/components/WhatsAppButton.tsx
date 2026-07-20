"use client";

import { motion } from "framer-motion";

const WHATSAPP_NUMBER = "905069060250";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Merhaba Ferhat, projemle ilgili konuşmak istiyorum."
);

export function WhatsAppButton() {
  return (
    <motion.a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp üzerinden Ferhat Taşpınar ile iletişime geç"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_30px_rgba(37,211,102,0.4)] transition-colors hover:bg-[#128C7E] md:bottom-8 md:right-8"
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.1, y: -3 }}
      whileTap={{ scale: 0.94 }}
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366]/50 animate-ping [animation-duration:2.6s]" />
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="relative h-6 w-6"
        aria-hidden="true"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12.001 2C6.478 2 2 6.477 2 12c0 1.86.505 3.678 1.463 5.27L2 22l4.865-1.436A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.06c-1.673 0-3.31-.451-4.744-1.303l-.34-.203-3.083.91.926-3.062-.222-.35A8.05 8.05 0 013.94 12c0-4.44 3.62-8.06 8.06-8.06s8.06 3.62 8.06 8.06-3.62 8.06-8.06 8.06z" />
      </svg>
    </motion.a>
  );
}
