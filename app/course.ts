export type Dimension = "safety" | "judgment" | "verification" | "promptCraft";

export const dimensionLabels: Record<Dimension, string> = {
  safety: "Safety",
  judgment: "Judgment",
  verification: "Verification",
  promptCraft: "Prompt craft",
};

export type Scene = {
  speaker: string;
  role: string;
  bubble: string;
  caption: string;
  location: string;
};

type StepBase = {
  id: string;
  label: string;
  title: string;
  intro: string;
  scene: Scene;
};

export type Beat = { icon: string; title: string; copy: string };

export type LessonStep = StepBase & {
  kind: "lesson";
  beats: Beat[];
};

export type Choice = {
  id: string;
  label: string;
  detail: string;
  correct: boolean;
  coach: string;
};

export type ChoiceStep = StepBase & {
  kind: "choice";
  dimension: Dimension;
  choices: Choice[];
};

export type MultiItem = { id: string; text: string; tag: string; shouldSelect: boolean };

export type MultiStep = StepBase & {
  kind: "multi";
  dimension: Dimension;
  boardLabel: string;
  boardTitle: string;
  selectedTag: string;
  checkLabel: string;
  items: MultiItem[];
  correctFeedback: string;
  incorrectFeedback: string;
};

export type SortItem = { id: string; text: string; bucket: string; why: string };

export type SortStep = StepBase & {
  kind: "sort";
  dimension: Dimension;
  buckets: string[];
  items: SortItem[];
  correctFeedback: string;
  incorrectFeedback: string;
};

export type BuilderPart = { id: string; label: string; text: string; good: boolean; why: string };

export type BuilderStep = StepBase & {
  kind: "builder";
  dimension: Dimension;
  parts: BuilderPart[];
  correctFeedback: string;
  incorrectFeedback: string;
};

export type Step = LessonStep | ChoiceStep | MultiStep | SortStep | BuilderStep;

export type Mission = {
  id: string;
  number: number;
  title: string;
  shortTitle: string;
  kicker: string;
  description: string;
  minutes: number;
  rule: string;
  ruleDetail: string;
  steps: Step[];
};

const opsDesk = "HELP DESK STUDIO";
const breakRoom = "BREAK ROOM";
const briefingRoom = "BRIEFING ROOM";

