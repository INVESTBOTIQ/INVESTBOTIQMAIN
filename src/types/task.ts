
export interface Task {
  id: string;
  taak_omschrijving: string;
  deadline?: string;
  status: 'open' | 'completed' | 'expired';
  type: 'contract' | 'document' | 'report';
  priority: 'high' | 'medium' | 'low';
  created_at: string;
  updated_at: string;
  user_id: string;
}

export type TaskSortBy = "deadline" | "priority";
