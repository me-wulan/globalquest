"use client";
import WebARView from "../../components/WebARView";
import { organizations } from "../../data";
export default function AREUPage() {
  const org = organizations.find(o => o.id === "eu")!;
  return <WebARView org={org} />;
}
