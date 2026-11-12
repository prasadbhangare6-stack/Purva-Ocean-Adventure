import { getNavCourses, getNavTrips, getSiteSettings } from "@/lib/sanity/data";
import { buildWhatsAppUrl } from "@/lib/integrations/whatsapp";
import { PUBLIC_ROUTES } from "@/lib/config/site";
import { SiteHeader, type HeaderData } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Preloader } from "@/components/ui/Preloader";
import { BackToTopButton } from "@/components/ui/BackToTopButton";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { CookieBanner } from "@/components/ui/CookieBanner";

/**
 * Shared layout for the nine public pages. Settings and navigation content are
 * read from the CMS (cached and revalidated by webhook, see /api/revalidate).
 */
export default async function PublicLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [settings, navTrips, navCourses] = await Promise.all([
    getSiteSettings(),
    getNavTrips(),
    getNavCourses(),
  ]);

  const whatsappUrl = buildWhatsAppUrl(settings?.whatsappNumber);

  const header: HeaderData = {
    logoSrc: settings?.logo?.url ?? null,
    websiteName: settings?.websiteName,
    tripItems: navTrips.map((t) => ({ label: t.name, href: `${PUBLIC_ROUTES.trips}/${t.slug}` })),
    courseItems: navCourses.map((c) => ({ label: c.name, href: `${PUBLIC_ROUTES.courses}/${c.slug}` })),
    instagramUrl: settings?.socialLinks?.instagram ?? null,
    whatsappUrl,
    announcement:
      settings?.announcement?.enabled && settings.announcement.message
        ? { message: settings.announcement.message, linkUrl: settings.announcement.linkUrl }
        : null,
  };

  return (
    <>
      <Preloader />
      <a
        href="#main"
        className="label-caps sr-only fixed left-6 top-6 z-[300] rounded-full bg-gold px-5 py-3 text-abyss focus:not-sr-only"
      >
        Skip to content
      </a>
      <SiteHeader data={header} />
      <main id="main" className="min-h-dvh">
        {children}
      </main>
      <BackToTopButton />
      <WhatsAppButton whatsappUrl={whatsappUrl} />
      <CookieBanner />
      <SiteFooter settings={settings} whatsappUrl={whatsappUrl} />
    </>
  );
}
