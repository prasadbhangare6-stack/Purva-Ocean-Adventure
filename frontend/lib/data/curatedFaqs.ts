export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  icon: string;
  category?: string;
}

export const FAQS: FaqItem[] = [
  {
    id: "faq-1",
    question: "Do I need to know how to swim to go scuba diving?",
    answer:
      "For PADI Open Water certification, you need to meet basic swimming and floating requirements. However, certain supervised introductory scuba experiences may be available for non-swimmers, depending on the dive centre and programme.",
    icon: "mask",
  },
  {
    id: "faq-2",
    question: "Can I join a dive trip without being certified?",
    answer:
      "Absolutely! Our expeditions welcome both beginners and certified divers, depending on the trip. You can begin your scuba journey with a PADI Open Water course or join us for recreational dives if you're already certified.",
    icon: "shield",
  },
  {
    id: "faq-3",
    question: "Is scuba diving safe for beginners?",
    answer:
      "Scuba diving is an adventure that requires proper training and safety precautions. We work with qualified dive professionals and prioritise appropriate equipment, safety procedures, and personalised guidance throughout your experience.",
    icon: "safety",
  },
  {
    id: "faq-4",
    question: "What if I'm nervous about diving underwater?",
    answer:
      "That's completely normal! Many divers feel nervous before their first dive. Your instructor will guide you through the equipment, breathing techniques, and essential skills, allowing you to progress at a comfortable pace.",
    icon: "wave",
  },
  {
    id: "faq-5",
    question: "What is the difference between Open Water and Advanced Open Water certification?",
    answer:
      "PADI Open Water Diver is your first certification, teaching you essential diving skills and qualifying eligible adults to dive up to 18 metres. PADI Advanced Open Water Diver builds your confidence and experience through different adventure dives, including deeper diving, with a maximum training depth of 30 metres for eligible adults.",
    icon: "award",
  },
  {
    id: "faq-6",
    question: "Will I get to see sharks, manta rays, or turtles?",
    answer:
      "The ocean is full of surprises! Depending on the destination and diving conditions, you may encounter reef sharks, manta rays, turtles, colourful fish, and incredible coral reefs. Wildlife encounters are never guaranteed, but that's part of what makes every dive special.",
    icon: "fish",
  },
  {
    id: "faq-7",
    question: "Can I join as a solo traveller?",
    answer:
      "Of course! Some of the best ocean friendships begin with strangers. Our small-group expeditions are designed to bring together solo travellers, couples, friends, and ocean lovers who share a passion for adventure. Come solo, leave with stories and new friendships.",
    icon: "users",
  },
  {
    id: "faq-8",
    question: "How many people are there in each expedition?",
    answer:
      "We believe in quality experiences over large crowds. Our current Maafushi, Maldives expedition is limited to a maximum of 10 participants, allowing for a more personal, comfortable, and connected group experience.",
    icon: "group",
  },
  {
    id: "faq-9",
    question: "Is scuba diving equipment included in the package?",
    answer:
      "Yes! Our current Maldives diving packages include essential equipment such as a BCD, regulator, mask, fins, wetsuit, tanks, and weights. Certain additional equipment, including dive computers, may be available at an extra rental cost. Exact inclusions are mentioned in each expedition brochure.",
    icon: "gear",
  },
  {
    id: "faq-10",
    question: "Do I need scuba diving insurance?",
    answer:
      "Yes. Appropriate scuba diving insurance is mandatory for our current Maldives expedition. We recommend choosing coverage that includes diving-related medical emergencies and evacuation, appropriate to your planned diving activities.",
    icon: "medical",
  },
  {
    id: "faq-11",
    question: "How long should I wait before flying after scuba diving?",
    answer:
      "For recreational no-decompression diving, common guidance recommends waiting at least 12 hours after a single dive and at least 18 hours after multiple dives or multiple days of diving. Longer intervals may be advisable depending on your dive profile. Our itineraries are planned with appropriate time between the final dive and departure.",
    icon: "plane",
  },
  {
    id: "faq-12",
    question: "How can I book an expedition with Purva Ocean Adventures?",
    answer:
      "It's simple! Explore our upcoming expeditions, choose the experience that suits you, and reach out through WhatsApp or our website enquiry form. We'll guide you through package details, availability, booking requirements, and everything you need to prepare for your ocean adventure.",
    icon: "card",
  },
];

