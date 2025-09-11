"use client";

import { SheetProvider } from "@/components/providers/sheet-provider";
import Navbar from "@/components/ui/nav-stays";
import FooterWrapper from "@/components/footer-wrapper";
import { BottomNavigation } from "@/components/bottom-navigation";
import { MobileNavbar } from "@/components/stays-mobile-navbar";

import { useState, type ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";
import FilterModal from "@/components/ui/modal";
export default function StaysLayout({ children }: { children: ReactNode }) {
  const { modalFilter, setModalFilter, openModal, closeModal, toggleModal } =
    useAuth();
  return (
    <SheetProvider>
      <div className="font-poppins">
        {modalFilter && (
          <div className="fixed inset-0 bg-black bg-opacity-40 z-40"></div>
        )}

        <Navbar />

        <MobileNavbar openModal={openModal} />

        <main className={modalFilter ? "filter blur-sm" : ""}>{children}</main>
        <FooterWrapper />
        <BottomNavigation />

        <FilterModal isOpen={modalFilter} onClose={closeModal} />
      </div>
    </SheetProvider>
  );
}
