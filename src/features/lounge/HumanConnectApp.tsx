"use client";

import { Flag, Hand, Map, Mic, MicOff, Radio, Shield, UserRound, Users, Volume2, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { allGuests, allTables, cityNpcs, getLounge, getLoungeForTable, lounges, type CityNpc, type Guest } from "./loungeData";
import { useLoungeStore } from "./loungeStore";
import { LoungeWorld } from "./LoungeWorld";

const NEAR_GUEST_RADIUS = 5.2;
const NEAR_TABLE_RADIUS = 6.8;
const BASE_VOICE_RADIUS = 10;
const MAP_LIMIT = 240;
const MINIMAP_SIZE = 184;

export function HumanConnectApp() {
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const [selectedNpc, setSelectedNpc] = useState<CityNpc | null>(null);
  const [npcMessage, setNpcMessage] = useState("");
  const [npcReply, setNpcReply] = useState<string | null>(null);
  const [npcProvider, setNpcProvider] = useState<string | null>(null);
  const [npcLoading, setNpcLoading] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [nameDraft, setNameDraft] = useState("익명 빌더");
  const [interestDraft, setInterestDraft] = useState("창업, 디자인, AI");
  const [voiceTick, setVoiceTick] = useState(0);
  const {
    loungeId,
    nickname,
    interests,
    currentTableId,
    privateGuestId,
    playerPosition,
    playerHeading,
    isJumping,
    muted,
    toast,
    mode,
    networkMode,
    enterAsGuest,
    joinTable,
    leaveTable,
    requestPrivate,
    leavePrivate,
    toggleMute,
    blockGuest,
    reportGuest,
    wave,
    clearToast
  } = useLoungeStore();

  const activeDistrict = useMemo(() => getLounge(loungeId), [loungeId]);
  const currentTable = allTables.find((table) => table.id === currentTableId);
  const currentTableDistrict = currentTable ? getLoungeForTable(currentTable.id) : null;
  const privateGuest = allGuests.find((guest) => guest.id === privateGuestId);
  const focusedTables = allTables;
  const crowdCount = useMemo(() => getCrowdCount(playerPosition), [playerPosition]);
  const voiceRadius = getVoiceRadius(crowdCount);

  const nearbyGuests = useMemo(
    () =>
      allGuests
        .map((guest, index) => ({
          guest,
          distance: planarDistance(playerPosition, guest.position),
          speaking: isGuestSpeaking(index, voiceTick)
        }))
        .sort((a, b) => a.distance - b.distance),
    [playerPosition, voiceTick]
  );
  const audibleGuests = nearbyGuests.filter((item) => !muted && item.distance <= voiceRadius);
  const closestGuest = nearbyGuests.find((item) => item.distance <= NEAR_GUEST_RADIUS);
  const closestTable = useMemo(
    () =>
      allTables
        .map((table) => ({ table, distance: planarDistance(playerPosition, table.position) }))
        .sort((a, b) => a.distance - b.distance)
        .find((item) => item.distance <= NEAR_TABLE_RADIUS),
    [playerPosition]
  );

  useEffect(() => {
    const interval = window.setInterval(() => setVoiceTick((tick) => tick + 1), 900);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(clearToast, 4200);
    return () => window.clearTimeout(timeout);
  }, [toast, clearToast]);

  const submitGuest = () => {
    const parsed = interestDraft
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
      .slice(0, 5);
    enterAsGuest(nameDraft, parsed);
  };

  return (
    <main className="app-shell">
      <div className="world-canvas">
        <LoungeWorld activeLounge={activeDistrict} lounges={lounges} onSelectGuest={setSelectedGuest} onSelectNpc={setSelectedNpc} />
      </div>

      <header className="topbar">
        <section className="brand-panel glass-panel" aria-label="Human Connect">
          <span className="eyebrow">Open City Social</span>
          <h1>Human Connect</h1>
          <p>하나의 도시 안에서 관심사가 맞는 사람들이 우연히 만나 진짜 대화를 시작합니다.</p>
        </section>

        <nav className="lounge-tabs glass-panel" aria-label="관심 필터">
          <button className="tab-button active" type="button">
            <Map size={16} aria-hidden />
            전체 도시
          </button>
          <span className="map-scale-chip">500m급 오픈월드</span>
        </nav>

        <section className="status-panel glass-panel" aria-label="세션 상태">
          <div className="status-grid">
            <div>
              <span>상태</span>
              <strong>{getModeLabel(mode)}</strong>
            </div>
            <div>
              <span>접속 구조</span>
              <strong>{networkMode === "realtime-ready" ? "준비됨" : "시뮬레이션"}</strong>
            </div>
            <div>
              <span>마이크</span>
              <strong>{muted ? "꺼짐" : "켜짐"}</strong>
            </div>
          </div>
        </section>
      </header>

      <aside className="side-panel glass-panel" aria-label="도시 조작 패널">
        <div className="panel-header">
          <div>
            <span className="eyebrow">Open World</span>
            <h2>Human Connect City</h2>
            <p>창업, 개발, 디자인 대화가 한 도시 안에 자연스럽게 섞여 있습니다.</p>
          </div>
          <button className="icon-button" onClick={() => wave()} type="button" title="손 흔들기">
            <Hand size={18} aria-hidden />
          </button>
        </div>

        <div className="voice-module">
          <div>
            <span className="eyebrow">Proximity Voice</span>
            <strong>{muted ? "음성 송출 꺼짐" : `${audibleGuests.length}명 들림`}</strong>
            <p>기본 {BASE_VOICE_RADIUS}m · 밀집도 {crowdCount}명 · 현재 {voiceRadius}m</p>
          </div>
          <button className="action-button" onClick={toggleMute} type="button">
            {muted ? <MicOff size={16} aria-hidden /> : <Mic size={16} aria-hidden />}
            {muted ? "마이크 켜기" : "마이크 끄기"}
          </button>
        </div>

        <div className="nearby-card">
          <strong>
            {closestGuest
              ? `${closestGuest.guest.name}님이 근처에 있습니다`
              : closestTable
                ? `${closestTable.table.label} 의자 근처입니다`
                : "넓어진 도시를 지나고 있습니다"}
          </strong>
          <span>
            {currentTable
              ? "E 키를 누르면 자리에서 일어납니다."
              : closestGuest
                ? "E 키로 사람 카드를 열고, 가까우면 음성이 들립니다."
                : closestTable
                  ? "E 키를 누르면 가까운 의자에 앉습니다."
                  : "W/S 전후진, A/D 회전, Space 점프, E 상호작용입니다."}
          </span>
        </div>

        <div className="control-row">
          {currentTable ? (
            <button className="action-button primary" onClick={leaveTable} type="button">
              <X size={16} aria-hidden />
              자리에서 일어나기
            </button>
          ) : null}
          {privateGuest ? (
            <button className="action-button" onClick={leavePrivate} type="button">
              <X size={16} aria-hidden />
              포드 떠나기
            </button>
          ) : null}
        </div>

        <h3 className="section-title">도시 전체 테이블</h3>
        <div className="table-list">
          {focusedTables.map((table) => (
            <button
              className={`table-button ${table.id === currentTableId ? "active" : ""}`}
              key={table.id}
              onClick={() => joinTable(table.id)}
              type="button"
            >
              <div>
                <strong>{table.label}</strong>
                <p>{table.topic}</p>
                <div className="table-meta">
                  <span className="pill">{table.occupied}/{table.seats} 착석</span>
                  <span className="pill">E 앉기</span>
                </div>
              </div>
            </button>
          ))}
        </div>

        <h3 className="section-title">근접 음성 채널</h3>
        <div className="people-list">
          {nearbyGuests.slice(0, 6).map(({ guest, distance, speaking }) => {
            const audible = !muted && distance <= voiceRadius;
            return (
              <button
                className={`person-card ${distance <= NEAR_GUEST_RADIUS ? "near" : ""} ${audible ? "audible" : ""}`}
                key={guest.id}
                onClick={() => setSelectedGuest(guest)}
                type="button"
              >
                <strong>{guest.name}</strong>
                <span>{getLounge(guest.loungeId).name} · {guest.role}</span>
                <div className="person-meta">
                  <span className="pill">{distance.toFixed(1)}m</span>
                  <span className={`pill ${audible ? "voice-on" : ""}`}>{audible ? "들림" : "멀어짐"}</span>
                  {speaking && audible ? <span className="pill speaking-pill">말하는 중</span> : null}
                </div>
              </button>
            );
          })}
        </div>
      </aside>

      <GameMinimap
        onOpenMap={() => setMapOpen(true)}
        playerHeading={playerHeading}
        playerPosition={playerPosition}
        voiceRadius={voiceRadius}
      />

      <section className="entry-panel glass-panel" aria-label="게스트 프로필">
        <div className="panel-header">
          <div>
            <h2>{nickname}</h2>
            <p>{interests.join(" · ")}</p>
          </div>
          <UserRound size={22} aria-hidden />
        </div>
        <div className="entry-form">
          <input aria-label="닉네임" value={nameDraft} onChange={(event) => setNameDraft(event.target.value)} placeholder="닉네임" />
          <input
            aria-label="관심사"
            value={interestDraft}
            onChange={(event) => setInterestDraft(event.target.value)}
            placeholder="관심사를 쉼표로 구분해 입력"
          />
          <button className="action-button primary" onClick={submitGuest} type="button">
            게스트 프로필 저장
          </button>
        </div>
      </section>

      <section className="action-hud" aria-label="조작 HUD">
        <kbd>W/S</kbd><span>전후진</span>
        <kbd>A/D</kbd><span>회전</span>
        <kbd>Space</kbd><span>{isJumping ? "점프 중" : "점프"}</span>
        <kbd>E</kbd><span>{currentTable ? "일어나기" : closestTable ? "앉기" : "NPC/상호작용"}</span>
      </section>

      {mapOpen ? (
        <FullMapOverlay
          audibleGuests={audibleGuests.map((item) => item.guest.id)}
          onClose={() => setMapOpen(false)}
          playerPosition={playerPosition}
          voiceRadius={voiceRadius}
        />
      ) : null}

      {selectedNpc ? (
        <section className="npc-dialog glass-panel" aria-label="NPC 대화">
          <div className="panel-header">
            <div>
              <span className="eyebrow">Local LLM NPC</span>
              <h2>{selectedNpc.name}</h2>
              <p>{selectedNpc.role} · {selectedNpc.personality}</p>
            </div>
            <button className="icon-button" onClick={() => setSelectedNpc(null)} type="button" title="닫기">
              <X size={16} aria-hidden />
            </button>
          </div>
          <div className="npc-reply">
            {npcReply ?? "가까이 다가왔네요. 궁금한 걸 짧게 물어보세요."}
            {npcProvider ? <span>{npcProvider === "ollama" ? "Ollama 응답" : "Fallback 응답"}</span> : null}
          </div>
          <div className="npc-input-row">
            <input
              aria-label="NPC에게 말하기"
              value={npcMessage}
              onChange={(event) => setNpcMessage(event.target.value)}
              placeholder="예: 이 도시에서 누구와 이야기하면 좋을까?"
            />
            <button className="action-button primary" disabled={npcLoading} onClick={() => askNpc(selectedNpc)} type="button">
              {npcLoading ? "생각 중" : "말하기"}
            </button>
          </div>
        </section>
      ) : null}

      {selectedGuest ? (
        <section className="conversation-dock glass-panel" aria-label="선택한 사람">
          <div>
            <strong>{selectedGuest.name}</strong>
            <span>{getLounge(selectedGuest.loungeId).name} · {selectedGuest.role} · {selectedGuest.interests.join(", ")}</span>
          </div>
          <div className="control-row">
            <button className="action-button primary" onClick={() => requestPrivate(selectedGuest.id, selectedGuest.name)} type="button">
              <Users size={16} aria-hidden />
              1:1 포드
            </button>
            <button className="action-button" onClick={() => wave(selectedGuest.name)} type="button">
              <Hand size={16} aria-hidden />
              손 흔들기
            </button>
            <button className="action-button" onClick={() => reportGuest(selectedGuest.name)} type="button">
              <Flag size={16} aria-hidden />
              신고
            </button>
            <button className="action-button" onClick={() => blockGuest(selectedGuest.id, selectedGuest.name)} type="button">
              <Shield size={16} aria-hidden />
              차단
            </button>
            <button className="icon-button" onClick={() => setSelectedGuest(null)} type="button" title="닫기">
              <X size={16} aria-hidden />
            </button>
          </div>
        </section>
      ) : null}

      {currentTable ? (
        <section className="conversation-dock glass-panel" aria-live="polite">
          <div>
            <strong>{currentTable.label}</strong>
            <span>{currentTableDistrict?.name ?? "도시"} · 의자에 앉아 있습니다 · {currentTable.topic}</span>
          </div>
          <button className="seat-button active" onClick={leaveTable} type="button">
            착석 중
          </button>
        </section>
      ) : null}

      {privateGuest ? (
        <section className="conversation-dock glass-panel" aria-live="polite">
          <div>
            <strong>{privateGuest.name}님과의 1:1 포드</strong>
            <span>상호 동의 공간 · 음성 분리 · 언제든 나가기 가능</span>
          </div>
          <button className="seat-button active" onClick={leavePrivate} type="button">
            포드 나가기
          </button>
        </section>
      ) : null}

      <div className="connection-note">
        <Radio size={14} aria-hidden />
        현재 화면은 실시간 접속 구조 준비 상태이며, 실제 다중 접속/음성은 Realtime + WebRTC 서버 연결이 필요합니다.
      </div>
      {toast ? <div className="toast glass-panel">{toast}</div> : null}
    </main>
  );

  async function askNpc(npc: CityNpc) {
    setNpcLoading(true);
    try {
      const response = await fetch("/api/npc/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          npcId: npc.id,
          message: npcMessage,
          context: `플레이어 위치 ${playerPosition.map((v) => v.toFixed(1)).join(", ")}`
        })
      });
      const data = (await response.json()) as { text?: string; provider?: string };
      setNpcReply(data.text ?? "잠깐 생각이 끊겼어요. 다시 말해줄래요?");
      setNpcProvider(data.provider ?? "fallback");
      setNpcMessage("");
    } finally {
      setNpcLoading(false);
    }
  }
}

