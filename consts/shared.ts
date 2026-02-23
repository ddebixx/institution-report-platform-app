import type { useTranslations } from "next-intl";
import {
  CheckCircleIcon,
  UserIcon,
  KeyIcon,
  FileUpIcon,
  CopyrightIcon,
  ShieldAlertIcon,
  RefreshCwIcon,
  UserCheckIcon,
  ClockIcon,
  LockIcon,
  ShieldIcon,
  DatabaseIcon,
} from "lucide-react";

export const accordionItems = (t: ReturnType<typeof useTranslations<"terms">>) => [
  {
    id: "acceptance",
    title: t("acceptance.title"),
    content: t("acceptance.content"),
    icon: CheckCircleIcon,
  },
  {
    id: "useOfService",
    title: t("useOfService.title"),
    content: `${t("useOfService.description")}\n\n• ${t("useOfService.item1")}\n• ${t("useOfService.item2")}\n• ${t("useOfService.item3")}\n• ${t("useOfService.item4")}`,
    icon: UserIcon,
  },
  {
    id: "userAccounts",
    title: t("userAccounts.title"),
    content: `${t("userAccounts.description")}\n\n• ${t("userAccounts.item1")}\n• ${t("userAccounts.item2")}\n• ${t("userAccounts.item3")}`,
    icon: KeyIcon,
  },
  {
    id: "reportSubmission",
    title: t("reportSubmission.title"),
    content: `${t("reportSubmission.description")}\n\n• ${t("reportSubmission.item1")}\n• ${t("reportSubmission.item2")}\n• ${t("reportSubmission.item3")}`,
    icon: FileUpIcon,
  },
  {
    id: "intellectualProperty",
    title: t("intellectualProperty.title"),
    content: t("intellectualProperty.content"),
    icon: CopyrightIcon,
  },
  {
    id: "limitationOfLiability",
    title: t("limitationOfLiability.title"),
    content: t("limitationOfLiability.content"),
    icon: ShieldAlertIcon,
  },
  {
    id: "modifications",
    title: t("modifications.title"),
    content: t("modifications.content"),
    icon: RefreshCwIcon,
  },
];

export const commonIssuesItems = (t: ReturnType<typeof useTranslations<"support">>) => [
  {
    id: "issue-1",
    title: t("commonIssues.issue1.question"),
    content: t("commonIssues.issue1.answer"),
  },
  {
    id: "issue-2",
    title: t("commonIssues.issue2.question"),
    content: t("commonIssues.issue2.answer"),
  },
  {
    id: "issue-3",
    title: t("commonIssues.issue3.question"),
    content: t("commonIssues.issue3.answer"),
  },
];

export const privacyItems = (t: ReturnType<typeof useTranslations<"privacy">>) => [
  {
    id: "introduction",
    title: t("introduction.title"),
    content: t("introduction.content"),
    icon: ShieldIcon,
  },
  {
    id: "dataCollection",
    title: t("dataCollection.title"),
    content: `${t("dataCollection.description")}\n\n• ${t("dataCollection.item1")}\n• ${t("dataCollection.item2")}\n• ${t("dataCollection.item3")}\n• ${t("dataCollection.item4")}`,
    icon: DatabaseIcon,
  },
  {
    id: "dataUsage",
    title: t("dataUsage.title"),
    content: `${t("dataUsage.description")}\n\n• ${t("dataUsage.item1")}\n• ${t("dataUsage.item2")}\n• ${t("dataUsage.item3")}`,
    icon: DatabaseIcon,
  },
  {
    id: "dataSecurity",
    title: t("dataSecurity.title"),
    content: t("dataSecurity.description"),
    icon: LockIcon,
  },
  {
    id: "dataRetention",
    title: t("dataRetention.title"),
    content: t("dataRetention.description"),
    icon: ClockIcon,
  },
  {
    id: "yourRights",
    title: t("yourRights.title"),
    content: `${t("yourRights.description")}\n\n• ${t("yourRights.item1")}\n• ${t("yourRights.item2")}\n• ${t("yourRights.item3")}\n• ${t("yourRights.item4")}`,
    icon: UserCheckIcon,
  },
];

export const submissionSteps = (t: ReturnType<typeof useTranslations<"guidelines">>) => [
  {
    number: 1,
    title: t("submission.step1.title"),
    description: t("submission.step1.description"),
  },
  {
    number: 2,
    title: t("submission.step2.title"),
    description: t("submission.step2.description"),
  },
  {
    number: 3,
    title: t("submission.step3.title"),
    description: t("submission.step3.description"),
  },
];

export const gettingStartedSteps = (t: ReturnType<typeof useTranslations<"documentation">>) => [
  {
    number: 1,
    title: t("gettingStarted.step1.title"),
    description: t("gettingStarted.step1.description"),
  },
  {
    number: 2,
    title: t("gettingStarted.step2.title"),
    description: t("gettingStarted.step2.description"),
  },
  {
    number: 3,
    title: t("gettingStarted.step3.title"),
    description: t("gettingStarted.step3.description"),
  },
];

export const faqItems = (t: ReturnType<typeof useTranslations<"documentation">>) => [
  {
    id: "faq-1",
    title: t("faq.q1.question"),
    content: t("faq.q1.answer"),
  },
  {
    id: "faq-2",
    title: t("faq.q2.question"),
    content: t("faq.q2.answer"),
  },
  {
    id: "faq-3",
    title: t("faq.q3.question"),
    content: t("faq.q3.answer"),
  },
];
