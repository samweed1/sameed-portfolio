// Portfolio content. Extracted verbatim from the original App.jsx so a redesign
// of the presentation layer can never quietly drop or alter the work itself.
import { IMG_ABS_LOGO, IMG_ABS_POST1, IMG_ABS_POST2, IMG_ABS_POST3, IMG_ABS_POST4, IMG_ABS_POST5, IMG_BALTIC_BREEZE, IMG_BRANDED_POST1, IMG_BRANDED_POST2, IMG_BRANDED_POST3, IMG_BRANDED_STORE_LOGO, IMG_COFFEE_BREAK, IMG_CORPORATE_BRILLIANCE, IMG_CZ_CONNECT, IMG_DESIGNTHRU_LOGO, IMG_DT_POST1, IMG_DT_POST2, IMG_DT_POST3, IMG_DT_POST4, IMG_DT_POST5, IMG_DT_POST6, IMG_DT_POST7, IMG_EDIFY, IMG_EMENAC_LOGO, IMG_EMENAC_POST1, IMG_EMENAC_POST2, IMG_FULLER_PATENT, IMG_KINGDOM_JOINT_SOCIAL_LOGO, IMG_KJ_POST1, IMG_KJ_POST2, IMG_MESHWAR_LOGO, IMG_MESHWAR_POST1, IMG_PURE_DIGITAL_FULL, IMG_PURE_DIGITAL_S1, IMG_PURE_DIGITAL_S2, IMG_PURE_DIGITAL_S3, IMG_RBN, IMG_REAWAKEN, IMG_REC_FILMS, IMG_SIMPLIA_FULL, IMG_SIMPLIA_S1, IMG_SIMPLIA_S2, IMG_SIMPLIA_S3, IMG_SIMPLIA_S4, IMG_SIMPLIA_S5, IMG_SIMPLIA_S6, IMG_SIMPLIA_S7, IMG_SKEWINGS_FULL, IMG_SKEWINGS_S1, IMG_SKEWINGS_S2, IMG_SKEWINGS_S3, IMG_SKEWINGS_S4, IMG_SKEWINGS_S5, IMG_SKEWINGS_S6, IMG_VIRTUS_LABS, IMG_WISION_WORK, PHOTO_SRC } from "./assets/images";
import { C } from "./theme";

export const logos = [
    { title: "Fuller Patent", desc: "A sophisticated 3D lettermark crafted in gold for a patent law firm. The isometric FP monogram communicates precision, authority, and trust — exactly what you want when protecting intellectual property.", tags: ["Logo", "Lettermark", "Gold"], color: "#C9A84C", img: IMG_FULLER_PATENT },
    { title: "The Corporate Brilliance", desc: "A clean, minimal TCB monogram that speaks the language of corporate elegance. The interlocking letterforms create a mark that feels polished, trustworthy, and built to last on any boardroom wall.", tags: ["Logo", "Monogram", "Corporate"], color: "#333333", img: IMG_CORPORATE_BRILLIANCE },
    { title: "Wision Work", desc: "A typographic WW lettermark where form meets function. The fine linework and two-tone palette give this identity a sharp, architectural feel — modern enough for tech, refined enough for consulting.", tags: ["Logo", "Typography", "Linework"], color: "#4FC3F7", img: IMG_WISION_WORK },
    { title: "Baltic Breeze", desc: "An illustrative hexagonal mark blending urban skyline with natural landscape — trees, mountains, and a rising sun. It captures the spirit of a place where nature and modernity coexist beautifully.", tags: ["Logo", "Illustrative", "Nature"], color: "#5B8FA8", img: IMG_CZ_CONNECT },
    { title: "VirtusLabs", desc: "Two overlapping pill shapes in a grayscale palette create an abstract mark that feels both scientific and forward-thinking. Simple, distinctive, and highly versatile across digital and physical applications.", tags: ["Logo", "Abstract", "Tech"], color: "#555555", img: IMG_VIRTUS_LABS },
    { title: "RBN — Raised By Numbers", desc: "A bold, data-driven brand identity for a financial content platform. The 3D ribbon mark in a warm-to-cool gradient communicates growth, momentum, and the energy of numbers in motion.", tags: ["Logo", "3D", "Finance"], color: "#E84C1E", img: IMG_RBN },
    { title: "Brandy Vibes", desc: "A neon-lit bag icon glowing with electric pink energy. Designed for a women's accessories brand, this mark captures the thrill of the night out — bold, unapologetic, and completely unforgettable.", tags: ["Logo", "Neon", "Fashion"], color: "#E040FB", img: IMG_BALTIC_BREEZE },
    { title: "Coffee Break", desc: "A minimal, two-colour wordmark anchored by a coffee bean icon — clean, bold capital letters that work as hard as your morning espresso. Designed for a coffee bar that means business.", tags: ["Logo", "Minimal", "Cafe"], color: "#C0842A", img: IMG_COFFEE_BREAK },
    { title: "Reawaken", desc: "A strong navy wordmark with a hidden R letterform — clean, professional, and quietly clever. The mark communicates renewal and confidence, making it ideal for a coaching or wellness-focused brand.", tags: ["Logo", "Wordmark", "Minimal"], color: "#0D2B3E", img: IMG_REAWAKEN },
    { title: "Edify Productions", desc: "A dynamic film-and-media mark combining camera film reels with bold geometric shapes. The play button and filmstrip elements immediately communicate creativity, production quality, and visual storytelling.", tags: ["Logo", "Media", "Geometric"], color: "#E85D04", img: IMG_EDIFY },
    { title: "REC Films", desc: "A high-contrast wordmark pairing a bold red circle with a cinematic clapperboard — instantly recognisable and packed with energy. Simple enough to work anywhere, strong enough to never be forgotten.", tags: ["Logo", "Film", "Bold"], color: "#E63946", img: IMG_REC_FILMS },
  ];

