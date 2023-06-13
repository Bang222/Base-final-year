import { IsNotEmpty } from 'class-validator';

export class TripFollowerDto {
  @IsNotEmpty()
  storeId: number;
  @IsNotEmpty()
  eventId: number;
}
