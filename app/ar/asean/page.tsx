"use client";
import WebARView from "../../components/WebARView";
import { organizations } from "../../data";
export default function ARASEANPage() {
  const org = organizations.find(o => o.id === "asean")!;
  return <WebARView org={org} />;
}