export const socialProjects = [
    {
      title: "ABS Shoes",
      desc: "Built a complete Instagram identity for Pakistan's rising luxury footwear brand. From feed posts to stories and highlight covers, every touchpoint was designed to feel premium, consistent, and scroll-stopping — helping grow the account to 23K+ followers.",
      color: "#1a1a1a", tags: ["Social Media", "Fashion", "Instagram"],
      logo: IMG_ABS_LOGO,
      posts: [IMG_ABS_POST1, IMG_ABS_POST2, IMG_ABS_POST3, IMG_ABS_POST4, IMG_ABS_POST5],
    },
    {
      title: "A Branded Store",
      desc: "Created a cohesive social media presence for a multi-brand retail outlet carrying Starlet and Bella. The content strategy balanced product showcasing with seasonal campaigns, building a feed that felt curated, on-trend, and shoppable.",
      color: "#2A9D8F", tags: ["Social Media", "Retail", "Multi-brand"],
      logo: IMG_BRANDED_STORE_LOGO,
      posts: [IMG_BRANDED_POST1, IMG_BRANDED_POST2, IMG_BRANDED_POST3],
    },
    {
      title: "Emenac Travel UK",
      desc: "Designed eye-catching social media campaigns for a London-based travel agency. Each post was crafted to inspire wanderlust and drive bookings — from Maldives beach escapes to Umrah packages — with bold typography and vibrant destination visuals.",
      color: "#E63946", tags: ["Social Media", "Travel", "Campaign"],
      logo: IMG_EMENAC_LOGO,
      posts: [IMG_EMENAC_POST1, IMG_EMENAC_POST2],
    },
    {
      title: "Meshwar Wahid",
      desc: "Developed social media content for a Saudi-based delivery company, including Keeta recruitment campaigns. The visuals were bold, bilingual, and designed to attract both customers and freelance delivery partners across the region.",
      color: "#F4A261", tags: ["Social Media", "Delivery", "Freelance"],
      logo: IMG_MESHWAR_LOGO,
      posts: [IMG_MESHWAR_POST1],
    },
    {
      title: "Kingdom Joint",
      desc: "Managed the full social media visual identity for a fast-casual shawarma restaurant. From Facebook banners to Instagram reels thumbnails, the content captured the brand's bold, street-food personality and kept the audience hungry for more.",
      color: "#E63946", tags: ["Social Media", "Food", "Restaurant"],
      logo: IMG_KINGDOM_JOINT_SOCIAL_LOGO,
      posts: [IMG_KJ_POST1, IMG_KJ_POST2],
    },
    {
      title: "DesignThru",
      desc: "As Art Director at DesignThru, I led the creative direction for their own social media — crafting thought-leadership content, campaign visuals, and brand storytelling pieces that positioned the agency as a bold, ideas-first creative powerhouse.",
      color: "#F7C948", tags: ["Social Media", "Agency", "Art Direction"],
      logo: IMG_DESIGNTHRU_LOGO,
      posts: [IMG_DT_POST1, IMG_DT_POST2, IMG_DT_POST3, IMG_DT_POST4, IMG_DT_POST5, IMG_DT_POST6, IMG_DT_POST7],
    },
  ];

