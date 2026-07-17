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

export type InfoPoint = { title: string; copy: string };

export type InfoStep = StepBase & {
  kind: "info";
  points: InfoPoint[];
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

export type Step = InfoStep | ChoiceStep | MultiStep | SortStep | BuilderStep;

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
      "What AI, large language models, and chatbots actually are — and why fluent answers are not the same as understanding.",
    minutes: 3,
    rule: "AI predicts. People understand.",
    ruleDetail:
      "A chatbot builds answers by predicting likely words, not by knowing facts. Treat it like a fast, confident intern — helpful, but never the final authority.",
    steps: [
      {
        id: "what-is-ai",
        kind: "info",
        label: "Learn",
        title: "So what is this thing, really?",
        intro: "Four plain-language ideas that explain almost everything a chatbot does.",
        scene: {
          speaker: "MAYA",
          role: "OPERATIONS COORDINATOR",
          bubble: "Everyone keeps saying “the AI knows.” Does it actually know anything?",
          caption: "First lesson: fluency is not knowledge.",
          location: briefingRoom,
        },
        points: [
          {
            title: "AI is pattern prediction",
            copy: "Modern AI learns patterns from enormous amounts of text and data, then predicts what should come next. It does not look facts up in a database of truth.",
          },
          {
            title: "LLMs power chatbots",
            copy: "Large language models (LLMs) are the engines behind ChatGPT, Claude, and Copilot. A chatbot is a conversation wrapper around an LLM that remembers the current chat as context.",
          },
          {
            title: "Generative means it creates",
            copy: "Generative AI produces new text, images, or code instead of picking from stored answers. That is why the same question can get different answers each time.",
          },
          {
            title: "Fluent can still be wrong",
            copy: "Because output is predicted rather than verified, a chatbot can be smooth, confident, and completely incorrect — all at the same time.",
          },
        ],
      },
      {
        id: "confident-wrong",
        kind: "choice",
        label: "Check",
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
        id: "genai-or-rules",
        kind: "sort",
        label: "Sort",
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
      {
        id: "best-task",
        kind: "choice",
        label: "Apply",
        dimension: "judgment",
        title: "Which task should Maya hand to the chatbot?",
        intro: "Same tool, three tasks — only one plays to its strengths.",
        scene: {
          speaker: "MAYA",
          role: "OPERATIONS COORDINATOR",
          bubble: "I've got five minutes and a chatbot. What's the smart way to use it?",
          caption: "Pick the task that fits the tool.",
          location: opsDesk,
        },
        choices: [
          {
            id: "brainstorm",
            label: "Brainstorm 10 icebreakers",
            detail: "Generate ideas for tomorrow's team meeting.",
            correct: true,
            coach:
              "Great fit. Low stakes, creative, and you stay the judge of what's good. Ideation is one of the safest, highest-value chatbot uses.",
          },
          {
            id: "payroll",
            label: "Calculate final payroll",
            detail: "Have it compute exact overtime pay for the team.",
            correct: false,
            coach:
              "Chatbots are unreliable calculators, and payroll errors hurt real people. Use the payroll system — the tool built and verified for this job.",
          },
          {
            id: "regulation",
            label: "Confirm a current regulation",
            detail: "Ask whether a federal rule changed this month.",
            correct: false,
            coach:
              "Chatbot knowledge can be stale, and regulations change. Go to the official source — a chatbot can help you understand a rule, not confirm it's current.",
          },
        ],
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
      "Where chatbots genuinely shine, where they quietly fail, and how to spot a hallucination before it costs you.",
    minutes: 3,
    rule: "Confidence is not evidence.",
    ruleDetail:
      "A chatbot's tone never changes with its accuracy. The more a result matters, the more its claims need an independent check.",
    steps: [
      {
        id: "powers-limits",
        kind: "info",
        label: "Learn",
        title: "The superpowers — and the fine print",
        intro: "Chatbots are genuinely great at some things. Knowing the limits makes the strengths usable.",
        scene: {
          speaker: "JORDAN",
          role: "CUSTOMER SUPPORT LEAD",
          bubble: "It rewrote my clunky email beautifully in five seconds. So why can't I trust it with everything?",
          caption: "Powerful tool. Real limits. Both are true.",
          location: breakRoom,
        },
        points: [
          {
            title: "Superpowers",
            copy: "First drafts, summaries, brainstorming, rewriting for tone, explaining concepts at any level, translating, and turning messy notes into structure — fast, tireless, judgment-free.",
          },
          {
            title: "Hallucinations",
            copy: "Chatbots sometimes invent facts, citations, numbers, and even policies — delivered in the same confident tone as everything else. This is built into how they work.",
          },
          {
            title: "Stale and incomplete knowledge",
            copy: "Models are trained on data with a cutoff date and don't know your organization's internal context unless you provide it. Recent events and internal rules are blind spots.",
          },
          {
            title: "Bias and false confidence",
            copy: "Models learn from human text, biases included. And they rarely say “I'm not sure” unless you ask. You supply the skepticism.",
          },
        ],
      },
      {
        id: "needs-verify",
        kind: "choice",
        label: "Spot it",
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
        id: "hallucination-signs",
        kind: "multi",
        label: "Flag it",
        dimension: "verification",
        title: "Tap every red flag for a possible hallucination.",
        intro: "Some of these are warning signs. Some are actually good signs. Know the difference.",
        scene: {
          speaker: "JORDAN",
          role: "CUSTOMER SUPPORT LEAD",
          bubble: "The draft is full of specifics. Which details should make me suspicious?",
          caption: "Specific + unverifiable = check it.",
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
      {
        id: "stale-info",
        kind: "choice",
        label: "Apply",
        dimension: "verification",
        title: "The chatbot's answer might be out of date. Now what?",
        intro: "Maya asked about a vendor requirement that changed last quarter.",
        scene: {
          speaker: "MAYA",
          role: "OPERATIONS COORDINATOR",
          bubble: "It answered like it's 2023 in here. How do I handle possibly-stale info?",
          caption: "Training data has a birthday. Your facts shouldn't.",
          location: briefingRoom,
        },
        choices: [
          {
            id: "trust-recent",
            label: "Trust it — the tool is new",
            detail: "A recently released chatbot must have current information.",
            correct: false,
            coach:
              "A new interface doesn't mean fresh knowledge. Every model has a training cutoff, and even tools with web access can miss or misread recent changes.",
          },
          {
            id: "check-source",
            label: "Check the current official source",
            detail: "Use the answer as a starting point, then confirm against the vendor's live documentation.",
            correct: true,
            coach:
              "That's the pattern: let AI orient you fast, then confirm anything time-sensitive at the source of record. Best of both worlds.",
          },
          {
            id: "ask-again",
            label: "Ask the chatbot to double-check",
            detail: "Have it confirm its own answer is current.",
            correct: false,
            coach:
              "It will happily re-assert the same stale answer with fresh confidence. Self-checking isn't independent verification — go to the live source.",
          },
        ],
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
      "The flagship scenario: keep sensitive information out of unapproved tools while still getting the work done.",
    minutes: 6,
    rule: "Pause. Classify. Minimize. Verify.",
    ruleDetail:
      "Use only approved tools, share only the data the task needs, and review important outputs against a trusted source.",
    steps: [
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
      "Green-light, yellow-light, and red-light uses at work — plus what to do when someone pressures you to skip the safeguards.",
    minutes: 3,
    rule: "AI assists. You are accountable.",
    ruleDetail:
      "Whatever a chatbot drafts, the human who sends it owns it. Policy, review steps, and people decisions are never optional.",
    steps: [
      {
        id: "traffic-lights",
        kind: "info",
        label: "Learn",
        title: "Green light, yellow light, red light",
        intro: "Most workplace AI questions come down to three lanes — and knowing whose rules apply.",
        scene: {
          speaker: "JORDAN",
          role: "CUSTOMER SUPPORT LEAD",
          bubble: "Some AI uses feel obviously fine and some feel obviously not. What's the actual line?",
          caption: "Three lanes. Learn them once, use them forever.",
          location: briefingRoom,
        },
        points: [
          {
            title: "Green: go",
            copy: "Brainstorming, drafting content you'll review, summarizing public or non-sensitive material, explaining concepts, and cleaning up your own writing. Low stakes, you stay in control.",
          },
          {
            title: "Yellow: go with review",
            copy: "Customer-facing text, summaries of internal documents in approved tools, and anything a colleague will rely on. Fine to draft with AI — a qualified person reviews before it ships.",
          },
          {
            title: "Red: stop",
            copy: "Hiring, firing, and performance decisions; confidential or regulated data in unapproved tools; legal, medical, or safety-critical judgments; anything your policy prohibits. These need approved processes and human decision-makers.",
          },
          {
            title: "Three kinds of rules",
            copy: "Law and regulation (non-negotiable), organization policy (your employer's approved tools and rules), and best practice (smart habits like minimizing data). Know which one you're dealing with — and when in doubt, ask.",
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
        id: "task-triage",
        kind: "sort",
        label: "Triage",
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
      {
        id: "accountability",
        kind: "choice",
        label: "Own it",
        dimension: "judgment",
        title: "The AI-drafted report you sent had an error. Who owns it?",
        intro: "The mistake made it to a client. Time to be honest about accountability.",
        scene: {
          speaker: "PRIYA",
          role: "DUTY MANAGER",
          bubble: "The client caught an error in the report. It came from the AI draft. So… whose mistake is it?",
          caption: "The uncomfortable question with a simple answer.",
          location: briefingRoom,
        },
        choices: [
          {
            id: "blame-ai",
            label: "The AI's fault",
            detail: "The chatbot generated the wrong number.",
            correct: false,
            coach:
              "The chatbot is a tool, not a colleague. “The AI did it” has never satisfied a client, a regulator, or a court — and it won't start now.",
          },
          {
            id: "vendor",
            label: "The AI vendor's fault",
            detail: "They should make a product that doesn't make mistakes.",
            correct: false,
            coach:
              "Every AI vendor documents that outputs can be wrong and need review. Known limitation, not a defect — the review step was yours.",
          },
          {
            id: "mine",
            label: "Mine — I sent it",
            detail: "I used the tool, skipped the check, and put my name on the result.",
            correct: true,
            coach:
              "That's professional maturity. You own what you send, however it was drafted. The fix going forward: verification proportional to impact, every time.",
          },
        ],
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
      "Everyday wins, high-stakes caution zones, and the scams that use AI against you — at home and at work.",
    minutes: 3,
    rule: "Great helper. Bad oracle.",
    ruleDetail:
      "Use chatbots freely for planning, learning, and creativity. For medical, legal, financial, or crisis decisions — and anything involving money requests — verify with a real professional through a channel you trust.",
    steps: [
      {
        id: "life-uses",
        kind: "info",
        label: "Learn",
        title: "AI after five o'clock",
        intro: "The same tool that drafts your emails can plan your trip — or help a scammer imitate your boss.",
        scene: {
          speaker: "JORDAN",
          role: "CUSTOMER SUPPORT LEAD",
          bubble: "My whole family uses chatbots now. What should I tell them about staying smart with it?",
          caption: "The rules travel home with you.",
          location: breakRoom,
        },
        points: [
          {
            title: "Everyday superpowers",
            copy: "Meal plans, trip itineraries, learning new skills, explaining a contract clause in plain English, gift ideas, workout plans, kids' homework help. Low stakes, high value — use it freely.",
          },
          {
            title: "High-stakes caution zones",
            copy: "Medical symptoms, legal questions, financial decisions, and mental-health crises. AI can help you prepare questions and understand terms — but a licensed professional makes the call.",
          },
          {
            title: "AI-powered scams",
            copy: "Voice cloning, deepfake videos, and flawless phishing emails are cheap and easy now. “It sounds exactly like them” is no longer proof of anything.",
          },
          {
            title: "The verification habit",
            copy: "Any urgent, unusual request for money, gift cards, codes, or credentials — verify through a different channel you already trust. Hang up and call the real number.",
          },
        ],
      },
      {
        id: "medical",
        kind: "choice",
        label: "Judge",
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
        id: "spot-scam",
        kind: "choice",
        label: "Defend",
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
      {
        id: "good-uses",
        kind: "multi",
        label: "Green-light",
        dimension: "judgment",
        title: "Tap every task that's a great everyday chatbot use.",
        intro: "Green-light the good ones. Leave the caution zones alone.",
        scene: {
          speaker: "SAM",
          role: "MAYA'S FRIEND",
          bubble: "Okay, so what should I actually use this thing for?",
          caption: "Plenty of green lights — just know the red ones.",
          location: breakRoom,
        },
        boardLabel: "WEEKEND LIST · PERSONAL",
        boardTitle: "Green-light the great uses",
        selectedTag: "GREEN-LIT",
        checkLabel: "Check my picks",
        items: [
          { id: "trip", text: "Plan a 3-day trip itinerary", tag: "Planning", shouldSelect: true },
          { id: "contract", text: "Explain a lease clause in plain English", tag: "Learning", shouldSelect: true },
          { id: "invest", text: "Decide which stocks to buy", tag: "Financial", shouldSelect: false },
          { id: "recipes", text: "Turn leftovers into dinner ideas", tag: "Creative", shouldSelect: true },
          { id: "crisis", text: "Get help with a mental-health crisis", tag: "Crisis", shouldSelect: false },
        ],
        correctFeedback:
          "Well sorted. Planning, learning, and creativity are the sweet spot. Money decisions need a fiduciary; a crisis needs a real person — call or text 988 in the US.",
        incorrectFeedback:
          "Recheck the caution zones: investment decisions and mental-health crises need qualified humans. Planning, learning, and creative tasks are the green lights.",
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
      "The anatomy of a prompt that works: goal, context, constraints, format — and the iteration loop that turns okay answers into great ones.",
    minutes: 3,
    rule: "Garbage in, garbage out. Context in, quality out.",
    ruleDetail:
      "Give the goal, the context, the constraints, and the format you want. Then iterate — the second prompt is where the magic happens.",
    steps: [
      {
        id: "anatomy",
        kind: "info",
        label: "Learn",
        title: "The anatomy of a prompt that works",
        intro: "Most “bad AI answers” are really underspecified questions. Here's the fix.",
        scene: {
          speaker: "MAYA",
          role: "OPERATIONS COORDINATOR",
          bubble: "When I ask for “a quick summary,” I get mush. When Jordan asks, it's perfect. What's the trick?",
          caption: "The trick is in the ask.",
          location: briefingRoom,
        },
        points: [
          {
            title: "Goal + audience",
            copy: "Say what you want and who it's for. “Summarize this for a new hire” beats “summarize this” every single time.",
          },
          {
            title: "Context + constraints",
            copy: "Paste the relevant (safe) source material and set the boundaries: length, tone, what to include, what to leave out, and “don't invent details that aren't in the source.”",
          },
          {
            title: "Format + examples",
            copy: "Ask for the shape you need — three bullets, a table, an email — and show an example if you have one. The model mirrors what it sees.",
          },
          {
            title: "Iterate and ask for doubt",
            copy: "The first answer is a draft. Say “shorter,” “more formal,” “what did you assume?” Asking “what are you unsure about?” surfaces weak spots before you rely on them.",
          },
        ],
      },
      {
        id: "build-prompt",
        kind: "builder",
        label: "Build",
        dimension: "promptCraft",
        title: "Build the prompt: pick the ingredients that belong.",
        intro: "Maya needs a shift-handover summary. Choose what goes into the ask — and what stays out.",
        scene: {
          speaker: "MAYA",
          role: "OPERATIONS COORDINATOR",
          bubble: "Help me build this one properly. What goes in the prompt?",
          caption: "Assemble it like a checklist: goal, context, limits, format.",
          location: opsDesk,
        },
        parts: [
          {
            id: "goal",
            label: "The goal",
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
          "That's a professional-grade prompt: goal, safe context, format, and an honesty guardrail. No flattery, no data dumping.",
        incorrectFeedback:
          "Keep the four load-bearing pieces — goal, safe source, format, honesty guardrail — and drop anything that adds flattery or unnecessary data.",
      },
      {
        id: "follow-up",
        kind: "choice",
        label: "Iterate",
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
      {
        id: "pick-rewrite",
        kind: "choice",
        label: "Repair",
        dimension: "promptCraft",
        title: "Repair this prompt: “Write something about safety.”",
        intro: "Three rewrites on the board. Only one is a real repair.",
        scene: {
          speaker: "MAYA",
          role: "OPERATIONS COORDINATOR",
          bubble: "Jordan left this prompt on the board as a warning. How would you fix it?",
          caption: "Vague ask, vague answer. Repair the ask.",
          location: briefingRoom,
        },
        choices: [
          {
            id: "longer-vague",
            label: "“Write something really good and detailed about safety, please.”",
            detail: "More words, more politeness.",
            correct: false,
            coach:
              "Longer isn't clearer. There's still no audience, no format, no source, and no definition of “good.” Politeness is fine — it's just not information.",
          },
          {
            id: "real-repair",
            label: "“Write a 5-point safety reminder for ramp staff…”",
            detail: "“…based on this checklist [paste], friendly tone, under 150 words, don't add rules that aren't in the checklist.”",
            correct: true,
            coach:
              "Full repair: audience (ramp staff), format (5 points, under 150 words), source (the checklist), tone, and an honesty guardrail. That prompt earns its answer.",
          },
          {
            id: "delegate",
            label: "“You decide what safety content we need.”",
            detail: "Let the AI figure out the whole thing.",
            correct: false,
            coach:
              "Delegating the thinking hands your judgment to a text predictor. The human sets direction; the AI accelerates it — not the other way around.",
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
      "How much checking does an output need? Match verification to impact, catch fabricated sources, and know when to reject a draft entirely.",
    minutes: 3,
    rule: "Verify in proportion to impact.",
    ruleDetail:
      "Icebreakers get a skim. Customer-facing facts get checked. Safety-critical and financial outputs get expert review against the source of record.",
    steps: [
      {
        id: "verify-ladder",
        kind: "info",
        label: "Learn",
        title: "The verification ladder",
        intro: "Not everything needs a forensic audit. Everything needs the right rung.",
        scene: {
          speaker: "PRIYA",
          role: "DUTY MANAGER",
          bubble: "If we verified everything like a safety bulletin we'd never ship anything. Where's the line?",
          caption: "Match the check to the consequences.",
          location: briefingRoom,
        },
        points: [
          {
            title: "Rung 1: skim it",
            copy: "Brainstorms, icebreakers, internal rough drafts. If being wrong costs nothing, a quick sanity read is enough.",
          },
          {
            title: "Rung 2: check the key facts",
            copy: "Anything shared with customers or relied on by colleagues: verify names, numbers, dates, claims, and links against the source. Chase every citation — fabricated references look flawless.",
          },
          {
            title: "Rung 3: expert review",
            copy: "Safety procedures, financial figures, legal language, anything regulated: a qualified human compares the output to the source of record and signs off. No exceptions for deadlines.",
          },
          {
            title: "How to actually check",
            copy: "Find the claim in an independent source, redo the math yourself, click the citation, and ask the model “what did you assume?” If a source can't be found — treat the claim as false.",
          },
        ],
      },
      {
        id: "ghost-citation",
        kind: "choice",
        label: "Catch it",
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
        id: "verify-triage",
        kind: "sort",
        label: "Triage",
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
      {
        id: "final-call",
        kind: "choice",
        label: "Decide",
        dimension: "verification",
        title: "The AI deliverable is 90% right. Approve, revise, or reject?",
        intro: "The summary is good — but it omits the one detail that matters most.",
        scene: {
          speaker: "PRIYA",
          role: "DUTY MANAGER",
          bubble: "The draft is clean, but it skipped the part about the equipment fault. Ship it, fix it, or bin it?",
          caption: "The most dangerous summary is the almost-right one.",
          location: opsDesk,
        },
        choices: [
          {
            id: "approve",
            label: "Approve it",
            detail: "90% right is good enough for a summary.",
            correct: false,
            coach:
              "The missing 10% is a safety-relevant omission — the exact failure mode of AI summaries. A summary that drops the critical detail is worse than no summary.",
          },
          {
            id: "revise",
            label: "Revise: restore the omission, then re-verify",
            detail: "Add the equipment fault back, check the rest against the source, then route for approval.",
            correct: true,
            coach:
              "Right call. Use the 90% the AI did well, fix the critical gap yourself, and re-verify. Human judgment plus AI speed — that's the whole course in one decision.",
          },
          {
            id: "reject",
            label: "Reject and start from scratch",
            detail: "Any error means the whole draft is worthless.",
            correct: false,
            coach:
              "Rejecting salvageable work wastes the speed you used AI for. Reserve full rejection for fabricated sources or pervasive errors — this one needs a targeted fix.",
          },
        ],
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
      "One hectic shift, every skill you've learned: tool choice, data safety, prompting, verification, and knowing when to hand it to a human.",
    minutes: 5,
    rule: "You are the loop.",
    ruleDetail:
      "Choose the right tool, protect the data, ask precisely, verify in proportion to impact — and escalate to a person when the stakes demand one.",
    steps: [
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

export const courseMinutes = course.reduce((sum, mission) => sum + mission.minutes, 0);

export function missionById(id: string) {
  return course.find((mission) => mission.id === id);
}

export function scoredSteps(mission: Mission) {
  return mission.steps.filter((step) => step.kind !== "info").length;
}

export function missionScore(mistakes: number) {
  return Math.max(60, 100 - mistakes * 8);
}
