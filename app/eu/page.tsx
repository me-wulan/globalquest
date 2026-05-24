"use client";
import OrgInfoPage from "../components/OrgInfoPage";
import { organizations } from "../data";

export default function EUPage() {
  const org = organizations.find(o => o.id === "eu")!;
  return <OrgInfoPage org={org} />;
}