function GameMinimap({
  onOpenMap,
  playerHeading,
  playerPosition,
  voiceRadius
}: {
  onOpenMap: () => void;
  playerHeading: number;
  playerPosition: [number, number, number];
  voiceRadius: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const scale = MINIMAP_SIZE / (MAP_LIMIT * 2);
    const toMap = (x: number, z: number) => ({
      x: (x + MAP_LIMIT) * scale,
      y: (MAP_LIMIT - z) * scale
    });

    ctx.clearRect(0, 0, MINIMAP_SIZE, MINIMAP_SIZE);

    const bg = ctx.createRadialGradient(MINIMAP_SIZE / 2, MINIMAP_SIZE / 2, 16, MINIMAP_SIZE / 2, MINIMAP_SIZE / 2, MINIMAP_SIZE / 2);
    bg.addColorStop(0, "#52695f");
    bg.addColorStop(0.55, "#394e45");
    bg.addColorStop(1, "#24312d");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, MINIMAP_SIZE, MINIMAP_SIZE);

    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= MINIMAP_SIZE; i += 23) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, MINIMAP_SIZE);
      ctx.moveTo(0, i);
      ctx.lineTo(MINIMAP_SIZE, i);
      ctx.stroke();
    }

    ctx.strokeStyle = "rgba(235,238,232,0.55)";
    ctx.lineWidth = 4;
    [-216, -180, -144, -108, -72, -36, 0, 36, 72, 108, 144, 180, 216].forEach((line) => {
      const a = toMap(line, -MAP_LIMIT);
      const b = toMap(line, MAP_LIMIT);
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();

      const c = toMap(-MAP_LIMIT, line);
      const d = toMap(MAP_LIMIT, line);
      ctx.beginPath();
      ctx.moveTo(c.x, c.y);
      ctx.lineTo(d.x, d.y);
      ctx.stroke();
    });

    allTables.forEach((table) => {
      const point = toMap(table.position[0], table.position[2]);
      ctx.fillStyle = table.color;
      ctx.beginPath();
      ctx.arc(point.x, point.y, 2.8, 0, Math.PI * 2);
      ctx.fill();
    });

    const player = toMap(playerPosition[0], playerPosition[2]);
    ctx.fillStyle = "rgba(96, 208, 180, 0.14)";
    ctx.strokeStyle = "rgba(96, 208, 180, 0.42)";
    ctx.lineWidth = 1.3;
    ctx.beginPath();
    ctx.arc(player.x, player.y, voiceRadius * scale, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.save();
    ctx.translate(player.x, player.y);
    ctx.rotate(playerHeading);
    ctx.fillStyle = "rgba(255,255,255,0.34)";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, 20, -0.5, 0.5);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    ctx.fillStyle = "#2b8c73";
    ctx.beginPath();
    ctx.arc(player.x, player.y, 4.6, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 1.4;
    ctx.stroke();
  }, [playerHeading, playerPosition, voiceRadius]);

  return (
    <button className="mini-map game-map" aria-label="도시 미니맵 열기" onClick={onOpenMap} type="button">
      <canvas ref={canvasRef} width={MINIMAP_SIZE} height={MINIMAP_SIZE} />
      <span className="compass north">N</span>
      <span className="compass east">E</span>
      <span className="compass south">S</span>
      <span className="compass west">W</span>
      <div className="mini-map-header">
        <strong>도시 미니맵</strong>
        <span><Volume2 size={12} aria-hidden /> {voiceRadius}m</span>
      </div>
    </button>
  );
}

