import { Container } from "./Container";
import { PageHero } from "./PageHero";
import { SectionHeading } from "./SectionHeading";

/**
 * Foundation page shell. Gives each of the nine routes its real URL, heading
 * structure and hero frame, while the full content and design are implemented
 * in the next phase. It contains no invented copy about the business.
 */
export function PlaceholderPage({
  eyebrow,
  title,
  emphasis,
  phase,
}: {
  eyebrow: string;
  title: string;
  emphasis?: string;
  phase: string;
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} emphasis={emphasis} />
      <section className="py-24 sm:py-32">
        <Container narrow>
          <SectionHeading
            eyebrow="Foundation stage"
            title="Awaiting content and design"
            description={
              <>
                This route is in place and wired to the shared layout. Its full experience is scheduled for <strong className="font-medium text-foam">{phase}</strong>. Content will come from the CMS; no copy or media has been invented for it.
              </>
            }
          />
        </Container>
      </section>
    </>
  );
}
