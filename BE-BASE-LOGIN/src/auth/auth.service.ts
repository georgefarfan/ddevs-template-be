import {
  ForbiddenException,
  HttpException,
  Injectable,
  Logger,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { RegisterAuthDto } from "./dto/register-auth.dto";
import { hash, compare } from "bcrypt";
import { User, UserDocument } from "../users/schemas/users.schema";
import { LoginAuthDto } from "./dto/login-auth.dto";
import { JwtService } from "@nestjs/jwt";
import { PermissionsService } from "src/permissions/permissions.service";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private permissionService: PermissionsService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService
  ) {}

  async register(userObject: RegisterAuthDto) {
    const { password } = userObject;
    const permissions = await this.permissionService.findAll();
    const plainToHash = await hash(password, 10);
    userObject = { ...userObject, password: plainToHash };

    return this.userModel.create({
      ...userObject,
      permissions,
    });
  }

  async login(userObject: LoginAuthDto) {
    const { email, password } = userObject;
    const user = await this.userModel.findOne({ email });

    if (!user) throw new HttpException("USER_NOT_FOUND", 404);
    const checkPassword = await compare(password, user.password);

    if (!checkPassword) throw new HttpException("PASSWORD_INCORRECT", 403);

    const payload = { id: user._id, name: user.firstname };
    const token = this.jwtService.sign(payload);
    const data = {
      user,
      token,
    };

    const tokens = await this.getTokens(user._id, user.username);

    await this.updateRefreshToken(user._id, tokens.refreshToken);

    return data;
  }

  async logout(id: string) {
    return await this.userModel.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $set: {
          refreshToken: null,
        },
      }
    );
  }

  async getTokens(id: string, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: id,
          username,
        },
        {
          secret: this.configService.get<string>("JWT_ACCESS_SECRET"),
          expiresIn: "15m",
        }
      ),
      this.jwtService.signAsync(
        {
          sub: id,
          username,
        },
        {
          secret: this.configService.get<string>("JWT_REFRESH_SECRET"),
          expiresIn: "7d",
        }
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async updateRefreshToken(id: string, refreshToken: string) {
    const newToken = await hash(refreshToken, 10);

    await this.userModel.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $set: {
          refreshToken: newToken,
        },
      }
    );
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.userModel.findById(userId);
    if (!user || !user.refreshToken)
      throw new ForbiddenException("Access Denied");
    const refreshTokenMatches = await hash.verify(
      user.refreshToken,
      refreshToken
    );
    if (!refreshTokenMatches) throw new ForbiddenException("Access Denied");
    const tokens = await this.getTokens(user.id, user.username);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }
}
