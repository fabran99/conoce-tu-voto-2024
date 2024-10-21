import { traceable } from "langsmith/traceable";

export const makeTraceable = (threadId: string, name: string, func: any) => {
  return traceable(func, {
    name,
    metadata: {
      thread_id: threadId,
    },
  });
};
