export interface Trip {
  id: string;
  destination: string;
  startDate: Date;
  endDate: Date;
  totalBudget: number;
  purchases: Purchase[];
}

export interface Purchase {
  id: string;
  tripId: string;
  description: string;
  amount: number;
  date: Date;
  category: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  trips: Trip[];
}

export interface Split {
  userId: string;
  amount: number;
}