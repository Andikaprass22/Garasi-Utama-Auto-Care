import { workshop } from '../../data/workshop';
import { buildWhatsAppUrl, isWhatsAppNumberUsable } from '../../lib/whatsapp';
import { Icon } from '../ui/Icon';

export function FloatingWhatsApp() {
  if (!isWhatsAppNumberUsable(workshop.whatsappNumber)) {
    return null;
  }

  return (
    <a
      href={buildWhatsAppUrl(workshop.whatsappNumber, workshop.whatsappDefaultMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat WhatsApp"
      className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1.25rem,env(safe-area-inset-right))] z-40 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-ink shadow-lg transition-transform hover:-translate-y-0.5"
    >
      <Icon name="whatsapp" className="h-5 w-5" />
      <span className="hidden sm:inline">Chat WhatsApp</span>
    </a>
  );
}
