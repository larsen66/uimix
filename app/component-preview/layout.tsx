import "@/components/components-css.css";
import "./preview-override.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Component Preview",
};

export default function ComponentPreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
