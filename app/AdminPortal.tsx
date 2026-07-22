"use client";

import { FormEvent, useEffect, useState } from "react";
import { course, courseMinutes } from "./course";

type AdminTab = "overview" | "people" | "assignments" | "courses" | "reports" | "settings";

type Learner = {
  id: string;
  name: string;
  email: string;
  department: string;
  skillLevel: string;
  status: string;
  createdAt: string;
};

type Assignment = {
  id: string;
  learnerId: string;
  learnerName: string;
  learnerEmail: string;
  courseId: string;
  dueDate: string | null;
  status: string;
  createdAt: string;
};

type Completion = {
  id: string;
  learnerName: string;
  learnerEmail: string;
  courseId: string;
  score: number;
  certificateId: string;
  completedAt: string;
};

type AdminData = {
  learners: Learner[];
  assignments: Assignment[];
  completions: Completion[];
  settings: Record<string, string>;
};

const tabs: { id: AdminTab; label: string; icon: string }[] = [
  { id: "overview", label: "Overview", icon: "⌂" },
  { id: "people", label: "People", icon: "◎" },
  { id: "assignments", label: "Assignments", icon: "✓" },
  { id: "courses", label: "Courses", icon: "▤" },
  { id: "reports", label: "Reports", icon: "↗" },
  { id: "settings", label: "Settings", icon: "⚙" },
];

const emptyData: AdminData = { learners: [], assignments: [], completions: [], settings: {} };

export function AdminPortal({ onExit }: { onExit: () => void }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    fetch("/api/admin/login")
      .then((response) => response.json())
      .then((payload: { authenticated?: boolean }) => setAuthenticated(Boolean(payload.authenticated)))
      .finally(() => setChecking(false));
  }, []);

  async function login(event: FormEvent) {
    event.preventDefault();
    setLoginError("");
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!response.ok) {
      setLoginError("That password did not match. Try again.");
      return;
    }
    setAuthenticated(true);
    setPassword("");
  }

  if (checking) {
    return <div className="admin-loading" role="status">Opening the control room…</div>;
  }

  if (!authenticated) {
    return (
      <main className="admin-login-shell">
        <div className="admin-login-art" aria-hidden="true">
          <span>ADMIN CONTROL ROOM</span>
          <div className="control-board"><i /><i /><i /><i /><i /><i /></div>
          <div className="admin-character"><i /><b /></div>
          <strong>Set the course.<br />Support the crew.</strong>
        </div>
        <form className="admin-login-card comic-box" onSubmit={login}>
          <button className="back-button" type="button" onClick={onExit}>← Learner view</button>
          <span className="caption-label">ADMIN ACCESS</span>
          <h1>Welcome to the control room.</h1>
          <p>Assign training, manage learners, update policy guidance, and review completion records.</p>
          <label><span>Password</span><input autoFocus type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter admin password" /></label>
          {loginError && <div className="form-error" role="alert">{loginError}</div>}
          <button className="primary-button" type="submit">Open dashboard <span>→</span></button>
          <div className="demo-warning"><b>Prototype access</b><span>Temporary password: <code>123456</code>. Do not store real employee-sensitive data until production authentication is added.</span></div>
        </form>
      </main>
    );
  }

  return <AdminDashboard onExit={onExit} onSignedOut={() => setAuthenticated(false)} />;
}

