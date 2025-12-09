export const supportedLocales = ["en", "pl", "uk"] as const

export type SupportedLocale = (typeof supportedLocales)[number]

export const defaultLocale: SupportedLocale = "en"

type Messages = Record<string, unknown>

type MessagesByLocale = Record<SupportedLocale, Messages>

export const messagesByLocale: MessagesByLocale = {
  en: {
    navbar: {
      title: "Institution Report Platform",
      subtitle: "Report institutional issues",
      login: "Login",
      register: "Register",
      dashboard: "Dashboard",
      logout: "Log out",
      locale: "Language",
    },
    hero: {
      badge: "Confidential institution incident reporting",
      title: "Submit institution reports securely and reach the admin dashboard fast.",
      subtitle:
        "Share issues about institutions with supporting PDF evidence, track submissions, and let administrators review and respond to each report.",
      cta: {
        submit: "Submit a report",
        login: "Login to dashboard",
        continue: "Continue reporting",
      },
    },
    info: {
      purpose: { title: "Purpose", desc: "Report institutional issues" },
      flow: { title: "Flow", desc: "Upload PDF and submit details" },
      auth: { title: "Authentication", desc: "Sign in to manage your submissions" },
      evidence: { title: "Evidence", desc: "Attach PDF proof with every report" },
      details: { title: "Details", desc: "Capture reporter and institution context" },
      dashboard: { title: "Dashboard", desc: "Review submissions in the admin area" },
    },
    regulations: {
      title: "Current regulations",
      description:
        "Browse the latest regulatory guidelines and policy documents relevant to institutional reporting.",
      primary: {
        name: "Reporting guidelines",
        desc: "How to prepare and submit compliant reports.",
      },
      secondary: {
        name: "Data handling policy",
        desc: "How submitted evidence is stored and protected.",
      },
      tertiary: {
        name: "Investigation process",
        desc: "What happens after a report is received.",
      },
    },
    footer: {
      title: "Institution Report Platform",
      subtitle: "Confidential channel for institution reports and follow-ups",
    },
  },
  pl: {
    navbar: {
      title: "Platforma zgłaszania instytucji",
      subtitle: "Zgłaszaj problemy w instytucjach",
      login: "Zaloguj",
      register: "Zarejestruj",
      dashboard: "Panel",
      logout: "Wyloguj",
      locale: "Język",
    },
    hero: {
      badge: "Poufne zgłaszanie incydentów w instytucjach",
      title:
        "Zgłaszaj incydenty w instytucjach bezpiecznie i szybko przechodź do panelu.",
      subtitle:
        "Przekazuj problemy dotyczące instytucji z dołączonym plikiem PDF, śledź zgłoszenia, a administratorzy przeanalizują i odpowiedzą na każde z nich.",
      cta: {
        submit: "Złóż zgłoszenie",
        login: "Zaloguj do panelu",
        continue: "Kontynuuj zgłaszanie",
      },
    },
    info: {
      purpose: { title: "Cel", desc: "Zgłaszanie problemów instytucjonalnych" },
      flow: { title: "Proces", desc: "Dodaj PDF i wyślij szczegóły" },
      auth: { title: "Uwierzytelnienie", desc: "Zaloguj się, aby zarządzać zgłoszeniami" },
      evidence: { title: "Dowody", desc: "Dołącz plik PDF do każdego zgłoszenia" },
      details: { title: "Szczegóły", desc: "Zbierz dane zgłaszającego i instytucji" },
      dashboard: { title: "Panel", desc: "Przeglądaj zgłoszenia w panelu admina" },
    },
    regulations: {
      title: "Aktualne regulacje",
      description:
        "Przeglądaj najnowsze wytyczne i dokumenty dotyczące zgłaszania w instytucjach.",
      primary: {
        name: "Wytyczne zgłoszeń",
        desc: "Jak przygotować i złożyć zgodne zgłoszenie.",
      },
      secondary: {
        name: "Polityka danych",
        desc: "Jak przechowujemy i chronimy przekazane dowody.",
      },
      tertiary: {
        name: "Proces weryfikacji",
        desc: "Co dzieje się po otrzymaniu zgłoszenia.",
      },
    },
    footer: {
      title: "Platforma zgłaszania instytucji",
      subtitle: "Poufny kanał zgłoszeń i dalszych działań",
    },
  },
  uk: {
    navbar: {
      title: "Платформа звітів про заклади",
      subtitle: "Повідомляйте про проблеми в установах",
      login: "Увійти",
      register: "Зареєструватися",
      dashboard: "Панель",
      logout: "Вийти",
      locale: "Мова",
    },
    hero: {
      badge: "Конфіденційні повідомлення про інциденти в установах",
      title: "Подайте звіт безпечно та швидко перейдіть до адмін-панелі.",
      subtitle:
        "Діліться проблемами щодо установ з PDF-доказами, відстежуйте подані звіти, а адміністратори опрацюють і нададуть відповідь на кожен.",
      cta: {
        submit: "Надіслати звіт",
        login: "Увійти до панелі",
        continue: "Продовжити звітування",
      },
    },
    info: {
      purpose: { title: "Мета", desc: "Повідомлення про проблеми в установах" },
      flow: { title: "Процес", desc: "Додайте PDF і надішліть деталі" },
      auth: { title: "Автентифікація", desc: "Увійдіть, щоб керувати звітами" },
      evidence: { title: "Докази", desc: "Додавайте PDF-доказ до кожного звіту" },
      details: { title: "Деталі", desc: "Зберіть дані автора і закладу" },
      dashboard: { title: "Панель", desc: "Переглядайте звіти в адмін-панелі" },
    },
    regulations: {
      title: "Поточні регуляції",
      description:
        "Переглядайте актуальні настанови та документи, пов’язані зі звітністю про заклади.",
      primary: {
        name: "Інструкції подання",
        desc: "Як підготувати та подати звіт належним чином.",
      },
      secondary: {
        name: "Політика даних",
        desc: "Як ми зберігаємо та захищаємо надані докази.",
      },
      tertiary: {
        name: "Процес перевірки",
        desc: "Що відбувається після отримання звіту.",
      },
    },
    footer: {
      title: "Платформа звітів про заклади",
      subtitle: "Конфіденційний канал для звітів та подальших дій",
    },
  },
}

export const isSupportedLocale = (value: string): value is SupportedLocale =>
  supportedLocales.includes(value as SupportedLocale)

