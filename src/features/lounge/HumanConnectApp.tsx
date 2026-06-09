"use client";

import { Flag, Hand, Mic, MicOff, Shield, UserRound, Users, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { getLounge, lounges, type Guest } from "./loungeData";
import { useLoungeStore } from "./loungeStore";
import { LoungeWorld } from "./LoungeWorld";

const NEAR_GUEST_RADIUS = 5.2;
const NEAR_TABLE_RADIUS = 6.8;

export function HumanConnectApp() {
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const [nameDraft, setNameDraft] = useState("익명 빌더");
  const [interestDraft, setInterestDraft] = useState("창업, 디자인, AI");
  const {
    loungeId,
    nickname,
    interests,
    currentTableId,
    privateGuestId,
    playerPosition,
    muted,
    toast,
    mode,
    setLounge,
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

  const lounge = useMemo(() => getLounge(loungeId), [loungeId]);
  const currentTable = lounge.tables.find((table) => table.id === currentTableId);
  const privateGuest = lounge.guests.find((guest) => guest.id === privateGuestId);
  const nearbyGuests = useMemo(
    () =>
      lounge.guests
        .map((guest) => ({ guest, distance: planarDistance(playerPosition, guest.position) }))
        .sort((a, b) => a.distance - b.distance),
    [lounge.guests, playerPosition]
  );
  const closestGuest = nearbyGuests.find((item) => item.distance <= NEAR_GUEST_RADIUS);
  const closestTable = useMemo(
    () =>
      lounge.tables
        .map((table) => ({ table, distance: planarDistance(playerPosition, table.position) }))
        .sort((a, b) => a.distance - b.distance)
        .find((item) => item.distance <= NEAR_TABLE_RADIUS),
    [lounge.tables, playerPosition]
  );

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
        <LoungeWorld lounge={lounge} onSelectGuest={setSelectedGuest} />
      </div>

      <header className="topbar">
        <section className="brand-panel" aria-label="Human Connect">
          <h1>Human Connect</h1>
          <p>{lounge.prompt}</p>
        </section>

        <nav className="lounge-tabs" aria-label="라운지 선택">
          {lounges.map((item) => (
            <button
              className={`tab-button ${item.id === lounge.id ? "active" : ""}`}
              key={item.id}
              onClick={() => setLounge(item.id)}
              type="button"
            >
              <Users size={16} aria-hidden />
              {item.name}
            </button>
          ))}
        </nav>

        <section className="status-panel" aria-label="세션 상태">
          <div className="status-grid">
            <div>
              <span>상태</span>
              <strong>{getModeLabel(mode)}</strong>
            </div>
            <div>
              <span>인원</span>
              <strong>{lounge.guests.length + 1}</strong>
            </div>
            <div>
              <span>마이크</span>
              <strong>{muted ? "꺼짐" : "켜짐"}</strong>
            </div>
          </div>
        </section>
      </header>

      <aside className="side-panel" aria-label="대화 조작 패널">
        <div className="panel-header">
          <div>
            <h2>{lounge.name}</h2>
            <p>{lounge.tone}</p>
          </div>
          <button className="icon-button" onClick={() => wave()} type="button" title="손 흔들기">
            <Hand size={18} aria-hidden />
          </button>
        </div>

        <div className="control-row">
          <button className="action-button" onClick={toggleMute} type="button">
            {muted ? <MicOff size={16} aria-hidden /> : <Mic size={16} aria-hidden />}
            {muted ? "마이크 켜기" : "마이크 끄기"}
          </button>
          {currentTable ? (
            <button className="action-button" onClick={leaveTable} type="button">
              <X size={16} aria-hidden />
              테이블 떠나기
            </button>
          ) : null}
          {privateGuest ? (
            <button className="action-button" onClick={leavePrivate} type="button">
              <X size={16} aria-hidden />
              포드 떠나기
            </button>
          ) : null}
        </div>

        <div className="nearby-card">
          <strong>
            {closestGuest
              ? `${closestGuest.guest.name}님이 근처에 있습니다`
              : closestTable
                ? `${closestTable.table.label}이 근처에 있습니다`
                : "도시를 둘러보세요"}
          </strong>
          <span>
            {closestGuest
              ? "E 키를 누르거나 카드를 열어 손 흔들기, 1:1 포드 요청, 신고, 차단을 할 수 있습니다."
              : closestTable
                ? "E 키를 누르거나 구역을 클릭하면 이 주제 테이블에 앉습니다."
                : "열린 광장을 걸어보세요. 사람이나 테이블에 가까워지면 상호작용이 열립니다."}
          </span>
        </div>

        <h3 className="section-title">주제 테이블</h3>
        <div className="table-list">
          {lounge.tables.map((table) => (
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
                  <span className="pill">음성 구역</span>
                </div>
              </div>
            </button>
          ))}
        </div>

        <h3 className="section-title">근처 사람들</h3>
        <div className="people-list">
          {nearbyGuests.map(({ guest, distance }) => (
            <button
              className={`person-card ${distance <= NEAR_GUEST_RADIUS ? "near" : ""}`}
              key={guest.id}
              onClick={() => setSelectedGuest(guest)}
              type="button"
            >
              <strong>{guest.name}</strong>
              <span>{guest.role}</span>
              <div className="person-meta">
                <span className="pill">{distance.toFixed(1)}m</span>
                {guest.interests.map((interest) => (
                  <span className="pill" key={interest}>
                    {interest}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </aside>

      <section className="entry-panel" aria-label="게스트 프로필">
        <div className="panel-header">
          <div>
            <h2>{nickname}</h2>
            <p>{interests.join(" · ")}</p>
          </div>
          <UserRound size={22} aria-hidden />
        </div>
        <div className="entry-form">
          <input
            aria-label="닉네임"
            value={nameDraft}
            onChange={(event) => setNameDraft(event.target.value)}
            placeholder="닉네임"
          />
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

      {selectedGuest ? (
        <section className="conversation-dock" aria-label="선택한 사람">
          <div>
            <strong>{selectedGuest.name}</strong>
            <span>{selectedGuest.role} · {selectedGuest.interests.join(", ")}</span>
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
        <section className="conversation-dock" aria-live="polite">
          <div>
            <strong>{currentTable.label}</strong>
            <span>{currentTable.topic}</span>
          </div>
          <button className="seat-button active" onClick={leaveTable} type="button">
            착석 중
          </button>
        </section>
      ) : null}

      {privateGuest ? (
        <section className="conversation-dock" aria-live="polite">
          <div>
            <strong>{privateGuest.name}님과의 1:1 포드</strong>
            <span>상호 동의 공간 · 음성 분리 · 언제든 나가기 가능</span>
          </div>
          <button className="seat-button active" onClick={leavePrivate} type="button">
            포드 나가기
          </button>
        </section>
      ) : null}

      <div className="hud-help">WASD 이동 · 화살표 시점 전환 후 자동 복귀 · E 근접 상호작용 · Space 손 흔들기</div>
      {toast ? <div className="toast">{toast}</div> : null}
    </main>
  );
}

function planarDistance(a: [number, number, number], b: [number, number, number]) {
  const dx = a[0] - b[0];
  const dz = a[2] - b[2];
  return Math.sqrt(dx * dx + dz * dz);
}

function getModeLabel(mode: string) {
  if (mode === "table") return "테이블";
  if (mode === "private") return "1:1";
  return "광장";
}
