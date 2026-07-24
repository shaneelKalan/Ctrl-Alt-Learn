import type { GuideCard, Mission } from "./course";

const opsDesk = "HELP DESK STUDIO";
const breakRoom = "BREAK ROOM";
const briefingRoom = "BRIEFING ROOM";

export const advancedMissions: Mission[] = [
  {
    id: "adv-prompting",
    number: 1,
    title: "Prompt Engineering Deep Dive",
    shortTitle: "Prompt Engineering",
    kicker: "PROMPT MASTERY",
    description:
      "Move past basic prompts. Learn the four dials that turn an okay answer into a great one, and the pro patterns that make Copilot reliable.",
    minutes: 5,
    rule: "Role, context, constraints, examples.",
    ruleDetail:
      "A pro prompt sets a role, grounds the model in real context, names the constraints and format, and shows an example. Then it iterates.",
    steps: [
      {
        id: "four-dials",
        kind: "lesson",
        label: "Learn",
        title: "The four dials of a great prompt",
        intro: "You already know Task + Context + Format. Here are the four dials the pros turn to get more.",
        scene: {
          speaker: "MAYA",
          role: "OPERATIONS COORDINATOR",
          bubble: "My prompts are fine. But Jordan's answers are always sharper. What dials is he turning?",
          caption: "Same tool, better results. It's the ask.",
          location: briefingRoom,
        },
        beats: [
          {
            icon: "🎭",
            title: "Dial 1: Role",
            copy: "“You are an operations analyst writing for leadership.” A role focuses the expertise, tone, and level of the answer instantly.",
          },
          {
            icon: "📎",
            title: "Dial 2: Context you provide",
            copy: "Paste the real (safe) source material. A grounded prompt beats a from-memory one every time, and it hallucinates far less.",
          },
          {
            icon: "📐",
            title: "Dial 3: Constraints + format",
            copy: "Length, tone, what to include, what to leave out, and the exact shape: three bullets, a table, an email under 120 words.",
          },
          {
            icon: "🧩",
            title: "Dial 4: Examples (few-shot)",
            copy: "Show one example of a good answer. The model mirrors what it sees, so one sample is worth a paragraph of instructions.",
          },
        ],
      },
      {
        id: "best-prompt",
        kind: "choice",
        label: "Compare",
        dimension: "promptCraft",
        title: "Three prompts, same goal. Which is engineered best?",
        intro: "All three ask for a shift-handover summary. Only one turns all four dials.",
        scene: {
          speaker: "JORDAN",
          role: "CUSTOMER SUPPORT LEAD",
          bubble: "Rank these for me. Which prompt is going to give the cleanest result?",
          caption: "Spot the one that leaves nothing to chance.",
          location: opsDesk,
        },
        choices: [
          {
            id: "polite",
            label: "“Please write a really good, detailed handover summary.”",
            detail: "Polite and enthusiastic.",
            correct: false,
            coach:
              "Politeness isn't information. No role, no source, no format, no example. The model has to guess everything that matters.",
          },
          {
            id: "engineered",
            label: "“You are the outgoing shift lead. Using this log [paste], write 3 bullets…”",
            detail: "“…status, open issues, next actions; under 120 words; flag gaps instead of guessing. Example: [sample bullet].”",
            correct: true,
            coach:
              "All four dials: role, grounded context, constraints + format, and an example. This prompt earns a reliable, ready-to-use answer.",
          },
          {
            id: "dump",
            label: "“Summarize everything from today, here's all our data [pastes everything].”",
            detail: "Give it the whole picture.",
            correct: false,
            coach:
              "Dumping unfiltered data is both a data-safety risk and a quality risk. Give the minimum necessary source and a precise ask, not everything.",
          },
        ],
      },
      {
        id: "build-advanced",
        kind: "builder",
        label: "Build",
        dimension: "promptCraft",
        title: "Assemble a pro-grade prompt.",
        intro: "Pick the ingredients of a reliable Copilot prompt. Leave out what weakens it.",
        scene: {
          speaker: "MAYA",
          role: "OPERATIONS COORDINATOR",
          bubble: "Let's build one properly, all four dials. What goes in?",
          caption: "Role, context, constraints, example. Then stop.",
          location: opsDesk,
        },
        parts: [
          {
            id: "role",
            label: "Role",
            text: "You are an operations analyst writing for the duty manager.",
            good: true,
            why: "Sets expertise, audience, and tone in one line.",
          },
          {
            id: "source",
            label: "Grounded context",
            text: "Base your answer only on this approved report: [paste].",
            good: true,
            why: "Grounds the model in real, safe source material.",
          },
          {
            id: "format",
            label: "Constraints + format",
            text: "Return a 3-row table: theme, impact, recommended action. Under 150 words.",
            good: true,
            why: "A precise shape makes the output instantly usable.",
          },
          {
            id: "example",
            label: "Example (few-shot)",
            text: "Example row: “Staffing | 2 flights delayed | add one gate agent.”",
            good: true,
            why: "One sample steers the model better than a paragraph of rules.",
          },
          {
            id: "flattery",
            label: "Flattery",
            text: "You're an unbelievable genius, the best analyst ever!",
            good: false,
            why: "Praise doesn't improve output. Specificity does.",
          },
          {
            id: "dump",
            label: "Extra data",
            text: "Also here's the full customer database, just in case.",
            good: false,
            why: "Never add sensitive data “just in case.” Minimum necessary, always.",
          },
        ],
        correctFeedback:
          "That's a professional prompt: role, grounded context, constraints with a format, and a worked example. No flattery, no data dumping.",
        incorrectFeedback:
          "Keep the four dials (role, grounded context, constraints/format, example) and drop anything that adds flattery or unnecessary data.",
      },
      {
        id: "cot-iterate",
        kind: "lesson",
        label: "Level up",
        title: "Two power moves: reasoning and iteration",
        intro: "When stakes rise, ask the model to show its work, then steer it.",
        scene: {
          speaker: "JORDAN",
          role: "CUSTOMER SUPPORT LEAD",
          bubble: "The first answer is close but not right. Do I start over?",
          caption: "Never restart. Steer.",
          location: briefingRoom,
        },
        beats: [
          {
            icon: "🪜",
            title: "Ask it to reason step by step",
            copy: "For anything with logic or numbers, add “think through it step by step.” You see the reasoning, so you can catch a wrong turn.",
          },
          {
            icon: "🔦",
            title: "Ask for assumptions and confidence",
            copy: "“List your assumptions and say what you're unsure about.” Hidden guesses become visible, and you know exactly where to verify.",
          },
          {
            icon: "🔁",
            title: "Iterate, don't restart",
            copy: "“Shorter.” “More formal.” “Focus on the safety impact.” The second and third prompt are where great answers actually come from.",
          },
        ],
      },
    ],
  },
  {
    id: "adv-grounding",
    number: 2,
    title: "Ground It in Your Docs",
    shortTitle: "Grounding & Copilot",
    kicker: "GROUNDING",
    description:
      "The single biggest reliability upgrade: feed Copilot your real, approved source material, and use it right inside the Microsoft apps you already work in.",
    minutes: 4,
    rule: "Grounded beats guessed.",
    ruleDetail:
      "An answer built from a document you gave it is far more trustworthy than one from memory. Point Copilot at approved sources, and ask it to cite them.",
    steps: [
      {
        id: "why-ground",
        kind: "lesson",
        label: "Learn",
        title: "Why grounding changes everything",
        intro: "Most hallucinations come from a model answering with no source. Grounding fixes that at the root.",
        scene: {
          speaker: "MAYA",
          role: "OPERATIONS COORDINATOR",
          bubble: "How do I make Copilot stop making things up?",
          caption: "Give it something real to stand on.",
          location: briefingRoom,
        },
        beats: [
          {
            icon: "📎",
            title: "Feed it the source",
            copy: "“Based only on this document…” anchors the answer to real material. It can't invent what it's told to stick to.",
          },
          {
            icon: "🔗",
            title: "Ask it to cite the section",
            copy: "“Quote the exact line you used.” Now every claim is traceable, and a fabricated one has nowhere to hide.",
          },
          {
            icon: "🏢",
            title: "Copilot works on your files, safely",
            copy: "In DASI, Copilot can ground on your approved documents inside the Microsoft tenant, so grounding and data safety come together.",
          },
          {
            icon: "🚧",
            title: "Fence it in",
            copy: "“Don't add outside facts. If it isn't in the document, say so.” One sentence, dramatically fewer invented details.",
          },
        ],
      },
      {
        id: "grounded-or-not",
        kind: "multi",
        label: "Flag it",
        dimension: "verification",
        title: "Tap every prompt that is properly grounded.",
        intro: "Grounded prompts point at a real source and fence the model in. Tap those.",
        scene: {
          speaker: "JORDAN",
          role: "CUSTOMER SUPPORT LEAD",
          bubble: "Which of these will actually stay anchored to the truth?",
          caption: "Source + boundary = grounded.",
          location: opsDesk,
        },
        boardLabel: "PROMPT REVIEW",
        boardTitle: "Flag the grounded prompts",
        selectedTag: "GROUNDED",
        checkLabel: "Check my flags",
        items: [
          { id: "based-on", text: "“Based only on this SOP [paste], list the 5 steps.”", tag: "Prompt", shouldSelect: true },
          { id: "cite", text: "“Summarize this report and quote the line for each claim.”", tag: "Prompt", shouldSelect: true },
          { id: "memory", text: "“From what you know, what's our refund policy?”", tag: "Prompt", shouldSelect: false },
          { id: "fence", text: "“Using only the attached doc, and say so if info is missing.”", tag: "Prompt", shouldSelect: true },
          { id: "vague", text: "“Write something about our safety rules.”", tag: "Prompt", shouldSelect: false },
        ],
        correctFeedback:
          "Exactly. Grounded prompts name a real source and fence the model in. “From what you know” and vague asks invite invention.",
        incorrectFeedback:
          "Look for a named source plus a boundary. “From what you know” and “write something about…” are ungrounded, so they're the risky ones.",
      },
      {
        id: "trust-source",
        kind: "choice",
        label: "Judge",
        dimension: "verification",
        title: "Two numbers, two origins. Which do you trust?",
        intro: "Copilot gave a figure two ways. Only one is grounded.",
        scene: {
          speaker: "PRIYA",
          role: "DUTY MANAGER",
          bubble: "One answer quotes our report, the other just states a number. Which goes in the briefing?",
          caption: "Traceable beats confident.",
          location: briefingRoom,
        },
        choices: [
          {
            id: "memory-num",
            label: "The confident number with no source",
            detail: "It stated “on-time rate was 88%” with no reference.",
            correct: false,
            coach:
              "A number with no source is a guess in a suit. Even if it's right, you can't defend it. Never ship an unsourced figure to leadership.",
          },
          {
            id: "cited-num",
            label: "The number quoted from your report",
            detail: "It said “86%, per line 12 of the weekly ops report.”",
            correct: true,
            coach:
              "That's the one. It's traceable to an approved source you can open and verify. Grounded and citable is the standard for anything that matters.",
          },
          {
            id: "average",
            label: "Split the difference to 87%",
            detail: "Average the two to be safe.",
            correct: false,
            coach:
              "Averaging a sourced number with a made-up one just launders the guess. Use the traceable figure, and verify it against the report.",
          },
        ],
      },
      {
        id: "copilot-office",
        kind: "lesson",
        label: "Apply",
        title: "Copilot where you already work",
        intro: "Grounding shines inside the Microsoft apps. Same guardrails, real everyday wins.",
        scene: {
          speaker: "MAYA",
          role: "OPERATIONS COORDINATOR",
          bubble: "So where do I actually use this day to day?",
          caption: "The tools you already have, leveled up.",
          location: breakRoom,
        },
        beats: [
          {
            icon: "📄",
            title: "Word",
            copy: "“Draft this notice from the attached incident report.” Grounded on your doc, in your tenant, ready for review.",
          },
          {
            icon: "📊",
            title: "Excel",
            copy: "“Explain the trend in this table and flag outliers.” Copilot analyzes your data; you verify the numbers that matter.",
          },
          {
            icon: "📧",
            title: "Outlook + Teams",
            copy: "“Summarize this thread and list the decisions.” Long threads and meetings become clear action lists, safely inside DASI.",
          },
        ],
      },
    ],
  },
  {
    id: "adv-verify",
    number: 3,
    title: "Verify Like a Pro",
    shortTitle: "Pro Verification",
    kicker: "DEEP VERIFICATION",
    description:
      "Beginner verification is a skim. Pro verification triangulates sources, recomputes numbers, and traps fabricated citation chains before they reach a decision.",
    minutes: 4,
    rule: "Trust the source of record, not the tone.",
    ruleDetail:
      "For anything consequential: find the claim in an independent source, redo the math yourself, and treat any citation you can't open as false.",
    steps: [
      {
        id: "pro-checks",
        kind: "lesson",
        label: "Learn",
        title: "The pro's verification toolkit",
        intro: "Four techniques that catch the errors a quick read misses.",
        scene: {
          speaker: "PRIYA",
          role: "DUTY MANAGER",
          bubble: "A skim isn't enough for the board deck. What do the pros actually do?",
          caption: "Match the rigor to the stakes.",
          location: briefingRoom,
        },
        beats: [
          {
            icon: "🔺",
            title: "Triangulate",
            copy: "Confirm the claim in a second, independent source. One source can be wrong; two that agree is real confidence.",
          },
          {
            icon: "🧮",
            title: "Recompute",
            copy: "Never trust AI arithmetic on anything that matters. Redo the sum yourself, or in the system of record.",
          },
          {
            icon: "🔗",
            title: "Open every citation",
            copy: "Click it. If the study, page, or policy can't be opened and doesn't say what's claimed, treat the whole section as suspect.",
          },
          {
            icon: "❓",
            title: "Interrogate assumptions",
            copy: "Ask “what did you assume, and what are you unsure about?” The model's own hedges point you straight to the weak spots.",
          },
        ],
      },
      {
        id: "citation-chain",
        kind: "choice",
        label: "Catch it",
        dimension: "verification",
        title: "A source cites a source cites a source. None of them exist.",
        intro: "The report looks meticulously referenced. You can't open a single link.",
        scene: {
          speaker: "JORDAN",
          role: "CUSTOMER SUPPORT LEAD",
          bubble: "It's got footnotes and everything. But every link 404s. Do the footnotes save it?",
          caption: "Footnotes aren't evidence. Sources are.",
          location: opsDesk,
        },
        choices: [
          {
            id: "trust-footnotes",
            label: "Keep it, the citations look rigorous",
            detail: "All that referencing must mean it's careful.",
            correct: false,
            coach:
              "Fabricated citation chains look more rigorous than real ones, that's what makes them dangerous. Unopenable references are a red flag on the whole document.",
          },
          {
            id: "rebuild",
            label: "Treat it as unverified and rebuild from real sources",
            detail: "Discard the fake references; re-source every claim you'll actually use.",
            correct: true,
            coach:
              "Correct. A chain of sources you can't open means the claims are unverified. Rebuild the section from references you can actually read.",
          },
          {
            id: "ask-more",
            label: "Ask Copilot for the full citations",
            detail: "It can probably fill in the details.",
            correct: false,
            coach:
              "It will generate even more convincing fakes, complete with page numbers. Models double down when pressed. Verify outside the chat.",
          },
        ],
      },
      {
        id: "verify-depth",
        kind: "sort",
        label: "Triage",
        dimension: "verification",
        title: "How deep does each output need to be checked?",
        intro: "Five AI outputs, three levels of rigor. Place each one.",
        scene: {
          speaker: "PRIYA",
          role: "DUTY MANAGER",
          bubble: "Sort these by how hard we verify before we rely on them.",
          caption: "Consequences set the rigor.",
          location: briefingRoom,
        },
        buckets: ["Quick skim", "Check key facts", "Expert + recompute"],
        items: [
          {
            id: "brainstorm",
            text: "Internal brainstorm of process-improvement ideas",
            bucket: "Quick skim",
            why: "Zero-consequence ideation. Read it, pick the good ones.",
          },
          {
            id: "customer-faq",
            text: "Customer-facing FAQ answer about refunds",
            bucket: "Check key facts",
            why: "Customers act on it. Verify policy details against the source of record.",
          },
          {
            id: "board-figs",
            text: "Financial figures for the board deck",
            bucket: "Expert + recompute",
            why: "High-stakes numbers: recompute from the financial system, expert sign-off.",
          },
          {
            id: "safety-proc",
            text: "Revised ground-handling safety procedure",
            bucket: "Expert + recompute",
            why: "Safety-critical: qualified reviewer against the source of record, no exceptions.",
          },
          {
            id: "meeting-notes",
            text: "Summary of an internal planning meeting",
            bucket: "Check key facts",
            why: "Colleagues rely on it: confirm the decisions and owners are right.",
          },
        ],
        correctFeedback:
          "That's the ladder used well. You spent your rigor exactly where the consequences live.",
        incorrectFeedback:
          "Re-place a few: no-consequence ideas get a skim, customer or colleague-facing needs fact-checks, and money or safety always gets expert review plus a recompute.",
      },
    ],
  },
  {
    id: "adv-workflows",
    number: 4,
    title: "Design an AI Workflow",
    shortTitle: "AI Workflows",
    kicker: "REPEATABLE WORK",
    description:
      "Stop doing one-off prompts. Turn a recurring task into a safe, repeatable Copilot workflow, with the human checkpoint built into the right spot.",
    minutes: 4,
    rule: "Manual, AI-assisted, reviewed, standardized.",
    ruleDetail:
      "A good workflow grounds Copilot on approved inputs, uses a reusable prompt template, and keeps a human review before anything ships or repeats.",
    steps: [
      {
        id: "workflow-shape",
        kind: "lesson",
        label: "Learn",
        title: "The shape of a safe AI workflow",
        intro: "Four stages take a task from “I did it once” to “the team does it reliably.”",
        scene: {
          speaker: "MAYA",
          role: "OPERATIONS COORDINATOR",
          bubble: "I keep re-writing the same prompt every week. Can I make this a real process?",
          caption: "One-off prompt, meet repeatable workflow.",
          location: briefingRoom,
        },
        beats: [
          {
            icon: "✍️",
            title: "1. Manual",
            copy: "Do the task by hand once and note the steps. You can't automate what you can't describe.",
          },
          {
            icon: "🤖",
            title: "2. AI-assisted",
            copy: "Add Copilot where it's strong: drafting, summarizing, structuring. Ground it on your approved inputs with a reusable prompt template.",
          },
          {
            icon: "🧑‍✈️",
            title: "3. Reviewed",
            copy: "Put a human checkpoint before anything ships. The review step is what makes speed safe.",
          },
          {
            icon: "📚",
            title: "4. Standardized",
            copy: "Save the template and steps so the whole team runs it the same safe way. Now it scales.",
          },
        ],
      },
      {
        id: "build-workflow",
        kind: "builder",
        label: "Build",
        dimension: "judgment",
        title: "Assemble a safe weekly-report workflow.",
        intro: "Pick the steps that make this repeatable and safe. Leave out the shortcuts.",
        scene: {
          speaker: "MAYA",
          role: "OPERATIONS COORDINATOR",
          bubble: "Help me build the weekly ops summary as a proper workflow.",
          caption: "Ground it, template it, review it, standardize it.",
          location: opsDesk,
        },
        parts: [
          {
            id: "inputs",
            label: "Defined inputs",
            text: "Pull the week's approved ops reports as the only source.",
            good: true,
            why: "A defined, approved input keeps the workflow grounded and safe.",
          },
          {
            id: "template",
            label: "Prompt template",
            text: "Reuse a saved prompt: role, format, honesty guardrail.",
            good: true,
            why: "A saved template makes every run consistent and reliable.",
          },
          {
            id: "review",
            label: "Human review",
            text: "The duty manager reviews and approves before it's sent.",
            good: true,
            why: "The checkpoint that keeps speed accountable.",
          },
          {
            id: "standardize",
            label: "Standardize",
            text: "Document the steps so the whole team runs it identically.",
            good: true,
            why: "Turns a personal trick into a reliable team process.",
          },
          {
            id: "autosend",
            label: "Auto-send",
            text: "Have Copilot send the summary automatically, no review.",
            good: false,
            why: "Removing the human checkpoint is exactly how an AI error reaches everyone.",
          },
          {
            id: "personal",
            label: "Personal account",
            text: "Run it at home in a personal chatbot to save time.",
            good: false,
            why: "Work data belongs in the approved tool on the work account. Never a personal account.",
          },
        ],
        correctFeedback:
          "That's a workflow you can trust: approved inputs, a reusable template, a human checkpoint, and standardized steps. No auto-send, no personal accounts.",
        incorrectFeedback:
          "Keep the four safe pieces (defined inputs, prompt template, human review, standardize) and drop the auto-send and personal-account shortcuts.",
      },
      {
        id: "over-automation",
        kind: "choice",
        label: "Judge",
        dimension: "judgment",
        title: "It works so well, someone suggests removing the review step.",
        intro: "The workflow has run clean for a month. Time to cut the checkpoint?",
        scene: {
          speaker: "PRIYA",
          role: "DUTY MANAGER",
          bubble: "It hasn't missed once. Do we still need a human reviewing every week?",
          caption: "The month it works is the month you keep the check.",
          location: briefingRoom,
        },
        choices: [
          {
            id: "remove",
            label: "Remove the review, it's proven",
            detail: "A clean month means it's safe to automate fully.",
            correct: false,
            coach:
              "A clean streak doesn't remove the risk, it hides it. The one week it hallucinates a figure, there's now nobody between the error and the audience.",
          },
          {
            id: "keep",
            label: "Keep the checkpoint, maybe make it lighter",
            detail: "Trust the workflow, but keep a human sign-off before it ships.",
            correct: true,
            coach:
              "Right. You can streamline the review as trust grows, but a human stays accountable for anything that ships. That's the line over-automation crosses.",
          },
          {
            id: "sometimes",
            label: "Review only when it looks wrong",
            detail: "Skip the check unless something seems off.",
            correct: false,
            coach:
              "The dangerous errors are the ones that look right, a confident wrong number won't “seem off.” That's exactly why the checkpoint is every time.",
          },
        ],
      },
    ],
  },
  {
    id: "adv-agents",
    number: 5,
    title: "Agents & Autonomy",
    shortTitle: "Agents & Oversight",
    kicker: "AGENTIC AI",
    description:
      "The next wave of AI doesn't just answer, it acts. Learn what agents are, where the approval checkpoints go, and how much autonomy to grant.",
    minutes: 4,
    rule: "The more it can do, the more you supervise.",
    ruleDetail:
      "Agents take multi-step actions on your behalf. Match autonomy to stakes: read-only and low-risk can run free; anything consequential needs a human approval gate.",
    steps: [
      {
        id: "what-agents",
        kind: "lesson",
        label: "Learn",
        title: "From chatbot to agent",
        intro: "A chatbot answers. An agent acts, and that shift changes how you supervise it.",
        scene: {
          speaker: "JORDAN",
          role: "CUSTOMER SUPPORT LEAD",
          bubble: "People keep saying “AI agents.” How is that different from the chatbot I already use?",
          caption: "Answering is safe. Acting needs a gate.",
          location: briefingRoom,
        },
        beats: [
          {
            icon: "🎯",
            title: "An agent takes actions",
            copy: "It doesn't just draft, it can do multi-step work: pull data, fill a form, send a message, update a record, on your behalf.",
          },
          {
            icon: "🚦",
            title: "Approval checkpoints",
            copy: "The key control is a human gate before consequential actions. The agent proposes; a person approves before it acts.",
          },
          {
            icon: "🆘",
            title: "Escalation paths",
            copy: "A good agent knows its limits and hands off. It should stop and ask when it hits anything sensitive, ambiguous, or high-impact.",
          },
          {
            icon: "🧾",
            title: "Oversight and audit",
            copy: "You stay accountable for what an agent does in your name. Keep a trail of what it did, and review it, just like your own work.",
          },
        ],
      },
      {
        id: "agent-guardrail",
        kind: "choice",
        label: "Decide",
        dimension: "judgment",
        title: "An agent offers to email customers about delays, automatically.",
        intro: "It can detect a delay and message affected customers with no human in the loop.",
        scene: {
          speaker: "PRIYA",
          role: "DUTY MANAGER",
          bubble: "It could message every affected customer in seconds. Do we let it send on its own?",
          caption: "Customer-facing action, no gate? Alarm bells.",
          location: opsDesk,
        },
        choices: [
          {
            id: "full-auto",
            label: "Let it send automatically",
            detail: "It's fast and the messages are usually fine.",
            correct: false,
            coach:
              "Customer-facing messages carry the company's name and can't be unsent. “Usually fine” isn't a standard for autonomous action. This needs a gate.",
          },
          {
            id: "propose-approve",
            label: "It drafts, a person approves the batch, then it sends",
            detail: "Keep the speed; add a one-click human approval before anything goes out.",
            correct: true,
            coach:
              "That's the pattern: the agent does the heavy lifting, a human approves the consequential action. Speed and accountability together.",
          },
          {
            id: "ban",
            label: "Ban the agent entirely",
            detail: "Too risky, do it all by hand.",
            correct: false,
            coach:
              "Overcorrection. A well-gated agent is faster and just as safe. The fix is an approval checkpoint, not abandoning the capability.",
          },
        ],
      },
      {
        id: "autonomy-sort",
        kind: "sort",
        label: "Triage",
        dimension: "safety",
        title: "How much autonomy should each agent action get?",
        intro: "Match each action to the oversight it needs.",
        scene: {
          speaker: "MAYA",
          role: "OPERATIONS COORDINATOR",
          bubble: "Which of these can just run, and which need a hand on the switch?",
          caption: "Read-only is easy. Actions need gates.",
          location: briefingRoom,
        },
        buckets: ["Run freely", "Needs approval", "Never autonomous"],
        items: [
          {
            id: "summarize",
            text: "Summarize today's internal reports for you",
            bucket: "Run freely",
            why: "Read-only, internal, no external effect. Let it run; you review the summary.",
          },
          {
            id: "draft-reply",
            text: "Draft (not send) a customer reply for your review",
            bucket: "Run freely",
            why: "Drafting is safe, nothing ships without you. You approve before sending.",
          },
          {
            id: "send-customer",
            text: "Send messages to customers",
            bucket: "Needs approval",
            why: "External and irreversible. A human approves before it goes out.",
          },
          {
            id: "refund",
            text: "Issue refunds or move money",
            bucket: "Never autonomous",
            why: "Financial actions need human authorization every time, no exceptions.",
          },
          {
            id: "hr",
            text: "Decide who to hire or discipline",
            bucket: "Never autonomous",
            why: "Consequential people decisions are never an agent's call. Full stop.",
          },
        ],
        correctFeedback:
          "That's calibrated autonomy: read-only runs free, external actions get a gate, and money or people decisions are never autonomous.",
        incorrectFeedback:
          "Re-sort by reversibility and stakes: read-only is free, anything external or irreversible needs approval, and money or people decisions are never autonomous.",
      },
    ],
  },
  {
    id: "adv-govern",
    number: 6,
    title: "Lead with AI",
    shortTitle: "Govern & Scale",
    kicker: "CAPSTONE",
    description:
      "The advanced capstone: evaluate an AI use case through four lenses, choose the right controls, and scale AI across the team responsibly.",
    minutes: 5,
    rule: "Value, risk, data, oversight.",
    ruleDetail:
      "Judge any AI use by its business value, its risk, the sensitivity of the data, and the human oversight required. Then scale what passes, with standards.",
    steps: [
      {
        id: "four-lenses",
        kind: "lesson",
        label: "Learn",
        title: "Four lenses for any AI use case",
        intro: "Leaders don't ask “can AI do this?” They ask four sharper questions.",
        scene: {
          speaker: "PRIYA",
          role: "DUTY MANAGER",
          bubble: "The team keeps proposing new AI ideas. How do I judge them consistently?",
          caption: "One rubric, every proposal.",
          location: briefingRoom,
        },
        beats: [
          {
            icon: "💰",
            title: "Business value",
            copy: "What does this actually save or improve? If the win is vague, the effort and risk usually aren't worth it.",
          },
          {
            icon: "⚠️",
            title: "Risk",
            copy: "What's the damage if it's wrong, biased, or leaks? Low-risk gets a light touch; high-risk gets controls or a no.",
          },
          {
            icon: "🔐",
            title: "Data sensitivity",
            copy: "What data does it touch? Public and internal are easier; confidential, personal, or regulated data raises the bar sharply.",
          },
          {
            icon: "🧑‍✈️",
            title: "Human oversight",
            copy: "Where's the human checkpoint, and is it enough for the stakes? The higher the impact, the closer the supervision.",
          },
        ],
      },
      {
        id: "evaluate-case",
        kind: "choice",
        label: "Evaluate",
        dimension: "judgment",
        title: "A manager wants Copilot to rank job applicants. Your call?",
        intro: "Run it through the four lenses before you answer.",
        scene: {
          speaker: "JORDAN",
          role: "CUSTOMER SUPPORT LEAD",
          bubble: "It'd save hours of screening. But something feels off about it. What do we say?",
          caption: "High value, high risk, sensitive data, weak oversight.",
          location: opsDesk,
        },
        choices: [
          {
            id: "approve",
            label: "Approve it, the time savings are huge",
            detail: "Screening takes forever; let Copilot rank them.",
            correct: false,
            coach:
              "Value is real, but risk and data sensitivity are high and bias is a live danger. Ranking applicants is a red-lane, people-decision use, not an efficiency win.",
          },
          {
            id: "no-controls",
            label: "No: this is a people decision that needs the approved process",
            detail: "AI can assist logistics, but the evaluation stays human, in the hiring process.",
            correct: true,
            coach:
              "Correct. Employment decisions carry legal and fairness risk and touch sensitive data. AI can help schedule or organize; the judgment stays in your approved, human hiring process.",
          },
          {
            id: "ask-ai-bias",
            label: "Let it rank, then ask it to check itself for bias",
            detail: "Have Copilot audit its own fairness.",
            correct: false,
            coach:
              "A model auditing its own bias isn't independent oversight. This use case fails the risk and oversight lenses, no self-check fixes that.",
          },
        ],
      },
      {
        id: "pick-controls",
        kind: "multi",
        label: "Control",
        dimension: "safety",
        title: "A medium-risk use passes. Tap the controls it needs.",
        intro: "Using Copilot to draft customer-facing policy summaries. What controls make it safe?",
        scene: {
          speaker: "PRIYA",
          role: "DUTY MANAGER",
          bubble: "This one's worth doing. What guardrails do we put around it before it goes live?",
          caption: "Right controls turn a maybe into a yes.",
          location: briefingRoom,
        },
        boardLabel: "USE CASE · MEDIUM RISK",
        boardTitle: "Select the controls it needs",
        selectedTag: "REQUIRED",
        checkLabel: "Check my controls",
        items: [
          { id: "ground", text: "Ground on the approved policy documents only", tag: "Control", shouldSelect: true },
          { id: "review", text: "Human review before anything is published", tag: "Control", shouldSelect: true },
          { id: "approved-tool", text: "Use Copilot on the work account, not personal tools", tag: "Control", shouldSelect: true },
          { id: "auto-publish", text: "Auto-publish to the website to save time", tag: "Shortcut", shouldSelect: false },
          { id: "no-log", text: "Skip record-keeping to move faster", tag: "Shortcut", shouldSelect: false },
        ],
        correctFeedback:
          "Solid control set: grounded on approved sources, human review before publishing, and the approved tool. No auto-publish, no skipping the record.",
        incorrectFeedback:
          "Keep the real controls (grounding, human review, approved tool) and drop the shortcuts, auto-publishing and skipping records defeat the purpose.",
      },
      {
        id: "scale-it",
        kind: "choice",
        label: "Scale",
        dimension: "judgment",
        title: "Final call: how do you roll a winning AI workflow out to the whole team?",
        intro: "One team's Copilot workflow is a hit. Time to scale it responsibly.",
        scene: {
          speaker: "PRIYA",
          role: "DUTY MANAGER",
          bubble: "It's working great for one team. How do we take it company-wide without it going sideways?",
          caption: "Scale the standards, not just the tool.",
          location: briefingRoom,
        },
        choices: [
          {
            id: "mandate",
            label: "Mandate it everywhere immediately",
            detail: "Push it to every team this week.",
            correct: false,
            coach:
              "Scaling without standards spreads the mistakes too. A rushed rollout with no templates or training turns one team's win into everyone's risk.",
          },
          {
            id: "standards",
            label: "Share the template, train champions, measure adoption",
            detail: "Package the prompt template and review steps, train a few champions per team, and track how it's used.",
            correct: true,
            coach:
              "That's how AI scales safely: standardized templates, trained champions who spread good habits, and measurement so you catch problems early and prove the value.",
          },
          {
            id: "leave",
            label: "Leave it with the one team",
            detail: "It works there; don't risk changing anything.",
            correct: false,
            coach:
              "Hoarding a proven win is its own cost. The move isn't to avoid scaling, it's to scale with standards, champions, and measurement.",
          },
        ],
      },
    ],
  },
];

