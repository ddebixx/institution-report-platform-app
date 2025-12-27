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
    features: {
      title: "Powerful Features",
      subtitle: "Everything you need to report and manage institutional issues",
      secure: {
        title: "Secure & Confidential",
        desc: "End-to-end encryption ensures your reports remain private and protected throughout the entire process.",
      },
      pdf: {
        title: "PDF Document Analysis",
        desc: "Upload PDF evidence, preview documents, and highlight specific findings with page-level precision.",
      },
      regulations: {
        title: "Regulation Compliance",
        desc: "Compare documents against current regulations and link findings to specific compliance requirements.",
      },
      tracking: {
        title: "Real-time Tracking",
        desc: "Monitor your report status from submission through review to resolution with live updates.",
      },
      moderation: {
        title: "Expert Moderation",
        desc: "Experienced administrators review each report with detailed findings and comparison notes.",
      },
      dashboard: {
        title: "Admin Dashboard",
        desc: "Comprehensive dashboard for moderators to manage, assign, and review reports efficiently.",
      },
    },
    howItWorks: {
      title: "How It Works",
      subtitle: "Simple, secure, and efficient reporting process",
      step1: {
        title: "Submit Your Report",
        desc: "Fill in institution details, upload PDF evidence, and provide a clear description of the issue.",
      },
      step2: {
        title: "Document Review",
        desc: "Preview your PDF, highlight specific findings, and compare against current regulations.",
      },
      step3: {
        title: "Moderator Review",
        desc: "Expert moderators review your submission, analyze findings, and verify compliance.",
      },
      step4: {
        title: "Resolution",
        desc: "Receive updates on your report status and follow up on any actions taken.",
      },
    },
    benefits: {
      title: "Why Choose Our Platform",
      subtitle: "Built for transparency, security, and efficiency",
      transparency: {
        title: "Full Transparency",
        desc: "Track every step of your report's journey from submission to resolution.",
      },
      security: {
        title: "Enterprise Security",
        desc: "Bank-level encryption and secure storage protect your sensitive information.",
      },
      efficiency: {
        title: "Streamlined Process",
        desc: "Intuitive interface and automated workflows reduce reporting time by 70%.",
      },
      compliance: {
        title: "Regulatory Compliance",
        desc: "Built-in compliance checks ensure all reports meet current regulatory standards.",
      },
    },
    stats: {
      title: "Trusted by Institutions",
      reportsSubmitted: "Reports Submitted",
      activeModerators: "Active Moderators",
      avgResponseTime: "Avg Response Time",
      complianceRate: "Compliance Rate",
    },
    footer: {
      title: "Institution Report Platform",
      subtitle: "Confidential channel for institution reports and follow-ups",
      quickLinks: {
        title: "Quick Links",
        features: "Features",
        howItWorks: "How It Works",
        benefits: "Benefits",
        regulations: "Regulations",
      },
      resources: {
        title: "Resources",
        documentation: "Documentation",
        guidelines: "Guidelines",
        support: "Support",
      },
      contact: {
        title: "Contact",
        email: "support@example.com",
      },
      legal: {
        copyright: "All rights reserved.",
        privacy: "Privacy Policy",
        terms: "Terms of Service",
      },
    },
    documentation: {
      title: "Documentation",
      subtitle: "Complete guide to using the Institution Report Platform",
      overview: {
        title: "Overview",
        description:
          "The Institution Report Platform provides a secure and confidential channel for reporting institutional issues. This documentation will help you understand how to use the platform effectively to submit reports, track their status, and ensure compliance with regulatory requirements.",
      },
      gettingStarted: {
        title: "Getting Started",
        step1: {
          title: "Create an Account",
          description:
            "To submit reports, you'll need to create an account. This allows you to track your submissions and receive updates on their status.",
        },
        step2: {
          title: "Prepare Your Documents",
          description:
            "Gather all relevant PDF documents that support your report. Ensure documents are clear, legible, and directly related to the issue you're reporting.",
        },
        step3: {
          title: "Submit Your Report",
          description:
            "Use the report submission form to provide institution details, upload your PDF evidence, and highlight specific findings. Our system will guide you through each step.",
        },
      },
      features: {
        title: "Key Features",
        secure: {
          title: "Secure Submission",
          description:
            "All reports are encrypted and stored securely. Your information is protected with bank-level security measures.",
        },
        upload: {
          title: "PDF Upload & Preview",
          description:
            "Upload PDF documents and preview them directly in the platform. Highlight specific pages and sections for moderator review.",
        },
        search: {
          title: "Institution Search",
          description:
            "Search for institutions by name or RSPO number. The system will automatically fill in institution details when you select a match.",
        },
        tracking: {
          title: "Status Tracking",
          description:
            "Monitor your report's progress from submission through review to resolution. Receive notifications when your report status changes.",
        },
      },
      bestPractices: {
        title: "Best Practices",
        item1: "Provide clear and detailed descriptions of the issues you're reporting",
        item2: "Ensure all PDF documents are relevant and clearly show the problem",
        item3: "Use the highlighting feature to point moderators to specific sections",
        item4: "Include comparison notes explaining how documents relate to current regulations",
      },
      faq: {
        title: "Frequently Asked Questions",
        q1: {
          question: "How long does it take to review a report?",
          answer:
            "Report review times vary depending on complexity and current workload. Most reports are reviewed within 5-7 business days. You'll receive updates as your report progresses through the review process.",
        },
        q2: {
          question: "Can I submit multiple reports?",
          answer:
            "Yes, you can submit multiple reports. Each report is tracked independently, and you can view all your submissions in your dashboard.",
        },
        q3: {
          question: "What file formats are supported?",
          answer:
            "Currently, we only support PDF files. Please ensure your documents are in PDF format and do not exceed 5MB in size for optimal performance.",
        },
      },
    },
    guidelines: {
      title: "Reporting Guidelines",
      subtitle: "Essential guidelines for preparing and submitting effective reports",
      preparation: {
        title: "Preparing Your Report",
        document: {
          title: "Document Preparation",
          description: "Before submitting your report, ensure your documents meet these requirements:",
          item1: "Documents must be in PDF format",
          item2: "Files should be clear, legible, and properly scanned",
          item3: "Maximum file size of 5MB recommended for optimal performance",
        },
        content: {
          title: "Content Requirements",
          description: "Your report should include:",
          item1: "Complete institution information (name and RSPO number)",
          item2: "Clear description of the issue or concern",
          item3: "Specific findings with page references where applicable",
        },
      },
      submission: {
        title: "Submission Process",
        step1: {
          title: "Step 1: Institution Details",
          description:
            "Provide the institution name and RSPO number. You can search for institutions using the search feature, or enter the information manually.",
        },
        step2: {
          title: "Step 2: Document Review",
          description:
            "Upload your PDF document and use the highlighting feature to mark specific sections, pages, or findings that are relevant to your report.",
        },
        step3: {
          title: "Step 3: Comparison Notes",
          description:
            "Add comparison notes explaining how the document relates to current regulations and any compliance concerns you've identified.",
        },
      },
      requirements: {
        title: "Important Requirements",
        important: "Please ensure compliance with the following:",
        item1: "All information provided must be accurate and truthful",
        item2: "Documents must be authentic and directly related to the reported issue",
        item3: "Reports should be submitted in good faith and for legitimate purposes",
        item4: "Personal information of third parties should be handled in accordance with privacy regulations",
      },
      compliance: {
        title: "Regulatory Compliance",
        description:
          "All reports are reviewed against current regulatory standards. Our moderators compare submitted documents with applicable regulations to ensure compliance and identify any discrepancies.",
      },
    },
    support: {
      title: "Support",
      subtitle: "Get help and find answers to your questions",
      contact: {
        title: "Contact Us",
        email: {
          title: "Email Support",
          description: "For questions, technical issues, or general inquiries, please contact us at:",
          address: "support@example.com",
        },
        hours: {
          title: "Support Hours",
          description: "Our support team is available Monday through Friday, 9:00 AM to 5:00 PM (CET).",
        },
      },
      commonIssues: {
        title: "Common Issues",
        issue1: {
          question: "I can't upload my PDF file",
          answer:
            "Ensure your file is in PDF format and under 5MB. If the issue persists, try using a different browser or clearing your browser cache.",
        },
        issue2: {
          question: "How do I track my report status?",
          answer:
            "Once logged in, you can view all your submitted reports in your dashboard. Each report shows its current status and any updates from moderators.",
        },
        issue3: {
          question: "I forgot my password",
          answer:
            "Use the password reset feature on the login page. You'll receive an email with instructions to reset your password.",
        },
      },
      resources: {
        title: "Additional Resources",
        documentation: {
          title: "Documentation",
          description: "Comprehensive guides and tutorials for using the platform",
        },
        guidelines: {
          title: "Guidelines",
          description: "Detailed guidelines for preparing and submitting reports",
        },
      },
      additionalHelp: {
        title: "Need More Help?",
        description:
          "If you can't find the answer you're looking for, please don't hesitate to contact our support team. We're here to help you use the platform effectively.",
      },
    },
    privacy: {
      title: "Privacy Policy",
      subtitle: "How we collect, use, and protect your personal information",
      lastUpdated: "Last updated: January 2024",
      introduction: {
        title: "Introduction",
        content:
          "We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Institution Report Platform.",
      },
      dataCollection: {
        title: "Information We Collect",
        description: "We collect information that you provide directly to us, including:",
        item1: "Account information (name, email address, password)",
        item2: "Report information (institution details, descriptions, uploaded documents)",
        item3: "Communication data (messages sent through the platform)",
        item4: "Usage data (how you interact with the platform)",
      },
      dataUsage: {
        title: "How We Use Your Information",
        description: "We use the information we collect to:",
        item1: "Process and review your reports",
        item2: "Communicate with you about your reports and account",
        item3: "Improve our services and platform functionality",
      },
      dataSecurity: {
        title: "Data Security",
        description:
          "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. All data is encrypted in transit and at rest using industry-standard encryption methods.",
      },
      dataRetention: {
        title: "Data Retention",
        description:
          "We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.",
      },
      yourRights: {
        title: "Your Rights",
        description: "You have the right to:",
        item1: "Access your personal information",
        item2: "Correct inaccurate or incomplete information",
        item3: "Request deletion of your personal information",
        item4: "Object to or restrict processing of your information",
      },
      contact: {
        title: "Contact Us",
        description: "If you have questions about this Privacy Policy, please contact us at:",
        email: "privacy@example.com",
      },
    },
    terms: {
      title: "Terms of Service",
      subtitle: "Terms and conditions for using the Institution Report Platform",
      lastUpdated: "Last updated: January 2024",
      acceptance: {
        title: "Acceptance of Terms",
        content:
          "By accessing and using the Institution Report Platform, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, you should not use this platform.",
      },
      useOfService: {
        title: "Use of Service",
        description: "You agree to use the platform only for lawful purposes and in accordance with these Terms. You agree not to:",
        item1: "Submit false, misleading, or fraudulent information",
        item2: "Violate any applicable laws or regulations",
        item3: "Infringe upon the rights of others",
        item4: "Interfere with or disrupt the platform's operation",
      },
      userAccounts: {
        title: "User Accounts",
        description: "When you create an account, you agree to:",
        item1: "Provide accurate and complete information",
        item2: "Maintain the security of your account credentials",
        item3: "Notify us immediately of any unauthorized use of your account",
      },
      reportSubmission: {
        title: "Report Submission",
        description: "By submitting a report, you acknowledge that:",
        item1: "All information provided is accurate to the best of your knowledge",
        item2: "You have the right to submit the documents and information provided",
        item3: "The submission is made in good faith and for legitimate purposes",
      },
      intellectualProperty: {
        title: "Intellectual Property",
        content:
          "All content, features, and functionality of the platform are owned by us and are protected by international copyright, trademark, and other intellectual property laws.",
      },
      limitationOfLiability: {
        title: "Limitation of Liability",
        content:
          "To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the platform.",
      },
      modifications: {
        title: "Modifications to Terms",
        content:
          "We reserve the right to modify these Terms at any time. We will notify users of any material changes by posting the new Terms on this page and updating the 'Last updated' date.",
      },
      contact: {
        title: "Contact Us",
        description: "If you have questions about these Terms of Service, please contact us at:",
        email: "legal@example.com",
      },
    },
    admin: {
      title: "Moderator Dashboard",
      subtitle: "Manage and review reports assigned to you",
      loading: "Loading...",
      loadingReports: "Loading reports...",
    },
    moderatorDashboard: {
      stats: {
        total: "Total Reports",
      },
      tabs: {
        available: "Available",
        assigned: "Assigned",
        completed: "Completed",
      },
    },
    reportPreviewModal: {
      title: "Report Preview",
      description: "Review report details before assigning",
      close: "Close",
      unassign: "Unassign",
      unassigning: "Unassigning...",
      assignToMe: "Assign to Me",
      assigning: "Assigning...",
      unnamedInstitution: "Unnamed Institution",
      rspoNumber: "RSPO Number: {number}",
      reporterInformation: "Reporter Information",
      reporterName: "Reporter Name",
      emailAddress: "Email Address",
      timeline: "Timeline",
      created: "Created",
      assigned: "Assigned",
      completed: "Completed",
      submittedReportContent: "Submitted Report Content",
      findings: "Findings ({count})",
      page: "Page: {page}",
      regulation: "Regulation: {regulation}",
      comparisonNotes: "Comparison Notes",
      submittedDocument: "Submitted Document",
      noPdfAvailable: "No PDF document available",
      referenceRegulation: "Reference Regulation",
      openInNewTab: "Open in new tab",
    },
    reportReviewModal: {
      title: "Review Report",
      description: "Add findings and comparison notes for this report",
      cancel: "Cancel",
      saveReview: "Save Review",
      saving: "Saving...",
      successMessage: "Report review saved successfully",
      errorMessage: "Failed to save report review",
      unnamedInstitution: "Unnamed Institution",
      rspoNumber: "RSPO Number: {number}",
      reporterInformation: "Reporter Information",
      reporterName: "Reporter Name",
      emailAddress: "Email Address",
      timeline: "Timeline",
      created: "Created",
      assigned: "Assigned",
      submittedReportContent: "Submitted Report Content",
      findings: "Findings ({count})",
      page: "Page: {page}",
      regulation: "Regulation: {regulation}",
      comparisonNotes: "Comparison Notes",
      submittedDocument: "Submitted Document",
      noPdfAvailable: "No PDF document available",
      referenceRegulation: "Reference Regulation",
      openInNewTab: "Open in new tab",
      reviewAndFindings: "Review & Findings",
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
        numerRspo: { 
          label: "Institution ID / Numer RSPO", 
          placeholder: "123456",
          description: "This field is automatically filled when you select an institution from the search above."
        },
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
        institutionName: "Institution name is required",
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
    features: {
      title: "Potężne funkcje",
      subtitle: "Wszystko czego potrzebujesz do zgłaszania i zarządzania problemami instytucjonalnymi",
      secure: {
        title: "Bezpieczne i poufne",
        desc: "Szyfrowanie end-to-end zapewnia, że Twoje zgłoszenia pozostają prywatne i chronione przez cały proces.",
      },
      pdf: {
        title: "Analiza dokumentów PDF",
        desc: "Prześlij dowody PDF, podglądaj dokumenty i zaznaczaj konkretne ustalenia z precyzją na poziomie strony.",
      },
      regulations: {
        title: "Zgodność z regulacjami",
        desc: "Porównuj dokumenty z aktualnymi regulacjami i łącz ustalenia z konkretnymi wymaganiami zgodności.",
      },
      tracking: {
        title: "Śledzenie w czasie rzeczywistym",
        desc: "Monitoruj status swojego zgłoszenia od przesłania przez przegląd do rozwiązania z aktualizacjami na żywo.",
      },
      moderation: {
        title: "Ekspercka moderacja",
        desc: "Doświadczeni administratorzy przeglądają każde zgłoszenie z szczegółowymi ustaleniami i notatkami porównawczymi.",
      },
      dashboard: {
        title: "Panel administratora",
        desc: "Kompleksowy panel dla moderatorów do zarządzania, przypisywania i przeglądania zgłoszeń efektywnie.",
      },
    },
    howItWorks: {
      title: "Jak to działa",
      subtitle: "Prosty, bezpieczny i efektywny proces zgłaszania",
      step1: {
        title: "Prześlij swoje zgłoszenie",
        desc: "Wypełnij dane instytucji, prześlij dowody PDF i podaj jasny opis problemu.",
      },
      step2: {
        title: "Przegląd dokumentu",
        desc: "Podglądaj swój PDF, zaznaczaj konkretne ustalenia i porównuj z aktualnymi regulacjami.",
      },
      step3: {
        title: "Przegląd moderatora",
        desc: "Eksperccy moderatorzy przeglądają Twoje zgłoszenie, analizują ustalenia i weryfikują zgodność.",
      },
      step4: {
        title: "Rozwiązanie",
        desc: "Otrzymuj aktualizacje dotyczące statusu swojego zgłoszenia i śledź podjęte działania.",
      },
    },
    benefits: {
      title: "Dlaczego wybrać naszą platformę",
      subtitle: "Zbudowana dla transparentności, bezpieczeństwa i efektywności",
      transparency: {
        title: "Pełna transparentność",
        desc: "Śledź każdy krok swojej zgłoszenia od przesłania do rozwiązania.",
      },
      security: {
        title: "Bezpieczeństwo na poziomie przedsiębiorstwa",
        desc: "Szyfrowanie na poziomie bankowym i bezpieczne przechowywanie chronią Twoje wrażliwe informacje.",
      },
      efficiency: {
        title: "Usprawniony proces",
        desc: "Intuicyjny interfejs i zautomatyzowane przepływy pracy skracają czas zgłaszania o 70%.",
      },
      compliance: {
        title: "Zgodność regulacyjna",
        desc: "Wbudowane kontrole zgodności zapewniają, że wszystkie zgłoszenia spełniają aktualne standardy regulacyjne.",
      },
    },
    stats: {
      title: "Zaufane przez instytucje",
      reportsSubmitted: "Zgłoszeń przesłanych",
      activeModerators: "Aktywnych moderatorów",
      avgResponseTime: "Średni czas odpowiedzi",
      complianceRate: "Wskaźnik zgodności",
    },
    footer: {
      title: "Platforma zgłaszania instytucji",
      subtitle: "Poufny kanał zgłoszeń i dalszych działań",
      quickLinks: {
        title: "Szybkie linki",
        features: "Funkcje",
        howItWorks: "Jak to działa",
        benefits: "Korzyści",
        regulations: "Regulacje",
      },
      resources: {
        title: "Zasoby",
        documentation: "Dokumentacja",
        guidelines: "Wytyczne",
        support: "Wsparcie",
      },
      contact: {
        title: "Kontakt",
        email: "support@example.com",
      },
      legal: {
        copyright: "Wszelkie prawa zastrzeżone.",
        privacy: "Polityka prywatności",
        terms: "Warunki użytkowania",
      },
    },
    documentation: {
      title: "Dokumentacja",
      subtitle: "Kompletny przewodnik korzystania z Platformy zgłaszania instytucji",
      overview: {
        title: "Przegląd",
        description:
          "Platforma zgłaszania instytucji zapewnia bezpieczny i poufny kanał zgłaszania problemów instytucjonalnych. Ta dokumentacja pomoże Ci zrozumieć, jak skutecznie korzystać z platformy do przesyłania zgłoszeń, śledzenia ich statusu i zapewnienia zgodności z wymaganiami regulacyjnymi.",
      },
      gettingStarted: {
        title: "Rozpoczęcie pracy",
        step1: {
          title: "Utwórz konto",
          description:
            "Aby przesłać zgłoszenia, musisz utworzyć konto. To pozwala śledzić Twoje zgłoszenia i otrzymywać aktualizacje dotyczące ich statusu.",
        },
        step2: {
          title: "Przygotuj dokumenty",
          description:
            "Zbierz wszystkie istotne dokumenty PDF, które wspierają Twoje zgłoszenie. Upewnij się, że dokumenty są czytelne i bezpośrednio związane z problemem, który zgłaszasz.",
        },
        step3: {
          title: "Prześlij zgłoszenie",
          description:
            "Użyj formularza zgłoszenia, aby podać szczegóły instytucji, przesłać dowody PDF i zaznaczyć konkretne ustalenia. Nasz system poprowadzi Cię przez każdy krok.",
        },
      },
      features: {
        title: "Kluczowe funkcje",
        secure: {
          title: "Bezpieczne przesyłanie",
          description:
            "Wszystkie zgłoszenia są szyfrowane i bezpiecznie przechowywane. Twoje informacje są chronione środkami bezpieczeństwa na poziomie bankowym.",
        },
        upload: {
          title: "Przesyłanie i podgląd PDF",
          description:
            "Prześlij dokumenty PDF i podglądaj je bezpośrednio w platformie. Zaznacz konkretne strony i sekcje do przeglądu przez moderatorów.",
        },
        search: {
          title: "Wyszukiwanie instytucji",
          description:
            "Wyszukuj instytucje po nazwie lub numerze RSPO. System automatycznie wypełni szczegóły instytucji po wybraniu dopasowania.",
        },
        tracking: {
          title: "Śledzenie statusu",
          description:
            "Monitoruj postęp swojego zgłoszenia od przesłania przez przegląd do rozwiązania. Otrzymuj powiadomienia, gdy status Twojego zgłoszenia się zmienia.",
        },
      },
      bestPractices: {
        title: "Najlepsze praktyki",
        item1: "Podaj jasne i szczegółowe opisy problemów, które zgłaszasz",
        item2: "Upewnij się, że wszystkie dokumenty PDF są istotne i wyraźnie pokazują problem",
        item3: "Użyj funkcji zaznaczania, aby wskazać moderatorom konkretne sekcje",
        item4: "Dołącz notatki porównawcze wyjaśniające, jak dokumenty odnoszą się do aktualnych regulacji",
      },
      faq: {
        title: "Często zadawane pytania",
        q1: {
          question: "Ile czasu zajmuje przegląd zgłoszenia?",
          answer:
            "Czasy przeglądu zgłoszeń różnią się w zależności od złożoności i aktualnego obciążenia. Większość zgłoszeń jest przeglądana w ciągu 5-7 dni roboczych. Otrzymasz aktualizacje, gdy Twoje zgłoszenie przechodzi przez proces przeglądu.",
        },
        q2: {
          question: "Czy mogę przesłać wiele zgłoszeń?",
          answer:
            "Tak, możesz przesłać wiele zgłoszeń. Każde zgłoszenie jest śledzone niezależnie, a wszystkie swoje zgłoszenia możesz przeglądać w swoim panelu.",
        },
        q3: {
          question: "Jakie formaty plików są obsługiwane?",
          answer:
            "Obecnie obsługujemy tylko pliki PDF. Upewnij się, że Twoje dokumenty są w formacie PDF i nie przekraczają 5MB, aby zapewnić optymalną wydajność.",
        },
      },
    },
    guidelines: {
      title: "Wytyczne zgłoszeń",
      subtitle: "Niezbędne wytyczne dotyczące przygotowania i przesyłania skutecznych zgłoszeń",
      preparation: {
        title: "Przygotowanie zgłoszenia",
        document: {
          title: "Przygotowanie dokumentów",
          description: "Przed przesłaniem zgłoszenia upewnij się, że Twoje dokumenty spełniają te wymagania:",
          item1: "Dokumenty muszą być w formacie PDF",
          item2: "Pliki powinny być czytelne i prawidłowo zeskanowane",
          item3: "Zalecany maksymalny rozmiar pliku 5MB dla optymalnej wydajności",
        },
        content: {
          title: "Wymagania dotyczące treści",
          description: "Twoje zgłoszenie powinno zawierać:",
          item1: "Pełne informacje o instytucji (nazwa i numer RSPO)",
          item2: "Jasny opis problemu lub obawy",
          item3: "Konkretne ustalenia z odniesieniami do stron, jeśli dotyczy",
        },
      },
      submission: {
        title: "Proces przesyłania",
        step1: {
          title: "Krok 1: Szczegóły instytucji",
          description:
            "Podaj nazwę instytucji i numer RSPO. Możesz wyszukać instytucje za pomocą funkcji wyszukiwania lub wprowadzić informacje ręcznie.",
        },
        step2: {
          title: "Krok 2: Przegląd dokumentu",
          description:
            "Prześlij swój dokument PDF i użyj funkcji zaznaczania, aby oznaczyć konkretne sekcje, strony lub ustalenia, które są istotne dla Twojego zgłoszenia.",
        },
        step3: {
          title: "Krok 3: Notatki porównawcze",
          description:
            "Dodaj notatki porównawcze wyjaśniające, jak dokument odnosi się do aktualnych regulacji i wszelkich obaw dotyczących zgodności, które zidentyfikowałeś.",
        },
      },
      requirements: {
        title: "Ważne wymagania",
        important: "Proszę zapewnić zgodność z następującymi:",
        item1: "Wszystkie podane informacje muszą być dokładne i prawdziwe",
        item2: "Dokumenty muszą być autentyczne i bezpośrednio związane z zgłoszonym problemem",
        item3: "Zgłoszenia powinny być przesyłane w dobrej wierze i w uzasadnionych celach",
        item4: "Informacje osobowe osób trzecich powinny być przetwarzane zgodnie z przepisami o ochronie prywatności",
      },
      compliance: {
        title: "Zgodność regulacyjna",
        description:
          "Wszystkie zgłoszenia są przeglądane pod kątem aktualnych standardów regulacyjnych. Nasi moderatorzy porównują przesłane dokumenty z odpowiednimi regulacjami, aby zapewnić zgodność i zidentyfikować wszelkie rozbieżności.",
      },
    },
    support: {
      title: "Wsparcie",
      subtitle: "Uzyskaj pomoc i znajdź odpowiedzi na swoje pytania",
      contact: {
        title: "Skontaktuj się z nami",
        email: {
          title: "Wsparcie e-mail",
          description: "W przypadku pytań, problemów technicznych lub ogólnych zapytań, prosimy o kontakt:",
          address: "support@example.com",
        },
        hours: {
          title: "Godziny wsparcia",
          description: "Nasz zespół wsparcia jest dostępny od poniedziałku do piątku, od 9:00 do 17:00 (CET).",
        },
      },
      commonIssues: {
        title: "Typowe problemy",
        issue1: {
          question: "Nie mogę przesłać pliku PDF",
          answer:
            "Upewnij się, że Twój plik jest w formacie PDF i ma mniej niż 5MB. Jeśli problem nadal występuje, spróbuj użyć innej przeglądarki lub wyczyścić cache przeglądarki.",
        },
        issue2: {
          question: "Jak śledzić status mojego zgłoszenia?",
          answer:
            "Po zalogowaniu możesz przeglądać wszystkie przesłane zgłoszenia w swoim panelu. Każde zgłoszenie pokazuje swój aktualny status i wszelkie aktualizacje od moderatorów.",
        },
        issue3: {
          question: "Zapomniałem hasła",
          answer:
            "Użyj funkcji resetowania hasła na stronie logowania. Otrzymasz e-mail z instrukcjami resetowania hasła.",
        },
      },
      resources: {
        title: "Dodatkowe zasoby",
        documentation: {
          title: "Dokumentacja",
          description: "Kompleksowe przewodniki i samouczki dotyczące korzystania z platformy",
        },
        guidelines: {
          title: "Wytyczne",
          description: "Szczegółowe wytyczne dotyczące przygotowania i przesyłania zgłoszeń",
        },
      },
      additionalHelp: {
        title: "Potrzebujesz więcej pomocy?",
        description:
          "Jeśli nie możesz znaleźć odpowiedzi, której szukasz, nie wahaj się skontaktować z naszym zespołem wsparcia. Jesteśmy tutaj, aby pomóc Ci skutecznie korzystać z platformy.",
      },
    },
    privacy: {
      title: "Polityka prywatności",
      subtitle: "Jak zbieramy, wykorzystujemy i chronimy Twoje dane osobowe",
      lastUpdated: "Ostatnia aktualizacja: styczeń 2024",
      introduction: {
        title: "Wprowadzenie",
        content:
          "Jesteśmy zobowiązani do ochrony Twojej prywatności i zapewnienia bezpieczeństwa Twoich danych osobowych. Ta Polityka prywatności wyjaśnia, jak zbieramy, wykorzystujemy, ujawniamy i chronimy Twoje informacje podczas korzystania z naszej Platformy zgłaszania instytucji.",
      },
      dataCollection: {
        title: "Informacje, które zbieramy",
        description: "Zbieramy informacje, które podajesz nam bezpośrednio, w tym:",
        item1: "Informacje o koncie (imię, adres e-mail, hasło)",
        item2: "Informacje o zgłoszeniu (szczegóły instytucji, opisy, przesłane dokumenty)",
        item3: "Dane komunikacyjne (wiadomości wysyłane przez platformę)",
        item4: "Dane dotyczące korzystania (jak korzystasz z platformy)",
      },
      dataUsage: {
        title: "Jak wykorzystujemy Twoje informacje",
        description: "Wykorzystujemy zebrane informacje do:",
        item1: "Przetwarzania i przeglądania Twoich zgłoszeń",
        item2: "Komunikowania się z Tobą w sprawie Twoich zgłoszeń i konta",
        item3: "Ulepszania naszych usług i funkcjonalności platformy",
      },
      dataSecurity: {
        title: "Bezpieczeństwo danych",
        description:
          "Wdrażamy odpowiednie środki techniczne i organizacyjne w celu ochrony Twoich danych osobowych przed nieautoryzowanym dostępem, zmianą, ujawnieniem lub zniszczeniem. Wszystkie dane są szyfrowane podczas przesyłania i przechowywania przy użyciu standardowych metod szyfrowania.",
      },
      dataRetention: {
        title: "Przechowywanie danych",
        description:
          "Przechowujemy Twoje dane osobowe tak długo, jak jest to konieczne do realizacji celów określonych w tej Polityce prywatności, chyba że dłuższy okres przechowywania jest wymagany lub dozwolony przez prawo.",
      },
      yourRights: {
        title: "Twoje prawa",
        description: "Masz prawo do:",
        item1: "Dostępu do swoich danych osobowych",
        item2: "Korygowania nieprawidłowych lub niekompletnych informacji",
        item3: "Żądania usunięcia swoich danych osobowych",
        item4: "Sprzeciwu wobec lub ograniczenia przetwarzania Twoich informacji",
      },
      contact: {
        title: "Skontaktuj się z nami",
        description: "Jeśli masz pytania dotyczące tej Polityki prywatności, skontaktuj się z nami:",
        email: "privacy@example.com",
      },
    },
    terms: {
      title: "Warunki użytkowania",
      subtitle: "Warunki i zasady korzystania z Platformy zgłaszania instytucji",
      lastUpdated: "Ostatnia aktualizacja: styczeń 2024",
      acceptance: {
        title: "Akceptacja warunków",
        content:
          "Korzystając z Platformy zgłaszania instytucji, akceptujesz i zgadzasz się być związany warunkami i postanowieniami niniejszej umowy. Jeśli nie zgadzasz się z tymi warunkami, nie powinieneś korzystać z tej platformy.",
      },
      useOfService: {
        title: "Korzystanie z usługi",
        description: "Zgadzasz się korzystać z platformy wyłącznie w celach zgodnych z prawem i zgodnie z niniejszymi Warunkami. Zgadzasz się nie:",
        item1: "Przesyłać fałszywych, wprowadzających w błąd lub oszukańczych informacji",
        item2: "Naruszać jakichkolwiek obowiązujących przepisów prawa lub regulacji",
        item3: "Naruszać praw innych",
        item4: "Zakłócać działanie platformy",
      },
      userAccounts: {
        title: "Konta użytkowników",
        description: "Tworząc konto, zgadzasz się:",
        item1: "Podawać dokładne i kompletne informacje",
        item2: "Zachować bezpieczeństwo swoich danych logowania",
        item3: "Natychmiast powiadomić nas o jakimkolwiek nieautoryzowanym użyciu Twojego konta",
      },
      reportSubmission: {
        title: "Przesyłanie zgłoszeń",
        description: "Przesyłając zgłoszenie, potwierdzasz, że:",
        item1: "Wszystkie podane informacje są dokładne w najlepszej Twojej wiedzy",
        item2: "Masz prawo przesłać podane dokumenty i informacje",
        item3: "Zgłoszenie jest składane w dobrej wierze i w uzasadnionych celach",
      },
      intellectualProperty: {
        title: "Własność intelektualna",
        content:
          "Cała zawartość, funkcje i funkcjonalność platformy są naszą własnością i są chronione międzynarodowymi przepisami dotyczącymi praw autorskich, znaków towarowych i innych praw własności intelektualnej.",
      },
      limitationOfLiability: {
        title: "Ograniczenie odpowiedzialności",
        content:
          "W maksymalnym zakresie dozwolonym przez prawo, nie ponosimy odpowiedzialności za jakiekolwiek pośrednie, przypadkowe, szczególne, wynikowe lub karne szkody wynikające z korzystania z platformy.",
      },
      modifications: {
        title: "Modyfikacje warunków",
        content:
          "Zastrzegamy sobie prawo do modyfikowania niniejszych Warunków w dowolnym momencie. Powiadomimy użytkowników o wszelkich istotnych zmianach, publikując nowe Warunki na tej stronie i aktualizując datę 'Ostatnia aktualizacja'.",
      },
      contact: {
        title: "Skontaktuj się z nami",
        description: "Jeśli masz pytania dotyczące tych Warunków użytkowania, skontaktuj się z nami:",
        email: "legal@example.com",
      },
    },
    admin: {
      title: "Panel moderatora",
      subtitle: "Zarządzaj i przeglądaj przypisane zgłoszenia",
      loading: "Ładowanie...",
      loadingReports: "Ładowanie zgłoszeń...",
    },
    moderatorDashboard: {
      stats: {
        total: "Wszystkie zgłoszenia",
      },
      tabs: {
        available: "Dostępne",
        assigned: "Przypisane",
        completed: "Ukończone",
      },
    },
    reportPreviewModal: {
      title: "Podgląd zgłoszenia",
      description: "Przejrzyj szczegóły zgłoszenia przed przypisaniem",
      close: "Zamknij",
      unassign: "Cofnij przypisanie",
      unassigning: "Cofanie przypisania...",
      assignToMe: "Przypisz do mnie",
      assigning: "Przypisywanie...",
      unnamedInstitution: "Instytucja bez nazwy",
      rspoNumber: "Numer RSPO: {number}",
      reporterInformation: "Informacje o zgłaszającym",
      reporterName: "Imię i nazwisko zgłaszającego",
      emailAddress: "Adres email",
      timeline: "Oś czasu",
      created: "Utworzono",
      assigned: "Przypisano",
      completed: "Ukończono",
      submittedReportContent: "Przesłana treść zgłoszenia",
      findings: "Ustalenia ({count})",
      page: "Strona: {page}",
      regulation: "Regulacja: {regulation}",
      comparisonNotes: "Notatki porównawcze",
      submittedDocument: "Przesłany dokument",
      noPdfAvailable: "Brak dostępnego dokumentu PDF",
      referenceRegulation: "Regulacja referencyjna",
      openInNewTab: "Otwórz w nowej karcie",
    },
    reportReviewModal: {
      title: "Przegląd zgłoszenia",
      description: "Dodaj ustalenia i notatki porównawcze dla tego zgłoszenia",
      cancel: "Anuluj",
      saveReview: "Zapisz przegląd",
      saving: "Zapisywanie...",
      successMessage: "Przegląd zgłoszenia zapisany pomyślnie",
      errorMessage: "Nie udało się zapisać przeglądu zgłoszenia",
      unnamedInstitution: "Instytucja bez nazwy",
      rspoNumber: "Numer RSPO: {number}",
      reporterInformation: "Informacje o zgłaszającym",
      reporterName: "Imię i nazwisko zgłaszającego",
      emailAddress: "Adres email",
      timeline: "Oś czasu",
      created: "Utworzono",
      assigned: "Przypisano",
      submittedReportContent: "Przesłana treść zgłoszenia",
      findings: "Ustalenia ({count})",
      page: "Strona: {page}",
      regulation: "Regulacja: {regulation}",
      comparisonNotes: "Notatki porównawcze",
      submittedDocument: "Przesłany dokument",
      noPdfAvailable: "Brak dostępnego dokumentu PDF",
      referenceRegulation: "Regulacja referencyjna",
      openInNewTab: "Otwórz w nowej karcie",
      reviewAndFindings: "Przegląd i ustalenia",
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
        numerRspo: { 
          label: "ID instytucji / Numer RSPO", 
          placeholder: "123456",
          description: "To pole jest automatycznie wypełniane po wybraniu instytucji z wyszukiwania powyżej."
        },
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
        institutionName: "Nazwa instytucji jest wymagana",
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
    features: {
      title: "Потужні функції",
      subtitle: "Все, що потрібно для звітування та управління проблемами закладів",
      secure: {
        title: "Безпечно та конфіденційно",
        desc: "Шифрування end-to-end забезпечує, що ваші звіти залишаються приватними та захищеними протягом усього процесу.",
      },
      pdf: {
        title: "Аналіз документів PDF",
        desc: "Завантажте PDF-докази, переглядайте документи та виділяйте конкретні знахідки з точністю на рівні сторінки.",
      },
      regulations: {
        title: "Відповідність регуляціям",
        desc: "Порівнюйте документи з поточними регуляціями та пов'язуйте знахідки з конкретними вимогами відповідності.",
      },
      tracking: {
        title: "Відстеження в реальному часі",
        desc: "Відстежуйте статус вашого звіту від подання через перегляд до вирішення з оновленнями в реальному часі.",
      },
      moderation: {
        title: "Експертна модерація",
        desc: "Досвідчені адміністратори переглядають кожен звіт з детальними знахідками та порівняльними нотатками.",
      },
      dashboard: {
        title: "Адмін-панель",
        desc: "Комплексна панель для модераторів для ефективного управління, призначення та перегляду звітів.",
      },
    },
    howItWorks: {
      title: "Як це працює",
      subtitle: "Простий, безпечний та ефективний процес звітування",
      step1: {
        title: "Надішліть свій звіт",
        desc: "Заповніть дані про заклад, завантажте PDF-докази та надайте чіткий опис проблеми.",
      },
      step2: {
        title: "Перегляд документа",
        desc: "Перегляньте свій PDF, виділіть конкретні знахідки та порівняйте з поточними регуляціями.",
      },
      step3: {
        title: "Перегляд модератора",
        desc: "Експертні модератори переглядають ваше подання, аналізують знахідки та перевіряють відповідність.",
      },
      step4: {
        title: "Вирішення",
        desc: "Отримуйте оновлення про статус вашого звіту та відстежуйте вжиті дії.",
      },
    },
    benefits: {
      title: "Чому обрати нашу платформу",
      subtitle: "Побудована для прозорості, безпеки та ефективності",
      transparency: {
        title: "Повна прозорість",
        desc: "Відстежуйте кожен крок вашого звіту від подання до вирішення.",
      },
      security: {
        title: "Корпоративна безпека",
        desc: "Шифрування банківського рівня та безпечне зберігання захищають вашу конфіденційну інформацію.",
      },
      efficiency: {
        title: "Оптимізований процес",
        desc: "Інтуїтивний інтерфейс та автоматизовані робочі процеси зменшують час звітування на 70%.",
      },
      compliance: {
        title: "Регуляторна відповідність",
        desc: "Вбудовані перевірки відповідності забезпечують, що всі звіти відповідають поточним регуляторним стандартам.",
      },
    },
    stats: {
      title: "Довіряють заклади",
      reportsSubmitted: "Звітів надіслано",
      activeModerators: "Активних модераторів",
      avgResponseTime: "Середній час відповіді",
      complianceRate: "Показник відповідності",
    },
    footer: {
      title: "Платформа звітів про заклади",
      subtitle: "Конфіденційний канал для звітів та подальших дій",
      quickLinks: {
        title: "Швидкі посилання",
        features: "Функції",
        howItWorks: "Як це працює",
        benefits: "Переваги",
        regulations: "Регуляції",
      },
      resources: {
        title: "Ресурси",
        documentation: "Документація",
        guidelines: "Інструкції",
        support: "Підтримка",
      },
      contact: {
        title: "Контакт",
        email: "support@example.com",
      },
      legal: {
        copyright: "Всі права захищені.",
        privacy: "Політика конфіденційності",
        terms: "Умови використання",
      },
    },
    documentation: {
      title: "Документація",
      subtitle: "Повний посібник з використання Платформи звітів про заклади",
      overview: {
        title: "Огляд",
        description:
          "Платформа звітів про заклади забезпечує безпечний та конфіденційний канал для повідомлення про проблеми в установах. Ця документація допоможе вам зрозуміти, як ефективно використовувати платформу для подання звітів, відстеження їх статусу та забезпечення відповідності регуляторним вимогам.",
      },
      gettingStarted: {
        title: "Початок роботи",
        step1: {
          title: "Створіть обліковий запис",
          description:
            "Для подання звітів вам потрібно створити обліковий запис. Це дозволяє відстежувати ваші подання та отримувати оновлення про їх статус.",
        },
        step2: {
          title: "Підготуйте документи",
          description:
            "Зберіть всі відповідні PDF-документи, які підтверджують ваш звіт. Переконайтеся, що документи чіткі, читабельні та безпосередньо пов'язані з проблемою, про яку ви повідомляєте.",
        },
        step3: {
          title: "Надішліть звіт",
          description:
            "Використовуйте форму подання звіту, щоб надати дані про заклад, завантажити PDF-докази та виділити конкретні знахідки. Наша система проведе вас через кожен крок.",
        },
      },
      features: {
        title: "Ключові функції",
        secure: {
          title: "Безпечне подання",
          description:
            "Всі звіти шифруються та безпечно зберігаються. Ваша інформація захищена заходами безпеки банківського рівня.",
        },
        upload: {
          title: "Завантаження та перегляд PDF",
          description:
            "Завантажте PDF-документи та переглядайте їх безпосередньо на платформі. Виділіть конкретні сторінки та розділи для перегляду модераторами.",
        },
        search: {
          title: "Пошук закладу",
          description:
            "Шукайте заклади за назвою або номером RSPO. Система автоматично заповнить дані про заклад, коли ви виберете відповідність.",
        },
        tracking: {
          title: "Відстеження статусу",
          description:
            "Відстежуйте прогрес вашого звіту від подання через перегляд до вирішення. Отримуйте сповіщення, коли статус вашого звіту змінюється.",
        },
      },
      bestPractices: {
        title: "Найкращі практики",
        item1: "Надайте чіткі та детальні описи проблем, про які ви повідомляєте",
        item2: "Переконайтеся, що всі PDF-документи є релевантними та чітко показують проблему",
        item3: "Використовуйте функцію виділення, щоб вказати модераторам на конкретні розділи",
        item4: "Додайте порівняльні нотатки, що пояснюють, як документи стосуються поточних регуляцій",
      },
      faq: {
        title: "Часті запитання",
        q1: {
          question: "Скільки часу займає перегляд звіту?",
          answer:
            "Час перегляду звітів варіюється залежно від складності та поточного навантаження. Більшість звітів переглядаються протягом 5-7 робочих днів. Ви отримаєте оновлення, коли ваш звіт проходить процес перегляду.",
        },
        q2: {
          question: "Чи можу я надіслати кілька звітів?",
          answer:
            "Так, ви можете надіслати кілька звітів. Кожен звіт відстежується незалежно, і ви можете переглядати всі свої подання в своїй панелі.",
        },
        q3: {
          question: "Які формати файлів підтримуються?",
          answer:
            "Наразі ми підтримуємо лише PDF-файли. Переконайтеся, що ваші документи мають формат PDF і не перевищують 5MB для оптимальної продуктивності.",
        },
      },
    },
    guidelines: {
      title: "Інструкції подання",
      subtitle: "Основні інструкції для підготовки та подання ефективних звітів",
      preparation: {
        title: "Підготовка звіту",
        document: {
          title: "Підготовка документів",
          description: "Перед поданням звіту переконайтеся, що ваші документи відповідають цим вимогам:",
          item1: "Документи повинні бути у форматі PDF",
          item2: "Файли повинні бути чіткими, читабельними та правильно відсканованими",
          item3: "Рекомендований максимальний розмір файлу 5MB для оптимальної продуктивності",
        },
        content: {
          title: "Вимоги до вмісту",
          description: "Ваш звіт повинен містити:",
          item1: "Повну інформацію про заклад (назва та номер RSPO)",
          item2: "Чіткий опис проблеми або занепокоєння",
          item3: "Конкретні знахідки з посиланнями на сторінки, де це застосовно",
        },
      },
      submission: {
        title: "Процес подання",
        step1: {
          title: "Крок 1: Дані про заклад",
          description:
            "Надайте назву закладу та номер RSPO. Ви можете шукати заклади за допомогою функції пошуку або ввести інформацію вручну.",
        },
        step2: {
          title: "Крок 2: Перегляд документа",
          description:
            "Завантажте свій PDF-документ та використовуйте функцію виділення, щоб позначити конкретні розділи, сторінки або знахідки, які є релевантними для вашого звіту.",
        },
        step3: {
          title: "Крок 3: Порівняльні нотатки",
          description:
            "Додайте порівняльні нотатки, що пояснюють, як документ стосується поточних регуляцій та будь-яких проблем відповідності, які ви виявили.",
        },
      },
      requirements: {
        title: "Важливі вимоги",
        important: "Будь ласка, забезпечте відповідність наступному:",
        item1: "Вся надана інформація повинна бути точною та правдивою",
        item2: "Документи повинні бути автентичними та безпосередньо пов'язаними з повідомленою проблемою",
        item3: "Звіти повинні подаватися в добрій вірі та з законних цілей",
        item4: "Особові дані третіх осіб повинні оброблятися відповідно до правил конфіденційності",
      },
      compliance: {
        title: "Регуляторна відповідність",
        description:
          "Всі звіти переглядаються відповідно до поточних регуляторних стандартів. Наші модератори порівнюють подані документи з відповідними регуляціями, щоб забезпечити відповідність та виявити будь-які розбіжності.",
      },
    },
    support: {
      title: "Підтримка",
      subtitle: "Отримайте допомогу та знайдіть відповіді на свої запитання",
      contact: {
        title: "Зв'яжіться з нами",
        email: {
          title: "Підтримка електронною поштою",
          description: "З питань, технічних проблем або загальних запитів, будь ласка, зв'яжіться з нами:",
          address: "support@example.com",
        },
        hours: {
          title: "Години підтримки",
          description: "Наша команда підтримки доступна з понеділка по п'ятницю, з 9:00 до 17:00 (CET).",
        },
      },
      commonIssues: {
        title: "Типові проблеми",
        issue1: {
          question: "Я не можу завантажити свій PDF-файл",
          answer:
            "Переконайтеся, що ваш файл має формат PDF і менше 5MB. Якщо проблема зберігається, спробуйте використати інший браузер або очистити кеш браузера.",
        },
        issue2: {
          question: "Як відстежити статус мого звіту?",
          answer:
            "Після входу ви можете переглядати всі подані звіти в своїй панелі. Кожен звіт показує свій поточний статус та будь-які оновлення від модераторів.",
        },
        issue3: {
          question: "Я забув свій пароль",
          answer:
            "Використовуйте функцію скидання пароля на сторінці входу. Ви отримаєте електронний лист з інструкціями для скидання пароля.",
        },
      },
      resources: {
        title: "Додаткові ресурси",
        documentation: {
          title: "Документація",
          description: "Комплексні посібники та навчальні матеріали з використання платформи",
        },
        guidelines: {
          title: "Інструкції",
          description: "Детальні інструкції для підготовки та подання звітів",
        },
      },
      additionalHelp: {
        title: "Потрібна додаткова допомога?",
        description:
          "Якщо ви не можете знайти відповідь, яку шукаєте, будь ласка, не соромтеся зв'язатися з нашою командою підтримки. Ми тут, щоб допомогти вам ефективно використовувати платформу.",
      },
    },
    privacy: {
      title: "Політика конфіденційності",
      subtitle: "Як ми збираємо, використовуємо та захищаємо вашу особисту інформацію",
      lastUpdated: "Останнє оновлення: січень 2024",
      introduction: {
        title: "Вступ",
        content:
          "Ми зобов'язуємося захищати вашу конфіденційність та забезпечувати безпеку вашої особистої інформації. Ця Політика конфіденційності пояснює, як ми збираємо, використовуємо, розкриваємо та захищаємо вашу інформацію під час використання нашої Платформи звітів про заклади.",
      },
      dataCollection: {
        title: "Інформація, яку ми збираємо",
        description: "Ми збираємо інформацію, яку ви надаєте нам безпосередньо, включаючи:",
        item1: "Інформація про обліковий запис (ім'я, адреса електронної пошти, пароль)",
        item2: "Інформація про звіт (дані про заклад, описи, завантажені документи)",
        item3: "Дані комунікації (повідомлення, надіслані через платформу)",
        item4: "Дані про використання (як ви взаємодієте з платформою)",
      },
      dataUsage: {
        title: "Як ми використовуємо вашу інформацію",
        description: "Ми використовуємо зібрану інформацію для:",
        item1: "Обробки та перегляду ваших звітів",
        item2: "Спілкування з вами про ваші звіти та обліковий запис",
        item3: "Покращення наших послуг та функціональності платформи",
      },
      dataSecurity: {
        title: "Безпека даних",
        description:
          "Ми впроваджуємо відповідні технічні та організаційні заходи для захисту вашої особистої інформації від несанкціонованого доступу, зміни, розкриття або знищення. Всі дані шифруються під час передачі та зберігання з використанням стандартних методів шифрування.",
      },
      dataRetention: {
        title: "Зберігання даних",
        description:
          "Ми зберігаємо вашу особисту інформацію стільки, скільки необхідно для виконання цілей, викладених у цій Політиці конфіденційності, якщо триваліший період зберігання не вимагається або не дозволений законом.",
      },
      yourRights: {
        title: "Ваші права",
        description: "Ви маєте право:",
        item1: "Доступу до своєї особистої інформації",
        item2: "Виправлення неточної або неповної інформації",
        item3: "Запиту на видалення вашої особистої інформації",
        item4: "Заперечення або обмеження обробки вашої інформації",
      },
      contact: {
        title: "Зв'яжіться з нами",
        description: "Якщо у вас є запитання щодо цієї Політики конфіденційності, будь ласка, зв'яжіться з нами:",
        email: "privacy@example.com",
      },
    },
    terms: {
      title: "Умови використання",
      subtitle: "Умови та положення для використання Платформи звітів про заклади",
      lastUpdated: "Останнє оновлення: січень 2024",
      acceptance: {
        title: "Прийняття умов",
        content:
          "Отримуючи доступ та використовуючи Платформу звітів про заклади, ви приймаєте та погоджуєтеся дотримуватися умов та положень цієї угоди. Якщо ви не згодні з цими умовами, ви не повинні використовувати цю платформу.",
      },
      useOfService: {
        title: "Використання послуги",
        description: "Ви погоджуєтеся використовувати платформу лише для законних цілей та відповідно до цих Умов. Ви погоджуєтеся не:",
        item1: "Надсилати неправдиву, оманливу або шахрайську інформацію",
        item2: "Порушувати будь-які застосовні закони або регуляції",
        item3: "Порушувати права інших",
        item4: "Заважати роботі платформи",
      },
      userAccounts: {
        title: "Облікові записи користувачів",
        description: "Створюючи обліковий запис, ви погоджуєтеся:",
        item1: "Надавати точну та повну інформацію",
        item2: "Зберігати безпеку ваших облікових даних",
        item3: "Негайно повідомляти нас про будь-яке несанкціоноване використання вашого облікового запису",
      },
      reportSubmission: {
        title: "Подання звіту",
        description: "Надсилаючи звіт, ви підтверджуєте, що:",
        item1: "Вся надана інформація є точною наскільки вам відомо",
        item2: "Ви маєте право надіслати надані документи та інформацію",
        item3: "Подання здійснюється в добрій вірі та з законних цілей",
      },
      intellectualProperty: {
        title: "Інтелектуальна власність",
        content:
          "Весь вміст, функції та функціональність платформи належать нам і захищені міжнародними законами про авторське право, торгові марки та інші закони про інтелектуальну власність.",
      },
      limitationOfLiability: {
        title: "Обмеження відповідальності",
        content:
          "У максимальній мірі, дозволеній законом, ми не несемо відповідальності за будь-які непрямі, випадкові, особливі, наслідкові або покарані збитки, що виникають внаслідок використання платформи.",
      },
      modifications: {
        title: "Зміни умов",
        content:
          "Ми залишаємо за собою право змінювати ці Умови в будь-який час. Ми повідомимо користувачів про будь-які істотні зміни, опублікувавши нові Умови на цій сторінці та оновивши дату 'Останнє оновлення'.",
      },
      contact: {
        title: "Зв'яжіться з нами",
        description: "Якщо у вас є запитання щодо цих Умов використання, будь ласка, зв'яжіться з нами:",
        email: "legal@example.com",
      },
    },
    admin: {
      title: "Панель модератора",
      subtitle: "Керуйте та переглядайте призначені звіти",
      loading: "Завантаження...",
      loadingReports: "Завантаження звітів...",
    },
    moderatorDashboard: {
      stats: {
        total: "Всі звіти",
      },
      tabs: {
        available: "Доступні",
        assigned: "Призначені",
        completed: "Завершені",
      },
    },
    reportPreviewModal: {
      title: "Перегляд звіту",
      description: "Перегляньте деталі звіту перед призначенням",
      close: "Закрити",
      unassign: "Скасувати призначення",
      unassigning: "Скасування призначення...",
      assignToMe: "Призначити мені",
      assigning: "Призначення...",
      unnamedInstitution: "Заклад без назви",
      rspoNumber: "Номер RSPO: {number}",
      reporterInformation: "Інформація про автора",
      reporterName: "Ім'я та прізвище автора",
      emailAddress: "Адреса електронної пошти",
      timeline: "Часова шкала",
      created: "Створено",
      assigned: "Призначено",
      completed: "Завершено",
      submittedReportContent: "Надіслана інформація звіту",
      findings: "Знахідки ({count})",
      page: "Сторінка: {page}",
      regulation: "Регуляція: {regulation}",
      comparisonNotes: "Порівняльні нотатки",
      submittedDocument: "Надісланий документ",
      noPdfAvailable: "Немає доступного документа PDF",
      referenceRegulation: "Референтна регуляція",
      openInNewTab: "Відкрити в новій вкладці",
    },
    reportReviewModal: {
      title: "Перегляд звіту",
      description: "Додайте знахідки та порівняльні нотатки для цього звіту",
      cancel: "Скасувати",
      saveReview: "Зберегти перегляд",
      saving: "Збереження...",
      successMessage: "Перегляд звіту успішно збережено",
      errorMessage: "Не вдалося зберегти перегляд звіту",
      unnamedInstitution: "Заклад без назви",
      rspoNumber: "Номер RSPO: {number}",
      reporterInformation: "Інформація про автора",
      reporterName: "Ім'я та прізвище автора",
      emailAddress: "Адреса електронної пошти",
      timeline: "Часова шкала",
      created: "Створено",
      assigned: "Призначено",
      submittedReportContent: "Надіслана інформація звіту",
      findings: "Знахідки ({count})",
      page: "Сторінка: {page}",
      regulation: "Регуляція: {regulation}",
      comparisonNotes: "Порівняльні нотатки",
      submittedDocument: "Надісланий документ",
      noPdfAvailable: "Немає доступного документа PDF",
      referenceRegulation: "Референтна регуляція",
      openInNewTab: "Відкрити в новій вкладці",
      reviewAndFindings: "Перегляд та знахідки",
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
        numerRspo: { 
          label: "ID закладу / Номер RSPO", 
          placeholder: "123456",
          description: "Це поле автоматично заповнюється після вибору закладу з пошуку вище."
        },
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
        institutionName: "Назва закладу обов'язкова",
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

