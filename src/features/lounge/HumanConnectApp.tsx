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
  const [nameDraft, setNameDraft] = useState("Guest Builder");
  const [interestDraft, setInterestDraft] = useState("startup, design, AI");
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

        <nav className="lounge-tabs" aria-label="Lounge selection">
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

        <section className="status-panel" aria-label="Session status">
          <div className="status-grid">
            <div>
              <span>Mode</span>
              <strong>{mode}</strong>
            </div>
            <div>
              <span>People</span>
              <strong>{lounge.guests.length + 1}</strong>
            </div>
            <div>
              <span>Mic</span>
              <strong>{muted ? "Muted" : "Open"}</strong>
            </div>
          </div>
        </section>
      </header>

      <aside className="side-panel" aria-label="Conversation controls">
        <div className="panel-header">
          <div>
            <h2>{lounge.name}</h2>
            <p>{lounge.tone}</p>
          </div>
          <button className="icon-button" onClick={() => wave()} type="button" title="Wave">
            <Hand size={18} aria-hidden />
          </button>
        </div>

        <div className="control-row">
          <button className="action-button" onClick={toggleMute} type="button">
            {muted ? <MicOff size={16} aria-hidden /> : <Mic size={16} aria-hidden />}
            {muted ? "Unmute" : "Mute"}
          </button>
          {currentTable ? (
            <button className="action-button" onClick={leaveTable} type="button">
              <X size={16} aria-hidden />
              Leave table
            </button>
          ) : null}
          {privateGuest ? (
            <button className="action-button" onClick={leavePrivate} type="button">
              <X size={16} aria-hidden />
              Leave pod
            </button>
          ) : null}
        </div>

        <div className="nearby-card">
          <strong>
            {closestGuest
              ? `${closestGuest.guest.name} is nearby`
              : closestTable
                ? `${closestTable.table.label} is nearby`
                : "Explore the city"}
          </strong>
          <span>
            {closestGuest
              ? "Press E or open their card to wave, request a pod, report, or block."
              : closestTable
                ? "Press E or click the zone to sit at this topic table."
                : "Walk the open plaza. Interactions unlock when you approach people or tables."}
          </span>
        </div>

        <h3 className="section-title">Topic tables</h3>
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
                  <span className="pill">{table.occupied}/{table.seats} seated</span>
                  <span className="pill">voice zone</span>
                </div>
              </div>
            </button>
          ))}
        </div>

        <h3 className="section-title">People nearby</h3>
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

      <section className="entry-panel" aria-label="Guest profile">
        <div className="panel-header">
          <div>
            <h2>{nickname}</h2>
            <p>{interests.join(" · ")}</p>
          </div>
          <UserRound size={22} aria-hidden />
        </div>
        <div className="entry-form">
          <input
            aria-label="Nickname"
            value={nameDraft}
            onChange={(event) => setNameDraft(event.target.value)}
            placeholder="Nickname"
          />
          <input
            aria-label="Interests"
            value={interestDraft}
            onChange={(event) => setInterestDraft(event.target.value)}
            placeholder="Interests, separated by commas"
          />
          <button className="action-button primary" onClick={submitGuest} type="button">
            Update guest profile
          </button>
        </div>
      </section>

      {selectedGuest ? (
        <section className="conversation-dock" aria-label="Selected person">
          <div>
            <strong>{selectedGuest.name}</strong>
            <span>{selectedGuest.role} · {selectedGuest.interests.join(", ")}</span>
          </div>
          <div className="control-row">
            <button className="action-button primary" onClick={() => requestPrivate(selectedGuest.id, selectedGuest.name)} type="button">
              <Users size={16} aria-hidden />
              1:1 pod
            </button>
            <button className="action-button" onClick={() => wave(selectedGuest.name)} type="button">
              <Hand size={16} aria-hidden />
              Wave
            </button>
            <button className="action-button" onClick={() => reportGuest(selectedGuest.name)} type="button">
              <Flag size={16} aria-hidden />
              Report
            </button>
            <button className="action-button" onClick={() => blockGuest(selectedGuest.id, selectedGuest.name)} type="button">
              <Shield size={16} aria-hidden />
              Block
            </button>
            <button className="icon-button" onClick={() => setSelectedGuest(null)} type="button" title="Close">
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
            Seated
          </button>
        </section>
      ) : null}

      {privateGuest ? (
        <section className="conversation-dock" aria-live="polite">
          <div>
            <strong>Private pod with {privateGuest.name}</strong>
            <span>Mutual consent space · audio isolated · leave anytime</span>
          </div>
          <button className="seat-button active" onClick={leavePrivate} type="button">
            Exit pod
          </button>
        </section>
      ) : null}

      <div className="hud-help">WASD to roam · E to interact nearby · click avatars or table zones · space to wave</div>
      {toast ? <div className="toast">{toast}</div> : null}
    </main>
  );
}

function planarDistance(a: [number, number, number], b: [number, number, number]) {
  const dx = a[0] - b[0];
  const dz = a[2] - b[2];
  return Math.sqrt(dx * dx + dz * dz);
}
