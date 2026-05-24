"use client";
import WebARView from "../../components/WebARView";
import { organizations } from "../../data";
export default function ARPBBPage() {
  const org = organizations.find(o => o.id === "pbb")!;
  return <WebARView org={org} />;
}
