"use client";
import OrgInfoPage from "../components/OrgInfoPage";
import { organizations } from "../data";

export default function G20Page() {
  const org = organizations.find(o => o.id === "g20")!;
  return <OrgInfoPage org={org} />;
}