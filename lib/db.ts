type D1Statement = {
  bind: (...values: unknown[]) => D1Statement;
  first: <T = unknown>() => Promise<T | null>;
  all: <T = unknown>() => Promise<{ results: T[] }>;
  run: () => Promise<unknown>;
};

export type D1Database = {
  prepare: (query: string) => D1Statement;
};

export function getDb(): D1Database | null {
  return (process.env.DB as unknown as D1Database) || null;
}
