import { useState } from 'react';
import { cn } from '../../lib/cn';
import { Icon } from './Icon';

export interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
}

export function Accordion({ items, allowMultiple = false }: AccordionProps) {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const toggle = (index: number) => {
    setOpenIndexes((current) => {
      if (current.includes(index)) {
        return current.filter((item) => item !== index);
      }
      return allowMultiple ? [...current, index] : [index];
    });
  };

  return (
    <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface-2">
      {items.map((item, index) => {
        const isOpen = openIndexes.includes(index);
        const panelId = `faq-panel-${index}`;
        const buttonId = `faq-button-${index}`;

        return (
          <div key={item.question}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-ink transition-colors hover:bg-ink/[0.03]"
              >
                <span>{item.question}</span>
                <span
                  aria-hidden="true"
                  className={cn('shrink-0 text-muted transition-transform', isOpen && 'rotate-180')}
                >
                  <Icon name="chevron" className="h-5 w-5" />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="px-5 pb-5 text-sm leading-relaxed text-muted"
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