export const uiuxProjects = [
    {
      title: "Pure Digital Marketing",
      subtitle: "Digital marketing agency for plumbers",
      url: "puredigitalmarketing.com",
      color: "#1E3A8A",
      tags: ["UI/UX", "Web Design", "Lead Gen"],
      desc: "A full-page website design for a Tampa agency that markets exclusively to plumbers and other home-service trades. The brief was blunt: the old site looked like a generic template and buried the enquiry form. I rebuilt the page around a single conversion goal — the contact form sits inside the hero, visible before any scroll, with trust badges (Google Partner, Expertise, BestSearch) placed immediately below it so credibility lands before the pitch does.",
      highlights: [
        "Form-in-hero layout so the primary action never needs a scroll",
        "Deep-navy and white system built for contrast and quick scanning",
        "Services shown as a 7-icon grid instead of a wall of paragraphs",
        "A real before/after lead-volume panel doing the persuading, not adjectives",
      ],
      role: "UI Design · Web Design · Visual System",
      cover: IMG_PURE_DIGITAL_S1,
      shots: [IMG_PURE_DIGITAL_S1, IMG_PURE_DIGITAL_S2, IMG_PURE_DIGITAL_S3],
      full: IMG_PURE_DIGITAL_FULL,
    },
    {
      title: "Simplia",
      subtitle: "Web design service company",
      url: "simplia.com",
      color: "#E5322D",
      tags: ["UI/UX", "Web Design", "Agency"],
      desc: "A landing page for a web design service that sells speed — 24-hour delivery, unlimited revisions, cancel anytime. The design had to feel confident without shouting, so I used a restrained red-and-cream palette with soft circular shapes carrying the eye down the page, and let one bold accent colour do the work that five colours usually get asked to do.",
      highlights: [
        "Layered device mockup in the hero showing real output, not a stock photo",
        "Four-step process section using oversized numerals as the visual anchor",
        "Guarantees turned into a scannable icon row — the actual reason people buy",
        "Full-bleed red bands used as rhythm markers between calm white sections",
      ],
      role: "UI Design · Web Design · Brand Application",
      cover: IMG_SIMPLIA_S1,
      shots: [IMG_SIMPLIA_S1, IMG_SIMPLIA_S2, IMG_SIMPLIA_S3, IMG_SIMPLIA_S4, IMG_SIMPLIA_S5, IMG_SIMPLIA_S6, IMG_SIMPLIA_S7],
      full: IMG_SIMPLIA_FULL,
    },
    {
      title: "Skewings",
      subtitle: "Flight & travel booking platform",
      url: "skewings.com",
      color: "#2E86F0",
      tags: ["UI/UX", "Travel", "Booking"],
      desc: "A booking site for flights and travel packages, designed to feel like the trip rather than the transaction. Photography carries the page and the interface gets out of its way — rounded cards, generous whitespace, and one blue accent used consistently for anything clickable. The booking path stays visible throughout, from the hero CTA down to the destination cards.",
      highlights: [
        "Editorial hero with a stepped progress rail hinting at the booking flow",
        "Destination cards with location, rating, and a single obvious tap target",
        "OTA trust row (Tripadvisor, Trivago, Expedia, Booking.com) placed above the fold-break",
        "Stats and testimonials used as proof blocks between the visual sections",
      ],
      role: "UI/UX Design · Web Design · Visual System",
      cover: IMG_SKEWINGS_S1,
      shots: [IMG_SKEWINGS_S1, IMG_SKEWINGS_S2, IMG_SKEWINGS_S3, IMG_SKEWINGS_S4, IMG_SKEWINGS_S5, IMG_SKEWINGS_S6],
      full: IMG_SKEWINGS_FULL,
    },
  ];

export const experience = [
    { role: "UI Designer", company: "Redmath", period: "May 2024–Present", desc: "Currently working full-time as a UI Designer at Redmath, Lahore. Focused on crafting clean, user-centered interfaces using Figma.", color: C.purple },
    { role: "Art Director", company: "DesignThru", period: "Apr 2023–Apr 2024", desc: "Specialized in creating and delivering visual content across a variety of mediums, ensuring cohesive alignment with branding strategies and project objectives.", color: C.teal },
    { role: "SR. Graphic Designer", company: "Starlet Shoes", period: "Jan 2023–Aug 2023", desc: "Created visual content that communicates messages effectively. Led design projects collaborating with cross-functional teams and mentored junior designers.", color: "#F7C948" },
    { role: "Graphic Designer", company: "Kingdom Joint", period: "Mar 2019–Dec 2022", desc: "Handled visual conceptualization, branding and identity, and digital marketing strategy across print and digital mediums.", color: "#FF6B6B" },
    { role: "Graphic Designer", company: "Emenac Travel UK", period: "Jan 2020–Oct 2020", desc: "Designed visual content for diverse mediums ensuring alignment with branding. Produced logos, brochures, and digital graphics.", color: "#4FC3F7" },
    { role: "Videographer", company: "Anokhay Digital", period: "Nov 2019–Sep 2020", desc: "Captured and produced compelling video content. Handled full production pipeline from camera operation to post-production.", color: "#FF8C42" },
  ];

