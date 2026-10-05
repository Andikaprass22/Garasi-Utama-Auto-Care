import { faqItems } from '../../data/faq';
import { content } from '../../data/content';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { Accordion } from '../ui/Accordion';

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 border-t border-line bg-surface-2 py-16 lg:py-24">
      <Container className="max-w-3xl">
        <SectionHeading
          eyebrow={content.faq.eyebrow}
          title={content.faq.title}
          description={content.faq.description}
          align="center"
        />
        <div className="mt-10">
          <Accordion items={faqItems} />
        </div>
      </Container>
    </section>
  );
}