function AdminDashboard({ onExit, onSignedOut }: { onExit: () => void; onSignedOut: () => void }) {
  const [tab, setTab] = useState<AdminTab>("overview");
  const [data, setData] = useState<AdminData>(emptyData);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  async function loadData() {
    setLoading(true);
    const response = await fetch("/api/admin");
    if (response.status === 401) {
      onSignedOut();
      return;
    }
    const payload = (await response.json()) as AdminData & { error?: string };
    if (!response.ok) setError(payload.error ?? "The dashboard could not load.");
    else setData(payload);
    setLoading(false);
  }

  useEffect(() => { void loadData(); }, []);

  async function action(payload: Record<string, unknown>, success: string) {
    setError("");
    setNotice("");
    const response = await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = (await response.json()) as { error?: string };
    if (!response.ok) {
      setError(result.error ?? "That change could not be saved.");
      return false;
    }
    setNotice(success);
    await loadData();
    return true;
  }

  async function signOut() {
    await fetch("/api/admin/login", { method: "DELETE" });
    onSignedOut();
  }

  const assignedCount = data.assignments.filter((item) => item.status !== "completed").length;
  const completionRate = data.assignments.length
    ? Math.round((data.assignments.filter((item) => item.status === "completed").length / data.assignments.length) * 100)
    : 0;
  const averageScore = data.completions.length
    ? Math.round(data.completions.reduce((sum, item) => sum + item.score, 0) / data.completions.length)
    : 0;

  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <div className="brand-lockup">
          <span className="brand-keys"><i>⌃</i><i>⌥</i><i>↵</i></span>
          <span><strong>Ctrl+Alt+Learn</strong><small>Admin control room</small></span>
        </div>
        <div className="admin-org"><span>ORGANIZATION</span><strong>{data.settings.organizationName || "Pilot Team"}</strong><small>{data.settings.industry || "Aviation"} edition</small></div>
        <nav aria-label="Admin dashboard">
          {tabs.map((item) => <button className={tab === item.id ? "active" : ""} key={item.id} onClick={() => setTab(item.id)} type="button"><span>{item.icon}</span>{item.label}</button>)}
        </nav>
        <div className="admin-side-actions"><button type="button" onClick={onExit}>Learner experience ↗</button><button type="button" onClick={signOut}>Lock admin</button></div>
      </aside>

      <section className="admin-main">
        <header className="admin-topbar">
          <div><span className="admin-live"><i /> ADMIN MODE</span><span className="demo-chip">DEMO SECURITY</span></div>
          <div className="profile"><span>AD</span><p><strong>Training Admin</strong><small>Organization owner</small></p></div>
        </header>
        {(notice || error) && <div className={`admin-toast ${error ? "error" : ""}`} role="status">{error || notice}<button type="button" onClick={() => { setNotice(""); setError(""); }}>×</button></div>}

        {loading ? <div className="admin-loading" role="status">Loading the control room…</div> : (
          <div className="admin-content page-enter">
            {tab === "overview" && <Overview data={data} assignedCount={assignedCount} completionRate={completionRate} averageScore={averageScore} setTab={setTab} />}
            {tab === "people" && <People data={data} action={action} />}
            {tab === "assignments" && <Assignments data={data} action={action} />}
            {tab === "courses" && <Courses data={data} action={action} />}
            {tab === "reports" && <Reports data={data} averageScore={averageScore} />}
            {tab === "settings" && <Settings data={data} action={action} />}
          </div>
        )}
      </section>
    </main>
  );
}

function PageHeading({ eyebrow, title, copy, action }: { eyebrow: string; title: string; copy: string; action?: React.ReactNode }) {
  return <div className="admin-heading"><div><span>{eyebrow}</span><h1>{title}</h1><p>{copy}</p></div>{action}</div>;
}

