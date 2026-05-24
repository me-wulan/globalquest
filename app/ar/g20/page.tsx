"use client";
import WebARView from "../../components/WebARView";
import { organizations } from "../../data";
export default function ARG20Page() {
  const org = organizations.find(o => o.id === "g20")!;
  return <WebARView org={org} />;
}
