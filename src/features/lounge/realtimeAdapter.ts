import type { Vector3Tuple } from "./loungeData";

export type RemotePresence = {
  id: string;
  nickname: string;
  interests: string[];
  position: Vector3Tuple;
  heading: number;
  speaking: boolean;
  muted: boolean;
  seatedTableId: string | null;
};

export type SpatialVoiceState = {
  audiblePeerIds: string[];
  voiceRadius: number;
};

export type RealtimeAdapter = {
  connect: (profile: Pick<RemotePresence, "nickname" | "interests">) => Promise<void>;
  disconnect: () => Promise<void>;
  publishPresence: (presence: Omit<RemotePresence, "id" | "nickname" | "interests">) => void;
  subscribePresence: (onPeers: (peers: RemotePresence[]) => void) => () => void;
  subscribeSpatialVoice: (onVoice: (state: SpatialVoiceState) => void) => () => void;
};

export const realtimeIntegrationNote =
  "Human Connect is realtime-ready, but the deployed prototype still runs simulated peers. " +
  "Connect a presence transport such as Ably, PartyKit, Liveblocks, or WebSocket, and a WebRTC/SFU voice layer such as LiveKit to enable real users.";
