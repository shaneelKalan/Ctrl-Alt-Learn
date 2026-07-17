export type LearnerRecord = {
  id: string;
  name: string;
  email: string;
  department: string;
  skillLevel: string;
  status: string;
  createdAt: string;
};

export type AssignmentRecord = {
  id: string;
  learnerId: string;
  courseId: string;
  dueDate: string | null;
  status: string;
  createdAt: string;
};

export type CompletionRecord = {
  id: string;
  learnerId: string;
  courseId: string;
  score: number;
  certificateId: string;
  completedAt: string;
};

export type PilotStore = {
  learners: LearnerRecord[];
  assignments: AssignmentRecord[];
  completions: CompletionRecord[];
  settings: Record<string, string>;
};

const EMPTY_STORE: PilotStore = { learners: [], assignments: [], completions: [], settings: {} };
const STORE_KEY = "ctrl-alt-learn:pilot:v1";
let developmentStore: PilotStore | undefined;

function redisConfig() {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url: url.replace(/\/$/, ""), token } : null;
}

async function redis(command: unknown[]) {
  const config = redisConfig();
  if (!config) return null;
  const response = await fetch(config.url, {
    method: "POST",
    headers: { Authorization: `Bearer ${config.token}`, "Content-Type": "application/json" },
    body: JSON.stringify(command),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Pilot data store returned ${response.status}.`);
  return (await response.json()) as { result: string | null };
}

export function hasDurableStore() {
  return Boolean(redisConfig());
}

export async function readStore(): Promise<PilotStore> {
  const result = await redis(["GET", STORE_KEY]);
  if (result) return result.result ? (JSON.parse(result.result) as PilotStore) : structuredClone(EMPTY_STORE);
  developmentStore ??= structuredClone(EMPTY_STORE);
  return structuredClone(developmentStore);
}

export async function writeStore(store: PilotStore) {
  const result = await redis(["SET", STORE_KEY, JSON.stringify(store)]);
  if (!result) developmentStore = structuredClone(store);
}
