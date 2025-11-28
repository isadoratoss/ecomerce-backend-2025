import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { SupabaseService } from "../lib/supabase/supabase.service";

import { AuthDTO, UserDTO } from "./auth.dto";
import { CustomerService } from "../customers/customer.service";

@Injectable()
export class AuthService {

 constructor(
  private readonly supabaseService: SupabaseService,
  private readonly customerService: CustomerService,
) {}


  async signUp(name: string, email: string, password: string): Promise<UserDTO> {
    const supabaseUser = await this.supabaseService.signUp(email, password);

    const customer = await this.customerService.save({
      name,
      supabaseId: supabaseUser.id
    });

    return {
      id: customer.id!,
      name: customer.name,
      email: supabaseUser.email!,
      supabaseId: supabaseUser.id
    };
  }

  async signIn(email: string, password: string): Promise<AuthDTO> {
    try {
      const supabaseData = await this.supabaseService.signIn(email, password);

      if (!supabaseData?.user?.id) {
        throw new Error("Credenciais inválidas");
      }

      const customer = await this.customerService.findBySupabaseId(
        supabaseData.user.id
      );

      return {
        accessToken: supabaseData.accessToken,
        user: {
          id: customer?.id ?? "",
          name: customer?.name ?? "",
          email: supabaseData.user.email ?? "",
          supabaseId: supabaseData.user.id
        }
      };

    } catch (error: any) {
      throw new HttpException(
        {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: error.message || "Credencial inválida"
        },
        HttpStatus.UNAUTHORIZED
      );
    }
  }
}
