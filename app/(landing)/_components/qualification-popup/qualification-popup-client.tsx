"use client";

import dynamic from "next/dynamic";

const QualificationPopup = dynamic(
  () => import("./qualification-popup").then((m) => m.QualificationPopup),
  { ssr: false }
);

export function QualificationPopupClient() {
  return <QualificationPopup />;
}