export const course: Mission[] = [
  {
    id: "meet-ai",
    number: 1,
    title: "Meet Your AI Teammate",
    shortTitle: "Meet Your AI Teammate",
    kicker: "FOUNDATIONS",
    description:
      "What AI actually is, what it's genuinely good at, and the one rule that makes everything else make sense.",
    minutes: 3,
    rule: "AI is an advisor, not a decision maker.",
    ruleDetail:
      "A chatbot predicts likely words — it doesn't know facts or make judgment calls. Let it draft, summarize, and suggest. You decide.",
    steps: [
      {
        id: "what-is-ai",
        kind: "lesson",
        label: "Learn",
        title: "So what is this thing, really?",
        intro: "Four tiny ideas. Each one takes about ten seconds. Tap through at your own pace.",
        scene: {
          speaker: "MAYA",
          role: "OPERATIONS COORDINATOR",
          bubble: "Everyone keeps saying “the AI knows.” Does it actually know anything?",
          caption: "First lesson: fluency is not knowledge.",
          location: briefingRoom,
        },
        beats: [
          {
            icon: "🔮",
            title: "AI predicts. It doesn't think.",
            copy: "AI learned patterns from mountains of text. When you ask something, it predicts the most likely next words. That's the whole trick.",
          },
          {
            icon: "🤖",
            title: "A chatbot is a conversation wrapper",
            copy: "ChatGPT, Claude, and Copilot are chat windows around a large language model (LLM). It remembers your current chat — that's its context.",
          },
          {
            icon: "✨",
            title: "“Generative” means it makes new stuff",
            copy: "It writes fresh text every time instead of looking up stored answers. Same question, different answer? Totally normal.",
          },
          {
            icon: "⚠️",
            title: "Smooth can still be wrong",
            copy: "Because answers are predicted — not verified — AI can be confident, polished, and completely incorrect. All at once.",
          },
        ],
      },
      {
        id: "confident-wrong",
        kind: "choice",
        label: "Quick check",
        dimension: "judgment",
        title: "Why can a chatbot sound so sure and still be wrong?",
        intro: "Jordan just got a beautifully written answer with a made-up statistic in it.",
        scene: {
          speaker: "JORDAN",
          role: "CUSTOMER SUPPORT LEAD",
          bubble: "It gave me a perfect-sounding number… that I can't find anywhere else. What happened?",
          caption: "Your move: explain the confident mistake.",
          location: opsDesk,
        },
        choices: [
          {
            id: "lying",
            label: "It's lying on purpose",
            detail: "The AI decided to deceive Jordan.",
            correct: false,
            coach:
              "Chatbots don't have intent. They predict plausible text — when the pattern is wrong, the output is wrong. That's called a hallucination, not a lie.",
          },
          {
            id: "predicts",
            label: "It predicts words, not facts",
            detail: "A likely-sounding answer can be generated even when no real fact backs it up.",
            correct: true,
            coach:
              "Exactly. The model produced a statistically plausible sentence. Plausible and true are different things — which is why verification matters.",
          },
          {
            id: "broken",
            label: "The AI must be broken",
            detail: "A working chatbot would never produce a wrong number.",
            correct: false,
            coach:
              "This is normal behavior, not a malfunction. Every chatbot can hallucinate. Expecting it — and checking for it — is part of using AI well.",
          },
        ],
      },
      {
        id: "what-its-for",
        kind: "lesson",
        label: "Learn",
        title: "What it's actually great at",
        intro: "Five real jobs AI does brilliantly — and the one rule that keeps you safe with all of them.",
        scene: {
          speaker: "JORDAN",
          role: "CUSTOMER SUPPORT LEAD",
          bubble: "Okay, so it's a fancy predictor. What should I actually use it for?",
          caption: "The short list that covers 90% of your wins.",
          location: breakRoom,
        },
        beats: [
          {
            icon: "📝",
            title: "Summarize + draft",
            copy: "Turn a long report into 5 bullets. Turn your rough notes into a clean email. These are AI's two biggest everyday wins.",
          },
          {
            icon: "💡",
            title: "Explain + brainstorm",
            copy: "Ask it to explain anything at your level — no judgment, unlimited patience. Or ask for 10 ideas and keep the 2 good ones.",
          },
          {
            icon: "🔍",
            title: "Extract + organize",
            copy: "Paste messy (non-sensitive) notes and ask for action items, a table, or a checklist. Structure is its specialty.",
          },
          {
            icon: "🚫",
            title: "Not a calculator. Not a news source.",
            copy: "Precise math, current events, and “is this rule still current?” are its weak spots. Use the real tool or the official source for those.",
          },
          {
            icon: "👑",
            title: "The golden rule",
            copy: "AI is an advisor, not a decision maker. It drafts and suggests — a human reviews and decides. Every time, no exceptions.",
          },
        ],
      },
      {
        id: "genai-or-rules",
        kind: "sort",
        label: "Try it",
        dimension: "judgment",
        title: "Generative AI or simple automation?",
        intro: "Knowing the difference tells you how much to trust — and how much to check.",
        scene: {
          speaker: "MAYA",
          role: "OPERATIONS COORDINATOR",
          bubble: "Half our tools say they're “AI-powered.” Which ones actually generate content?",
          caption: "Sort each tool into the right bin.",
          location: briefingRoom,
        },
        buckets: ["Generative AI", "Rule-based automation"],
        items: [
          {
            id: "draft-email",
            text: "Drafts a reply to a customer in your tone",
            bucket: "Generative AI",
            why: "It creates new text each time — so it needs review before sending.",
          },
          {
            id: "auto-forward",
            text: "Forwards every invoice email to accounting",
            bucket: "Rule-based automation",
            why: "A fixed if-this-then-that rule. Predictable, no creativity, no hallucination.",
          },
          {
            id: "summarize",
            text: "Summarizes an hour-long meeting recording",
            bucket: "Generative AI",
            why: "Summaries are generated, so details can be dropped or distorted. Verify the important ones.",
          },
          {
            id: "reminder",
            text: "Sends a calendar reminder 15 minutes early",
            bucket: "Rule-based automation",
            why: "A scheduled trigger — no model involved, nothing to double-check.",
          },
          {
            id: "code",
            text: "Suggests code as a developer types",
            bucket: "Generative AI",
            why: "Generated code can look right and still contain bugs — it gets reviewed like any other code.",
          },
        ],
        correctFeedback:
          "Perfect sort. The generative tools create something new every time — those are the ones that need human review.",
        incorrectFeedback:
          "Close — remember the test: does it create new content (generative) or follow a fixed rule (automation)? Adjust and check again.",
      },
    ],
  },
  {
    id: "superpowers-limits",
    number: 2,
    title: "Superpowers & Limits",
    shortTitle: "Superpowers & Limits",
    kicker: "STRENGTHS + WEAKNESSES",
    description:
      "The four ways AI quietly fails — and how to spot a hallucination before it costs you.",
    minutes: 3,
    rule: "Confidence is not evidence.",
    ruleDetail:
      "A chatbot's tone never changes with its accuracy. The more a result matters, the more its claims need an independent check.",
    steps: [
      {
        id: "failure-modes",
        kind: "lesson",
        label: "Learn",
        title: "The four ways AI gets it wrong",
        intro: "Every AI mistake you'll ever see falls into one of these four buckets. Learn them once.",
        scene: {
          speaker: "JORDAN",
          role: "CUSTOMER SUPPORT LEAD",
          bubble: "It rewrote my clunky email beautifully in five seconds. So why can't I trust it with everything?",
          caption: "Powerful tool. Real limits. Both are true.",
          location: breakRoom,
        },
        beats: [
          {
            icon: "🎭",
            title: "1. Hallucinations",
            copy: "AI sometimes invents facts, citations, numbers — even policies. Delivered in the same confident tone as everything true.",
          },
          {
            icon: "📅",
            title: "2. Outdated knowledge",
            copy: "Models are trained on data with a cutoff date. Recent changes, new rules, this morning's news? It might not know — and won't always say so.",
          },
          {
            icon: "🕳️",
            title: "3. Missing context",
            copy: "It doesn't know your company, your customer, or your situation unless you tell it. It fills gaps with guesses that sound right.",
          },
          {
            icon: "⚖️",
            title: "4. Bias",
            copy: "AI learned from human writing — biases included. It can quietly favor some people or framings without any warning label.",
          },
        ],
      },
      {
        id: "needs-verify",
        kind: "choice",
        label: "Quick check",
        dimension: "verification",
        title: "Three polished outputs. Which one needs checking first?",
        intro: "All three read beautifully. One of them is a risk.",
        scene: {
          speaker: "MAYA",
          role: "OPERATIONS COORDINATOR",
          bubble: "These all look great to me. Which one would you not send as-is?",
          caption: "Polish hides problems. Look at the stakes.",
          location: opsDesk,
        },
        choices: [
          {
            id: "icebreakers",
            label: "A list of team icebreakers",
            detail: "Fun suggestions for Friday's meeting.",
            correct: false,
            coach:
              "Low stakes — if an icebreaker is lame, nothing breaks. A quick skim is plenty. Save your verification energy for outputs that matter.",
          },
          {
            id: "stats",
            label: "A safety memo citing “FAA Report 2024-117”",
            detail: "Includes specific statistics and an official-sounding report number.",
            correct: true,
            coach:
              "Right. Specific citations, statistics, and reference numbers are exactly what chatbots hallucinate — and a safety memo has real consequences. Verify the report exists before this goes anywhere.",
          },
          {
            id: "rewrite",
            label: "A friendlier rewrite of your own email",
            detail: "Your words, warmed up.",
            correct: false,
            coach:
              "You wrote the facts; the AI only changed the tone. Read it once to make sure the meaning held — that's verification proportional to risk.",
          },
        ],
      },
      {
        id: "spotting-fakes",
        kind: "lesson",
        label: "Learn",
        title: "How to smell a hallucination",
        intro: "Three warning signs, one honest signal. This is your detector kit.",
        scene: {
          speaker: "MAYA",
          role: "OPERATIONS COORDINATOR",
          bubble: "If the wrong answers look exactly like the right ones… how does anyone catch them?",
          caption: "Specific + unverifiable = check it.",
          location: briefingRoom,
        },
        beats: [
          {
            icon: "🚩",
            title: "Red flag: sources you can't find",
            copy: "A study, report, or article you can't locate anywhere? Treat it as invented until you find it yourself.",
          },
          {
            icon: "🚩",
            title: "Red flag: suspiciously precise details",
            copy: "Exact statistics, policy numbers, and quotes with no source are classic hallucination material. Precision is not proof.",
          },
          {
            icon: "🟢",
            title: "Green flag: honest hedging",
            copy: "“I'm not certain about recent changes” is a good sign — the AI being honest about limits. Don't punish it; verify and move on.",
          },
          {
            icon: "🔁",
            title: "Never ask it to grade itself",
            copy: "“Are you sure?” gets you confident text, not truth. Verification happens outside the chat — at the real source.",
          },
        ],
      },
      {
        id: "hallucination-signs",
        kind: "multi",
        label: "Try it",
        dimension: "verification",
        title: "Tap every red flag for a possible hallucination.",
        intro: "Some of these are warning signs. Some are actually good signs. Know the difference.",
        scene: {
          speaker: "JORDAN",
          role: "CUSTOMER SUPPORT LEAD",
          bubble: "The draft is full of specifics. Which details should make me suspicious?",
          caption: "Use your new detector kit.",
          location: opsDesk,
        },
        boardLabel: "AI DRAFT · UNREVIEWED",
        boardTitle: "Flag the warning signs",
        selectedTag: "FLAGGED",
        checkLabel: "Check my flags",
        items: [
          {
            id: "citation",
            text: "Cites a study you can't find anywhere",
            tag: "Claim",
            shouldSelect: true,
          },
          {
            id: "policy",
            text: "Quotes “Company Policy 4.2.1” — which doesn't exist",
            tag: "Claim",
            shouldSelect: true,
          },
          {
            id: "stat",
            text: "Gives a precise statistic with no source",
            tag: "Claim",
            shouldSelect: true,
          },
          {
            id: "hedge",
            text: "Says “you should verify this with your team”",
            tag: "Behavior",
            shouldSelect: false,
          },
          {
            id: "unsure",
            text: "Admits “I'm not certain about recent changes”",
            tag: "Behavior",
            shouldSelect: false,
          },
        ],
        correctFeedback:
          "Sharp eye. Unverifiable specifics — citations, policy numbers, sourceless statistics — are classic hallucination territory. Honest hedging is a good sign, not a red flag.",
        incorrectFeedback:
          "Almost. Flag the specifics you can't verify (citations, policy numbers, sourceless stats). When a chatbot admits uncertainty, that's honesty — not a hallucination.",
      },
    ],
  },
  {
    id: "data-safety",
    number: 3,
    title: "The Data Safety Checkpoint",
    shortTitle: "Data Safety Checkpoint",
    kicker: "PROTECT THE DATA",
    description:
      "The four guardrails, then the flagship scenario: keep sensitive information out of unapproved tools while still getting the work done.",
    minutes: 6,
    rule: "Pause. Classify. Minimize. Verify.",
    ruleDetail:
      "Use only approved tools, share only the data the task needs, and review important outputs against a trusted source.",
    steps: [
      {
        id: "guardrails",
        kind: "lesson",
        label: "Learn",
        title: "The four guardrails",
        intro: "Four rules that prevent nearly every AI incident. Memorize the first one today; the rest come back all course long.",
        scene: {
          speaker: "PRIYA",
          role: "DUTY MANAGER",
          bubble: "Before anyone touches a chatbot with work data — what are the house rules?",
          caption: "Four rules. Zero incidents.",
          location: briefingRoom,
        },
        beats: [
          {
            icon: "🔒",
            title: "1. Never paste sensitive data into unapproved tools",
            copy: "Customer details, employee info, financials, anything confidential — it stays out of public chatbots. Full stop.",
          },
          {
            icon: "✅",
            title: "2. Verify critical outputs",
            copy: "If people will rely on it, check it against a real source first. The higher the stakes, the harder you check.",
          },
          {
            icon: "🧑‍⚖️",
            title: "3. Humans approve decisions",
            copy: "AI can inform a decision. It never makes one. A person you can name signs off on anything that matters.",
          },
          {
            icon: "🧭",
            title: "4. Advisor, not decision maker",
            copy: "Same golden rule from Mission 1 — because it's the one that holds all the others up.",
          },
        ],
      },
      {
        id: "first-move",
        kind: "choice",
        label: "Choose",
        dimension: "safety",
        title: "What should Maya do first?",
        intro: "The report is internal and the public chatbot has not been approved for company data.",
        scene: {
          speaker: "MAYA",
          role: "OPERATIONS COORDINATOR",
          bubble: "The chatbot could summarize this delay report in seconds. Can I paste the whole incident log?",
          caption: "Your move: protect the data without grounding the work.",
          location: opsDesk,
        },
        choices: [
          {
            id: "paste",
            label: "Paste the entire report",
            detail: "The chatbot can summarize it fastest if it sees everything.",
            correct: false,
            coach:
              "Fast is not automatically safe. The report contains personal and internal information, and the tool has not been approved.",
          },
          {
            id: "pause",
            label: "Pause, classify, then minimize",
            detail: "Use an approved tool and include only the data needed for the task.",
            correct: true,
            coach: "Exactly. Tool approval and data minimization come before prompt quality.",
          },
          {
            id: "personal",
            label: "Send it to a personal account",
            detail: "Work on the summary later from a different chatbot.",
            correct: false,
            coach:
              "Moving work data to a personal account adds risk and bypasses company safeguards. Keep work information in approved systems.",
          },
        ],
      },
      {
        id: "redact",
        kind: "multi",
        label: "Classify",
        dimension: "safety",
        title: "Tap every detail that should be removed.",
        intro: "The task needs operational context — not a customer's identity.",
        scene: {
          speaker: "MAYA",
          role: "OPERATIONS COORDINATOR",
          bubble: "Which details should leave the prompt before it goes anywhere?",
          caption: "Minimum necessary data. Nothing more.",
          location: opsDesk,
        },
        boardLabel: "INCIDENT NOTE · INTERNAL",
        boardTitle: "Select details to redact",
        selectedTag: "REDACTED",
        checkLabel: "Check my redactions",
        items: [
          { id: "name", text: "Customer: Elena Ruiz", tag: "Personal", shouldSelect: true },
          { id: "booking", text: "Booking ref: K7M2Q9", tag: "Identifier", shouldSelect: true },
          { id: "route", text: "Route: BOS → DCA", tag: "Operational", shouldSelect: false },
          { id: "reason", text: "Delay: crew scheduling issue", tag: "Operational", shouldSelect: false },
          { id: "phone", text: "Phone: (617) 555-0142", tag: "Personal", shouldSelect: true },
        ],
        correctFeedback:
          "Clean handoff. You removed direct identifiers while keeping the operational facts needed for the task.",
        incorrectFeedback:
          "Not quite. Remove direct personal details and unique booking identifiers, but keep the operational facts needed for the summary.",
      },
      {
        id: "safe-prompt",
        kind: "choice",
        label: "Prompt",
        dimension: "promptCraft",
        title: "Choose the prompt that creates a safe, useful result.",
        intro: "A strong prompt defines the task, audience, format, and limits.",
        scene: {
          speaker: "MAYA",
          role: "OPERATIONS COORDINATOR",
          bubble: "The data is clean. Now, how do we ask for a useful result?",
          caption: "The safest prompt starts before you type.",
          location: opsDesk,
        },
        choices: [
          {
            id: "vague",
            label: "Summarize this.",
            detail: "Short and simple.",
            correct: false,
            coach:
              "The data is safer, but the task is still vague. Add the goal, output format, and a rule against inventing missing details.",
          },
          {
            id: "safe",
            label: "Create a customer-safe operations summary",
            detail:
              "Use the redacted note. Return three bullets, separate facts from assumptions, and flag missing information.",
            correct: true,
            coach:
              "Strong prompt. It defines the audience, format, source boundary, and uncertainty check without exposing unnecessary data.",
          },
          {
            id: "creative",
            label: "Make the delay sound harmless",
            detail: "Fill in any missing details so the message feels complete.",
            correct: false,
            coach:
              "AI should not soften safety-relevant facts or invent missing details. Accuracy and appropriate review matter more than polish.",
          },
        ],
      },
      {
        id: "before-send",
        kind: "choice",
        label: "Verify",
        dimension: "verification",
        title: "What happens before this draft is shared?",
        intro: "The chatbot produced a clean three-bullet summary with a confident tone.",
        scene: {
          speaker: "MAYA",
          role: "OPERATIONS COORDINATOR",
          bubble: "The draft looks polished. Are we cleared to send it?",
          caption: "Confident tone. Unverified claims. You know what to do.",
          location: opsDesk,
        },
        choices: [
          {
            id: "send",
            label: "Send the polished draft immediately",
            detail: "It reads confidently and contains no names.",
            correct: false,
            coach:
              "A confident tone is not evidence. Compare the summary with the source and follow the normal approval path before sharing it.",
          },
          {
            id: "review",
            label: "Check the source and route it for review",
            detail:
              "Confirm every claim against the redacted report, then use the normal operational approval process.",
            correct: true,
            coach: "That keeps a person accountable. Verification should match the impact of the output.",
          },
          {
            id: "ask-ai",
            label: "Ask the chatbot if it is correct",
            detail: "Let the same system double-check its answer.",
            correct: false,
            coach:
              "Self-checking can help, but it is not independent verification. Use the source record and a qualified reviewer.",
          },
        ],
      },
    ],
  },
  {
    id: "work-mode",
    number: 4,
    title: "Work Mode",
    shortTitle: "Work Mode",
    kicker: "ON THE CLOCK",
    description:
      "The traffic-light policy — what's allowed, what's restricted, what needs review — and who owns the result.",
    minutes: 3,
    rule: "AI assists. You are accountable.",
    ruleDetail:
      "Whatever a chatbot drafts, the human who sends it owns it. Policy, review steps, and people decisions are never optional.",
    steps: [
      {
        id: "traffic-lights",
        kind: "lesson",
        label: "Learn",
        title: "The traffic light: your whole AI policy in three colors",
        intro: "Every workplace AI question fits one of three lanes. Learn the lanes, skip the guesswork.",
        scene: {
          speaker: "JORDAN",
          role: "CUSTOMER SUPPORT LEAD",
          bubble: "Some AI uses feel obviously fine and some feel obviously not. What's the actual line?",
          caption: "Three lanes. Learn them once, use them forever.",
          location: briefingRoom,
        },
        beats: [
          {
            icon: "🟢",
            title: "Green: just go",
            copy: "Brainstorming, first drafts you'll review, summaries of public info, explaining concepts, cleaning up your own writing.",
          },
          {
            icon: "🟡",
            title: "Yellow: go, then a human reviews",
            copy: "Anything customer-facing or that colleagues will rely on. AI drafts it fast — a person checks it before it ships.",
          },
          {
            icon: "🔴",
            title: "Red: stop",
            copy: "Hiring, firing, and performance decisions. Sensitive data in unapproved tools. Legal, financial, and compliance calls. These need approved processes and human decision-makers.",
          },
          {
            icon: "📜",
            title: "Know which rule you're touching",
            copy: "Law (non-negotiable), company policy (your approved tools and rules), or best practice (smart habits). Not sure which? Ask before you act.",
          },
        ],
      },
      {
        id: "manager-pressure",
        kind: "choice",
        label: "Pressure test",
        dimension: "judgment",
        title: "Your manager says: “Just have the AI write it and send it out.”",
        intro: "It's a customer-facing incident notice, due in ten minutes.",
        scene: {
          speaker: "PRIYA",
          role: "DUTY MANAGER",
          bubble: "We're slammed. Have the chatbot write the customer notice and get it out — we can review later.",
          caption: "Deadline pressure is where habits get tested.",
          location: opsDesk,
        },
        choices: [
          {
            id: "comply",
            label: "Send it unreviewed",
            detail: "The manager gave the instruction — that makes it their call.",
            correct: false,
            coach:
              "An instruction doesn't transfer accountability, and “review later” isn't review. If the notice contains an AI-invented detail, the harm is immediate.",
          },
          {
            id: "fast-review",
            label: "Draft with AI, review fast, then send",
            detail: "Use the chatbot for speed, spend two minutes verifying facts, get a second set of eyes.",
            correct: true,
            coach:
              "That's the move. AI gives you the speed the deadline demands; the two-minute fact check keeps a human accountable for what customers read. Speed and safety aren't opposites.",
          },
          {
            id: "refuse",
            label: "Refuse to use AI at all",
            detail: "Write it entirely by hand to be safe.",
            correct: false,
            coach:
              "Overkill in the other direction. A reviewed AI draft is both faster and safer than a rushed manual one. The safeguard is review — not avoiding the tool.",
          },
        ],
      },
      {
        id: "ownership",
        kind: "lesson",
        label: "Learn",
        title: "Who owns the output? (Spoiler: you do.)",
        intro: "The shortest, most important lesson in this course.",
        scene: {
          speaker: "PRIYA",
          role: "DUTY MANAGER",
          bubble: "If an AI draft goes wrong, whose name is on the mistake?",
          caption: "The uncomfortable question with a simple answer.",
          location: briefingRoom,
        },
        beats: [
          {
            icon: "🖊️",
            title: "You send it, you own it",
            copy: "“The AI wrote it” has never satisfied a customer, a regulator, or a court. The human who ships the work is accountable for it.",
          },
          {
            icon: "🛠️",
            title: "The tool is not a teammate",
            copy: "AI vendors say clearly: outputs can be wrong, review required. Skipping the review is a human mistake, not a tech failure.",
          },
          {
            icon: "🙋",
            title: "People decisions stay with people",
            copy: "Ranking applicants, writing performance reviews, deciding raises — never AI jobs. Legal risk, fairness risk, and it's simply not the tool's call.",
          },
        ],
      },
      {
        id: "task-triage",
        kind: "sort",
        label: "Try it",
        dimension: "judgment",
        title: "Sort today's requests: Go, Go with review, or Stop?",
        intro: "Five real requests just landed. Put each one in the right lane.",
        scene: {
          speaker: "MAYA",
          role: "OPERATIONS COORDINATOR",
          bubble: "Five requests, one chatbot, zero room for mistakes. Which lane does each go in?",
          caption: "Triage like a pro: stakes first, speed second.",
          location: briefingRoom,
        },
        buckets: ["Go", "Go with review", "Stop"],
        items: [
          {
            id: "brainstorm-names",
            text: "Brainstorm names for an internal project",
            bucket: "Go",
            why: "Internal, low stakes, and you pick the winner. Classic green-light use.",
          },
          {
            id: "apology",
            text: "Draft an apology email to an upset customer",
            bucket: "Go with review",
            why: "Customer-facing words carry your company's name. Draft fast, then a human verifies tone and facts.",
          },
          {
            id: "rank-applicants",
            text: "Rank job applicants for the open role",
            bucket: "Stop",
            why: "Employment decisions carry legal and fairness risk, and AI can encode bias. This needs your approved hiring process.",
          },
          {
            id: "public-news",
            text: "Summarize public industry news for the team",
            bucket: "Go",
            why: "Public information, internal audience, low stakes. Skim the result and share.",
          },
          {
            id: "perf-review",
            text: "Write a teammate's performance review",
            bucket: "Stop",
            why: "Performance evaluations are consequential people decisions built on private information. The judgment must be yours, not predicted text.",
          },
        ],
        correctFeedback:
          "Excellent triage. Stakes and data sensitivity decide the lane — not how convenient the tool is.",
        incorrectFeedback:
          "Check the lanes again: low-stakes internal work is Go, anything customer-facing needs review, and people decisions or sensitive data are Stop.",
      },
    ],
  },
  {
    id: "life-mode",
    number: 5,
    title: "Life Mode",
    shortTitle: "Life Mode",
    kicker: "OFF THE CLOCK",
    description:
      "Everyday wins, the high-stakes caution zones, and the scams that use AI against you.",
    minutes: 3,
    rule: "Great helper. Bad oracle.",
    ruleDetail:
      "Use chatbots freely for planning, learning, and creativity. For medical, legal, financial, or crisis decisions — and anything involving money requests — verify with a real professional through a channel you trust.",
    steps: [
      {
        id: "life-uses",
        kind: "lesson",
        label: "Learn",
        title: "AI after five o'clock",
        intro: "Where it shines at home, and the four zones where a professional beats a chatbot every time.",
        scene: {
          speaker: "JORDAN",
          role: "CUSTOMER SUPPORT LEAD",
          bubble: "My whole family uses chatbots now. What should I tell them about staying smart with it?",
          caption: "The rules travel home with you.",
          location: breakRoom,
        },
        beats: [
          {
            icon: "🏖️",
            title: "The everyday sweet spot",
            copy: "Trip plans, meal ideas, learning new skills, explaining a lease in plain English, homework help. Low stakes, big value — go wild.",
          },
          {
            icon: "🩺",
            title: "The four caution zones",
            copy: "Medical, legal, financial, and mental-health crisis. AI can help you prepare questions — a licensed professional makes the call.",
          },
          {
            icon: "💡",
            title: "The prep trick",
            copy: "Use AI to get smarter before the appointment: understand terms, list symptoms, write questions. You show up sharper — the pro still decides.",
          },
          {
            icon: "🆘",
            title: "Crisis = humans, immediately",
            copy: "In a mental-health crisis, skip the chatbot. In the US, call or text 988. A real person, right now.",
          },
        ],
      },
      {
        id: "medical",
        kind: "choice",
        label: "Quick check",
        dimension: "judgment",
        title: "Weird symptom, worried friend. What's the smart chatbot use?",
        intro: "Your friend is about to make a health decision based on a chatbot answer.",
        scene: {
          speaker: "SAM",
          role: "MAYA'S FRIEND",
          bubble: "The chatbot says it's probably nothing serious. Should I just skip the doctor?",
          caption: "Helper for the visit — not a replacement for it.",
          location: breakRoom,
        },
        choices: [
          {
            id: "skip-doctor",
            label: "Trust the reassuring answer",
            detail: "It considered the symptoms and said it's probably fine.",
            correct: false,
            coach:
              "A chatbot can't examine anyone, run tests, or take responsibility for being wrong. Reassuring-sounding text is not a diagnosis.",
          },
          {
            id: "prep-visit",
            label: "Use it to prep for the doctor",
            detail: "Learn about the symptom, write down the right questions, then see a professional.",
            correct: true,
            coach:
              "Perfect division of labor. AI makes you a better-informed patient; the licensed professional makes the medical judgment. Same pattern for legal and financial questions.",
          },
          {
            id: "diagnose-harder",
            label: "Ask for a definitive diagnosis",
            detail: "Push the chatbot with more details until it commits to an answer.",
            correct: false,
            coach:
              "Pushing for confidence just gets you confident-sounding text. High-stakes personal decisions need a professional who's accountable for the answer.",
          },
        ],
      },
      {
        id: "scam-anatomy",
        kind: "lesson",
        label: "Learn",
        title: "The anatomy of an AI-powered scam",
        intro: "Scammers got a massive upgrade. Your defense is one simple habit.",
        scene: {
          speaker: "MAYA",
          role: "OPERATIONS COORDINATOR",
          bubble: "My aunt got a call that sounded exactly like my cousin asking for money. Exactly like her.",
          caption: "“It sounds like them” proves nothing now.",
          location: breakRoom,
        },
        beats: [
          {
            icon: "🎙️",
            title: "Voices can be cloned in seconds",
            copy: "A few seconds of audio from a voicemail or video is enough. A familiar voice is no longer proof of identity.",
          },
          {
            icon: "🧨",
            title: "The scam trifecta",
            copy: "Urgency (“right now!”) + secrecy (“don't tell anyone”) + weird payment (gift cards, codes, crypto). Any two together? It's a scam.",
          },
          {
            icon: "📞",
            title: "The one defense that always works",
            copy: "Hang up. Contact the real person through a channel you already trusted — their known number, in person. Verify out-of-band, every time.",
          },
        ],
      },
      {
        id: "spot-scam",
        kind: "choice",
        label: "Try it",
        dimension: "safety",
        title: "“Hi, it's your CEO. I need gift cards for a client. Now.”",
        intro: "The voice on the phone sounds exactly right. The request feels exactly wrong.",
        scene: {
          speaker: "UNKNOWN CALLER",
          role: "CLAIMS TO BE THE CEO",
          bubble: "I'm about to board a flight — I need you to buy six gift cards and text me the codes. Keep it between us.",
          caption: "Urgency + secrecy + unusual payment = alarm bells.",
          location: opsDesk,
        },
        choices: [
          {
            id: "comply-ceo",
            label: "Do it — it's the CEO's voice",
            detail: "You recognize the voice, and they sound stressed.",
            correct: false,
            coach:
              "Voice cloning needs only seconds of audio from a podcast or voicemail. The voice proves nothing anymore — the unusual request is the real signal.",
          },
          {
            id: "verify-channel",
            label: "Hang up and verify through a known channel",
            detail: "Call the CEO's real number or check with their office before doing anything.",
            correct: true,
            coach:
              "Textbook defense. Urgency, secrecy, and untraceable payment are the scam trifecta — AI just makes the disguise better. Verify out-of-band, every time.",
          },
          {
            id: "email-back",
            label: "Reply to the follow-up email",
            detail: "They emailed too — just confirm the details there.",
            correct: false,
            coach:
              "The email is part of the same scam — AI writes flawless phishing now. Verification only counts through a channel you already trusted before this request existed.",
          },
        ],
      },
    ],
  },
  {
    id: "prompt-repair",
    number: 6,
    title: "Prompt Repair Shop",
    shortTitle: "Prompt Repair Shop",
    kicker: "SAY WHAT YOU MEAN",
    description:
      "The beginner formula, the pro template, and the iteration loop that turns okay answers into great ones.",
    minutes: 3,
    rule: "Task + Context + Format.",
    ruleDetail:
      "Say what you want, give the (safe) background, and name the shape of the answer. Then iterate — the second prompt is where the magic happens.",
    steps: [
      {
        id: "the-formula",
        kind: "lesson",
        label: "Learn",
        title: "The formula: Task + Context + Format",
        intro: "One three-part formula fixes 90% of bad AI answers. Here it is.",
        scene: {
          speaker: "MAYA",
          role: "OPERATIONS COORDINATOR",
          bubble: "When I ask for “a quick summary,” I get mush. When Jordan asks, it's perfect. What's the trick?",
          caption: "The trick is in the ask.",
          location: briefingRoom,
        },
        beats: [
          {
            icon: "🎯",
            title: "Task: say exactly what you want",
            copy: "“Summarize this report into 5 executive bullet points” beats “summarize this.” Verbs + specifics.",
          },
          {
            icon: "🗺️",
            title: "Context: give the background",
            copy: "Who's it for? What's the situation? Paste the (safe, minimized) source material. AI can't read your mind — only your prompt.",
          },
          {
            icon: "📐",
            title: "Format: name the shape",
            copy: "Three bullets? A table? A friendly email under 100 words? Ask for the exact shape you need and that's what you'll get.",
          },
          {
            icon: "🧪",
            title: "See it work",
            copy: "Mush: “write something about safety.” Formula: “Write a 5-point safety reminder (task) for ramp staff, based on this checklist (context), under 150 words, friendly tone (format).”",
          },
        ],
      },
      {
        id: "build-prompt",
        kind: "builder",
        label: "Try it",
        dimension: "promptCraft",
        title: "Build the prompt: pick the ingredients that belong.",
        intro: "Maya needs a shift-handover summary. Choose what goes into the ask — and what stays out.",
        scene: {
          speaker: "MAYA",
          role: "OPERATIONS COORDINATOR",
          bubble: "Help me build this one properly. What goes in the prompt?",
          caption: "Assemble it like a checklist: task, context, format.",
          location: opsDesk,
        },
        parts: [
          {
            id: "goal",
            label: "The task",
            text: "Summarize this shift log for the incoming evening team.",
            good: true,
            why: "Task plus audience — the foundation of every good prompt.",
          },
          {
            id: "context",
            label: "Safe source material",
            text: "Here is the redacted shift log: [paste]",
            good: true,
            why: "Grounding the model in your (safe, minimized) source beats letting it guess.",
          },
          {
            id: "format",
            label: "Output format",
            text: "Return 3 bullets: status, open issues, next actions.",
            good: true,
            why: "A defined shape makes the output instantly usable.",
          },
          {
            id: "no-invent",
            label: "Honesty guardrail",
            text: "Only use the log. If information is missing, say so instead of guessing.",
            good: true,
            why: "The anti-hallucination clause — cheap to add, priceless when it matters.",
          },
          {
            id: "flattery",
            label: "Flattery",
            text: "You are the world's greatest genius summarizer ever!!",
            good: false,
            why: "Praise doesn't improve output. Specificity does.",
          },
          {
            id: "everything",
            label: "The kitchen sink",
            text: "Also paste the full customer database, just in case it helps.",
            good: false,
            why: "Never add sensitive data “just in case.” Minimum necessary — always.",
          },
        ],
        correctFeedback:
          "That's a professional-grade prompt: task, safe context, format, and an honesty guardrail. No flattery, no data dumping.",
        incorrectFeedback:
          "Keep the four load-bearing pieces — task, safe source, format, honesty guardrail — and drop anything that adds flattery or unnecessary data.",
      },
      {
        id: "pro-moves",
        kind: "lesson",
        label: "Level up",
        title: "Pro moves: the full template",
        intro: "When the stakes rise, upgrade the formula with three power-ups.",
        scene: {
          speaker: "JORDAN",
          role: "CUSTOMER SUPPORT LEAD",
          bubble: "The basic formula works. What do the power users add?",
          caption: "Same formula, three upgrades.",
          location: briefingRoom,
        },
        beats: [
          {
            icon: "🎭",
            title: "Power-up 1: give it a role",
            copy: "“You are an operations analyst” focuses the answer's expertise and tone. Role + Task + Context + Format is the full pro template.",
          },
          {
            icon: "🔦",
            title: "Power-up 2: ask for assumptions",
            copy: "Add: “List your assumptions.” Hidden guesses become visible — and checkable — before they bite you.",
          },
          {
            icon: "📊",
            title: "Power-up 3: ask for confidence",
            copy: "Add: “How confident are you, and what are you unsure about?” Weak spots reveal themselves so you know where to verify.",
          },
          {
            icon: "🔁",
            title: "Then iterate",
            copy: "The first answer is a draft. “Shorter.” “More formal.” “Make it specific to our process — here's an example.” Steer, don't restart.",
          },
        ],
      },
      {
        id: "follow-up",
        kind: "choice",
        label: "Quick check",
        dimension: "promptCraft",
        title: "The first answer is too generic. What's the strongest follow-up?",
        intro: "Don't start over — steer.",
        scene: {
          speaker: "JORDAN",
          role: "CUSTOMER SUPPORT LEAD",
          bubble: "It gave me wallpaper paste. Generic, polite, useless. Now what?",
          caption: "Iteration is the real prompt skill.",
          location: opsDesk,
        },
        choices: [
          {
            id: "retry-same",
            label: "Ask the same thing again",
            detail: "Maybe it does better on a second try.",
            correct: false,
            coach:
              "Same input, same mush. If you don't change the ask, you're just rolling the dice on the same odds.",
          },
          {
            id: "add-specifics",
            label: "Add specifics and an example",
            detail: "“Make it specific to our delay-notification process — here's an example of the tone we use.”",
            correct: true,
            coach:
              "That's steering. Specific context plus an example gives the model something real to match. Generic in, generic out — specific in, specific out.",
          },
          {
            id: "give-up",
            label: "Give up on the tool",
            detail: "It clearly can't do this task.",
            correct: false,
            coach:
              "One vague prompt isn't a fair trial. Most “AI can't do this” moments are really “AI wasn't told enough” moments.",
          },
        ],
      },
    ],
  },
  {
    id: "trust-verify",
    number: 7,
    title: "Verify Before You Fly",
    shortTitle: "Verify Before You Fly",
    kicker: "TRUST BUT VERIFY",
    description:
      "The verification ladder, the grounding habit, and how to handle a source that doesn't exist.",
    minutes: 3,
    rule: "Verify in proportion to impact.",
    ruleDetail:
      "Icebreakers get a skim. Customer-facing facts get checked. Safety-critical and financial outputs get expert review against the source of record.",
    steps: [
      {
        id: "verify-ladder",
        kind: "lesson",
        label: "Learn",
        title: "The verification ladder",
        intro: "Three rungs. Every AI output lands on one. The stakes pick the rung — not your schedule.",
        scene: {
          speaker: "PRIYA",
          role: "DUTY MANAGER",
          bubble: "If we verified everything like a safety bulletin we'd never ship anything. Where's the line?",
          caption: "Match the check to the consequences.",
          location: briefingRoom,
        },
        beats: [
          {
            icon: "🪜",
            title: "Rung 1: skim it",
            copy: "Brainstorms, icebreakers, internal rough drafts. Being wrong costs nothing, so a quick sanity read is plenty.",
          },
          {
            icon: "🔎",
            title: "Rung 2: check the key facts",
            copy: "Customer-facing or colleague-relied-upon? Verify names, numbers, dates, and claims. Click every citation — fabricated ones look flawless.",
          },
          {
            icon: "🧑‍🔬",
            title: "Rung 3: expert review",
            copy: "Safety procedures, financial figures, legal language. A qualified human checks it against the source of record. Deadlines don't change this.",
          },
          {
            icon: "🧰",
            title: "How to actually check",
            copy: "Find the claim in an independent source. Redo the math yourself. Open the citation. Can't find a source? Treat the claim as false.",
          },
        ],
      },
      {
        id: "ghost-citation",
        kind: "choice",
        label: "Quick check",
        dimension: "verification",
        title: "The report cites a study. The study doesn't exist.",
        intro: "You searched. The journal is real; the article isn't. Now what?",
        scene: {
          speaker: "JORDAN",
          role: "CUSTOMER SUPPORT LEAD",
          bubble: "I can't find this “2023 industry study” anywhere. But the rest of the report reads great. Keep it?",
          caption: "One ghost citation changes everything.",
          location: opsDesk,
        },
        choices: [
          {
            id: "keep-rest",
            label: "Delete the citation, keep the claims",
            detail: "The statistics still sound reasonable.",
            correct: false,
            coach:
              "The numbers came from the same imagination as the citation. A fabricated source means every claim it “supported” is now unverified — treat them all as suspect.",
          },
          {
            id: "verify-all",
            label: "Treat every claim as unverified",
            detail: "Re-check the whole section against real sources before using any of it.",
            correct: true,
            coach:
              "Correct instinct. One fabricated citation is a red flag on the entire output. Rebuild the section from sources you can actually open.",
          },
          {
            id: "ask-source",
            label: "Ask the chatbot for the source",
            detail: "It can probably provide the full reference.",
            correct: false,
            coach:
              "It will generate an even more convincing fake reference — page numbers and all. Models double down on hallucinations when pressed. Verify outside the chat.",
          },
        ],
      },
      {
        id: "grounding",
        kind: "lesson",
        label: "Learn",
        title: "Grounding: prevent bad answers before they happen",
        intro: "Verification catches errors after. Grounding stops most of them before. Three habits.",
        scene: {
          speaker: "MAYA",
          role: "OPERATIONS COORDINATOR",
          bubble: "Checking everything after the fact is exhausting. Can I make the answers better up front?",
          caption: "Better input, fewer surprises.",
          location: briefingRoom,
        },
        beats: [
          {
            icon: "📎",
            title: "Feed it the source",
            copy: "“Based on this document [paste]” beats “from memory” every time. Answers grounded in your material hallucinate far less.",
          },
          {
            icon: "🔦",
            title: "Make it show its work",
            copy: "“List your assumptions” and “say so if information is missing” turn silent guesses into visible, checkable statements.",
          },
          {
            icon: "🚧",
            title: "Fence it in",
            copy: "“Only use the material I gave you — don't add outside facts.” One sentence, dramatically fewer invented details.",
          },
        ],
      },
      {
        id: "verify-triage",
        kind: "sort",
        label: "Try it",
        dimension: "verification",
        title: "How much verification does each output need?",
        intro: "Five AI outputs, three rungs. Place each one.",
        scene: {
          speaker: "PRIYA",
          role: "DUTY MANAGER",
          bubble: "Sort the day's AI drafts — what gets skimmed, what gets checked, what goes to an expert?",
          caption: "Consequences decide the rung.",
          location: briefingRoom,
        },
        buckets: ["Quick skim", "Check key facts", "Expert review"],
        items: [
          {
            id: "icebreaker-list",
            text: "Icebreaker ideas for Friday's meeting",
            bucket: "Quick skim",
            why: "Zero-consequence content. Read it once, pick your favorites.",
          },
          {
            id: "faq",
            text: "Customer-facing FAQ answers",
            bucket: "Check key facts",
            why: "Customers will act on these. Every claim, price, and policy detail gets verified first.",
          },
          {
            id: "procedure",
            text: "Updated ground-handling safety procedure",
            bucket: "Expert review",
            why: "Safety-critical content needs a qualified reviewer against the source of record — always.",
          },
          {
            id: "brainstorm-notes",
            text: "Summary of yesterday's brainstorm",
            bucket: "Quick skim",
            why: "Internal, low stakes — skim to confirm nothing important was dropped.",
          },
          {
            id: "board-figures",
            text: "Financial figures for the board deck",
            bucket: "Expert review",
            why: "Numbers leadership will decide on: recompute from the actual financial system, not the chatbot.",
          },
        ],
        correctFeedback:
          "That's the ladder in action. You spent your checking time exactly where the consequences live.",
        incorrectFeedback:
          "Re-place a few: no-consequence drafts get a skim, customer-facing claims get fact-checks, and safety or financial content always gets expert review.",
      },
    ],
  },
  {
    id: "final-shift",
    number: 8,
    title: "The Final Shift Challenge",
    shortTitle: "Final Shift Challenge",
    kicker: "CAPSTONE",
    description:
      "A quick recap of the five principles, then one hectic shift that tests every skill you've learned.",
    minutes: 5,
    rule: "You are the loop.",
    ruleDetail:
      "Choose the right tool, protect the data, ask precisely, verify in proportion to impact — and escalate to a person when the stakes demand one.",
    steps: [
      {
        id: "five-principles",
        kind: "lesson",
        label: "Recap",
        title: "The five principles (everything you've learned, in 30 seconds)",
        intro: "One last refresher before the final shift. You know all of these now.",
        scene: {
          speaker: "PRIYA",
          role: "DUTY MANAGER",
          bubble: "Before the evening rush hits — give me the house rules, one breath each.",
          caption: "Five principles. Then it's game time.",
          location: briefingRoom,
        },
        beats: [
          {
            icon: "1️⃣",
            title: "AI assists humans",
            copy: "It drafts, summarizes, and suggests. It doesn't decide, approve, or take the blame.",
          },
          {
            icon: "2️⃣",
            title: "Humans stay accountable",
            copy: "You send it, you own it — however it was drafted.",
          },
          {
            icon: "3️⃣",
            title: "Verify before acting",
            copy: "In proportion to impact: skim the trivial, check the important, expert-review the critical.",
          },
          {
            icon: "4️⃣",
            title: "Good prompts get good answers",
            copy: "Task + Context + Format. Add role, assumptions, and confidence when stakes rise.",
          },
          {
            icon: "5️⃣",
            title: "Protect the data",
            copy: "Approved tools only. Minimum necessary information. No exceptions for deadlines.",
          },
        ],
      },
      {
        id: "capstone-tool",
        kind: "choice",
        label: "Scene 1",
        dimension: "judgment",
        title: "17 delay reports, 40 minutes, one briefing due.",
        intro: "The evening rush just hit. First decision: what's the right way to use AI here?",
        scene: {
          speaker: "PRIYA",
          role: "DUTY MANAGER",
          bubble: "I need a leadership briefing from these 17 reports before the 6 PM call. Go.",
          caption: "FINAL SHIFT · Every choice counts now.",
          location: opsDesk,
        },
        choices: [
          {
            id: "public-tool",
            label: "Paste everything into a public chatbot",
            detail: "It's the fastest tool available right now.",
            correct: false,
            coach:
              "Speed pressure is exactly when data leaks happen. Seventeen internal reports in an unapproved tool is a bigger incident than a late briefing.",
          },
          {
            id: "approved-flow",
            label: "Use the approved AI tool with redacted excerpts",
            detail: "Company-sanctioned assistant, minimized data, briefing draft in minutes.",
            correct: true,
            coach:
              "That's the professional pattern under pressure: approved tool, minimum necessary data, AI for speed, you for judgment.",
          },
          {
            id: "all-manual",
            label: "Skip AI and read all 17 manually",
            detail: "Safer to do it entirely by hand.",
            correct: false,
            coach:
              "You'll miss the deadline and gain nothing — the approved tool exists for exactly this. Avoiding AI isn't the safe choice when a sanctioned, faster path is available.",
          },
        ],
      },
      {
        id: "capstone-redact",
        kind: "multi",
        label: "Scene 2",
        dimension: "safety",
        title: "Clean the excerpt before it enters the tool.",
        intro: "One report excerpt is headed into the approved assistant. Strip what doesn't belong.",
        scene: {
          speaker: "MAYA",
          role: "OPERATIONS COORDINATOR",
          bubble: "Quick pass before this goes in — what leaves the excerpt?",
          caption: "Even approved tools get minimum necessary data.",
          location: opsDesk,
        },
        boardLabel: "REPORT EXCERPT · INTERNAL",
        boardTitle: "Redact before processing",
        selectedTag: "REDACTED",
        checkLabel: "Check my redactions",
        items: [
          { id: "emp-name", text: "Agent: Marcus Webb, ID 44172", tag: "Personal", shouldSelect: true },
          { id: "gate", text: "Gate: B12, pushback delayed 22 min", tag: "Operational", shouldSelect: false },
          { id: "pax-med", text: "Passenger medical note: insulin required", tag: "Medical", shouldSelect: true },
          { id: "cause", text: "Cause: late inbound aircraft", tag: "Operational", shouldSelect: false },
          { id: "card", text: "Comp card ending 8841 issued", tag: "Financial", shouldSelect: true },
        ],
        correctFeedback:
          "Spotless. Employee identity, medical details, and financial identifiers are out; the operational story the briefing needs is intact.",
        incorrectFeedback:
          "Look again: names and IDs, medical information, and payment details never ride along. Operational facts — gates, delays, causes — are what the briefing actually needs.",
      },
      {
        id: "capstone-prompt",
        kind: "choice",
        label: "Scene 3",
        dimension: "promptCraft",
        title: "Data's clean. Now make the ask count.",
        intro: "One prompt gets a leadership-ready draft. The others get mush or trouble.",
        scene: {
          speaker: "MAYA",
          role: "OPERATIONS COORDINATOR",
          bubble: "Excerpts are in. What do we tell it to do?",
          caption: "Twenty minutes left. Ask like you mean it.",
          location: opsDesk,
        },
        choices: [
          {
            id: "cap-vague",
            label: "“Summarize these reports.”",
            detail: "Fast to type.",
            correct: false,
            coach:
              "You'll get a generic recap and spend your remaining minutes re-prompting. A vague ask under deadline is a false economy.",
          },
          {
            id: "cap-strong",
            label: "“Draft a leadership briefing from these excerpts…”",
            detail:
              "“…top 3 themes, operational impact, recommended actions. Stick to the excerpts; flag gaps instead of filling them.”",
            correct: true,
            coach:
              "Audience, format, source boundary, honesty guardrail — in one ask. This is what prompt craft looks like when it's a habit instead of a lesson.",
          },
          {
            id: "cap-spin",
            label: "“Make this look like a smooth evening.”",
            detail: "Leadership prefers good news.",
            correct: false,
            coach:
              "Asking AI to spin operational reality is asking it to hide the signal leadership exists to see. Accuracy first — always.",
          },
        ],
      },
      {
        id: "capstone-verify",
        kind: "choice",
        label: "Scene 4",
        dimension: "verification",
        title: "The draft says “only 9 flights affected.” Your gut says more.",
        intro: "Five minutes to the call. The briefing reads beautifully.",
        scene: {
          speaker: "JORDAN",
          role: "CUSTOMER SUPPORT LEAD",
          bubble: "Nine affected flights? I count more than that on the board. Do we trust the draft?",
          caption: "The number that decides everything gets counted twice.",
          location: opsDesk,
        },
        choices: [
          {
            id: "trust-draft",
            label: "Trust the draft — it processed everything",
            detail: "The AI read all the excerpts; you didn't.",
            correct: false,
            coach:
              "Counting and aggregating are known chatbot weak spots — and this is the briefing's headline number. Reading everything is not the same as counting correctly.",
          },
          {
            id: "recount",
            label: "Recount from the source before the call",
            detail: "Sixty seconds against the ops board settles the headline number.",
            correct: true,
            coach:
              "One minute to verify the number leadership will repeat all week. That's verification in proportion to impact — the most valuable habit in this course.",
          },
          {
            id: "hedge-it",
            label: "Change it to “approximately 9”",
            detail: "Softening the number covers you either way.",
            correct: false,
            coach:
              "Hedging an unverified number just makes it vague and wrong. Verification beats wordsmithing — count it.",
          },
        ],
      },
      {
        id: "capstone-escalate",
        kind: "choice",
        label: "Scene 5",
        dimension: "judgment",
        title: "The reports hint at a recurring equipment issue. Who handles that?",
        intro: "Last decision of the shift — and the most important one.",
        scene: {
          speaker: "PRIYA",
          role: "DUTY MANAGER",
          bubble: "Three of those delays mention the same loader fault. The briefing's done — is the job done?",
          caption: "Some patterns are above the chatbot's pay grade.",
          location: briefingRoom,
        },
        choices: [
          {
            id: "ai-analysis",
            label: "Ask the AI to assess the safety risk",
            detail: "Have it analyze whether the fault pattern is dangerous.",
            correct: false,
            coach:
              "Safety-risk assessment belongs to qualified people and established processes. AI helped you spot the pattern — deciding what it means is a human, regulated job.",
          },
          {
            id: "escalate",
            label: "Flag it to the safety team through the proper channel",
            detail: "Report the pattern to the people qualified and responsible for acting on it.",
            correct: true,
            coach:
              "That's the whole course in one move: AI surfaced the pattern fast, and you routed it to accountable humans. Knowing when to escalate is the highest AI skill there is.",
          },
          {
            id: "mention-later",
            label: "Note it in next week's report",
            detail: "It's probably nothing urgent.",
            correct: false,
            coach:
              "A recurring equipment fault is exactly what escalation paths exist for. When AI helps you see a safety signal sooner, act on it sooner — not later.",
          },
        ],
      },
    ],
  },
];

