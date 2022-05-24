export interface ICardProps {
  id: number;
  description: string;
  imageUrl: string;
  checked?: boolean;
  title: string;
  onChecked(cardId: number, isChecked: boolean): void;
}
