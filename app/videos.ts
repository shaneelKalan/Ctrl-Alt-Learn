export type VideoScene = {
  id: string;
  visual: string;
  narration: string;
  caption: string;
  seconds: number;
  recapItems?: string[];
};

export type VideoLesson = {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  minutes: string;
  linkMissionId?: string;
  scenes: VideoScene[];
};

export const videoLibrary: VideoLesson[] = [
  {
    id: "intro-to-ai",
    number: 1,
    title: "Intro to AI",
    subtitle: "What it is, what it isn't, and the one rule that matters",
    minutes: "~7 min",
    linkMissionId: "meet-ai",
    scenes: [
      {
        id: "title",
        visual: "title",
        narration:
          "Welcome to Ctrl+Alt+Learn. In the next few minutes, we're going to demystify the most talked-about technology of our time: artificial intelligence. No jargon. No hype. Just what you actually need to know.",
        caption: "Intro to AI: no jargon, no hype",
        seconds: 18,
      },
      {
        id: "question",
        visual: "question",
        narration:
          "Everyone's talking about AI. Your phone has it. Your email has it. And chances are, someone at work has already asked you to just use the AI for something. But here's a question almost nobody stops to ask: what is it actually doing?",
        caption: "What is AI actually doing?",
        seconds: 22,
      },
      {
        id: "predict",
        visual: "predict",
        narration:
          "At its heart, modern AI is a prediction machine. It was trained on an enormous amount of text (books, articles, and websites), and it learned the patterns in how humans write. So when you ask it something, it isn't looking up a fact in a database. It's predicting, one word at a time, what should come next.",
        caption: "AI predicts the next word: it doesn't look up facts",
        seconds: 27,
      },
      {
        id: "autocomplete",
        visual: "autocomplete",
        narration:
          "You've actually used a tiny version of this for years. It's the autocomplete on your phone. Type 'I'll be there in five' and your phone suggests 'minutes.' AI is that same idea, but supercharged: able to predict entire paragraphs, emails, even working computer code.",
        caption: "It's autocomplete: supercharged",
        seconds: 22,
      },
      {
        id: "chatbot",
        visual: "chatbot",
        narration:
          "The engine behind all of this has a name: a large language model, or L-L-M. When you wrap that engine in a chat window, like Microsoft Copilot, you get a chatbot. It remembers your current conversation, which is what makes it feel like you're really talking with it.",
        caption: "LLM + chat window = chatbot",
        seconds: 24,
      },
      {
        id: "generative",
        visual: "generative",
        narration:
          "You'll hear the word 'generative' a lot. It simply means the AI creates something new every time, instead of picking from a list of saved answers. Ask the same question twice, and you might get two different replies. That's not a bug. That's generation.",
        caption: "'Generative' = it creates something new each time",
        seconds: 21,
      },
      {
        id: "superpowers",
        visual: "superpowers",
        narration:
          "So what is it genuinely great at? Three things, mostly. It can summarize: turning a long report into a few clear bullets. It can draft: turning your rough notes into a polished email. And it can explain: breaking down any topic, at any level, with endless patience. Used well, that's a real superpower for everyday work.",
        caption: "Great at: summarizing, drafting, explaining",
        seconds: 27,
      },
      {
        id: "hallucination",
        visual: "hallucination",
        narration:
          "But there's a catch, and it's the most important thing in this whole video. Because AI predicts what sounds right, it can sometimes produce things that sound completely convincing and are completely wrong. It can invent facts, make up statistics, even cite studies that don't exist. This is called a hallucination.",
        caption: "The catch: AI can 'hallucinate' and sound convincing",
        seconds: 26,
      },
      {
        id: "confidence",
        visual: "confidence",
        narration:
          "And here's the tricky part: it says the wrong things with exactly the same confidence as the right things. The tone never changes. So you can't tell truth from fiction by how sure it sounds. Confidence is not evidence.",
        caption: "Confidence is not evidence",
        seconds: 19,
      },
      {
        id: "context",
        visual: "context",
        narration:
          "There's one more limit worth knowing. The AI doesn't know your world. It doesn't know your company's policies, your customers, or what happened this morning: unless you tell it. And when it doesn't know, it often fills the gap with a confident guess.",
        caption: "It doesn't know YOUR world: unless you tell it",
        seconds: 21,
      },
      {
        id: "goldenrule",
        visual: "goldenrule",
        narration:
          "So how do we use it safely? One golden rule ties everything together: AI is an advisor, not a decision maker. Let it draft, summarize, and suggest: that's where it shines. But a human being always reviews the result and makes the final call. Every single time.",
        caption: "The golden rule: AI advises, humans decide",
        seconds: 22,
      },
      {
        id: "recap",
        visual: "recap",
        narration:
          "Let's bring it home. AI is a prediction machine: fast, powerful, and genuinely useful. But it can be confidently wrong, it doesn't know your world, and it should never make the final decision alone. Keep those three things in mind, and you're already ahead of most people using it. Ready to practice? Your first mission is waiting.",
        caption: "You're ready: let's practice",
        seconds: 27,
        recapItems: ["Predicts: can be confidently wrong", "Doesn't know your world", "Never decides alone"],
      },
    ],
  },
  {
    id: "copilot-safe-tool",
    number: 2,
    title: "Copilot: Your Safe Tool",
    subtitle: "Why Microsoft Copilot is DASI's approved AI, and the rule that goes with it",
    minutes: "~5 min",
    scenes: [
      {
        id: "title",
        visual: "title",
        narration:
          "At DASI, we don't just use any AI. We use one tool, on purpose, because it's built to keep our work safe. In the next few minutes, you'll learn what it is, why we chose it, and the one rule that goes with it.",
        caption: "Copilot: your approved AI at DASI",
        seconds: 20,
      },
      {
        id: "question",
        visual: "question",
        narration:
          "There are dozens of AI chatbots out there: ChatGPT, Claude, Gemini, and more. They can all look and feel similar. So when there's work to do, which one should you actually open? At DASI, the answer is already decided for you.",
        caption: "So many AI tools, which one for work?",
        seconds: 21,
      },
      {
        id: "copilot",
        visual: "copilot",
        narration:
          "It's Microsoft Copilot. Copilot is DASI's approved AI assistant, and it's built right into the Microsoft tools you already use every day. When you use Copilot at work, you're using the tool the company has chosen and protected.",
        caption: "Meet Microsoft Copilot: our approved tool",
        seconds: 21,
      },
      {
        id: "guardrails",
        visual: "guardrails",
        narration:
          "Here's why that matters. Our enterprise Copilot runs inside DASI's Microsoft protections. Your prompts and the data you share stay within the company's compliance boundary, and they're not used to train public AI models. In other words: it's inside our guardrails.",
        caption: "Copilot works inside DASI's guardrails",
        seconds: 25,
      },
      {
        id: "two-chats",
        visual: "two-chats",
        narration:
          "Now compare that to a free chatbot or a personal account. It might look like the exact same chat box. But it doesn't have DASI's agreement behind it. The data rules are different, and your work information could end up somewhere it shouldn't. Same box: very different protection.",
        caption: "Same-looking chat box, very different rules",
        seconds: 24,
      },
      {
        id: "copilot",
        visual: "copilot",
        narration:
          "And to be clear, this isn't about one AI being smart and another being bad. The other tools aren't the enemy. It's about which tool is contractually protected for DASI's data. Copilot is the one that's approved and inside our guardrails, so that's the one we use for work.",
        caption: "Not about good or bad: about approved",
        seconds: 23,
      },
      {
        id: "two-chats",
        visual: "two-chats",
        narration:
          "So here's the rule, and it's the heart of this whole video. For work, use Copilot. Don't use ChatGPT, Claude, or any other AI tool for company work unless it has been explicitly approved. When it comes to DASI data: approved tools only.",
        caption: "The rule: Copilot for work: others need approval",
        seconds: 23,
      },
      {
        id: "superpowers",
        visual: "superpowers",
        narration:
          "The good news? You lose nothing. Copilot does everything you'd want from AI: it summarizes long documents, drafts your emails, and explains tricky topics. It just does it on work content, safely, inside the guardrails.",
        caption: "Copilot does the same superpowers: safely",
        seconds: 20,
      },
      {
        id: "ask",
        visual: "question",
        narration:
          "And if you ever think a different tool would genuinely help, you don't have to give up on it. Just ask before you use it. Getting something approved is usually a quick conversation with your manager or I-T: not a dead end.",
        caption: "Need another tool? Just ask first",
        seconds: 21,
      },
      {
        id: "recap",
        visual: "recap",
        narration:
          "Let's lock it in. At DASI, Copilot is your approved AI, it works inside the company's protections, and for work, it's where you start. Other tools need approval first. Simple as that.",
        caption: "Copilot first. Approved tools only.",
        seconds: 19,
        recapItems: ["Copilot is DASI-approved", "It works inside our guardrails", "Other tools need approval"],
      },
    ],
  },
  {
    id: "work-vs-personal",
    number: 3,
    title: "Work Account, Personal Account",
    subtitle: "Keep work data in the work tool, and keep the guardrails on",
    minutes: "~5 min",
    scenes: [
      {
        id: "title",
        visual: "title",
        narration:
          "You probably have more than one way to reach AI: one at work, and one at home. Keeping them straight is one of the most important safety habits there is. Let's make it easy.",
        caption: "Work account, personal account",
        seconds: 18,
      },
      {
        id: "two-accounts",
        visual: "two-accounts",
        narration:
          "Think of it as two separate worlds. There's your DASI work account, the one you sign into with your company login. And there are your personal accounts, your own email, your own subscriptions, at home. They may both have AI, but they are not the same.",
        caption: "You live in two AI worlds",
        seconds: 24,
      },
      {
        id: "guardrails",
        visual: "guardrails",
        narration:
          "When you sign into Copilot with your DASI account, you step inside the company's protections. This is where work belongs. Your work data is meant to live here: in the approved tool, on the work account.",
        caption: "Work account = inside DASI's protections",
        seconds: 21,
      },
      {
        id: "personal-safe",
        visual: "personal-safe",
        narration:
          "Your personal accounts are a different story. Free chatbots, your own logins, your phone at home. They're fantastic for your personal life: planning a trip, a recipe, learning a hobby. But they don't have any of DASI's protections.",
        caption: "Personal accounts = great for your life",
        seconds: 22,
      },
      {
        id: "crossstreams",
        visual: "crossstreams",
        narration:
          "So here's where the real risk lives. It's not the tool itself. It's crossing the streams: taking DASI's work data and putting it into a personal account. The moment work information leaves the work account, it leaves the guardrails behind.",
        caption: "The real danger: work data in a personal account",
        seconds: 23,
      },
      {
        id: "temptation",
        visual: "chatbot",
        narration:
          "And it usually starts innocently. 'I'll just finish this at home in my personal chatbot.' It feels harmless. But that one paste takes company data outside every protection we have. However tempting the shortcut, keep work data in the work account.",
        caption: "The tempting shortcut: don't take it",
        seconds: 23,
      },
      {
        id: "personal-free",
        visual: "personal-safe",
        narration:
          "The flip side is freeing. In your personal life, use whatever AI you like: nobody's stopping you. The only line is this: never put DASI's confidential or customer data into a personal account. Your life, your tools. Work data, work tools.",
        caption: "At home, use AI freely: just not with work data",
        seconds: 22,
      },
      {
        id: "test",
        visual: "question",
        narration:
          "When you're not sure, run a two-second check before you type. Ask yourself: am I in my work account? And is this work data? If it's work data, it belongs in Copilot on your DASI account. Match them up, every time.",
        caption: "Quick test: right account, right data?",
        seconds: 21,
      },
      {
        id: "recap",
        visual: "recap",
        narration:
          "Bring it home. Work data goes in your work Copilot account. Personal life goes in your personal accounts. Never mix the two, and you've mastered one of the biggest AI safety habits there is.",
        caption: "Work data → work Copilot. Never mix.",
        seconds: 19,
        recapItems: ["Work data → work Copilot", "Personal life → personal accounts", "Never mix the two"],
      },
    ],
  },
  {
    id: "dasi-playbook",
    number: 4,
    title: "The DASI AI Playbook",
    subtitle: "Your one-page decision guide for AI at work",
    minutes: "~4 min",
    linkMissionId: "work-mode",
    scenes: [
      {
        id: "title",
        visual: "title",
        narration:
          "Let's put it all together into one simple playbook you can carry into any workday: when and how to reach for AI at DASI, in a few clear moves.",
        caption: "The DASI AI Playbook",
        seconds: 16,
      },
      {
        id: "copilot",
        visual: "copilot",
        narration:
          "Move one: when there's work to do, open Copilot. It's the approved, protected default, signed in with your DASI account. That's your starting line, every single time.",
        caption: "Move 1: for work, open Copilot",
        seconds: 18,
      },
      {
        id: "traffic",
        visual: "traffic",
        narration:
          "From there, read the traffic light. Three lanes tell you how to handle almost anything AI at work: green means go, yellow means go with a review, and red means stop and ask. Let's take them one at a time.",
        caption: "Then read the traffic light",
        seconds: 20,
      },
      {
        id: "green",
        visual: "superpowers",
        narration:
          "Green light: go. Brainstorming ideas, drafting content you'll review, and summarizing internal, non-sensitive work. These are everyday wins in Copilot. Use it freely, and give the result a quick read before you rely on it.",
        caption: "Green: brainstorm, draft, summarize",
        seconds: 21,
      },
      {
        id: "yellow",
        visual: "goldenrule",
        narration:
          "Yellow light: go, then review. Anything a customer will see, or a colleague will rely on. Let Copilot draft it fast, but a qualified person always reviews it before it goes out. AI drafts; humans approve.",
        caption: "Yellow: a human reviews before it ships",
        seconds: 20,
      },
      {
        id: "red",
        visual: "stop",
        narration:
          "Red light: stop. Confidential, regulated, or safety-sensitive data. Or wanting to use a tool that isn't approved. Or letting AI make a final call about people or safety. In the red lane, you stop, and you ask before you act.",
        caption: "Red: stop and ask first",
        seconds: 22,
      },
      {
        id: "nevers",
        visual: "crossstreams",
        narration:
          "And a few hard nos worth memorizing. Never put work data into a personal account. Never use an unapproved tool for company work. And never let AI make the final decision on something that affects people or safety. Those lines don't move.",
        caption: "The hard nos: never do these",
        seconds: 22,
      },
      {
        id: "recap",
        visual: "recap",
        narration:
          "That's the whole playbook. For work, Copilot first. Keep work data in your work account. Verify what matters. And when you're unsure, ask: one question beats one incident. You're ready. Go put it to work.",
        caption: "Copilot first. Verify. Ask when unsure.",
        seconds: 21,
        recapItems: ["Copilot first, for work", "Work account for work data", "Verify: then ask if unsure"],
      },
    ],
  },
];

export function videoById(id: string) {
  return videoLibrary.find((video) => video.id === id);
}