export type GuideCard = {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  lines: string[];
};

export const fieldGuide: GuideCard[] = [
  {
    id: "formula",
    icon: "🎯",
    title: "The Prompt Formula",
    subtitle: "Start every prompt here",
    lines: [
      "TASK — say exactly what you want: “Summarize this report into 5 executive bullets.”",
      "CONTEXT — who it's for, what's going on, plus the (safe) source material.",
      "FORMAT — the shape you need: bullets, a table, an email under 100 words.",
    ],
  },
  {
    id: "pro-template",
    icon: "🎭",
    title: "The Pro Template",
    subtitle: "For higher-stakes asks",
    lines: [
      "You are a [ROLE]. Your task is [TASK].",
      "Context: [BACKGROUND]. Use this source material: [PASTE].",
      "Output format: [FORMAT].",
      "List your assumptions. Say what you're unsure about. Don't add facts that aren't in the source.",
    ],
  },
  {
    id: "traffic-light",
    icon: "🚦",
    title: "The Traffic Light",
    subtitle: "What's allowed at work",
    lines: [
      "🟢 GO — brainstorms, first drafts, summaries of public info, explaining concepts, polishing your own writing.",
      "🟡 GO + REVIEW — customer-facing text and anything colleagues rely on. A human checks before it ships.",
      "🔴 STOP — hiring/firing/performance decisions, sensitive data in unapproved tools, legal and financial calls.",
    ],
  },
  {
    id: "guardrails",
    icon: "🛡️",
    title: "The Four Guardrails",
    subtitle: "Zero-incident rules",
    lines: [
      "1. Never put sensitive data into unapproved tools.",
      "2. Verify critical outputs against a real source.",
      "3. A human approves every decision that matters.",
      "4. AI is an advisor, not a decision maker.",
    ],
  },
  {
    id: "red-flags",
    icon: "🚩",
    title: "Hallucination Red Flags",
    subtitle: "When to double-check",
    lines: [
      "A source or study you can't find anywhere.",
      "Precise statistics or policy numbers with no source.",
      "Any headline number you haven't counted yourself.",
      "Remember: “Are you sure?” is not verification. Check outside the chat.",
    ],
  },
  {
    id: "principles",
    icon: "⭐",
    title: "The Five Principles",
    subtitle: "The whole course in one card",
    lines: [
      "1. AI assists humans.",
      "2. Humans remain accountable.",
      "3. Verify before acting.",
      "4. Good prompts improve outcomes.",
      "5. Protect the data — approved tools, minimum necessary.",
    ],
  },
];

export const courseMinutes = course.reduce((sum, mission) => sum + mission.minutes, 0);

export function missionById(id: string) {
  return course.find((mission) => mission.id === id);
}

export function scoredSteps(mission: Mission) {
  return mission.steps.filter((step) => step.kind !== "lesson").length;
}

export function missionScore(mistakes: number) {
  return Math.max(60, 100 - mistakes * 8);
}
