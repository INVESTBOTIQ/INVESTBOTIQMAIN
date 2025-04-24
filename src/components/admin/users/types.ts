
export interface UserType {
  id: string;
  email: string;
  name: string;
  cashflow: number;
  spirits: number;
  belLening: number;
  status: 'active' | 'pending';
  role: 'member' | 'admin';
  notes: string;
}
