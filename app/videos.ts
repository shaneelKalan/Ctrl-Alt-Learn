export type VideoScene = {
  id: string;
  visual: string;
  narration: string;
  caption: string;
  seconds: number;
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
        caption: "Intro to AI — no jargon, no hype",
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
          "At its heart, modern AI is a prediction machine. It was trained on an enormous amount of text — books, articles, and websites — and it learned the patterns in how humans write. So when you ask it something, it isn't looking up a fact in a database. It's predicting, one word at a time, what should come next.",
        caption: "AI predicts the next word — it doesn't look up facts",
        seconds: 27,
      },
      {
        id: "autocomplete",
        visual: "autocomplete",
        narration:
          "You've actually used a tiny version of this for years. It's the autocomplete on your phone. Type 'I'll be there in five' and your phone suggests 'minutes.' AI is that same idea, but supercharged — able to predict entire paragraphs, emails, even working computer code.",
        caption: "It's autocomplete — supercharged",
        seconds: 22,
      },
      {
        id: "chatbot",
        visual: "chatbot",
        narration:
          "The engine behind all of this has a name: a large language model, or L-L-M. When you wrap that engine in a chat window — like ChatGPT, Claude, or Microsoft Copilot — you get a chatbot. It remembers your current conversation, which is what makes it feel like you're really talking with it.",
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
          "So what is it genuinely great at? Three things, mostly. It can summarize — turning a long report into a few clear bullets. It can draft — turning your rough notes into a polished email. And it can explain — breaking down any topic, at any level, with endless patience. Used well, that's a real superpower for everyday work.",
        caption: "Great at: summarizing, drafting, explaining",
        seconds: 27,
      },
      {
        id: "hallucination",
        visual: "hallucination",
        narration:
          "But there's a catch, and it's the most important thing in this whole video. Because AI predicts what sounds right, it can sometimes produce things that sound completely convincing and are completely wrong. It can invent facts, make up statistics, even cite studies that don't exist. This is called a hallucination.",
        caption: "The catch: AI can 'hallucinate' — sound right, be wrong",
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
          "There's one more limit worth knowing. The AI doesn't know your world. It doesn't know your company's policies, your customers, or what happened this morning — unless you tell it. And when it doesn't know, it often fills the gap with a confident guess.",
        caption: "It doesn't know YOUR world — unless you tell it",
        seconds: 21,
      },
      {
        id: "goldenrule",
        visual: "goldenrule",
        narration:
          "So how do we use it safely? One golden rule ties everything together: AI is an advisor, not a decision maker. Let it draft, summarize, and suggest — that's where it shines. But a human being always reviews the result and makes the final call. Every single time.",
        caption: "The golden rule: AI advises, humans decide",
        seconds: 22,
      },
      {
        id: "recap",
        visual: "recap",
        narration:
          "Let's bring it home. AI is a prediction machine — fast, powerful, and genuinely useful. But it can be confidently wrong, it doesn't know your world, and it should never make the final decision alone. Keep those three things in mind, and you're already ahead of most people using it. Ready to practice? Your first mission is waiting.",
        caption: "You're ready — let's practice",
        seconds: 27,
      },
    ],
  },
];

export function videoById(id: string) {
  return videoLibrary.find((video) => video.id === id);
}