function Overview({ data, assignedCount, completionRate, averageScore, setTab }: { data: AdminData; assignedCount: number; completionRate: number; averageScore: number; setTab: (tab: AdminTab) => void }) {
  const recent = [...data.assignments].slice(0, 5);
  return <>
    <PageHeading eyebrow="CONTROL ROOM" title="Training at a glance" copy="Assign the course, support your crew, and keep AI learning moving." action={<button className="primary-button compact" onClick={() => setTab("assignments")} type="button">Assign training +</button>} />
    <div className="admin-metrics">
      <article><span>ACTIVE LEARNERS</span><strong>{data.learners.length}</strong><small>{data.learners.length ? "Ready for training" : "Add your first learner"}</small></article>
      <article><span>OPEN ASSIGNMENTS</span><strong>{assignedCount}</strong><small>{data.assignments.length} total assigned</small></article>
      <article><span>COMPLETION RATE</span><strong>{completionRate}%</strong><i><b style={{ width: `${completionRate}%` }} /></i></article>
      <article><span>AVERAGE SCORE</span><strong>{averageScore || "-"}</strong><small>{data.completions.length ? "Across completions" : "Waiting for results"}</small></article>
    </div>
    <div className="admin-overview-grid">
      <section className="admin-panel"><div className="admin-panel-title"><div><span>RECENT ACTIVITY</span><h2>Assignments</h2></div><button onClick={() => setTab("assignments")} type="button">View all →</button></div>
        {recent.length ? <div className="activity-list">{recent.map((item) => <div key={item.id}><span className={`status-dot ${item.status}`} /><p><strong>{item.learnerName}</strong><small>AI Chatbots: Intro 101 · {item.status}</small></p><time>{item.dueDate ? `Due ${item.dueDate}` : "No due date"}</time></div>)}</div> : <EmptyState title="No assignments yet" copy="Add a learner and assign Intro 101 to start the pilot." />}
      </section>
      <section className="admin-panel course-health"><div className="admin-panel-title"><div><span>COURSE HEALTH</span><h2>Intro 101 pilot</h2></div><b className="published">PUBLISHED</b></div><div className="course-mini-scene" aria-hidden="true"><i /><i /><span>AI?</span></div><ul><li><span>{course.length}</span> playable missions</li><li><span>{courseMinutes}m</span> course duration</li><li><span>{data.settings.passingScore || "80"}%</span> passing score</li></ul><button className="secondary-button" type="button" onClick={() => setTab("courses")}>Manage course</button></section>
    </div>
  </>;
}

function People({ data, action }: { data: AdminData; action: (payload: Record<string, unknown>, success: string) => Promise<boolean> }) {
  const [form, setForm] = useState({ name: "", email: "", department: "Operations", skillLevel: "Beginner" });
  async function submit(event: FormEvent) {
    event.preventDefault();
    if (await action({ action: "createLearner", ...form }, "Learner added to the roster.")) setForm({ name: "", email: "", department: "Operations", skillLevel: "Beginner" });
  }
  return <>
    <PageHeading eyebrow="PEOPLE" title="Build your learning roster" copy="Add employees, see their readiness level, and prepare assignments." />
    <form className="admin-form add-person" onSubmit={submit}><label><span>Full name</span><input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Alex Morgan" /></label><label><span>Work email</span><input required type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="alex@company.com" /></label><label><span>Team</span><input value={form.department} onChange={(event) => setForm({ ...form, department: event.target.value })} /></label><label><span>AI level</span><select value={form.skillLevel} onChange={(event) => setForm({ ...form, skillLevel: event.target.value })}><option>Beginner</option><option>Comfortable</option><option>Advanced</option></select></label><button className="primary-button compact" type="submit">Add learner +</button></form>
    <section className="admin-panel table-panel"><div className="admin-panel-title"><div><span>ROSTER</span><h2>{data.learners.length} learners</h2></div></div>{data.learners.length ? <div className="admin-table"><div className="table-row table-head"><span>Learner</span><span>Team</span><span>AI level</span><span>Status</span><span /></div>{data.learners.map((learner) => <div className="table-row" key={learner.id}><span className="person-cell"><i>{learner.name.split(" ").map((part) => part[0]).slice(0, 2).join("")}</i><b>{learner.name}<small>{learner.email}</small></b></span><span>{learner.department}</span><span>{learner.skillLevel}</span><span><b className="status-pill">{learner.status}</b></span><span><button className="icon-button danger" aria-label={`Remove ${learner.name}`} type="button" onClick={() => { if (window.confirm(`Remove ${learner.name} and their prototype records?`)) void action({ action: "deleteLearner", id: learner.id }, "Learner removed."); }}>×</button></span></div>)}</div> : <EmptyState title="Your roster is empty" copy="Add the first pilot learner using the form above." />}</section>
  </>;
}

