import { useState } from "react";

const ENGINEERS = [
  { id: 1, name: "Dave R.", colour: "#2563eb" },
  { id: 2, name: "Mike T.", colour: "#16a34a" },
  { id: 3, name: "Sam K.", colour: "#9333ea" },
  { id: 4, name: "Jo W.", colour: "#dc2626" },
];

const STATUS_CONFIG = {
  unassigned: { label: "Unassigned", bg: "#f1f5f9", text: "#64748b", border: "#cbd5e1" },
  scheduled:  { label: "Scheduled",  bg: "#eff6ff", text: "#2563eb", border: "#93c5fd" },
  "en-route": { label: "En Route",   bg: "#fefce8", text: "#ca8a04", border: "#fde047" },
  "on-site":  { label: "On Site",    bg: "#f0fdf4", text: "#16a34a", border: "#86efac" },
  complete:   { label: "Complete",   bg: "#f8fafc", text: "#94a3b8", border: "#e2e8f0" },
  cancelled:  { label: "Cancelled",  bg: "#fef2f2", text: "#dc2626", border: "#fca5a5" },
};

const HOURS = Array.from({ length: 10 }, (_, i) => i + 7); // 7am–4pm

const initialJobs = [
  { id: 1, title: "Boiler service", customer: "Mrs Harris", address: "14 Elm St, Exeter", phone: "07700 900123", engineerId: 1, date: "2026-06-15", startHour: 8, duration: 1, status: "scheduled", type: "Gas" },
  { id: 2, title: "New sockets install", customer: "Mr Patel", address: "22 Oak Ave, Honiton", phone: "07700 900456", engineerId: 2, date: "2026-06-15", startHour: 9, duration: 2, status: "en-route", type: "Electrical" },
  { id: 3, title: "Leak repair", customer: "Thornton Ltd", address: "8 Fore St, Sidmouth", phone: "07700 900789", engineerId: 3, date: "2026-06-15", startHour: 10, duration: 1, status: "on-site", type: "Plumbing" },
  { id: 4, title: "Annual inspection", customer: "Mrs Fowler", address: "3 Chapel Rd, Axminster", phone: "07700 900321", engineerId: null, date: "2026-06-15", startHour: 11, duration: 2, status: "unassigned", type: "Gas" },
  { id: 5, title: "Consumer unit upgrade", customer: "Green & Sons", address: "19 High St, Tiverton", phone: "07700 900654", engineerId: 1, date: "2026-06-15", startHour: 11, duration: 3, status: "scheduled", type: "Electrical" },
];

let nextId = 6;

const EMPTY_JOB = {
  title: "", customer: "", address: "", phone: "",
  engineerId: null, date: "2026-06-15", startHour: 8, duration: 1,
  status: "scheduled", type: "Plumbing",
};

function fmt12(h) {
  const suffix = h >= 12 ? "pm" : "am";
  const display = h > 12 ? h - 12 : h;
  return `${display}${suffix}`;
}

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span style={{
      fontSize: 11, fontWeight: 600, padding: "2px 7px", borderRadius: 4,
      background: cfg.bg, color: cfg.text, border: `1px solid ${cfg.border}`,
      letterSpacing: "0.03em", textTransform: "uppercase",
    }}>{cfg.label}</span>
  );
}

