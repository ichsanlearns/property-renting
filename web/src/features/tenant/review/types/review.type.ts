export interface Review {
  id: string;
  rating: number;
  comment: string;
  reply?: string;
  user: {
    firstName: string;
  };
}
