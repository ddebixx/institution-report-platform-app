"use client";

import { useCallback, useMemo, useState } from "react";

import { ReportModal } from "@/features/reports";
import { useAuthContext } from "@/providers/auth-provider";
import { BenefitsSection } from "./benefits-section";
import { FeaturesSection } from "./features-section";
import { HeroSection } from "./hero-section";
import { HowItWorksSection } from "./how-it-works-section";
import { RegulationsSection } from "./regulations-section";
import { StatsSection } from "./stats-section";

export const HomeLanding = () => {
  const { user } = useAuthContext();
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const openReportModal = useCallback(() => {
    setIsReportModalOpen(true);
  }, []);

  const closeReportModal = useCallback(() => {
    setIsReportModalOpen(false);
  }, []);

  const isAuthenticated = useMemo(() => Boolean(user), [user]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100 text-foreground">
      <main className="mx-auto flex max-w-[1200px] flex-col items-center gap-16 px-4 pb-24 pt-16 sm:px-6">
        <HeroSection isAuthenticated={isAuthenticated} onOpenReportModal={openReportModal} />

        <section id="features">
          <FeaturesSection />
        </section>

        <section id="how-it-works">
          <HowItWorksSection />
        </section>

        <section id="benefits">
          <BenefitsSection />
        </section>

        <section id="regulations">
          <RegulationsSection />
        </section>

        <section id="stats">
          <StatsSection />
        </section>
      </main>
      <ReportModal open={isReportModalOpen} onClose={closeReportModal} />
    </div>
  );
};