export const education = [
    { degree: "Level-5 & BA in Graphic Design and Management", school: "Warnborough College", period: "2014–2018", grade: "A+", color: C.purple },
    { degree: "Level-3, Design and Applied Arts", school: "Warnborough College", period: "2012–2014", grade: "A", color: C.teal },
    { degree: "O-Levels, Computer Science", school: "Jawahir Al-Riyadh", period: "2010–2012", grade: "B", color: "#F7C948" },
  ];

export const services = [
    { title: "Brand Identity & Logo Design", tagline: "Brands people remember.", desc: "Distinctive visual identities that resonate with your audience and stand out in a crowded market. From logo systems to brand guidelines.", tools: ["Illustrator", "Photoshop", "Figma"], color: "#FF6B6B", icon: "🏷️",
      deliverables: ["Primary & secondary logos", "Color palette & typography", "Brand guidelines PDF", "Social media kit", "Business card & letterhead"] },
    { title: "Social Media Visuals", tagline: "Content that stops the scroll.", desc: "Scroll-stopping social content crafted for maximum engagement and brand consistency across all platforms.", tools: ["Photoshop", "Illustrator", "Figma"], color: C.teal, icon: "📱",
      deliverables: ["Feed posts & stories", "Campaign banners", "Template sets", "Highlight covers", "Carousel layouts"] },
    { title: "Graphic Design", tagline: "Visuals that communicate clearly.", desc: "From marketing materials to editorial layouts, clear and compelling visuals that deliver your message effectively.", tools: ["Photoshop", "Illustrator", "InDesign"], color: "#F7C948", icon: "🎨",
      deliverables: ["Brochures & flyers", "Posters & banners", "Email templates", "Presentations", "Print-ready files"] },
    { title: "Web Design", tagline: "Websites that work as good as they look.", desc: "Pixel-perfect web designs ready for developer handoff, optimized for conversion and usability.", tools: ["Figma", "Adobe XD", "Photoshop"], color: "#FF8C42", icon: "🖥️",
      deliverables: ["Landing page design", "Multi-page layouts", "Mobile responsive", "Design system", "Dev handoff ready"] },
  ];

export const initialReviews = [
  { name: "Ahmed Al-Rashid", role: "CEO, TechVentures", stars: 5, text: "Sameed delivered outstanding UI work for our SaaS platform. His attention to detail, clean design language, and ability to translate complex flows into simple interfaces was remarkable. Highly recommend working with him.", date: "Mar 2025", emoji: "👔" },
  { name: "Sarah Mitchell", role: "Product Manager, Orbit Co.", stars: 5, text: "One of the best designers I've collaborated with. Sameed has a rare ability to balance aesthetics with usability. He brought our dashboard to life with a design system that the entire team loves using.", date: "Jan 2025", emoji: "💼" },
  { name: "Usman Tariq", role: "Founder, Starlet Shoes", stars: 5, text: "Sameed redesigned our entire brand identity and the results were beyond our expectations. From the logo to social media templates, everything felt cohesive and premium.", date: "Aug 2023", emoji: "👟" },
  { name: "Priya Sharma", role: "Marketing Director, DesignThru", stars: 5, text: "Working with Sameed as our Art Director was a game-changer. His visual direction was always on-brand, creative, and high-impact. Our engagement rates went up significantly.", date: "Apr 2024", emoji: "📊" },
  { name: "James O'Connor", role: "CTO, Emenac Travel UK", stars: 4, text: "Sameed was professional, responsive, and delivered quality work consistently. His design sensibility made a huge difference to our travel platform.", date: "Oct 2020", emoji: "✈️" },
  { name: "Fatima Zahra", role: "Creative Lead, Kingdom Joint", stars: 5, text: "A truly versatile designer. Sameed handled everything from illustration to digital marketing visuals with the same level of care and excellence.", date: "Dec 2022", emoji: "🎨" },
];

export const skills = ["UI/UX Design", "Creative Direction", "Social Media Visuals", "Visual Design", "Brand Identity", "Figma", "Adobe XD", "Illustrator", "Photoshop"];
