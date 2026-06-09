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
  nickname: "Guest Builder",
  interests: ["startup", "design", "AI"],
  currentTableId: null,
  privateGuestId: null,
  playerPosition: [0, 0, 7],
  muted: false,
  blockedGuestIds: [],
  toast: "Choose a lounge, walk with WASD, and join a table when the topic fits.",
  mode: "floor",
  setLounge: (loungeId) =>
    set({
      loungeId,
      currentTableId: null,
      privateGuestId: null,
      mode: "floor",
      toast: "You entered a new lounge. Look for the table with the strongest signal."
    }),
  enterAsGuest: (nickname, interests) =>
    set({
      nickname: nickname.trim() || "Guest Builder",
      interests: interests.length ? interests : ["curious"],
      toast: "Guest profile updated. You can stay anonymous until a conversation feels real."
    }),
  setPlayerPosition: (playerPosition) => set({ playerPosition }),
  joinTable: (tableId) =>
    set({
      currentTableId: tableId,
      privateGuestId: null,
      mode: "table",
      toast: "You took a seat. Voice zone and table context are now focused on this topic."
    }),
  leaveTable: () =>
    set({
      currentTableId: null,
      mode: "floor",
      toast: "You stepped away from the table."
    }),
  requestPrivate: (guestId, guestName) => {
    if (get().blockedGuestIds.includes(guestId)) {
      set({ toast: `${guestName} is blocked, so private requests are disabled.` });
      return;
    }

    set({
      privateGuestId: guestId,
      currentTableId: null,
      mode: "private",
      toast: `${guestName} accepted your 1:1 request. Moving to a quiet pod.`
    });
  },
  leavePrivate: () =>
    set({
      privateGuestId: null,
      mode: "floor",
      toast: "You returned from the private pod to the public lounge."
    }),
  toggleMute: () =>
    set((state) => ({
      muted: !state.muted,
      toast: !state.muted ? "Microphone muted." : "Microphone unmuted."
    })),
  blockGuest: (guestId, guestName) =>
    set((state) => ({
      blockedGuestIds: state.blockedGuestIds.includes(guestId)
        ? state.blockedGuestIds
        : [...state.blockedGuestIds, guestId],
      toast: `${guestName} has been blocked for this session.`
    })),
  reportGuest: (guestName) =>
    set({
      toast: `Report for ${guestName} was saved to the moderation queue.`
    }),
  wave: (guestName) =>
    set({
      toast: guestName ? `You waved to ${guestName}.` : "You sent a small wave to the room."
    }),
  clearToast: () => set({ toast: null })
}));
