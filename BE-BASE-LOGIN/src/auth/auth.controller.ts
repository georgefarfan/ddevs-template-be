import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginAuthDto } from "./dto/login-auth.dto";
import { RegisterAuthDto } from "./dto/register-auth.dto";
import { ApiTags } from "@nestjs/swagger";
import { AuthGuardLocal } from "./guards/auth-local.guard";
import { AuthGuardJwt } from "./guards/jwt-auth.guard";
import { RefreshTokenGuard } from "./guards/refresh-token.guard";

@ApiTags("autentication")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @UseGuards(AuthGuardLocal)
  async loginUser(@Body() input: LoginAuthDto) {
    return this.authService.login(input);
  }

  @Post("logout")
  @UseGuards(AuthGuardLocal)
  async logout(@Body() id: string) {
    return this.authService.logout(id);
  }

  @Post("register")
  @UseGuards(AuthGuardLocal)
  registerUser(@Body() input: RegisterAuthDto) {
    return this.authService.register(input);
  }

  @UseGuards(RefreshTokenGuard)
  @Get("refresh")
  refreshTokens(@Req() req: any) {
    const id = req.user["sub"];
    const refreshToken = req.user["refreshToken"];
    console.log("DATA =>", {
      id,
      refreshToken,
    });
    return this.authService.refreshTokens(id, refreshToken);
  }
}
