import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDTO, type CredentialDTO } from "./auth.dto";

@Controller('auth')
export class AuthController {

  constructor(private readonly service:AuthService) {}

  @Post('signUp')
  signUp(@Body() body: {name: string, email: string, password: string}) {
    return this.service.signUp(
      body.name,
      body.email,
      body.password
    )
  }

  @Post('signIn')
  signIn(@Body() body: CredentialDTO): Promise<AuthDTO | null> {
    return this.service.signIn(
      body.email,
      body.password
    )
  }

 
}