function JobModal({ job, onSave, onDelete, onClose }) {
  const [form, setForm] = useState({ ...job });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const inputStyle = {
    width: "100%", padding: "7px 10px", borderRadius: 6,
    border: "1px solid #d1d5db", fontSize: 13, outline: "none",
    fontFamily: "inherit", boxSizing: "border-box",
  };
  const label = { display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 4 };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center" }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ background: "#fff", borderRadius: 10, width: 480, maxWidth: "95vw", boxShadow: "0 20px 60px rgba(0,0,0,0.2)", overflow: "hidden" }}>
        {/* Header */}
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #e5e7eb", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontWeight: 700, fontSize: 15, color: "#111827" }}>{job.id ? "Edit Job" : "New Job"}</span>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#9ca3af", lineHeight: 1 }}>×</button>
        </div>
        {/* Body */}
        <div style={{ padding: "18px 20px", display: "grid", gap: 12 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={label}>Job Title</label>
              <input style={inputStyle} value={form.title} onChange={e => set("title", e.target.value)} placeholder="e.g. Boiler service" />
            </div>
            <div>
              <label style={label}>Type</label>
              <select style={inputStyle} value={form.type} onChange={e => set("type", e.target.value)}>
                {["Plumbing","Electrical","Gas","Heating","General"].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label style={label}>Customer</label>
            <input style={inputStyle} value={form.customer} onChange={e => set("customer", e.target.value)} placeholder="Full name or company" />
          </div>
          <div>
            <label style={label}>Address</label>
            <input style={inputStyle} value={form.address} onChange={e => set("address", e.target.value)} placeholder="Job site address" />
          </div>
          <div>
            <label style={label}>Phone</label>
            <input style={inputStyle} value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="07..." />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            <div>
              <label style={label}>Date</label>
              <input style={inputStyle} type="date" value={form.date} onChange={e => set("date", e.target.value)} />
            </div>
            <div>
              <label style={label}>Start Time</label>
              <select style={inputStyle} value={form.startHour} onChange={e => set("startHour", +e.target.value)}>
                {HOURS.map(h => <option key={h} value={h}>{fmt12(h)}</option>)}
              </select>
            </div>
            <div>
              <label style={label}>Duration (hrs)</label>
              <select style={inputStyle} value={form.duration} onChange={e => set("duration", +e.target.value)}>
                {[0.5,1,1.5,2,2.5,3,4,5,6].map(d => <option key={d} value={d}>{d}h</option>)}
              </select>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={label}>Assign To</label>
              <select style={inputStyle} value={form.engineerId ?? ""} onChange={e => set("engineerId", e.target.value ? +e.target.value : null)}>
                <option value="">— Unassigned —</option>
                {ENGINEERS.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
              </select>
            </div>
            <div>
              <label style={label}>Status</label>
              <select style={inputStyle} value={form.status} onChange={e => set("status", e.target.value)}>
                {Object.entries(STATUS_CONFIG).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
              </select>
            </div>
          </div>
        </div>
        {/* Footer */}
        <div style={{ padding: "12px 20px", borderTop: "1px solid #e5e7eb", display: "flex", justifyContent: "space-between" }}>
          <div>
            {job.id && (
              <button onClick={() => onDelete(job.id)} style={{ padding: "7px 14px", borderRadius: 6, border: "1px solid #fca5a5", background: "#fff", color: "#dc2626", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                Delete Job
              </button>
            )}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={onClose} style={{ padding: "7px 14px", borderRadius: 6, border: "1px solid #d1d5db", background: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", color: "#374151" }}>Cancel</button>
            <button onClick={() => onSave(form)} style={{ padding: "7px 16px", borderRadius: 6, border: "none", background: "#2563eb", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Save Job</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Dispatch Board View ────────────────────────────────────────────
function DispatchBoard({ jobs, onJobClick }) {
  const COL = 80; // px per hour
  const ROW = 64; // px per engineer row
  const LABEL_W = 100;

  return (
    <div style={{ overflowX: "auto", background: "#fff", borderRadius: 8, border: "1px solid #e5e7eb" }}>
      <div style={{ minWidth: LABEL_W + COL * HOURS.length }}>
        {/* Header: time labels */}
        <div style={{ display: "flex", borderBottom: "1px solid #e5e7eb", background: "#f8fafc" }}>
          <div style={{ width: LABEL_W, minWidth: LABEL_W, padding: "8px 12px", fontSize: 12, fontWeight: 700, color: "#6b7280" }}>ENGINEER</div>
          {HOURS.map(h => (
            <div key={h} style={{ width: COL, minWidth: COL, padding: "8px 4px", fontSize: 11, color: "#9ca3af", fontWeight: 600, borderLeft: "1px solid #f1f5f9" }}>
              {fmt12(h)}
            </div>
          ))}
        </div>

        {/* Engineer rows */}
        {ENGINEERS.map(eng => {
          const engJobs = jobs.filter(j => j.engineerId === eng.id);
          return (
            <div key={eng.id} style={{ display: "flex", borderBottom: "1px solid #f1f5f9", position: "relative", height: ROW }}>
              {/* Name col */}
              <div style={{ width: LABEL_W, minWidth: LABEL_W, padding: "0 12px", display: "flex", alignItems: "center", gap: 8, borderRight: "1px solid #e5e7eb", background: "#fafafa" }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: eng.colour, flexShrink: 0 }} />
                <span style={{ fontSize: 12, fontWeight: 600, color: "#374151", whiteSpace: "nowrap" }}>{eng.name}</span>
              </div>
              {/* Hour grid */}
              <div style={{ position: "relative", flex: 1, display: "flex" }}>
                {HOURS.map(h => (
                  <div key={h} style={{ width: COL, minWidth: COL, height: "100%", borderLeft: "1px solid #f1f5f9" }} />
                ))}
                {/* Job blocks */}
                {engJobs.map(job => {
                  const left = (job.startHour - HOURS[0]) * COL;
                  const width = job.duration * COL - 4;
                  const cfg = STATUS_CONFIG[job.status];
                  return (
                    <div key={job.id} onClick={() => onJobClick(job)}
                      style={{
                        position: "absolute", left, top: 6, height: ROW - 12, width,
                        background: cfg.bg, border: `1.5px solid ${cfg.border}`,
                        borderLeft: `4px solid ${eng.colour}`,
                        borderRadius: 5, padding: "4px 7px", cursor: "pointer",
                        overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
                        transition: "box-shadow 0.15s",
                      }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: "#111827", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{job.title}</div>
                      <div style={{ fontSize: 10, color: "#6b7280", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{job.customer}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Unassigned row */}
        {(() => {
          const unassigned = jobs.filter(j => !j.engineerId);
          return (
            <div style={{ display: "flex", position: "relative", height: unassigned.length ? ROW : 40, background: "#fffbeb" }}>
              <div style={{ width: LABEL_W, minWidth: LABEL_W, padding: "0 12px", display: "flex", alignItems: "center", gap: 8, borderRight: "1px solid #e5e7eb" }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: "#92400e" }}>⚠ UNASSIGNED</span>
              </div>
              <div style={{ position: "relative", flex: 1, display: "flex" }}>
                {HOURS.map(h => (
                  <div key={h} style={{ width: COL, minWidth: COL, height: "100%", borderLeft: "1px solid #fde68a" }} />
                ))}
                {unassigned.map(job => {
                  const left = (job.startHour - HOURS[0]) * COL;
                  const width = job.duration * COL - 4;
                  return (
                    <div key={job.id} onClick={() => onJobClick(job)}
                      style={{
                        position: "absolute", left, top: 6, height: ROW - 12, width,
                        background: "#fef9c3", border: "1.5px dashed #fbbf24",
                        borderRadius: 5, padding: "4px 7px", cursor: "pointer", overflow: "hidden",
                      }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: "#78350f", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{job.title}</div>
                      <div style={{ fontSize: 10, color: "#92400e" }}>{job.customer}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}

// ── Job List View ──────────────────────────────────────────────────
function JobList({ jobs, onJobClick }) {
  return (
    <div style={{ background: "#fff", borderRadius: 8, border: "1px solid #e5e7eb", overflow: "hidden" }}>
      {/* Table header */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 1.5fr 1fr 1fr 100px", padding: "10px 16px", background: "#f8fafc", borderBottom: "1px solid #e5e7eb", gap: 8 }}>
        {["Job", "Customer", "Address", "Time", "Assigned To", "Status"].map(h => (
          <span key={h} style={{ fontSize: 11, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.04em" }}>{h}</span>
        ))}
      </div>
      {jobs.map((job, i) => {
        const eng = ENGINEERS.find(e => e.id === job.engineerId);
        return (
          <div key={job.id} onClick={() => onJobClick(job)}
            style={{
              display: "grid", gridTemplateColumns: "2fr 1.5fr 1.5fr 1fr 1fr 100px",
              padding: "12px 16px", gap: 8, cursor: "pointer", alignItems: "center",
              borderBottom: i < jobs.length - 1 ? "1px solid #f1f5f9" : "none",
              background: "white", transition: "background 0.1s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#f8fafc"}
            onMouseLeave={e => e.currentTarget.style.background = "white"}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>{job.title}</div>
              <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 1 }}>{job.type}</div>
            </div>
            <div style={{ fontSize: 13, color: "#374151" }}>{job.customer}</div>
            <div style={{ fontSize: 12, color: "#6b7280" }}>{job.address}</div>
            <div style={{ fontSize: 12, color: "#374151" }}>{fmt12(job.startHour)}{job.duration > 0 ? ` · ${job.duration}h` : ""}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              {eng ? (
                <>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: eng.colour }} />
                  <span style={{ fontSize: 12, color: "#374151" }}>{eng.name}</span>
                </>
              ) : (
                <span style={{ fontSize: 12, color: "#f59e0b", fontWeight: 600 }}>Unassigned</span>
              )}
            </div>
            <StatusBadge status={job.status} />
          </div>
        );
      })}
      {jobs.length === 0 && (
        <div style={{ padding: "40px 16px", textAlign: "center", color: "#9ca3af", fontSize: 13 }}>No jobs for this date.</div>
      )}
    </div>
  );
}

// ── Main App ───────────────────────────────────────────────────────
export default function TradeSchedule() {
  const [jobs, setJobs] = useState(initialJobs);
  const [view, setView] = useState("board"); // board | list
  const [date, setDate] = useState("2026-06-15");
  const [modal, setModal] = useState(null); // null | job object
  const [filterStatus, setFilterStatus] = useState("all");

  const visibleJobs = jobs.filter(j => {
    if (j.date !== date) return false;
    if (filterStatus !== "all" && j.status !== filterStatus) return false;
    return true;
  });

  const openNew = () => setModal({ ...EMPTY_JOB, date });
  const openEdit = (job) => setModal({ ...job });

  const saveJob = (form) => {
    if (form.id) {
      setJobs(js => js.map(j => j.id === form.id ? form : j));
    } else {
      setJobs(js => [...js, { ...form, id: nextId++ }]);
    }
    setModal(null);
  };

  const deleteJob = (id) => {
    setJobs(js => js.filter(j => j.id !== id));
    setModal(null);
  };

  // Stats
  const todayJobs = jobs.filter(j => j.date === date);
  const stats = [
    { label: "Total Jobs", value: todayJobs.length, colour: "#2563eb" },
    { label: "Unassigned", value: todayJobs.filter(j => !j.engineerId).length, colour: "#f59e0b" },
    { label: "On Site", value: todayJobs.filter(j => j.status === "on-site").length, colour: "#16a34a" },
    { label: "Complete", value: todayJobs.filter(j => j.status === "complete").length, colour: "#94a3b8" },
  ];

  const btnBase = {
    padding: "7px 14px", borderRadius: 6, fontSize: 13, fontWeight: 600,
    cursor: "pointer", border: "1px solid transparent", transition: "all 0.15s",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f1f5f9", fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Top nav */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "0 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: 6, background: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 14 }}>🔧</span>
            </div>
            <span style={{ fontWeight: 800, fontSize: 16, color: "#111827", letterSpacing: "-0.02em" }}>TradeSchedule</span>
          </div>
          <button onClick={openNew}
            style={{ ...btnBase, background: "#2563eb", color: "#fff", border: "none", padding: "8px 16px" }}>
            + New Job
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "20px 24px" }}>
        {/* Stat bar */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 20 }}>
          {stats.map(s => (
            <div key={s.label} style={{ background: "#fff", borderRadius: 8, padding: "14px 18px", border: "1px solid #e5e7eb" }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: s.colour }}>{s.value}</div>
              <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2, fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
          <input type="date" value={date} onChange={e => setDate(e.target.value)}
            style={{ padding: "7px 10px", borderRadius: 6, border: "1px solid #d1d5db", fontSize: 13, fontFamily: "inherit", outline: "none" }} />

          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
            style={{ padding: "7px 10px", borderRadius: 6, border: "1px solid #d1d5db", fontSize: 13, fontFamily: "inherit", outline: "none" }}>
            <option value="all">All statuses</option>
            {Object.entries(STATUS_CONFIG).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
          </select>

          <div style={{ marginLeft: "auto", display: "flex", background: "#f1f5f9", borderRadius: 7, padding: 3, gap: 2 }}>
            {[["board","Board"], ["list","List"]].map(([v, l]) => (
              <button key={v} onClick={() => setView(v)}
                style={{ ...btnBase, background: view === v ? "#fff" : "transparent", color: view === v ? "#111827" : "#6b7280", border: "none", boxShadow: view === v ? "0 1px 3px rgba(0,0,0,0.1)" : "none", padding: "6px 14px" }}>
                {l === "Board" ? "▦ " : "☰ "}{l}
              </button>
            ))}
          </div>
        </div>

        {/* Main view */}
        {view === "board"
          ? <DispatchBoard jobs={visibleJobs} onJobClick={openEdit} />
          : <JobList jobs={visibleJobs} onJobClick={openEdit} />
        }

        {/* Legend */}
        <div style={{ display: "flex", gap: 16, marginTop: 14, flexWrap: "wrap" }}>
          {Object.entries(STATUS_CONFIG).map(([k, v]) => (
            <div key={k} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: v.bg, border: `1.5px solid ${v.border}` }} />
              <span style={{ fontSize: 11, color: "#6b7280" }}>{v.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <JobModal
          job={modal}
          onSave={saveJob}
          onDelete={deleteJob}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}
