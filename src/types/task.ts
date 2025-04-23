
export interface Task {
  id: string;
  taak_omschrijving: string;
  deadline?: string;
  status: 'open' | 'completed' | 'expired';
  type: 'contract' | 'document' | 'report';
  priority: 'high' | 'medium' | 'low';
}

export type TaskSortBy = "deadline" | "priority";
