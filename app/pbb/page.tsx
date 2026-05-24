"use client";
import OrgInfoPage from "../components/OrgInfoPage";
import { organizations } from "../data";

export default function PBBPage() {
  const org = organizations.find(o => o.id === "pbb")!;
  return <OrgInfoPage org={org} />;
}