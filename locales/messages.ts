export const supportedLocales = ["en", "pl", "uk"] as const

export type SupportedLocale = (typeof supportedLocales)[number]

export const defaultLocale: SupportedLocale = "pl"

type Messages = Record<string, {}>

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
    reportModal: {
      title: "Submit a report",
      description: {
        step1: "Step 1 of 2: Provide institution and contact details.",
        step2: "Step 2 of 2: Review the PDF, highlight issues, and compare regulations.",
      },
      steps: {
        details: "Institution details",
        review: "Document review",
      },
      progress: {
        stepLabel: "Step {current} of {total}: {label}",
        footer: "Step {current} of {total} · PDF only, max 10MB recommended",
      },
      footer: {
        authenticated: "Authenticated as {email}",
        loginRequired: "Please log in to enable submission",
      },
      actions: {
        continue: "Continue to document review",
        submit: "Submit report",
        loginRequired: "Login required",
        back: "Back to details",
      },
      fields: {
        reporterName: { label: "Reporter name", placeholder: "Jane Doe" },
        reporterEmail: { label: "Reporter email", placeholder: "jane.doe@example.com" },
        institutionName: {
          label: "Institution name",
          placeholder: "Springfield University",
          helper: "Optional: Add the institution display name.",
        },
        institutionSearch: {
          placeholder: "Search for an institution by name or ID",
          helper: "Provide at least 5 characters to see matching institutions.",
          status: {
            minChars: "Type at least {count} characters to search.",
            loading: "Searching institutions...",
            empty: "No institutions match this search.",
            error: "Unable to load institution suggestions.",
            idle: "",
          },
        },
        numerRspo: { label: "Institution ID / Numer RSPO", placeholder: "123456" },
        reportDescription: {
          label: "Report description",
          placeholder: "Provide a short summary of the issue.",
        },
      },
      success: {
        title: "Report submitted",
        description: "Report ID: {id}",
      },
      errors: {
        login: "Please login before submitting a report.",
        pdfRequired: "A PDF file is required.",
        submit: "Unable to submit report",
      },
      validation: {
        reporterName: "Reporter name is required",
        reporterEmail: "Valid email is required",
        findingDetail: "Highlight detail is required",
      },
      regulations: {
        primary: {
          title: "Primary regulation",
          description: "Check if the document follows the main accreditation standards.",
        },
        secondary: {
          title: "Safety and compliance",
          description: "Verify documented safeguards and compliance requirements.",
        },
        tertiary: {
          title: "Quality and reporting",
          description: "Confirm reporting formats, audit trails, and quality metrics.",
        },
      },
      compare: {
        upload: {
          title: "Upload and preview",
          placeholder: "Choose a PDF file to review",
          helper: "View the uploaded document directly and confirm it matches the reported issues.",
          replace: "Replace PDF",
          cta: "Upload PDF",
          uploadedTitle: "Uploaded PDF",
          empty: "Upload a PDF to preview it here and to start highlighting findings.",
        },
        reference: {
          title: "Reference regulation",
          open: "Open in new tab",
        },
        regulations: {
          title: "Current regulations",
          description: "Cross-check the document against these references and link findings where applicable.",
        },
        highlights: {
          title: "Highlights for moderators",
          description: "Capture specific sections, deviations, or errors to guide moderator review.",
          pagePlaceholder: "Page or section",
          regulationPlaceholder: "Link to regulation (optional)",
          detailPlaceholder: "Describe the issue, inconsistency, or highlight for moderators.",
          add: "Add highlight",
          empty: "No highlights added yet. Add notes to help moderators focus on the right areas.",
          pageLabel: "Page/section: {page}",
          regulationLabel: "Regulation: {regulation}",
          remove: "Remove",
        },
        comparison: {
          title: "Comparison notes",
          placeholder: "Summarize how the document aligns with current regulations and list remaining concerns.",
          description: "These notes are sent to moderators along with your highlights and the PDF.",
        },
      },
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
    reportModal: {
      title: "Submit a report",
      description: {
        step1: "Step 1 of 2: Provide institution and contact details.",
        step2: "Step 2 of 2: Review the PDF, highlight issues, and compare regulations.",
      },
      steps: {
        details: "Institution details",
        review: "Document review",
      },
      progress: {
        stepLabel: "Step {current} of {total}: {label}",
        footer: "Step {current} of {total} · PDF only, max 10MB recommended",
      },
      footer: {
        authenticated: "Authenticated as {email}",
        loginRequired: "Please log in to enable submission",
      },
      actions: {
        continue: "Continue to document review",
        submit: "Submit report",
        loginRequired: "Login required",
        back: "Back to details",
      },
      fields: {
        reporterName: { label: "Reporter name", placeholder: "Jane Doe" },
        reporterEmail: { label: "Reporter email", placeholder: "jane.doe@example.com" },
        institutionName: {
          label: "Institution name",
          placeholder: "Springfield University",
          helper: "Optional: Add the institution display name.",
        },
        institutionSearch: {
          placeholder: "Search for an institution by name or ID",
          helper: "Provide at least 5 characters to see matching institutions.",
          status: {
            minChars: "Type at least {count} characters to search.",
            loading: "Searching institutions...",
            empty: "No institutions match this search.",
            error: "Unable to load institution suggestions.",
            idle: "",
          },
        },
        numerRspo: { label: "Institution ID / Numer RSPO", placeholder: "123456" },
        reportDescription: {
          label: "Report description",
          placeholder: "Provide a short summary of the issue.",
        },
      },
      success: {
        title: "Report submitted",
        description: "Report ID: {id}",
      },
      errors: {
        login: "Please login before submitting a report.",
        pdfRequired: "A PDF file is required.",
        submit: "Unable to submit report",
      },
      validation: {
        reporterName: "Reporter name is required",
        reporterEmail: "Valid email is required",
        findingDetail: "Highlight detail is required",
      },
      regulations: {
        primary: {
          title: "Primary regulation",
          description: "Check if the document follows the main accreditation standards.",
        },
        secondary: {
          title: "Safety and compliance",
          description: "Verify documented safeguards and compliance requirements.",
        },
        tertiary: {
          title: "Quality and reporting",
          description: "Confirm reporting formats, audit trails, and quality metrics.",
        },
      },
      compare: {
        upload: {
          title: "Upload and preview",
          placeholder: "Choose a PDF file to review",
          helper: "View the uploaded document directly and confirm it matches the reported issues.",
          replace: "Replace PDF",
          cta: "Upload PDF",
          uploadedTitle: "Uploaded PDF",
          empty: "Upload a PDF to preview it here and to start highlighting findings.",
        },
        reference: {
          title: "Reference regulation",
          open: "Open in new tab",
        },
        regulations: {
          title: "Current regulations",
          description: "Cross-check the document against these references and link findings where applicable.",
        },
        highlights: {
          title: "Highlights for moderators",
          description: "Capture specific sections, deviations, or errors to guide moderator review.",
          pagePlaceholder: "Page or section",
          regulationPlaceholder: "Link to regulation (optional)",
          detailPlaceholder: "Describe the issue, inconsistency, or highlight for moderators.",
          add: "Add highlight",
          empty: "No highlights added yet. Add notes to help moderators focus on the right areas.",
          pageLabel: "Page/section: {page}",
          regulationLabel: "Regulation: {regulation}",
          remove: "Remove",
        },
        comparison: {
          title: "Comparison notes",
          placeholder: "Summarize how the document aligns with current regulations and list remaining concerns.",
          description: "These notes are sent to moderators along with your highlights and the PDF.",
        },
      },
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
    reportModal: {
      title: "Submit a report",
      description: {
        step1: "Step 1 of 2: Provide institution and contact details.",
        step2: "Step 2 of 2: Review the PDF, highlight issues, and compare regulations.",
      },
      steps: {
        details: "Institution details",
        review: "Document review",
      },
      progress: {
        stepLabel: "Step {current} of {total}: {label}",
        footer: "Step {current} of {total} · PDF only, max 10MB recommended",
      },
      footer: {
        authenticated: "Authenticated as {email}",
        loginRequired: "Please log in to enable submission",
      },
      actions: {
        continue: "Continue to document review",
        submit: "Submit report",
        loginRequired: "Login required",
        back: "Back to details",
      },
      fields: {
        reporterName: { label: "Reporter name", placeholder: "Jane Doe" },
        reporterEmail: { label: "Reporter email", placeholder: "jane.doe@example.com" },
        institutionName: {
          label: "Institution name",
          placeholder: "Springfield University",
          helper: "Optional: Add the institution display name.",
        },
        institutionSearch: {
          placeholder: "Search for an institution by name or ID",
          helper: "Provide at least 5 characters to see matching institutions.",
          status: {
            minChars: "Type at least {count} characters to search.",
            loading: "Searching institutions...",
            empty: "No institutions match this search.",
            error: "Unable to load institution suggestions.",
            idle: "",
          },
        },
        numerRspo: { label: "Institution ID / Numer RSPO", placeholder: "123456" },
        reportDescription: {
          label: "Report description",
          placeholder: "Provide a short summary of the issue.",
        },
      },
      success: {
        title: "Report submitted",
        description: "Report ID: {id}",
      },
      errors: {
        login: "Please login before submitting a report.",
        pdfRequired: "A PDF file is required.",
        submit: "Unable to submit report",
      },
      validation: {
        reporterName: "Reporter name is required",
        reporterEmail: "Valid email is required",
        findingDetail: "Highlight detail is required",
      },
      regulations: {
        primary: {
          title: "Primary regulation",
          description: "Check if the document follows the main accreditation standards.",
        },
        secondary: {
          title: "Safety and compliance",
          description: "Verify documented safeguards and compliance requirements.",
        },
        tertiary: {
          title: "Quality and reporting",
          description: "Confirm reporting formats, audit trails, and quality metrics.",
        },
      },
      compare: {
        upload: {
          title: "Upload and preview",
          placeholder: "Choose a PDF file to review",
          helper: "View the uploaded document directly and confirm it matches the reported issues.",
          replace: "Replace PDF",
          cta: "Upload PDF",
          uploadedTitle: "Uploaded PDF",
          empty: "Upload a PDF to preview it here and to start highlighting findings.",
        },
        reference: {
          title: "Reference regulation",
          open: "Open in new tab",
        },
        regulations: {
          title: "Current regulations",
          description: "Cross-check the document against these references and link findings where applicable.",
        },
        highlights: {
          title: "Highlights for moderators",
          description: "Capture specific sections, deviations, or errors to guide moderator review.",
          pagePlaceholder: "Page or section",
          regulationPlaceholder: "Link to regulation (optional)",
          detailPlaceholder: "Describe the issue, inconsistency, or highlight for moderators.",
          add: "Add highlight",
          empty: "No highlights added yet. Add notes to help moderators focus on the right areas.",
          pageLabel: "Page/section: {page}",
          regulationLabel: "Regulation: {regulation}",
          remove: "Remove",
        },
        comparison: {
          title: "Comparison notes",
          placeholder: "Summarize how the document aligns with current regulations and list remaining concerns.",
          description: "These notes are sent to moderators along with your highlights and the PDF.",
        },
      },
    },
  },
}

export const isSupportedLocale = (value: string): value is SupportedLocale =>
  supportedLocales.includes(value as SupportedLocale)

