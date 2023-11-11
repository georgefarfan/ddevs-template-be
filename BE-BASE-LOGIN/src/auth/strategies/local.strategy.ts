import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import * as bcrypt from "bcrypt";
import { Strategy } from "passport-local";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "src/users/schemas/users.schema";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(LocalStrategy.name);

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    super({
      usernameField: "email",
    });
  }

  public async validate(email: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({
      where: { email },
    });

    if (!user) {
      this.logger.debug(`User ${email} not found!`);
      throw new UnauthorizedException();
    }

    if (!(await bcrypt.compare(password, user.password))) {
      this.logger.debug(`Invalid credentials for user ${email}`);
      throw new UnauthorizedException();
    }

    return user;
  }
}
