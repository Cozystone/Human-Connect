"use client";

import dynamic from "next/dynamic";

const HumanConnectApp = dynamic(
  () => import("./HumanConnectApp").then((mod) => mod.HumanConnectApp),
  {
    ssr: false,
    loading: () => <main className="boot-screen">Human Connect 불러오는 중...</main>
  }
);

export function ClientEntry() {
  return <HumanConnectApp />;
}
