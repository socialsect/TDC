/**
 * Service detail page content, one entry per treatment in `services` (site.ts).
 *
 * Sources
 * - `clinicLead`, and every statement about how TDC Dental carries out a treatment, comes from
 *   the clinic's own treatment pages (tdcdental.ae/service/…, checked 29 Oct 2026) or its FAQ page.
 * - The rest is general patient information written for this site: what a treatment is, typical
 *   steps, and what an assessment looks at. It is deliberately cautious — no prices, timescales,
 *   success rates or guaranteed results — and should be reviewed by the clinic's dentists before
 *   launch.
 * - Photos are of the clinic itself; there are no treatment photos yet.
 */
import { clinic, type Service } from "./site";

type Slug = Service["slug"];
type Item = { title: string; body: string };

export type ServiceDetail = {
  metaTitle: string;
  metaDescription: string;
  /** Eyebrow above the H1: the area of care the treatment belongs to. */
  category: string;
  /** H1 split into masked lines; the last one is set in light italic. */
  heading: [string, string];
  intro: string;
  /** The clinic's own one-line description of the treatment. */
  clinicLead: string;
  image: { src: string; alt: string; position?: string };
  about: { heading: [string, string]; paragraphs: string[] };
  benefits: Item[];
  process: { steps: Item[]; note: string };
  suitability: { consider: string[]; assessment: string[] };
  faqs: { q: string; a: string }[];
  related: Slug[];
};

const ROOM = { src: "/images/clinic-treatment-room.jpg", alt: "A treatment room at TDC Dental Clinic with a modern dental chair and floor-to-ceiling windows" };
const ROOM_WINDOW = {
  src: "/images/clinic-treatment-room-3.jpg",
  alt: "A treatment room at TDC Dental Clinic with a dental chair beside floor-to-ceiling windows overlooking Deira",
};
const ROOM_LIGHT = { src: "/images/clinic-treatment-room-2.jpg", alt: "A treatment room at TDC Dental Clinic with a dental chair and soft linear lighting" };
const RECEPTION = { src: "/images/clinic-reception.jpg", alt: "TDC Dental Clinic's bright reception area overlooking Deira" };
const CORRIDOR = { src: "/images/clinic-corridor.jpg", alt: "Waiting area and corridor at TDC Dental Clinic, with the TDC logo on a timber wall" };

const insuranceFaq = {
  q: "Do you accept insurance or offer payment plans?",
  a: "We accept many insurance providers and offer flexible payment plans for uninsured patients. Share your provider details and we will confirm your cover.",
};

