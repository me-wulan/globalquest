"use client";
import OrgInfoPage from "../components/OrgInfoPage";
import { organizations } from "../data";

export default function ASEANPage() {
  const org = organizations.find(o => o.id === "asean")!;
  return <OrgInfoPage org={org} />;
}