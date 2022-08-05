import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { Role } from "src/constants/role.enum";
import { Public } from "src/decorators/public.decorator";
import { Roles } from "src/decorators/roles.decorator";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { RolesGuard } from "src/guards/roles.guard";
import { LocalAuthGuard } from "src/guards/local-auth.guard";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @Post("register")
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post("login")
  login(@Request() request) {
    return this.authService.login(request.user);
  }

  @Get("account")
  getAccount(@Request() request) {
    return request.user;
  }
}
