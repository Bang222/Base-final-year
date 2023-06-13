import { IsNotEmpty } from 'class-validator';

export class CreateStoreDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  slogan: string;
}
