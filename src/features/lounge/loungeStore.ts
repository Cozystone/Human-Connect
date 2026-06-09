"use client";

import { create } from "zustand";
import type { LoungeId, Vector3Tuple } from "./loungeData";

type ConversationMode = "floor" | "table" | "private";
type NetworkMode = "simulation" | "realtime-ready";

type LoungeState = {
  loungeId: LoungeId;
  nickname: string;
  interests: string[];
  currentTableId: string | null;
  privateGuestId: string | null;
  playerPosition: Vector3Tuple;
  playerHeading: number;
  isJumping: boolean;
  muted: boolean;
  blockedGuestIds: string[];
  toast: string | null;
  mode: ConversationMode;
  networkMode: NetworkMode;
  setLounge: (loungeId: LoungeId) => void;
  enterAsGuest: (nickname: string, interests: string[]) => void;
  setPlayerPose: (position: Vector3Tuple, heading: number) => void;
  setPlayerJumping: (isJumping: boolean) => void;
  joinTable: (tableId: string) => void;
  leaveTable: () => void;
  requestPrivate: (guestId: string, guestName: string) => void;
  leavePrivate: () => void;
  toggleMute: () => void;
  blockGuest: (guestId: string, guestName: string) => void;
  reportGuest: (guestName: string) => void;
  wave: (guestName?: string) => void;
  clearToast: () => void;
};

export const useLoungeStore = create<LoungeState>((set, get) => ({
  loungeId: "startup",
  nickname: "익명 빌더",
  interests: ["창업", "디자인", "AI"],
  currentTableId: null,
  privateGuestId: null,
  playerPosition: [0, 0, 7],
  playerHeading: 0,
  isJumping: false,
  muted: false,
  blockedGuestIds: [],
  toast: "현재는 시뮬레이션 모드입니다. 실제 접속자 동기화와 음성은 WebRTC/Realtime 어댑터를 연결하면 활성화됩니다.",
  mode: "floor",
  networkMode: "realtime-ready",
  setLounge: (loungeId) =>
    set({
      loungeId,
      toast: "관심 주제를 표시했습니다. 경계 없이 열린 도시를 계속 탐색해 보세요."
    }),
  enterAsGuest: (nickname, interests) =>
    set({
      nickname: nickname.trim() || "익명 빌더",
      interests: interests.length ? interests : ["관심사"],
      toast: "게스트 프로필을 저장했습니다. 가까운 사람과 테이블이 먼저 열립니다."
    }),
  setPlayerPose: (playerPosition, playerHeading) => set({ playerPosition, playerHeading }),
  setPlayerJumping: (isJumping) => set({ isJumping }),
  joinTable: (tableId) =>
    set({
      currentTableId: tableId,
      privateGuestId: null,
      mode: "table",
      toast: "의자에 앉았습니다. 같은 주제를 바라보는 사람들과 대화를 시작하세요."
    }),
  leaveTable: () =>
    set({
      currentTableId: null,
      mode: "floor",
      toast: "자리에서 일어났습니다. 도시 어디로든 이동할 수 있습니다."
    }),
  requestPrivate: (guestId, guestName) => {
    if (get().blockedGuestIds.includes(guestId)) {
      set({ toast: `${guestName}님은 차단되어 1:1 요청을 보낼 수 없습니다.` });
      return;
    }

    set({
      privateGuestId: guestId,
      currentTableId: null,
      mode: "private",
      toast: `${guestName}님이 1:1 요청을 수락했습니다. 조용한 포드로 이동합니다.`
    });
  },
  leavePrivate: () =>
    set({
      privateGuestId: null,
      mode: "floor",
      toast: "1:1 포드에서 공개 도시로 돌아왔습니다."
    }),
  toggleMute: () =>
    set((state) => ({
      muted: !state.muted,
      toast: !state.muted ? "마이크를 껐습니다." : "마이크를 켰습니다."
    })),
  blockGuest: (guestId, guestName) =>
    set((state) => ({
      blockedGuestIds: state.blockedGuestIds.includes(guestId)
        ? state.blockedGuestIds
        : [...state.blockedGuestIds, guestId],
      toast: `${guestName}님을 이 세션에서 차단했습니다.`
    })),
  reportGuest: (guestName) =>
    set({
      toast: `${guestName}님에 대한 신고를 운영 검토 목록에 저장했습니다.`
    }),
  wave: (guestName) =>
    set({
      toast: guestName ? `${guestName}님에게 손을 흔들었습니다.` : "도시에 가볍게 손을 흔들었습니다."
    }),
  clearToast: () => set({ toast: null })
}));
