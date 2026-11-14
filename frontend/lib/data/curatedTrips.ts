export type CuratedTrip = {
  slug: string;
  name: string;
  tagline: string;
  destination: string;
  dates: string;
  duration: string;
  dives: string;
  experienceLevel: string;
  groupSize: string;
  remainingSpots?: number;
  coverImage: string;
  galleryImages: string[];
  summary: string;
  overview: string;
  highlights: string[];
  itinerary: {
    day: number;
    title: string;
    subtitle: string;
    description: string;
    highlights: string[];
  }[];
  inclusions: string[];
  exclusions: string[];
  requirements: string[];
  pricing: {
    displayText: string;
    note: string;
  };
  available: boolean;
};

export const CURATED_TRIPS: Record<string, CuratedTrip> = {
  "maafushi-madness-maldives": {
    slug: "maafushi-madness-maldives",
    name: "Maafushi Madness Maldives",
    tagline: "Channel Drifts, Nurse Sharks & Crystal Turquoise Lagoons",
    destination: "South Malé Atoll, Maldives",
    dates: "22–27 November 2026",
    duration: "6 Days / 5 Nights",
    dives: "10 Guided Boat Dives",
    experienceLevel: "Open Water Diver & Above",
    groupSize: "Small Group (Max 10 Divers)",
    remainingSpots: 10,
    coverImage: "/media/maafushi-maldives.jpg",
    galleryImages: [
      "/media/maafushi-maldives.jpg",
      "/media/gallery-diver-anthias.jpg",
      "/media/gallery-sharks-reef.jpg",
      "/media/gallery-coral-formation.jpg",
    ],
    summary:
      "Join us on an unforgettable dive expedition to Maafushi, Maldives. Explore thrilling channel dives, nurse shark gatherings, manta ray cleaning stations, and crystal clear waters.",
    overview:
      "Maafushi Madness is our signature Maldivian ocean expedition designed for passionate divers who crave world-class underwater encounters without compromise. Centered around South Malé Atoll, this journey takes you to iconic channel passes where strong ocean currents bring schools of pelagics, friendly nurse sharks, spotted eagle rays, and gliding manta rays. On land, you'll experience vibrant Maldivian island culture, pristine white sandbanks, and warm ocean camaraderie with your fellow dive buddies.",
    highlights: [
      "Epic Shark Point encounter with dozens of friendly nurse sharks",
      "Gliding with manta rays at active cleaning stations",
      "Kandooma Thila & Cocoa Corner exhilarating channel drift dives",
      "Speedboat safari to secluded sandbanks in crystal turquoise lagoons",
      "Small diver-to-guide ratio (max 4:1) with certified PADI dive masters",
      "Complete logistics handled from the moment you land at Malé airport",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Paradise & Island Welcome",
        subtitle: "Speedboat Transfer • Sunset Briefing",
        description:
          "Arrive at Velana International Airport (Malé). Our expedition team meets you at the arrivals gate for a private speedboat transfer across turquoise atoll waters to Maafushi Island. Check into your deluxe beachside hotel, unpack your dive gear, and enjoy a sunset welcome orientation over fresh coconuts.",
        highlights: ["Airport meet & greet", "Scenic 35-min speedboat ride", "Expedition briefing"],
      },
      {
        day: 2,
        title: "Check Dive & The Walls of Kandooma",
        subtitle: "2 Boat Dives • Coral Channels",
        description:
          "Start the morning with a gentle checkout dive at Maafushi Corner to dial in buoyancy and check weights. After a surface interval with tropical fruits, drop in at Kandooma Thila — one of the top ten dive sites in the Maldives — featuring dramatic coral swim-throughs and schools of giant trevally.",
        highlights: ["Buoyancy check dive", "Kandooma Thila coral walls", "Green turtles & morays"],
      },
      {
        day: 3,
        title: "Nurse Shark Safari & Deep Thila",
        subtitle: "2 Boat Dives • Pelagic Action",
        description:
          "Today is the headline shark encounter. Descend onto a sandy plateau where dozens of resident nurse sharks and stingrays gather. Watch these majestic animals cruise effortlessly around you. The second dive explores Guraidhoo Corner, famous for grey reef sharks patrolling the drop-off.",
        highlights: ["Nurse shark gatherings", "Guraidhoo Corner outer reef", "Eagle rays in formation"],
      },
      {
        day: 4,
        title: "Manta Ray Cleaning Stations & Drift Dive",
        subtitle: "2 Boat Dives • Manta Magic",
        description:
          "Head out to a renowned manta cleaning station. Hover motionless above the reef as giant oceanic and reef manta rays swoop gracefully over coral heads to be cleaned by cleaner wrasse. Afternoon drift dive over kaleidoscopic soft coral fields.",
        highlights: ["Manta ray encounters", "Vibrant soft coral walls", "Afternoon bikini beach time"],
      },
      {
        day: 5,
        title: "Final Ocean Dives & Deserted Sandbank Sunset",
        subtitle: "2 Boat Dives • Private Sandbank Barbecue",
        description:
          "Complete your final 2 morning dives exploring pristine coral pinnacles packed with anthias, clownfish, and reef octopuses. In the afternoon, board our boat for a trip to a private, uninhabited sandbank in the middle of the lagoon. Celebrate an unforgettable trip with a beach sunset dinner.",
        highlights: ["Pinnacle coral gardens", "Private sandbank excursion", "Celebratory farewell dinner"],
      },
      {
        day: 6,
        title: "Surface Interval & Homeward Journey",
        subtitle: "Island Breakfast • Speedboat to Malé",
        description:
          "Enjoy a leisurely tropical breakfast overlooking the ocean. Complete your surface interval, log your dives, and take final island photos. Speedboat transfer back to Malé airport for your homeward flights.",
        highlights: ["Dive log stamping", "Airport speedboat transfer", "Lifelong ocean memories"],
      },
    ],
    inclusions: [
      "5 Nights deluxe island accommodation in Maafushi",
      "10 guided boat dives with certified PADI Divemasters",
      "Roundtrip airport speedboat transfers (Malé MLE ↔ Maafushi)",
      "Daily breakfast & dive-day lunch / snacks on boat",
      "12L aluminum tanks, weights, belts & Nitrox for certified divers",
      "All Maldivian marine park fees, green tax & service charges",
      "Exclusive Purva Ocean Adventures expedition rashguard & dry bag",
      "High-resolution underwater photos & videos taken by our team",
    ],
    exclusions: [
      "International airfare to Velana International Airport (MLE)",
      "Full dive equipment rental (BCD, regulator, wetsuit available for rent)",
      "Mandatory dive travel insurance (DAN, World Nomads or equivalent)",
      "Personal expenses, alcoholic beverages & crew gratuities",
    ],
    requirements: [
      "Minimum certification: PADI Open Water Diver (or equivalent)",
      "Minimum logged dives: 5 dives recommended",
      "Valid passport with at least 6 months validity",
      "Signed standard PADI medical statement prior to departure",
    ],
    pricing: {
      displayText: "₹89,999 / $1,080 per diver",
      note: "Early bird pricing valid until slots fill. Double occupancy. Solo supplement available.",
    },
    available: true,
  },

  "lakshadweep-love": {
    slug: "lakshadweep-love",
    name: "Lakshadweep Love",
    tagline: "Untouched Coral Atolls, Sea Turtle Sanctuaries & Pure Isolation",
    destination: "Lakshadweep Islands, India",
    dates: "26–31 January 2027",
    duration: "6 Days / 5 Nights",
    dives: "12 Guided Boat & Lagoon Dives",
    experienceLevel: "Open Water Diver & Snorkelers",
    groupSize: "Intimate Group (Max 8 Divers)",
    remainingSpots: 8,
    coverImage: "/media/lakshadweep-love.jpg",
    galleryImages: [
      "/media/lakshadweep-love.jpg",
      "/media/gallery-reef-panorama.jpg",
      "/media/gallery-coral-formation.jpg",
      "/media/gallery-diver-selfie.jpg",
    ],
    summary:
      "Discover the untouched paradise of Lakshadweep. Dive into crystal clear waters with vibrant sea turtles, pristine coral formations, dramatic drop-offs, and remote tropical atoll adventures.",
    overview:
      "Lakshadweep Love takes you to India's best-kept marine secret. Far removed from commercial tourist trails, the coral atolls of Lakshadweep boast visibility often exceeding 35 meters, healthy table coral gardens that stretch as far as the eye can see, and a thriving population of resident green sea turtles. With strictly regulated tourism permits, you'll dive reefs that have seen virtually zero human footprint. This trip is designed for curious souls looking for pure nature, peaceful island rhythms, and world-class tropical diving.",
    highlights: [
      "Diving alongside friendly green sea turtles in crystal clear shallows",
      "Spectacular visibility averaging 30 to 40 meters",
      "Untouched coral reef gardens and dramatic outer barrier drop-offs",
      "All restricted entry permits & heritage documentation fully handled",
      "Explore remote atolls with tranquil turquoise lagoons",
      "Small intimate expedition group with personalized coaching",
    ],
    itinerary: [
      {
        day: 1,
        title: "Flight into Agatti & Arrival in Paradise",
        subtitle: "Scenic Atoll Flight • Lagoon Check-In",
        description:
          "Board your flight from Kochi (COK) to Agatti (AGX) — famous as one of the world's most spectacular airstrips surrounded entirely by turquoise sea. Meet your Purva team, complete permit checks, transfer to your seaside resort, and take a sunset swim in the calm lagoon.",
        highlights: ["World-famous atoll runway landing", "Permit clearance handled", "Welcome coconut drink"],
      },
      {
        day: 2,
        title: "Lagoon Checkout & Turtle Garden",
        subtitle: "2 Boat Dives • Coral Shallows",
        description:
          "Ease into the water with a gentle dive inside the protective reef. Meet resident green and hawksbill turtles grazing on sea grass. Dive two explores Coral Garden, where massive brain and staghorn corals teem with clownfish, blue tangs, and butterflyfish.",
        highlights: ["Check dive in calm lagoon", "Turtle Garden shallow drift", "Colorful reef biodiversity"],
      },
      {
        day: 3,
        title: "The Outer Reef Barrier & Shark Point",
        subtitle: "3 Boat Dives • Deep Visibility",
        description:
          "Head through the channel to the open ocean outer reef wall. Here the depth drops into deep indigo. Marvel at gorgonian sea fans, passing mobula rays, and curious blacktip reef sharks patrolling the outer drop-off in 40-meter crystal visibility.",
        highlights: ["Outer barrier drop-offs", "Mobula rays & blacktips", "Breathtaking blue water visibility"],
      },
      {
        day: 4,
        title: "Cavern Swim-Throughs & Shipwreck Site",
        subtitle: "3 Boat Dives • Underwater Topography",
        description:
          "Explore underwater arches, cavern swim-throughs, and an ancient reef shipwreck colonized by thousands of glassfish and lionfish. Afternoon surface interval includes traditional island snacks and coconut tree groves walk.",
        highlights: ["Swim-through caverns", "Reef wreck marine habitat", "Island cultural walk"],
      },
      {
        day: 5,
        title: "Final Pinnacle Dives & Sunset Bonfire",
        subtitle: "2 Boat Dives • Beach Barbecue",
        description:
          "Complete your final 2 morning dives on an isolated coral pinnacle where pelagics cruise by in the morning light. Spend the afternoon kayaking the lagoon before gathering around a beachfront barbecue with stargazing under unpolluted skies.",
        highlights: ["Pinnacle reef drift", "Lagoon kayaking", "Stargazing & farewell barbecue"],
      },
      {
        day: 6,
        title: "Morning Farewell & Flight to Kochi",
        subtitle: "Breakfast • Airport Transfer",
        description:
          "Enjoy a final sunrise over the turquoise atoll. Transfer to Agatti Airport for your flight back to Kochi, taking with you unforgettable memories of India's purest ocean frontier.",
        highlights: ["Sunrise beach walk", "Flight back to Kochi", "Expedition debrief"],
      },
    ],
    inclusions: [
      "5 Nights beachfront cottage accommodation in Lakshadweep",
      "12 guided boat & lagoon dives with certified PADI dive masters",
      "Complete Lakshadweep entry permit processing & police clearance",
      "All inter-island transfers and boat charters",
      "All daily meals (freshly caught fish, local coastal curries & vegetarian options)",
      "12L tanks, weight belts, and surface marker buoys (SMB)",
      "Complimentary kayak & paddleboard access during free hours",
      "Purva Ocean Adventures expedition pack & dive log stamps",
    ],
    exclusions: [
      "Flights to and from Agatti (Kochi ↔ Agatti roundtrip)",
      "Personal scuba equipment rental (BCD, regulator, fins)",
      "Mandatory dive travel insurance",
      "Personal shopping and souvenirs",
    ],
    requirements: [
      "Minimum certification: PADI Open Water Diver (or beginner resort courses available)",
      "Indian or foreign passport required for Lakshadweep entry permit issuance",
      "Permit applications close 25 days before departure date",
    ],
    pricing: {
      displayText: "₹74,999 per diver",
      note: "Permits strictly limited per departure. Bookings close 30 days prior to departure.",
    },
    available: true,
  },

  "maldives-dive-expedition": {
    slug: "maldives-dive-expedition",
    name: "Maldives Dive Expedition",
    tagline: "The Ultimate Central Atolls Liveaboard & Pelagic Safari",
    destination: "Ari, Vaavu & Malé Atolls, Maldives",
    dates: "February 2027 (Dates Will Be Out Soon)",
    duration: "7 Days / 6 Nights",
    dives: "15+ Boat & Night Dives",
    experienceLevel: "Advanced Open Water (Or 15+ logged dives)",
    groupSize: "Exclusive Liveaboard Group",
    remainingSpots: 12,
    coverImage: "/media/maldives-liveaboard.jpg",
    galleryImages: [
      "/media/maldives-liveaboard.jpg",
      "/media/maafushi-maldives.jpg",
      "/media/gallery-diver-anthias.jpg",
      "/media/gallery-sharks-reef.jpg",
    ],
    summary:
      "A signature ocean journey through world-famous Maldivian reefs and deep channels. Encounter whale sharks, eagle rays, and night dives with hunting nurse sharks in paradise.",
    overview:
      "Living aboard a dedicated safari yacht is the gold standard of scuba diving. Our February 2027 Maldives Expedition navigates the iconic Central Atolls route: North Malé, South Malé, Vaavu, and Ari Atolls. By moving with the currents, we dive the best thilas and kandus (ocean passes) at the optimal times of day. Wake up to sunrise over a new coral reef, step straight onto our dedicated dive dhoni, and encounter pelagic giants: whale sharks cruising along the reef edge, manta rays hovering at cleaning stations, and dramatic night dives surrounded by dozens of feeding nurse sharks.",
    highlights: [
      "Dedicated search for gentle giant Whale Sharks in South Ari",
      "Legendary Alimatha night dive surrounded by massive nurse sharks",
      "World-class channel drift diving with reef sharks and eagle ray squadrons",
      "Living aboard a spacious luxury safari yacht with chef-prepared meals",
      "Up to 17 dives over 6 days including spectacular sunset & night dives",
      "Nitrox available onboard for certified enriched air divers",
    ],
    itinerary: [
      {
        day: 1,
        title: "Embarkation on Luxury Safari Yacht",
        subtitle: "Airport Dhoni Pickup • Welcome Dinner",
        description:
          "Arrive at Velana International Airport (Malé). Step onto our private dive dhoni and cruise out to our luxury liveaboard safari vessel anchored in the lagoon. Meet your expedition leaders, captain, and dive crew. Checkout dive at a protected nearby reef followed by a sunset welcome dinner on the upper deck.",
        highlights: ["Dhoni airport transfer", "Cabin allocation & orientation", "Welcome feast"],
      },
      {
        day: 2,
        title: "North Malé Channels & Lankan Manta Point",
        subtitle: "3 Dives • Manta Ray Cleaning Stations",
        description:
          "Wake up to early morning coffee as we set course for Lankan Manta Point. Watch majestic manta rays circle massive coral heads. Dive two and three take you to thrilling coral passes where grey reef sharks patrol against incoming oceanic currents.",
        highlights: ["Manta ray cleaning station", "Shark channel drifts", "Upper sun-deck relaxation"],
      },
      {
        day: 3,
        title: "South Ari Whale Shark Quest",
        subtitle: "3 Dives • The Ocean's Gentle Giants",
        description:
          "Cruise south into Ari Atoll, world-famous for year-round whale shark sightings. Our crew keeps watch from the top deck. When a whale shark is spotted, slip into the azure water for an awe-inspiring snorkel and dive alongside the largest fish in the world.",
        highlights: ["Whale shark encounters", "Pristine Ari Atoll reefs", "Underwater photography session"],
      },
      {
        day: 4,
        title: "Maaya Thila & The Alimatha Night Frenzy",
        subtitle: "3 Dives + 1 Night Dive • Epic Shark Action",
        description:
          "Dive the renowned Maaya Thila marine sanctuary, packed with sleeping leopard sharks, morays, and turtles. As night falls, we drop onto Alimatha Jetty: an exhilarating night dive where dozens of 3-meter nurse sharks and giant stingrays swim right between your bubbles.",
        highlights: ["Maaya Thila marine sanctuary", "Alimatha nurse shark night dive", "Adrenaline underwater action"],
      },
      {
        day: 5,
        title: "Vaavu Atoll Golden Wall & Deserted Sandbank",
        subtitle: "3 Dives • Coral Overhangs & Beach BBQ",
        description:
          "Drift along Golden Wall, a vertical drop-off covered entirely in brilliant yellow soft corals. In the evening, the crew prepares a candlelit sandbank barbecue carved out of sand on a deserted island under the stars.",
        highlights: ["Golden Wall soft corals", "Deserted island barbecue", "Starlight cocktails on sundeck"],
      },
      {
        day: 6,
        title: "Banana Reef & Sunset Cruise to Malé",
        subtitle: "2 Dives • Celebratory Night",
        description:
          "Final morning dives at Banana Reef — the first dive site discovered in the Maldives. Enjoy lunch as the yacht cruises back toward Malé harbor. Celebrate the week with an awards night and farewell banquet.",
        highlights: ["Banana Reef exploration", "Dive log ceremony", "Farewell captain's party"],
      },
      {
        day: 7,
        title: "Disembarkation & Homeward Flights",
        subtitle: "Breakfast • Airport Transfer",
        description:
          "Breakfast on the sun deck, group photos, and transfer by dive dhoni back to Velana International Airport for your international departure flights.",
        highlights: ["Airport drop-off", "Photo exchange", "Friendships forged for life"],
      },
    ],
    inclusions: [
      "6 Nights twin-share cabin accommodation aboard luxury safari liveaboard",
      "Up to 17 guided boat dives with experienced PADI Cruise Directors",
      "All gourmet meals, afternoon snacks, tea, coffee & drinking water onboard",
      "Dedicated dive dhoni equipped with compressor, oxygen & emergency kits",
      "12L aluminum tanks, weights, belts & Nitrox for certified divers",
      "Maldivian Green Tax, GST & marine park permits included",
      "Purva Ocean Adventures expedition merchandise pack",
    ],
    exclusions: [
      "International flights to Malé (MLE)",
      "Alcoholic drinks and soft canned beverages from the yacht bar",
      "Full scuba equipment rental (available for pre-booking)",
      "Mandatory dive travel insurance",
      "Crew gratuity / tips (customary on liveaboards)",
    ],
    requirements: [
      "Minimum certification: PADI Advanced Open Water (or Open Water with 15+ logged dives)",
      "Comfortable with drift diving and channel currents",
      "Valid passport with at least 6 months validity",
    ],
    pricing: {
      displayText: "Dates Announcing Soon",
      note: "Join the VIP waitlist to receive first-access booking and early-bird rates before public launch.",
    },
    available: false,
  },
};

export function getCuratedTrip(slug: string): CuratedTrip | undefined {
  return CURATED_TRIPS[slug];
}

