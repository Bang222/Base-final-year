import { IsNotEmpty } from 'class-validator';

export class OrderDetailsDto {
  @IsNotEmpty()
  quantity: number;
  @IsNotEmpty()
  tripId: string;
  @IsNotEmpty()
  orderId: string;
}
