import {
  IsAlphanumeric,
  IsEmail,
  IsIn,
  IsMobilePhone,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from "class-validator";
import { Role, Roles } from "src/constants/role.enum";

export class CreateUserDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @IsMobilePhone("az-AZ")
  phone: string;

  @IsAlphanumeric()
  @MinLength(6)
  @MaxLength(256)
  username: string;

  @MinLength(8)
  @MaxLength(256)
  password: string;

  @IsIn(Roles)
  role: Role;
}
