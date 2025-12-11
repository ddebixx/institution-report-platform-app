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
        footer: "Step {current} of {total} · PDF only, max 5MB recommended",
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
        validation: "Please fix the form errors before continuing.",
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
      title: "Złóż zgłoszenie",
      description: {
        step1: "Krok 1 z 2: Podaj dane instytucji i kontaktowe.",
        step2: "Krok 2 z 2: Przejrzyj PDF, zaznacz problemy i porównaj z regulacjami.",
      },
      steps: {
        details: "Szczegóły instytucji",
        review: "Przegląd dokumentu",
      },
      progress: {
        stepLabel: "Krok {current} z {total}: {label}",
        footer: "Krok {current} z {total} · Tylko PDF, maksymalnie 5MB zalecane",
      },
      footer: {
        authenticated: "Zalogowano jako {email}",
        loginRequired: "Zaloguj się, aby włączyć wysyłanie",
      },
      actions: {
        continue: "Przejdź do przeglądu dokumentu",
        submit: "Wyślij zgłoszenie",
        loginRequired: "Wymagane logowanie",
        back: "Wróć do szczegółów",
      },
      fields: {
        reporterName: { label: "Imię i nazwisko zgłaszającego", placeholder: "Jan Kowalski" },
        reporterEmail: { label: "Email zgłaszającego", placeholder: "jan.kowalski@example.com" },
        institutionName: {
          label: "Nazwa instytucji",
          placeholder: "Uniwersytet Warszawski",
          helper: "Opcjonalnie: Dodaj wyświetlaną nazwę instytucji.",
        },
        institutionSearch: {
          placeholder: "Wyszukaj instytucję po nazwie lub ID",
          helper: "Wprowadź co najmniej 5 znaków, aby zobaczyć pasujące instytucje.",
          status: {
            minChars: "Wpisz co najmniej {count} znaków, aby wyszukać.",
            loading: "Wyszukiwanie instytucji...",
            empty: "Brak instytucji pasujących do wyszukiwania.",
            error: "Nie można załadować sugestii instytucji.",
            idle: "",
          },
        },
        numerRspo: { label: "ID instytucji / Numer RSPO", placeholder: "123456" },
        reportDescription: {
          label: "Opis zgłoszenia",
          placeholder: "Podaj krótkie podsumowanie problemu.",
        },
      },
      success: {
        title: "Zgłoszenie wysłane",
        description: "ID zgłoszenia: {id}",
      },
      errors: {
        login: "Zaloguj się przed wysłaniem zgłoszenia.",
        pdfRequired: "Wymagany jest plik PDF.",
        submit: "Nie można wysłać zgłoszenia",
        validation: "Proszę poprawić błędy w formularzu przed kontynuowaniem.",
      },
      validation: {
        reporterName: "Imię i nazwisko zgłaszającego jest wymagane",
        reporterEmail: "Wymagany jest prawidłowy email",
        findingDetail: "Szczegół zaznaczenia jest wymagany",
      },
      regulations: {
        primary: {
          title: "Główna regulacja",
          description: "Sprawdź, czy dokument spełnia główne standardy akredytacji.",
        },
        secondary: {
          title: "Bezpieczeństwo i zgodność",
          description: "Zweryfikuj udokumentowane zabezpieczenia i wymagania zgodności.",
        },
        tertiary: {
          title: "Jakość i raportowanie",
          description: "Potwierdź formaty raportowania, ślady audytu i metryki jakości.",
        },
      },
      compare: {
        upload: {
          title: "Prześlij i podgląd",
          placeholder: "Wybierz plik PDF do przeglądu",
          helper: "Wyświetl przesłany dokument bezpośrednio i potwierdź, że pasuje do zgłoszonych problemów.",
          replace: "Zastąp PDF",
          cta: "Prześlij PDF",
          uploadedTitle: "Przesłany PDF",
          empty: "Prześlij PDF, aby zobaczyć podgląd tutaj i zacząć zaznaczać ustalenia.",
        },
        reference: {
          title: "Regulacja referencyjna",
          open: "Otwórz w nowej karcie",
        },
        regulations: {
          title: "Aktualne regulacje",
          description: "Sprawdź dokument pod kątem tych referencji i połącz ustalenia tam, gdzie dotyczy.",
        },
        highlights: {
          title: "Zaznaczenia dla moderatorów",
          description: "Zapisz konkretne sekcje, odchylenia lub błędy, aby pomóc w przeglądzie moderatora.",
          pagePlaceholder: "Strona lub sekcja",
          regulationPlaceholder: "Link do regulacji (opcjonalnie)",
          detailPlaceholder: "Opisz problem, niespójność lub zaznaczenie dla moderatorów.",
          add: "Dodaj zaznaczenie",
          empty: "Brak dodanych zaznaczeń. Dodaj notatki, aby pomóc moderatorom skupić się na właściwych obszarach.",
          pageLabel: "Strona/sekcja: {page}",
          regulationLabel: "Regulacja: {regulation}",
          remove: "Usuń",
        },
        comparison: {
          title: "Notatki porównawcze",
          placeholder: "Podsumuj, jak dokument jest zgodny z aktualnymi regulacjami i wymień pozostałe obawy.",
          description: "Te notatki są wysyłane do moderatorów wraz z Twoimi zaznaczeniami i PDF.",
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
      title: "Надіслати звіт",
      description: {
        step1: "Крок 1 з 2: Надайте дані про заклад та контактну інформацію.",
        step2: "Крок 2 з 2: Перегляньте PDF, виділіть проблеми та порівняйте з регуляціями.",
      },
      steps: {
        details: "Деталі закладу",
        review: "Перегляд документа",
      },
      progress: {
        stepLabel: "Крок {current} з {total}: {label}",
        footer: "Крок {current} з {total} · Тільки PDF, максимум 5MB рекомендовано",
      },
      footer: {
        authenticated: "Автентифіковано як {email}",
        loginRequired: "Будь ласка, увійдіть, щоб увімкнути надсилання",
      },
      actions: {
        continue: "Перейти до перегляду документа",
        submit: "Надіслати звіт",
        loginRequired: "Потрібен вхід",
        back: "Повернутися до деталей",
      },
      fields: {
        reporterName: { label: "Ім'я та прізвище автора", placeholder: "Іван Петренко" },
        reporterEmail: { label: "Email автора", placeholder: "ivan.petrenko@example.com" },
        institutionName: {
          label: "Назва закладу",
          placeholder: "Київський університет",
          helper: "За бажанням: Додайте відображувану назву закладу.",
        },
        institutionSearch: {
          placeholder: "Пошук закладу за назвою або ID",
          helper: "Введіть принаймні 5 символів, щоб побачити відповідні заклади.",
          status: {
            minChars: "Введіть принаймні {count} символів для пошуку.",
            loading: "Пошук закладів...",
            empty: "Жоден заклад не відповідає цьому пошуку.",
            error: "Неможливо завантажити пропозиції закладів.",
            idle: "",
          },
        },
        numerRspo: { label: "ID закладу / Номер RSPO", placeholder: "123456" },
        reportDescription: {
          label: "Опис звіту",
          placeholder: "Надайте короткий опис проблеми.",
        },
      },
      success: {
        title: "Звіт надіслано",
        description: "ID звіту: {id}",
      },
      errors: {
        login: "Будь ласка, увійдіть перед надсиланням звіту.",
        pdfRequired: "Потрібен файл PDF.",
        submit: "Неможливо надіслати звіт",
        validation: "Будь ласка, виправте помилки у формі перед продовженням.",
      },
      validation: {
        reporterName: "Ім'я та прізвище автора обов'язкові",
        reporterEmail: "Потрібна дійсна електронна пошта",
        findingDetail: "Деталь виділення обов'язкова",
      },
      regulations: {
        primary: {
          title: "Основна регуляція",
          description: "Перевірте, чи документ відповідає основним стандартам акредитації.",
        },
        secondary: {
          title: "Безпека та відповідність",
          description: "Перевірте задокументовані заходи безпеки та вимоги відповідності.",
        },
        tertiary: {
          title: "Якість та звітність",
          description: "Підтвердіть формати звітності, аудиторські сліди та метрики якості.",
        },
      },
      compare: {
        upload: {
          title: "Завантажити та перегляд",
          placeholder: "Виберіть файл PDF для перегляду",
          helper: "Перегляньте завантажений документ безпосередньо та підтвердіть, що він відповідає повідомленим проблемам.",
          replace: "Замінити PDF",
          cta: "Завантажити PDF",
          uploadedTitle: "Завантажений PDF",
          empty: "Завантажте PDF, щоб переглянути його тут і почати виділяти знахідки.",
        },
        reference: {
          title: "Референтна регуляція",
          open: "Відкрити в новій вкладці",
        },
        regulations: {
          title: "Поточні регуляції",
          description: "Перевірте документ на відповідність цим посиланням та пов'яжіть знахідки там, де це застосовно.",
        },
        highlights: {
          title: "Виділення для модераторів",
          description: "Зафіксуйте конкретні розділи, відхилення або помилки для керівництва переглядом модератора.",
          pagePlaceholder: "Сторінка або розділ",
          regulationPlaceholder: "Посилання на регуляцію (за бажанням)",
          detailPlaceholder: "Опишіть проблему, неузгодженість або виділення для модераторів.",
          add: "Додати виділення",
          empty: "Поки що немає доданих виділень. Додайте нотатки, щоб допомогти модераторам зосередитися на правильних областях.",
          pageLabel: "Сторінка/розділ: {page}",
          regulationLabel: "Регуляція: {regulation}",
          remove: "Видалити",
        },
        comparison: {
          title: "Порівняльні нотатки",
          placeholder: "Підсумуйте, як документ відповідає поточним регуляціям, та перелічіть залишкові проблеми.",
          description: "Ці нотатки надсилаються модераторам разом з вашими виділеннями та PDF.",
        },
      },
    },
  },
}

export const isSupportedLocale = (value: string): value is SupportedLocale =>
  supportedLocales.includes(value as SupportedLocale)