export const serviceDetails: Record<Slug, ServiceDetail> = {
  implants: {
    metaTitle: "Dental Implants in Dubai | TDC Dental Clinic",
    metaDescription:
      "Dental implants at TDC Dental Clinic in Deira, Dubai: a fixed replacement for missing teeth that leaves neighbouring teeth untouched. Book an assessment.",
    category: "Restorative care",
    heading: ["Dental implants,", "fixed and natural."],
    intro: "A permanent replacement for one or more missing teeth, planned around your bite, gums and bone.",
    clinicLead: "Dental implants permanently replace missing teeth without affecting the neighbouring teeth.",
    image: ROOM,
    about: {
      heading: ["What a dental", "implant is."],
      paragraphs: [
        "A dental implant is a small post placed in the jawbone where a tooth is missing. Once it has settled, it supports a crown that replaces the visible tooth. Where several teeth are missing, implants can also carry a fixed bridge or denture.",
        "Missing teeth can make chewing and speaking harder and change how your smile looks. Implants are designed to restore all three without reshaping the healthy teeth on either side of the gap.",
        "You might consider implants if you have lost a tooth to decay, injury or gum disease, or if a removable denture no longer feels secure.",
      ],
    },
    benefits: [
      { title: "Fixed in place", body: "An implant-supported tooth is anchored in the jaw, so it doesn’t need to be removed for cleaning like a denture." },
      { title: "Neighbouring teeth untouched", body: "The replacement stands on its own, without relying on or reshaping the teeth beside it." },
      { title: "Chewing and speech restored", body: "Replacing missing teeth helps bring back a comfortable bite and clear speech." },
      { title: "Supports bridges and dentures", body: "Where several teeth are missing, implants can serve as carriers for a fixed bridge or denture." },
    ],
    process: {
      steps: [
        { title: "Assessment", body: "Your dentist examines the area, your gums and the surrounding teeth, with imaging where needed to check the bone." },
        { title: "Treatment plan", body: "You’ll talk through how many implants are needed, what they will support and how treatment will be staged." },
        { title: "Implant placement", body: "The implant is placed in the jawbone where the tooth is missing." },
        { title: "Healing", body: "The bone is given time to settle around the implant. How long this takes varies from person to person." },
        { title: "Final restoration", body: "The crown, bridge or denture is fitted to the implant and your bite is checked." },
      ],
      note: "A typical outline of implant treatment. Your dentist will confirm the exact steps and timing for your case.",
    },
    suitability: {
      consider: [
        "You are missing one or more teeth",
        "You would like a fixed alternative to a removable denture",
        "A gap is affecting how you chew, speak or smile",
      ],
      assessment: [
        "The amount and quality of bone where the implant would go",
        "The health of your gums and remaining teeth",
        "Your medical history and any medication you take",
        "Lifestyle factors, such as smoking, that can affect healing",
      ],
    },
    faqs: [
      {
        q: "Will an implant affect my other teeth?",
        a: "No. An implant replaces a missing tooth without affecting the neighbouring teeth, so the healthy teeth on either side don’t need to be reshaped to support it.",
      },
      {
        q: "Can implants replace several missing teeth?",
        a: "Yes. As well as replacing a single tooth, implants can serve as carriers for a fixed dental bridge or denture. Your dentist will recommend an approach after assessing your mouth.",
      },
      {
        q: "Is everyone suitable for dental implants?",
        a: "Not always. Suitability depends on things like your bone, gum health and medical history. These are checked at your assessment before any treatment is recommended.",
      },
      {
        q: "How long does implant treatment take?",
        a: "It varies, mainly with how long the bone takes to settle around the implant and whether any other treatment is needed first. You’ll be given a timeline for your case at consultation.",
      },
      {
        q: "What are the other options for replacing missing teeth?",
        a: "Common options include dental implants, bridges and dentures. The right choice depends on your oral health and preferences, which your dentist will discuss with you.",
      },
      insuranceFaq,
    ],
    related: ["restorative", "veneers"],
  },

  restorative: {
    metaTitle: "Restorative Dentistry in Dubai | TDC Dental Clinic",
    metaDescription:
      "Restorative dentistry at TDC Dental Clinic, Deira: crowns, bridges and modern prosthetics for damaged or missing teeth, planned after a careful assessment.",
    category: "Restorative care",
    heading: ["Restorative dentistry,", "for a stronger bite."],
    intro: "Crowns, bridges and modern prosthetics for teeth too damaged for a filling, or for teeth that are missing.",
    clinicLead: "We work toward bringing natural-looking smiles back to patients whose teeth need repair or replacement.",
    image: ROOM_WINDOW,
    about: {
      heading: ["Repairing and", "replacing teeth."],
      paragraphs: [
        "Restorative dentistry repairs or replaces teeth so they work and look as they should. When a tooth is damaged in a way that can’t be rebuilt with a filling, or one or more teeth are missing, modern prosthetics can bring back a strong bite, clear speech and your smile.",
        "Common restorations include crowns, which cover and protect a weakened tooth, and bridges, which fill the gap left by a missing tooth. Where suitable, dental implants can also anchor a bridge or denture.",
        "You might consider restorative treatment if a tooth is broken, heavily filled or badly decayed, if biting has become uncomfortable, or if gaps are affecting your bite or confidence.",
      ],
    },
    benefits: [
      { title: "Comfortable chewing", body: "Restoring damaged or missing teeth helps you bite and chew with confidence again." },
      { title: "Protection for weak teeth", body: "A crown covers a tooth that has been weakened, helping to protect what remains of it." },
      { title: "Gaps filled", body: "Bridges and implant-supported restorations replace missing teeth and complete your smile." },
      { title: "A natural-looking finish", body: "Restorations are shaped and shaded to blend with your own teeth." },
    ],
    process: {
      steps: [
        { title: "Examination", body: "Your dentist assesses the damaged or missing teeth, with X-rays where needed." },
        { title: "Options explained", body: "You’ll hear which restorations could work for you — such as a crown, bridge or implant — and why." },
        { title: "Preparation", body: "The tooth or teeth are prepared and the measurements needed to make your restoration are taken." },
        { title: "Fitting", body: "The restoration is fitted, then your bite is checked and adjusted so it feels comfortable." },
      ],
      note: "The steps depend on the restoration you and your dentist choose, and will be explained before treatment begins.",
    },
    suitability: {
      consider: [
        "A tooth is broken, cracked or badly decayed",
        "A tooth has a large old filling that is wearing out",
        "One or more teeth are missing",
        "Biting or chewing has become uncomfortable",
      ],
      assessment: [
        "How much healthy structure the tooth has left",
        "The health of the gums and of any teeth that would support a bridge",
        "How your teeth meet when you bite",
        "Whether decay or gum problems need treating first",
      ],
    },
    faqs: [
      {
        q: "When is a crown needed instead of a filling?",
        a: "A filling repairs a smaller area of damage. When a tooth is too damaged to be rebuilt with a filling, a crown can cover and protect it. Your dentist will recommend the option that suits the tooth after examining it.",
      },
      {
        q: "What is a dental bridge?",
        a: "A bridge replaces a missing tooth by filling the gap with a false tooth supported on either side. Depending on your case, it can be supported by neighbouring teeth or by dental implants.",
      },
      {
        q: "Should I choose a bridge or an implant?",
        a: "Both can replace a missing tooth. The right choice depends on your oral health, your bone and the teeth either side of the gap, which your dentist will talk through with you.",
      },
      {
        q: "Will my restoration look natural?",
        a: "Restorations are shaped and shaded to blend with your natural teeth. Your dentist will discuss the materials suitable for your case.",
      },
      insuranceFaq,
    ],
    related: ["implants", "veneers"],
  },

  veneers: {
    metaTitle: "Porcelain Veneers in Dubai | TDC Dental Clinic",
    metaDescription:
      "Porcelain veneers at TDC Dental Clinic, Deira: thin porcelain shells that refine the shape, size, colour and symmetry of your teeth with minimal intervention.",
    category: "Cosmetic dentistry",
    heading: ["Porcelain veneers,", "refined by design."],
    intro: "A very thin layer of porcelain that refines the shape, size, colour and symmetry of your visible teeth.",
    clinicLead: "Veneers are a cosmetic solution for anyone who wants a more beautiful smile with minimal intervention to their teeth.",
    image: RECEPTION,
    about: {
      heading: ["What porcelain", "veneers are."],
      paragraphs: [
        "A porcelain veneer is a very thin shell bonded to the front surface of a tooth. Because it covers the visible surface, it can change the shape, size, colour and symmetry of the tooth and your smile.",
        "Veneers are often considered for teeth that are chipped, worn, discoloured, slightly uneven or spaced, where whitening or straightening alone wouldn’t give the look you want.",
        "A small amount of the tooth’s surface is usually prepared so the veneer sits naturally. Your dentist will explain what this involves for your teeth before you decide.",
      ],
    },
    benefits: [
      { title: "Shape and proportion", body: "Veneers can refine the shape and size of teeth for a more balanced smile." },
      { title: "An even shade", body: "Porcelain covers discolouration that whitening can’t always reach." },
      { title: "Minimal intervention", body: "A very thin layer of porcelain changes the look of a tooth with minimal invasion into it." },
    ],
    process: {
      steps: [
        { title: "Consultation", body: "You share what you’d like to change, and your dentist examines your teeth and gums." },
        { title: "Planning your smile", body: "The shape, length and shade of the veneers are planned and agreed with you." },
        { title: "Preparation", body: "The teeth are prepared and the measurements for your veneers are taken." },
        { title: "Bonding", body: "The veneers are bonded to your teeth, then the fit and your bite are checked." },
      ],
      note: "A typical outline. Your dentist will explain the steps and number of visits for your treatment.",
    },
    suitability: {
      consider: [
        "Front teeth are chipped, worn or discoloured",
        "There are small gaps or minor irregularities",
        "You would like to change the shape or proportion of your teeth",
      ],
      assessment: [
        "Whether your teeth and gums are healthy enough first",
        "How much healthy enamel there is",
        "Your bite, and habits such as clenching or grinding",
        "Whether whitening or straightening might suit you better",
      ],
    },
    faqs: [
      {
        q: "What are veneers made of?",
        a: "Porcelain veneers are very thin shells of porcelain. For a full Hollywood smile, we use zirconia or e.max veneers.",
      },
      {
        q: "What’s the difference between veneers and a Hollywood smile?",
        a: "Veneers can be placed on one or a few teeth to correct specific concerns. A Hollywood smile is a complete makeover of the visible smile, planned through smile analysis and smile design.",
      },
      {
        q: "Can veneers change the colour of my teeth?",
        a: "Yes. Veneers cover the front of the tooth, so they can change its colour as well as its shape, size and symmetry. The shade is agreed with you during planning.",
      },
      {
        q: "Will my natural teeth need to be prepared?",
        a: "Usually a small amount of the tooth’s surface is prepared so the veneer sits naturally. Your dentist will explain exactly what is involved for your teeth.",
      },
      {
        q: "How do I look after veneers?",
        a: "Brush and floss as you would your natural teeth and keep up regular check-ups, so your dentist can look after both the veneers and the teeth beneath them.",
      },
    ],
    related: ["hollywood-smile", "whitening", "invisible-braces"],
  },

  "hollywood-smile": {
    metaTitle: "Hollywood Smile in Dubai | TDC Dental Clinic",
    metaDescription:
      "A Hollywood smile at TDC Dental Clinic, Deira: a complete smile makeover with zirconia or e.max veneers, planned through smile analysis and smile design.",
    category: "Cosmetic dentistry",
    heading: ["A Hollywood smile,", "designed for you."],
    intro: "A complete cosmetic smile makeover with zirconia or e.max veneers, designed around your facial features.",
    clinicLead: "A celebrity smile through veneers in zirconia or e.max, made to look so natural that no one around you can tell.",
    image: CORRIDOR,
    about: {
      heading: ["A complete", "smile makeover."],
      paragraphs: [
        "A Hollywood smile is a full cosmetic makeover of your visible teeth using veneers. At TDC Dental we use zirconia or e.max. E.max has qualities similar to natural teeth — it reflects part of the light, absorbs part of it and lets part pass through — which helps front teeth look natural.",
        "The goal is true dental beautification: a smile that suits you so well that the people around you don’t notice a change has been made.",
        "It’s often considered by people who want to change several things about their smile at once — shade, shape, length and symmetry — rather than a single tooth.",
      ],
    },
    benefits: [
      { title: "Designed around your face", body: "The smile is chosen using your facial features, including the length of your face and the distance between your eyes." },
      { title: "Natural-looking materials", body: "Zirconia and e.max veneers are used; e.max handles light much like a natural tooth." },
      { title: "One coordinated result", body: "Shade, shape and symmetry are planned together across your whole smile." },
      { title: "Planned in careful stages", body: "Each stage is carried out precisely, because every stage affects the final result." },
    ],
    process: {
      steps: [
        { title: "Smile analysis", body: "Your dentist studies your smile alongside your facial features — face length, the distance between your eyes and the size of your nose." },
        { title: "Smile design", body: "The shape, length and shade of the veneers are designed so the new smile fits your face." },
        { title: "Preparation", body: "Your teeth are prepared and the measurements for the veneers are taken." },
        { title: "Fitting", body: "The zirconia or e.max veneers are fitted, then the fit and your bite are checked." },
      ],
      note: "Smile analysis and smile design are the stages TDC Dental describes. Your dentist will explain the full plan and number of visits.",
    },
    suitability: {
      consider: [
        "You would like to change the colour, shape and symmetry of several teeth",
        "Your front teeth are worn, chipped, uneven or discoloured",
        "You want one planned result rather than treating teeth one at a time",
      ],
      assessment: [
        "The health of your teeth and gums before cosmetic work",
        "How your teeth meet when you bite",
        "Your facial proportions, as part of smile analysis",
        "Whether any restorative or straightening treatment should come first",
      ],
    },
    faqs: [
      {
        q: "What is a Hollywood smile made of?",
        a: "We use zirconia or e.max veneers. Treatment begins with smile analysis and smile design so the new smile suits your facial features.",
      },
      {
        q: "Will it look natural?",
        a: "That is the aim. E.max reflects, absorbs and transmits light much like natural teeth, and your smile is designed around your face rather than a standard template.",
      },
      {
        q: "How are the shape and shade chosen?",
        a: "Through smile analysis and smile design, which consider features such as the length of your face, the distance between your eyes and the size of your nose.",
      },
      {
        q: "How is a Hollywood smile different from veneers?",
        a: "A Hollywood smile is a complete makeover of the visible smile using veneers. Individual veneers can also be placed on just one or a few teeth.",
      },
      {
        q: "Do my teeth need to be healthy first?",
        a: "Your teeth and gums are assessed first, and any problems are usually addressed before cosmetic treatment begins. Your dentist will explain what your case needs.",
      },
    ],
    related: ["veneers", "whitening", "invisible-braces"],
  },

  whitening: {
    metaTitle: "Teeth Whitening in Dubai | TDC Dental Clinic",
    metaDescription:
      "Professional laser-assisted teeth whitening at TDC Dental Clinic, Deira, carried out in the clinic under dental supervision with your gums and lips protected.",
    category: "Cosmetic dentistry",
    heading: ["Teeth whitening,", "professionally done."],
    intro: "Professional, laser-assisted whitening carried out in the clinic under dental supervision.",
    clinicLead: "Laser teeth whitening, carried out in the clinic with your gums and lips protected throughout.",
    image: ROOM_LIGHT,
    about: {
      heading: ["How professional", "whitening works."],
      paragraphs: [
        "Teeth whitening lightens the natural shade of your teeth. At TDC Dental it starts by protecting your gums and lips so only the teeth are exposed. A whitening gel is then applied and activated with a laser to speed up the process.",
        "It’s often considered for staining from coffee, tea or smoking, or for teeth that have darkened over time.",
        "Whitening works on natural teeth. Crowns, veneers and fillings don’t change colour, which your dentist will take into account when planning your treatment.",
      ],
    },
    benefits: [
      { title: "Under dental supervision", body: "Professional whitening is safe when it is carried out under dental supervision." },
      { title: "Gums and lips protected", body: "Only the teeth are exposed during treatment." },
      { title: "Laser-assisted", body: "A laser activates the whitening gel to speed up the process." },
      { title: "No change to tooth shape", body: "Whitening brightens the shade of your teeth without reshaping them." },
    ],
    process: {
      steps: [
        { title: "Check-up", body: "Your teeth and gums are checked first, and you discuss the shade you have in mind." },
        { title: "Protection", body: "Your gums and lips are protected so only the teeth are exposed." },
        { title: "Whitening", body: "A whitening gel is applied to your teeth and activated with a laser." },
        { title: "Aftercare", body: "You’ll get advice on looking after your results, including the habits that can stain teeth." },
      ],
      note: "Based on how TDC Dental describes its laser whitening. Your dentist will confirm what your treatment involves.",
    },
    suitability: {
      consider: [
        "Your natural teeth are stained or have darkened",
        "You want a brighter shade without changing the shape of your teeth",
      ],
      assessment: [
        "Any cavities or gum problems, which are treated first",
        "Crowns, veneers or fillings on visible teeth, which won’t change colour",
        "Whether your teeth are sensitive",
        "The cause of the discolouration, as some stains may be better treated another way",
      ],
    },
    faqs: [
      {
        q: "Is teeth whitening safe?",
        a: "Professional whitening is safe when carried out under dental supervision. Your teeth and gums are checked before treatment, and your gums and lips are protected during it.",
      },
      {
        q: "How long do whitening results last?",
        a: "Results typically last from six months to two years, depending on habits such as coffee, tea and smoking.",
      },
      {
        q: "Will whitening change the colour of my crowns or veneers?",
        a: "No. Whitening lightens natural teeth only, so existing crowns, veneers and fillings stay the same shade. Your dentist will discuss this with you if you have them on visible teeth.",
      },
      {
        q: "Will my teeth feel sensitive?",
        a: "Some people notice sensitivity around whitening. Let your dentist know if your teeth are already sensitive so it can be taken into account.",
      },
      {
        q: "How can I keep my teeth white for longer?",
        a: "Cutting back on coffee, tea and smoking, keeping up good oral hygiene and attending regular check-ups all help your results last.",
      },
    ],
    related: ["veneers", "hollywood-smile"],
  },

  "invisible-braces": {
    metaTitle: "Invisible Braces in Dubai | TDC Dental Clinic",
    metaDescription:
      "Invisible braces at TDC Dental Clinic, Deira: clear braces made to fit your mouth that straighten teeth and treat orthodontic irregularities without metal brackets.",
    category: "Teeth straightening",
    heading: ["Invisible braces,", "without the metal."],
    intro: "Clear braces made specifically to fit your mouth, correcting a range of irregularities without metal brackets.",
    clinicLead: "A modern way of straightening your teeth through clear braces, made specifically to fit your mouth.",
    image: { ...ROOM, position: "70% 50%" },
    about: {
      heading: ["Straightening teeth,", "discreetly."],
      paragraphs: [
        "Invisible braces are clear, custom-made appliances that gradually move teeth into a better position. They are made specifically to fit your mouth and can treat various orthodontic irregularities without the discomfort of metal on your teeth.",
        "Teeth are sometimes irregular from the time they come through, and sometimes they move later in life. Crowding, gaps and uneven teeth can affect how your smile looks and how easy your teeth are to keep clean.",
        "You might consider invisible braces if you would like straighter teeth with minimal impact on how you look day to day.",
      ],
    },
    benefits: [
      { title: "Discreet", body: "Clear braces have minimal impact on how you look while your teeth are being straightened." },
      { title: "No metal brackets", body: "Straighten your teeth without the discomfort of metal on them." },
      { title: "Made for your mouth", body: "Each set is made specifically to fit your teeth." },
    ],
    process: {
      steps: [
        { title: "Assessment", body: "Your dentist examines your teeth and bite and confirms whether clear braces suit your case." },
        { title: "Treatment plan", body: "You’ll see how your teeth are planned to move, and what treatment will involve." },
        { title: "Your clear braces", body: "Your braces are made to fit your mouth and you’re shown how to wear and care for them." },
        { title: "Progress reviews", body: "Regular visits check that your teeth are moving as planned." },
        { title: "Keeping the result", body: "Your dentist will advise on keeping your teeth in their new position once treatment ends." },
      ],
      note: "A typical outline. Your dentist will explain the length and stages of treatment for your case.",
    },
    suitability: {
      consider: [
        "Your teeth are crowded, gapped or uneven",
        "Your teeth have moved later in life",
        "You would prefer a discreet option to metal braces",
      ],
      assessment: [
        "How much and in which direction your teeth need to move",
        "The health of your teeth and gums",
        "How your teeth meet when you bite",
        "Whether another orthodontic approach would suit your case better",
      ],
    },
    faqs: [
      {
        q: "How do invisible braces work?",
        a: "Clear braces are made specifically to fit your mouth and gradually move your teeth into a better position. They can correct a range of orthodontic irregularities without metal brackets.",
      },
      {
        q: "Will people notice I’m wearing them?",
        a: "Clear braces are designed to be discreet, with minimal impact on how you look day to day.",
      },
      {
        q: "Can adults have invisible braces?",
        a: "Yes. Teeth can move later in life as well as being irregular from the start, and clear braces are a common option for adults. Your dentist will confirm whether they suit your case.",
      },
      {
        q: "Are invisible braces suitable for every case?",
        a: "Not always. They can treat various irregularities, but some cases are better suited to another approach. Your dentist will recommend the right option after assessing your teeth.",
      },
      {
        q: "How long does treatment take?",
        a: "It depends on how much your teeth need to move. Your dentist will give you an estimate for your case after your assessment.",
      },
      {
        q: "How do I book a consultation?",
        a: `Call us on ${clinic.phoneDisplay}, message us on WhatsApp, or send an enquiry through the form on our homepage.`,
      },
    ],
    related: ["whitening", "veneers"],
  },
};
