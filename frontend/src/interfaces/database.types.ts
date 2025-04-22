export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      banner_images: {
        Row: {
          id: string
          image_url: string
          title: string
          created_at: string
        }
        Insert: {
          id?: string
          image_url: string
          title: string
          created_at?: string
        }
        Update: {
          id?: string
          image_url?: string
          title?: string
          created_at?: string
        }
      }
      bazar_info: {
        Row: {
          id: string
          image_url: string
          description: string
          goal: number
          current_value: number
          created_at: string
        }
        Insert: {
          id?: string
          image_url: string
          description: string
          goal: number
          current_value: number
          created_at?: string
        }
        Update: {
          id?: string
          image_url?: string
          description?: string
          goal?: number
          current_value?: number
          created_at?: string
        }
      }
      reflexoes: {
        Row: {
          id: string
          text: string
          author_name: string
          author_image_url: string
          created_at: string
        }
        Insert: {
          id?: string
          text: string
          author_name: string
          author_image_url: string
          created_at?: string
        }
        Update: {
          id?: string
          text?: string
          author_name?: string
          author_image_url?: string
          created_at?: string
        }
      }
      galeria: {
        Row: {
          id: string
          image_url: string
          created_at: string
        }
        Insert: {
          id?: string
          image_url: string
          created_at?: string
        }
        Update: {
          id?: string
          image_url?: string
          created_at?: string
        }
      }
      contato: {
        Row: {
          id: string
          endereco: string
          email: string
          telefone: string
          facebook: string | null
          instagram: string | null
          youtube: string | null
          created_at: string
        }
        Insert: {
          id?: string
          endereco: string
          email: string
          telefone: string
          facebook?: string | null
          instagram?: string | null
          youtube?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          endereco?: string
          email?: string
          telefone?: string
          facebook?: string | null
          instagram?: string | null
          youtube?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never 