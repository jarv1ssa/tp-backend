import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserDocument } from "src/user/schemas/user.schema";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { UserService } from "src/user/user.service";
import { compare } from "src/utils/bcrypt.util";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findOne(username);

    if (user && compare(password, user.password)) {
      return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        username: user.username,
        role: user.role,
      };
    }

    return null;
  }

  register(createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  login(user: UserDocument) {
    return {
      user,
      accessToken: this.jwtService.sign(user),
    };
  }
}
