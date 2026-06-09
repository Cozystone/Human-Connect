"use client";

import { create } from "zustand";
import type { LoungeId, Vector3Tuple } from "./loungeData";

type ConversationMode = "floor" | "table" | "private";

type LoungeState = {
  loungeId: LoungeId;
  nickname: string;
  interests: string[];
  currentTableId: string | null;
  privateGuestId: string | null;
  playerPosition: Vector3Tuple;
  muted: boolean;
  blockedGuestIds: string[];
  toast: string | null;
  mode: ConversationMode;
  setLounge: (loungeId: LoungeId) => void;
  enterAsGuest: (nickname: string, interests: string[]) => void;
  setPlayerPosition: (position: Vector3Tuple) => void;
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
  muted: false,
  blockedGuestIds: [],
  toast: "라운지를 고르고 WASD로 걸어보세요. 관심사가 맞는 테이블에 앉을 수 있습니다.",
  mode: "floor",
  setLounge: (loungeId) =>
    set({
      loungeId,
      currentTableId: null,
      privateGuestId: null,
      mode: "floor",
      toast: "새 라운지에 입장했습니다. 지금 가장 끌리는 테이블을 찾아보세요."
    }),
  enterAsGuest: (nickname, interests) =>
    set({
      nickname: nickname.trim() || "익명 빌더",
      interests: interests.length ? interests : ["호기심"],
      toast: "게스트 프로필을 업데이트했습니다. 대화가 자연스러워질 때까지 익명으로 머물 수 있어요."
    }),
  setPlayerPosition: (playerPosition) => set({ playerPosition }),
  joinTable: (tableId) =>
    set({
      currentTableId: tableId,
      privateGuestId: null,
      mode: "table",
      toast: "자리에 앉았습니다. 이제 이 주제의 음성 구역과 테이블 맥락에 집중합니다."
    }),
  leaveTable: () =>
    set({
      currentTableId: null,
      mode: "floor",
      toast: "테이블에서 잠시 벗어났습니다."
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
      toast: "1:1 포드에서 공개 라운지로 돌아왔습니다."
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
      toast: guestName ? `${guestName}님에게 손을 흔들었습니다.` : "라운지에 가볍게 손을 흔들었습니다."
    }),
  clearToast: () => set({ toast: null })
}));