function Assignments({ data, action }: { data: AdminData; action: (payload: Record<string, unknown>, success: string) => Promise<boolean> }) {
  const [learnerId, setLearnerId] = useState("");
  const [dueDate, setDueDate] = useState("");
  async function submit(event: FormEvent) { event.preventDefault(); if (await action({ action: "createAssignment", learnerId, courseId: "intro-101", dueDate }, "Course assigned.")) { setLearnerId(""); setDueDate(""); } }
  return <>
    <PageHeading eyebrow="ASSIGNMENTS" title="Put training on the schedule" copy="Assign Intro 101, choose a due date, and follow each learner’s status." />
    <form className="admin-form assignment-form" onSubmit={submit}><label><span>Learner</span><select required value={learnerId} onChange={(event) => setLearnerId(event.target.value)}><option value="">Choose a learner</option>{data.learners.map((learner) => <option value={learner.id} key={learner.id}>{learner.name} · {learner.department}</option>)}</select></label><label><span>Course</span><select disabled><option>AI Chatbots: Intro 101</option></select></label><label><span>Due date</span><input type="date" value={dueDate} onChange={(event) => setDueDate(event.target.value)} /></label><button className="primary-button compact" disabled={!data.learners.length} type="submit">Assign course →</button></form>
    <section className="admin-panel table-panel">{data.assignments.length ? <div className="admin-table assignment-table"><div className="table-row table-head"><span>Learner</span><span>Course</span><span>Due</span><span>Status</span><span /></div>{data.assignments.map((item) => <div className="table-row" key={item.id}><span><b>{item.learnerName}</b><small>{item.learnerEmail}</small></span><span>Intro 101</span><span>{item.dueDate || "Flexible"}</span><span><b className={`status-pill ${item.status}`}>{item.status}</b></span><span>{item.status !== "completed" && <button className="tiny-button" type="button" onClick={() => void action({ action: "updateAssignment", id: item.id, status: item.status === "assigned" ? "in_progress" : "assigned" }, "Assignment status updated.")}>{item.status === "assigned" ? "Start" : "Reset"}</button>}</span></div>)}</div> : <EmptyState title="Nothing assigned yet" copy="Choose a learner and schedule Intro 101 above." />}</section>
  </>;
}

function Courses({ data, action }: { data: AdminData; action: (payload: Record<string, unknown>, success: string) => Promise<boolean> }) {
  const published = data.settings.coursePublished !== "false";
  return <>
    <PageHeading eyebrow="COURSES" title="Shape the learning experience" copy="Control availability and review the Intro 101 mission plan." />
    <section className="course-admin-card comic-box"><div className="course-admin-cover"><span>COURSE 01</span><strong>AI Chatbots:<br />Intro 101</strong><small>AVIATION OPERATIONS EDITION</small></div><div className="course-admin-body"><div><span className="status-pill published">{published ? "Published" : "Draft"}</span><h2>Human-first AI foundations</h2><p>All {course.length} interactive missions are live: foundations, strengths and limits, data safety, work and life use, prompting, verification, and a capstone shift challenge.</p></div><div className="course-admin-stats"><span><b>{course.length} live</b> missions</span><span><b>{courseMinutes}</b> minutes</span><span><b>{data.settings.passingScore || "80"}%</b> pass</span></div><button className="secondary-button" type="button" onClick={() => void action({ action: "saveSettings", settings: { coursePublished: String(!published) } }, published ? "Course moved to draft." : "Course published.")}>{published ? "Move to draft" : "Publish course"}</button></div></section>
    <div className="module-grid">{course.map((mission) => <article key={mission.id}><span>{String(mission.number).padStart(2, "0")}</span><div><strong>{mission.title}</strong><small>{mission.minutes} min · {mission.steps.length} scenes · {mission.kicker.toLowerCase()}</small></div><b>LIVE</b></article>)}</div>
  </>;
}

