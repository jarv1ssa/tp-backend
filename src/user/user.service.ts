import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "./schemas/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";
import { hash } from "src/utils/bcrypt.util";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  findOne(username: string) {
    return this.userModel.findOne({ username }).exec();
  }

  create(createUserDto: CreateUserDto) {
    const password = hash(createUserDto.password);
    const createdUser = new this.userModel({
      ...createUserDto,
      password,
    });

    return createdUser.save();
  }
}
