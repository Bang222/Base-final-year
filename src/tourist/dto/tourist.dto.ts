import { IsNotEmpty } from 'class-validator';

export class CreateTourist {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  price: number;
  @IsNotEmpty()
  quantity: number;
  @IsNotEmpty()
  phone: string;
  imageUrl?: string;
  @IsNotEmpty()
  lastRegisterDate: Date;
  @IsNotEmpty()
  address: string;
  startDate: Date;
  endDate: Date;
}
export class CartDto {
  @IsNotEmpty()
  tripId: string;
  quantity: number;
}