function Reports({ data, averageScore }: { data: AdminData; averageScore: number }) {
  function exportCsv() {
    const rows = [["Learner", "Email", "Course", "Score", "Completed", "Certificate"], ...data.completions.map((item) => [item.learnerName, item.learnerEmail, item.courseId, String(item.score), new Date(item.completedAt).toLocaleDateString(), item.certificateId])];
    const csv = rows.map((row) => row.map((value) => `"${value.replaceAll('"', '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const link = document.createElement("a"); link.href = url; link.download = "ctrl-alt-learn-completions.csv"; link.click(); URL.revokeObjectURL(url);
  }
  return <>
    <PageHeading eyebrow="REPORTS" title="Completion and mastery" copy="Review results and export a simple completion record for your pilot." action={<button className="secondary-button" disabled={!data.completions.length} onClick={exportCsv} type="button">Export CSV ↗</button>} />
    <div className="report-metrics"><article><span>COMPLETIONS</span><strong>{data.completions.length}</strong></article><article><span>AVERAGE SCORE</span><strong>{averageScore || "-"}</strong></article><article><span>CERTIFICATES</span><strong>{data.completions.length}</strong></article></div>
    <section className="admin-panel table-panel">{data.completions.length ? <div className="admin-table report-table"><div className="table-row table-head"><span>Learner</span><span>Completed</span><span>Score</span><span>Certificate</span></div>{data.completions.map((item) => <div className="table-row" key={item.id}><span><b>{item.learnerName}</b><small>{item.learnerEmail}</small></span><span>{new Date(item.completedAt).toLocaleDateString()}</span><span><b className="score-pill">{item.score}%</b></span><span><code>{item.certificateId}</code></span></div>)}</div> : <EmptyState title="No completions yet" copy="Results will appear here when a learner finishes the playable mission." />}</section>
  </>;
}

function Settings({ data, action }: { data: AdminData; action: (payload: Record<string, unknown>, success: string) => Promise<boolean> }) {
  const [settings, setSettings] = useState(data.settings);
  useEffect(() => setSettings(data.settings), [data.settings]);
  function update(key: string, value: string) { setSettings((current) => ({ ...current, [key]: value })); }
  return <>
    <PageHeading eyebrow="SETTINGS" title="Set your organization defaults" copy="Customize the pilot’s identity, expectations, certificate rules, and AI-use guidance." />
    <form className="settings-grid" onSubmit={(event) => { event.preventDefault(); void action({ action: "saveSettings", settings }, "Organization settings saved."); }}>
      <section className="admin-panel"><div className="admin-panel-title"><div><span>ORGANIZATION</span><h2>Brand and context</h2></div></div><label><span>Organization name</span><input value={settings.organizationName || ""} onChange={(event) => update("organizationName", event.target.value)} /></label><label><span>Industry edition</span><select value={settings.industry || "Aviation"} onChange={(event) => update("industry", event.target.value)}><option>Aviation</option><option>General workplace</option><option>Healthcare</option><option>Financial services</option><option>Education</option></select></label></section>
      <section className="admin-panel"><div className="admin-panel-title"><div><span>COMPLETION</span><h2>Scoring and reminders</h2></div></div><label><span>Passing score</span><input min="60" max="100" type="number" value={settings.passingScore || "80"} onChange={(event) => update("passingScore", event.target.value)} /></label><label><span>Reminder cadence</span><select value={settings.reminderDays || "7"} onChange={(event) => update("reminderDays", event.target.value)}><option value="3">Every 3 days</option><option value="7">Every 7 days</option><option value="14">Every 14 days</option></select></label><label className="switch-row"><span><b>Completion certificates</b><small>Allow learners to export a certificate.</small></span><input type="checkbox" checked={settings.certificatesEnabled !== "false"} onChange={(event) => update("certificatesEnabled", String(event.target.checked))} /></label></section>
      <section className="admin-panel policy-settings"><div className="admin-panel-title"><div><span>AI USE POLICY</span><h2>Learner-facing policy note</h2></div></div><label><span>Guidance shown in training</span><textarea rows={5} value={settings.policyNote || ""} onChange={(event) => update("policyNote", event.target.value)} /></label><p>This is organization policy text, not legal advice. Keep jurisdiction-specific requirements separately reviewed.</p></section>
      <div className="settings-actions"><button className="primary-button" type="submit">Save settings <span>✓</span></button></div>
    </form>
  </>;
}

function EmptyState({ title, copy }: { title: string; copy: string }) {
  return <div className="admin-empty"><span>✦</span><h3>{title}</h3><p>{copy}</p></div>;
}
