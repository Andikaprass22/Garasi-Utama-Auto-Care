import { useEffect, useState } from 'react';
import { workshop } from '../../data/workshop';
import { navItems } from '../../data/navigation';
import { content } from '../../data/content';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { Icon } from '../ui/Icon';
import { cn } from '../../lib/cn';

const SECTION_IDS = navItems.map((item) => item.href.slice(1));

function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState('');

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          setActive(visible.target.id);
        }
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5, 1] },
    );

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const activeSection = useActiveSection(SECTION_IDS);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-surface/10 bg-ink/90 ps-[env(safe-area-inset-left)] pe-[env(safe-area-inset-right)] backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <a href="#beranda" className="flex items-center gap-2.5" aria-label={`${workshop.name} - ke atas`}>
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-ink">
              <Icon name="wrench" className="h-5 w-5" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-sm font-bold tracking-tight text-surface">
                {workshop.name}
              </span>
              <span className="text-[11px] font-medium text-surface/55">{content.navbar.subtitle}</span>
            </span>
          </a>

          <nav aria-label="Navigasi utama" className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? 'true' : undefined}
                  className={cn(
                    'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive ? 'text-brand' : 'text-surface/65 hover:text-surface',
                  )}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Button href="#booking" variant="primary" className="hidden px-4 py-2.5 sm:inline-flex">
              {content.navbar.bookingCta}
            </Button>
            <button
              type="button"
              aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
              aria-expanded={menuOpen}
              aria-controls="menu-mobile"
              onClick={() => setMenuOpen((open) => !open)}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-surface/20 bg-surface/10 text-surface lg:hidden"
            >
              <Icon name={menuOpen ? 'close' : 'menu'} className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Container>

      <div
        id="menu-mobile"
        hidden={!menuOpen}
        className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-surface/10 bg-ink lg:hidden"
      >
        <Container className="py-4">
          <nav aria-label="Navigasi mobile" className="flex flex-col">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-surface/85 hover:bg-surface/10"
              >
                {item.label}
              </a>
            ))}
            <Button
              href="#booking"
              variant="primary"
              className="mt-3 w-full"
              onClick={() => setMenuOpen(false)}
            >
              {content.navbar.bookingCta}
            </Button>
          </nav>
        </Container>
      </div>
    </header>
  );
}