function FullMapOverlay({
  audibleGuests,
  onClose,
  playerPosition,
  voiceRadius
}: {
  audibleGuests: string[];
  onClose: () => void;
  playerPosition: [number, number, number];
  voiceRadius: number;
}) {
  const toMapStyle = (x: number, z: number) => ({
    left: `${((x + MAP_LIMIT) / (MAP_LIMIT * 2)) * 100}%`,
    top: `${((MAP_LIMIT - z) / (MAP_LIMIT * 2)) * 100}%`
  });

  return (
    <section className="full-map glass-panel" aria-label="전체 지도">
      <div className="panel-header">
        <div>
          <span className="eyebrow">Live City Map</span>
          <h2>전체 지도</h2>
          <p>실시간 사용자, NPC, 활성 테이블, 근접 음성 반경을 한 번에 봅니다.</p>
        </div>
        <button className="icon-button" onClick={onClose} type="button" title="닫기">
          <X size={16} aria-hidden />
        </button>
      </div>
      <div className="full-map-grid">
        <div className="full-map-canvas">
          {[-216, -180, -144, -108, -72, -36, 0, 36, 72, 108, 144, 180, 216].map((line) => (
            <span className="full-map-road vertical" key={`v-${line}`} style={{ left: `${((line + MAP_LIMIT) / (MAP_LIMIT * 2)) * 100}%` }} />
          ))}
          {[-216, -180, -144, -108, -72, -36, 0, 36, 72, 108, 144, 180, 216].map((line) => (
            <span className="full-map-road horizontal" key={`h-${line}`} style={{ top: `${((MAP_LIMIT - line) / (MAP_LIMIT * 2)) * 100}%` }} />
          ))}
          <span
            className="full-map-voice"
            style={{
              ...toMapStyle(playerPosition[0], playerPosition[2]),
              width: `${(voiceRadius / MAP_LIMIT) * 100}%`,
              height: `${(voiceRadius / MAP_LIMIT) * 100}%`
            }}
          />
          {allTables.map((table) => (
            <span className="full-map-table" key={table.id} style={{ ...toMapStyle(table.position[0], table.position[2]), background: table.color }} title={table.label} />
          ))}
          {allGuests.map((guest) => (
            <span className={`full-map-user ${audibleGuests.includes(guest.id) ? "active" : ""}`} key={guest.id} style={toMapStyle(guest.position[0], guest.position[2])} title={guest.name} />
          ))}
          {cityNpcs.map((npc) => (
            <span className="full-map-npc" key={npc.id} style={toMapStyle(npc.position[0], npc.position[2])} title={npc.name} />
          ))}
          <span className="full-map-player" style={toMapStyle(playerPosition[0], playerPosition[2])} />
        </div>
        <div className="full-map-stats">
          <strong>활성 상태</strong>
          <p>실시간 사용자 준비: {allGuests.length + 1}명</p>
          <p>현재 들리는 사람: {audibleGuests.length}명</p>
          <p>NPC: {cityNpcs.length}명</p>
          <p>활성 테이블: {allTables.length}개</p>
          <p>음성 반경: {voiceRadius}m</p>
          <span>초록 점은 내 위치, 파란 점은 들리는 사용자, 보라 점은 NPC입니다.</span>
        </div>
      </div>
    </section>
  );
}

function planarDistance(a: [number, number, number], b: [number, number, number]) {
  const dx = a[0] - b[0];
  const dz = a[2] - b[2];
  return Math.sqrt(dx * dx + dz * dz);
}

function getCrowdCount(position: [number, number, number]) {
  return allGuests.filter((guest) => planarDistance(position, guest.position) <= 18).length;
}

function getVoiceRadius(crowdCount: number) {
  return BASE_VOICE_RADIUS + Math.min(12, Math.max(0, crowdCount - 2) * 3);
}

function isGuestSpeaking(index: number, tick: number) {
  return (tick + index) % 4 === 0;
}

function getModeLabel(mode: string) {
  if (mode === "table") return "착석";
  if (mode === "private") return "1:1";
  return "이동 중";
}
