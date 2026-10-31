// Search-engine titles and descriptions for every page, in both languages.
// The CMS ("seo" section in Sanity) can still override title/description per page;
// these are the built-in values used when the CMS has nothing for that page.
// Blog posts only exist in English for now, so they have no Spanish entry.
export const SEO_TEXT = {
  home: {
    en: {
      title: "Scuba Diving Tours in Tulum, Playa del Carmen & Cozumel",
      description: "Boutique dive center with 15 years of experience. Cenote diving, reef diving and PADI courses in Tulum, Playa del Carmen & Cozumel. Book on WhatsApp.",
      ogTitle: "Cenote Diving Tulum | Free Way Scuba Diving | Riviera Maya",
      ogDescription: "Cenote diving specialists in Tulum. Small-group cenote dives, reef diving, whale shark & bull shark tours and PADI courses in the Riviera Maya.",
    },
    es: {
      title: "Tours de Buceo en Tulum, Playa del Carmen y Cozumel",
      description: "Centro de buceo boutique con 15 años de experiencia. Buceo en cenotes y arrecifes y cursos PADI en Tulum, Playa del Carmen y Cozumel. Reserva por WhatsApp.",
      ogTitle: "Buceo en Cenotes Tulum | Free Way Scuba Diving | Riviera Maya",
      ogDescription: "Especialistas en buceo en cenotes en Tulum. Grupos pequeños, buceo en arrecifes, tiburón ballena y tiburón toro, y cursos PADI en la Riviera Maya.",
    },
  },
  cenote: {
    en: {
      title: "Cenote Diving in Tulum & Playa del Carmen | Freeway Scuba",
      description: "Book cenote diving in Tulum & Playa del Carmen with certified local guides. Small groups, max 4 divers, pro equipment. Gran Cenote, Dos Ojos & more.",
      ogTitle: "Cenote Diving in Tulum | Freeway Scuba Diving",
      ogDescription: "Explore crystal-clear freshwater cenotes in Tulum with certified local guides. Small groups, max 4 divers, safety first.",
    },
    es: {
      title: "Buceo en Cenotes de Tulum y Playa del Carmen | Freeway",
      description: "Reserva buceo en cenotes en Tulum y Playa del Carmen con guías locales certificados. Grupos pequeños, máx 4 buzos y equipo profesional. Gran Cenote y Dos Ojos.",
      ogTitle: "Buceo en Cenotes de Tulum | Freeway Scuba Diving",
      ogDescription: "Explora cenotes de agua dulce cristalina en Tulum con guías locales certificados. Grupos pequeños, máximo 4 buzos y seguridad ante todo.",
    },
  },
  reef: {
    en: {
      title: "Reef Diving in Tulum, Playa del Carmen & Cozumel | Freeway",
      description: "Reef diving in Tulum, Playa del Carmen & Cozumel with certified guides. Cozumel drift dives, bull shark diving and whale shark snorkel. Book on WhatsApp.",
      ogTitle: "Reef Diving Tulum & Playa del Carmen | Freeway Scuba Diving",
      ogDescription: "Reef diving in Cozumel, Playa del Carmen and Tulum. Bull sharks, whale sharks, sea turtles and drift dives with certified guides.",
    },
    es: {
      title: "Buceo en Arrecifes de Tulum, Playa del Carmen y Cozumel",
      description: "Buceo en arrecifes en Tulum, Playa del Carmen y Cozumel con guías certificados. Corrientes de Cozumel, tiburón toro y tiburón ballena. Reserva por WhatsApp.",
      ogTitle: "Buceo en Arrecifes de Tulum y Playa del Carmen | Freeway Scuba Diving",
      ogDescription: "Buceo en arrecifes de Cozumel, Playa del Carmen y Tulum. Tiburones toro, tiburones ballena, tortugas y buceo de corriente con guías certificados.",
    },
  },
  courses: {
    en: {
      title: "PADI Diving Courses in Tulum & Playa del Carmen | Freeway",
      description: "Learn to scuba dive in Tulum & Playa del Carmen with PADI certified instructors. Open Water, Advanced, Nitrox and Discover Scuba. Small groups.",
      ogTitle: "Diving Courses in Tulum | PADI Certified — Freeway Scuba Diving",
      ogDescription: "PADI diving courses in Tulum. Open Water from $8,900 MXN. Small groups, certified instructors, real cenote and ocean dives included.",
    },
    es: {
      title: "Cursos de Buceo PADI en Tulum y Playa del Carmen | Freeway",
      description: "Aprende a bucear en Tulum y Playa del Carmen con instructores PADI certificados. Open Water, Advanced, Nitrox y bautizo de buceo. Grupos pequeños.",
      ogTitle: "Cursos de Buceo en Tulum | Certificación PADI — Freeway Scuba Diving",
      ogDescription: "Cursos de buceo PADI en Tulum. Open Water desde $8,900 MXN. Grupos pequeños, instructores certificados y buceos reales en cenote y mar incluidos.",
    },
  },
  bullShark: {
    en: {
      title: "Bull Shark Diving in Playa del Carmen | Freeway Scuba",
      description: "Private bull shark diving in Playa del Carmen, November to March. 2 dives with a PADI Instructor: bull sharks + reef. For Advanced divers. Book now.",
      ogTitle: "Bull Shark Diving in Playa del Carmen | Freeway Scuba Diving",
      ogDescription: "Dive with wild bull sharks in Playa del Carmen from November to March. Private 2-dive trip with a PADI Instructor.",
    },
    es: {
      title: "Buceo con Tiburón Toro en Playa del Carmen | Freeway",
      description: "Buceo privado con tiburón toro en Playa del Carmen, de noviembre a marzo. 2 inmersiones con Instructor PADI: tiburones + arrecife. Reserva hoy.",
      ogTitle: "Buceo con Tiburón Toro en Playa del Carmen | Freeway Scuba Diving",
      ogDescription: "Bucea con tiburones toro en libertad en Playa del Carmen, de noviembre a marzo. Viaje privado de 2 inmersiones con Instructor PADI.",
    },
  },
  cozumel: {
    en: {
      title: "Cozumel Diving Trips from Playa del Carmen & Tulum",
      description: "Private Cozumel diving trip by speedboat from Playa del Carmen, no ferry. 2 drift dives in the Marine Park, back by 1:30 PM. Pickup from Tulum available.",
      ogTitle: "Cozumel Diving Trips from Playa del Carmen & Tulum | Freeway",
      ogDescription: "2 drift dives in the Cozumel National Marine Park by private speedboat from Playa del Carmen. Pickup from Tulum available.",
    },
    es: {
      title: "Buceo en Cozumel desde Playa del Carmen y Tulum | Freeway",
      description: "Viaje privado de buceo a Cozumel en lancha rápida desde Playa del Carmen, sin ferry. 2 inmersiones a la deriva en el Parque Marino. Recogida en Tulum.",
      ogTitle: "Viajes de Buceo a Cozumel desde Playa del Carmen y Tulum | Freeway",
      ogDescription: "2 inmersiones a la deriva en el Parque Nacional Marino de Cozumel, en lancha rápida privada desde Playa del Carmen. Recogida en Tulum disponible.",
    },
  },
  packages: {
    en: {
      title: "Diving Packages & Snorkeling Tours in Tulum | Freeway",
      description: "Multi-day diving packages and snorkeling tours in Tulum & Playa del Carmen: cenotes, reefs and whale shark snorkel. 100% private. Book on WhatsApp.",
      ogTitle: "Diving Packages & Snorkeling Tours Tulum | Freeway Scuba Diving",
      ogDescription: "Multi-day diving packages and snorkeling tours in Tulum & Playa del Carmen. Private, personalized, with a PADI Instructor.",
    },
    es: {
      title: "Paquetes de Buceo y Tours de Snorkel en Tulum | Freeway",
      description: "Paquetes de buceo de varios días y tours de snorkel en Tulum y Playa del Carmen: cenotes, arrecifes y tiburón ballena. 100% privados. Reserva por WhatsApp.",
      ogTitle: "Paquetes de Buceo y Tours de Snorkel en Tulum | Freeway Scuba Diving",
      ogDescription: "Paquetes de buceo de varios días y tours de snorkel en Tulum y Playa del Carmen. Privados y personalizados, con Instructor PADI.",
    },
  },
  about: {
    en: {
      title: "About Freeway Scuba Diving | Cenote Specialists, Tulum",
      description: "Freeway Scuba Diving: PADI Instructor Diego and his team, cenote diving specialists in Tulum. Private excursions, max 4 divers, fully personalized.",
      ogTitle: "About Freeway Scuba Diving | Cenote Specialists Tulum",
      ogDescription: "PADI Instructor Diego, Full Cave Diver, offers private personalized cenote diving excursions in Tulum, Tulum & Playa del Carmen.",
    },
    es: {
      title: "Sobre Freeway Scuba Diving | Especialistas en Cenotes",
      description: "Freeway Scuba Diving: el instructor PADI Diego y su equipo, especialistas en buceo en cenotes en Tulum. Excursiones privadas, máximo 4 buzos.",
      ogTitle: "Sobre Freeway Scuba Diving | Especialistas en Cenotes de Tulum",
      ogDescription: "Diego, instructor PADI y Full Cave Diver, ofrece excursiones privadas y personalizadas de buceo en cenotes en Tulum y Playa del Carmen.",
    },
  },
  faq: {
    en: {
      title: "Cenote Diving FAQ Tulum: Safety & Certification | Freeway",
      description: "Everything you need to know before cenote diving in Tulum: certification, safety, what's included and how to book.",
      ogTitle: "Cenote Diving FAQ Tulum | Freeway Scuba Diving",
      ogDescription: "Certification, safety, what's included, prices and how to book cenote diving in Tulum. Answered by experts.",
    },
    es: {
      title: "Buceo en Cenotes de Tulum: Preguntas Frecuentes | Freeway",
      description: "Todo lo que necesitas saber antes de bucear en cenotes en Tulum: certificación, seguridad, qué incluye y cómo reservar.",
      ogTitle: "Preguntas Frecuentes sobre Buceo en Cenotes | Freeway Scuba Diving",
      ogDescription: "Certificación, seguridad, qué incluye, precios y cómo reservar buceo en cenotes en Tulum. Respondido por expertos.",
    },
  },
  contact: {
    en: {
      title: "Contact Freeway Scuba Diving | Dive Center in Tulum",
      description: "Contact our Tulum dive center on WhatsApp. Fast replies, certified guides and personalized diving packages in Tulum, Playa del Carmen & Cozumel.",
      ogTitle: "Book Cenote Diving in Tulum | Freeway Scuba Diving",
      ogDescription: "Book your cenote diving experience in Tulum on WhatsApp. Fast replies, small groups and certified local guides.",
    },
    es: {
      title: "Contacto Freeway Scuba Diving | Centro de Buceo en Tulum",
      description: "Escribe a nuestro centro de buceo en Tulum por WhatsApp. Respuesta rápida, guías certificados y paquetes personalizados en Tulum, Playa del Carmen y Cozumel.",
      ogTitle: "Reserva Buceo en Cenotes de Tulum | Freeway Scuba Diving",
      ogDescription: "Reserva tu experiencia de buceo en cenotes en Tulum por WhatsApp. Respuesta rápida, grupos pequeños y guías locales certificados.",
    },
  },
  book: {
    en: {
      title: "Book Scuba Diving in Tulum & Playa del Carmen | Freeway",
      description: "Reserve your cenote, reef or Cozumel dive in Tulum & Playa del Carmen. Choose your experience, date and pickup — request by email or WhatsApp.",
      ogTitle: "Book Your Dive in Tulum | Freeway Scuba Diving",
      ogDescription: "Choose your experience, date and pickup location — send your reservation request by email or WhatsApp. Diego Tenaglia confirms personally.",
    },
    es: {
      title: "Reserva tu Buceo en Tulum y Playa del Carmen | Freeway",
      description: "Reserva tu buceo en cenote, arrecife o Cozumel desde Tulum y Playa del Carmen. Elige experiencia, fecha y recogida, y solicita por correo o WhatsApp.",
      ogTitle: "Reserva tu Buceo en Tulum | Freeway Scuba Diving",
      ogDescription: "Elige tu experiencia, fecha y lugar de recogida, y envía tu solicitud por correo o WhatsApp. Diego Tenaglia confirma personalmente.",
    },
  },
  blog: {
    en: {
      title: "Diving Blog — Cenote Guides & Tips | Freeway Scuba Diving Tulum",
      description: "Cenote diving guides, tips and local knowledge from Freeway Scuba Diving — the cenote specialists in Tulum, Mexico.",
      ogTitle: "Diving Blog | Freeway Scuba Diving Tulum",
    },
  },
  blogCenote: {
    en: {
      title: "Best Cenotes for Diving in Tulum & Playa del Carmen — Freeway Scuba Diving",
      description: "Complete guide to the best cenotes for diving and snorkeling near Tulum: Dos Ojos, The Pit, Angelita, Casa Cenote and more. Depths, certifications, visibility and tour info.",
      ogTitle: "Best Cenotes for Diving in Tulum — Complete Guide",
      ogDescription: "14 best cenotes for diving and snorkeling near Tulum. Depths, certifications, what to expect — by Freeway Scuba Diving.",
    },
  },
  blogCert: {
    en: {
      title: "What Certification Do You Need for Cenote Diving? — Freeway Scuba Diving",
      description: "Find out which scuba certification you need to dive Tulum's cenotes. No cert, Open Water, Advanced, Cave Diver — explained for every level.",
      ogTitle: "What Certification Do You Need for Cenote Diving?",
      ogDescription: "No cert, Open Water, Advanced or Cave Diver — what each level unlocks in Tulum's cenotes, explained simply.",
    },
  },
};

// Text for one page in one language: the CMS value if there is one, else the built-in text.
// `cmsSeo` is `t.seo` from the language context (already in the visitor's language).
export function getSeo(key, lang, cmsSeo) {
  const entry = SEO_TEXT[key];
  if (!entry) return null;
  const base = entry[lang] || entry.en;
  const cms = cmsSeo?.[key] || {};
  return {
    title: cms.title || base.title,
    description: cms.description || base.description,
    ogTitle: base.ogTitle || cms.title || base.title,
    ogDescription: base.ogDescription || cms.description || base.description,
  };
}
