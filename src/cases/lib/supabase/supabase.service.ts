import { HttpException, Injectable } from "@nestjs/common";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_KEY!,
    );
  }

  async signUp(email: string, password: string) {
    const { data, error } = await this.supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (error) throw error;

    return {
      id: data.user?.id ?? "",
      email: data.user?.email ?? null,
    };
  }

  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.message.includes("Invalid login credentials")) {
        throw new HttpException("Credencial inválida", 400);
      }
      throw error;
    }

    if (!data || !data.user || !data.session) {
      throw new HttpException("Erro inesperado ao autenticar", 500);
    }

    return {
      user: {
        id: data.user.id,
        email: data.user.email ?? null,
      },
      accessToken: data.session.access_token,
    };
  }
}
