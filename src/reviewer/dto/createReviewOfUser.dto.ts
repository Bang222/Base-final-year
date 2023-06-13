import { IsNotEmpty } from 'class-validator';

export class CreateReviewOfUSerDTO {
  @IsNotEmpty()
  content: string;
  @IsNotEmpty()
  anonymous: boolean;
  vote?: number;
}