export const advancedFieldGuide: GuideCard[] = [
  {
    id: "four-dials",
    icon: "🎛️",
    title: "The Four Prompt Dials",
    subtitle: "Pro-grade prompting",
    lines: [
      "ROLE: “You are a [role] writing for [audience].”",
      "CONTEXT: paste the real, approved source material.",
      "CONSTRAINTS + FORMAT: length, tone, and the exact shape.",
      "EXAMPLE: show one good sample; the model mirrors it.",
      "Then reason step by step, ask for assumptions, and iterate.",
    ],
  },
  {
    id: "grounding",
    icon: "📎",
    title: "Grounding Checklist",
    subtitle: "Make it reliable",
    lines: [
      "“Based only on this document…” anchors the answer.",
      "“Quote the exact line you used” makes claims traceable.",
      "“If it isn't in the source, say so” fences out invention.",
      "Ground Copilot on approved files inside the DASI tenant.",
    ],
  },
  {
    id: "verify-pro",
    icon: "🔺",
    title: "Pro Verification",
    subtitle: "Proportional to impact",
    lines: [
      "Triangulate: confirm in a second independent source.",
      "Recompute every number that matters, yourself.",
      "Open every citation; if you can't, treat it as false.",
      "Ask: “what did you assume, and what are you unsure about?”",
    ],
  },
  {
    id: "workflow",
    icon: "⚙️",
    title: "Safe AI Workflow",
    subtitle: "Repeatable and reviewed",
    lines: [
      "Manual → AI-assisted → Reviewed → Standardized.",
      "Ground on approved inputs; reuse a prompt template.",
      "Keep a human checkpoint before anything ships.",
      "Never auto-send; never use a personal account for work.",
    ],
  },
  {
    id: "agents",
    icon: "🤖",
    title: "Agent Autonomy",
    subtitle: "Match control to stakes",
    lines: [
      "Read-only, internal: can run freely (you review output).",
      "External or irreversible actions: human approval gate.",
      "Money and people decisions: never autonomous.",
      "Keep an audit trail; you own what it does in your name.",
    ],
  },
  {
    id: "govern",
    icon: "⚖️",
    title: "Evaluate Any Use Case",
    subtitle: "Four lenses to lead with",
    lines: [
      "VALUE: what does it genuinely save or improve?",
      "RISK: what's the damage if it's wrong or leaks?",
      "DATA: how sensitive is the data it touches?",
      "OVERSIGHT: is the human checkpoint enough for the stakes?",
      "Scale winners with templates, champions, and measurement.",
    ],
  },
];
