/**
 * GROQ queries. Every public query filters to published content and excludes
 * drafts (`drafts.**`) as a defence-in-depth measure.
 */

const PUBLISHED = `!(_id in path("drafts.**")) && status == "published"`;

const IMAGE = `{
  ...,
  "alt": coalesce(alt, ""),
  "lqip": asset->metadata.lqip
}`;

export const QUERIES = {
  siteSettings: `*[_type == "siteSettings" && _id == "siteSettings"][0]{
    websiteName, logo ${IMAGE}, whatsappNumber, email, phone, address,
    socialLinks, announcement, copyrightText, footerTagline,
    seo { title, description, "ogImage": ogImage.asset->url }
  }`,

  navTrips: `*[_type == "trip" && ${PUBLISHED}] | order(coalesce(displayOrder, 999) asc, name asc){
    "slug": slug.current, name
  }`,

  navCourses: `*[_type == "course" && ${PUBLISHED}] | order(coalesce(displayOrder, 999) asc, name asc){
    "slug": slug.current, name
  }`,

  tripsIndex: `*[_type == "trip" && ${PUBLISHED}] | order(coalesce(startDate, "9999") asc){
    name, "slug": slug.current, destination, startDate, endDate, featured, upcoming,
    summary, coverImage ${IMAGE}
  }`,

  tripBySlug: `*[_type == "trip" && slug.current == $slug && ${PUBLISHED}][0]{
    name, "slug": slug.current, destination, startDate, endDate, dateLabel, upcoming, featured,
    summary, description, coverImage ${IMAGE}, gallery[] ${IMAGE}, videos[]{ title, "url": file.asset->url, externalUrl },
    itinerary[]{ day, title, description },
    pricing{ currency, amount, displayText, notes },
    inclusions, exclusions, eligibility,
    "related": relatedTrips[status == "published"]{ name, "slug": slug.current, destination, coverImage ${IMAGE} },
    seo { title, description }
  }`,

  tripSlugs: `*[_type == "trip" && ${PUBLISHED}]{ "slug": slug.current }`,

  coursesIndex: `*[_type == "course" && ${PUBLISHED}] | order(coalesce(displayOrder, 999) asc){
    name, "slug": slug.current, summary, coverImage ${IMAGE}
  }`,

  courseBySlug: `*[_type == "course" && slug.current == $slug && ${PUBLISHED}][0]{
    name, "slug": slug.current, summary, description, coverImage ${IMAGE}, gallery[] ${IMAGE},
    details{ level, duration, minimumAge, certification },
    prerequisites,
    "related": relatedTrips[status == "published"]{ name, "slug": slug.current, destination, coverImage ${IMAGE} },
    seo { title, description }
  }`,

  courseSlugs: `*[_type == "course" && ${PUBLISHED}]{ "slug": slug.current }`,

  galleryItems: `*[_type == "galleryItem" && ${PUBLISHED}] | order(coalesce(displayOrder, 999) asc){
    caption, category, location, "media": media ${IMAGE}
  }`,

  instagramSlots: `*[_type == "instagramFeed" && _id == "instagramFeed"][0].slots[enabled == true] | order(displayOrder asc){
    sourceUrl, "thumbnail": thumbnail ${IMAGE}, altText, displayOrder
  }`,

  about: `*[_type == "aboutPage" && _id == "aboutPage"][0]{
    headingEyebrow, heading, description, backgroundMedia ${IMAGE},
    values[] | order(displayOrder asc){ title, description, icon }
  }`,

  faqs: `*[_type == "faq" && ${PUBLISHED}] | order(coalesce(displayOrder, 999) asc){
    question, answer
  }`,
} as const;
