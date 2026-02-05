export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      addresses: {
        Row: {
          area: string
          created_at: string | null
          details: string | null
          id: string
          is_default: boolean | null
          lat: number | null
          lng: number | null
          title: string
          user_id: string
        }
        Insert: {
          area: string
          created_at?: string | null
          details?: string | null
          id?: string
          is_default?: boolean | null
          lat?: number | null
          lng?: number | null
          title: string
          user_id: string
        }
        Update: {
          area?: string
          created_at?: string | null
          details?: string | null
          id?: string
          is_default?: boolean | null
          lat?: number | null
          lng?: number | null
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      chef_profiles: {
        Row: {
          area: string
          available_now: boolean | null
          avg_rating: number | null
          bio: string | null
          created_at: string | null
          hygiene_agreement: boolean | null
          id: string
          is_verified: boolean | null
          pickup_available: boolean | null
          total_reviews: number | null
          updated_at: string | null
          user_id: string
          working_hours: Json | null
        }
        Insert: {
          area: string
          available_now?: boolean | null
          avg_rating?: number | null
          bio?: string | null
          created_at?: string | null
          hygiene_agreement?: boolean | null
          id?: string
          is_verified?: boolean | null
          pickup_available?: boolean | null
          total_reviews?: number | null
          updated_at?: string | null
          user_id: string
          working_hours?: Json | null
        }
        Update: {
          area?: string
          available_now?: boolean | null
          avg_rating?: number | null
          bio?: string | null
          created_at?: string | null
          hygiene_agreement?: boolean | null
          id?: string
          is_verified?: boolean | null
          pickup_available?: boolean | null
          total_reviews?: number | null
          updated_at?: string | null
          user_id?: string
          working_hours?: Json | null
        }
        Relationships: []
      }
      meals: {
        Row: {
          allergens_text: string | null
          chef_id: string
          created_at: string | null
          description: string | null
          id: string
          ingredients_text: string | null
          is_available: boolean | null
          max_qty_per_day: number | null
          photo_url: string | null
          prep_time_min: number
          price: number
          tags: Json | null
          title: string
          updated_at: string | null
        }
        Insert: {
          allergens_text?: string | null
          chef_id: string
          created_at?: string | null
          description?: string | null
          id?: string
          ingredients_text?: string | null
          is_available?: boolean | null
          max_qty_per_day?: number | null
          photo_url?: string | null
          prep_time_min?: number
          price: number
          tags?: Json | null
          title: string
          updated_at?: string | null
        }
        Update: {
          allergens_text?: string | null
          chef_id?: string
          created_at?: string | null
          description?: string | null
          id?: string
          ingredients_text?: string | null
          is_available?: boolean | null
          max_qty_per_day?: number | null
          photo_url?: string | null
          prep_time_min?: number
          price?: number
          tags?: Json | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      order_items: {
        Row: {
          created_at: string | null
          id: string
          meal_id: string
          order_id: string
          price: number
          qty: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          meal_id: string
          order_id: string
          price: number
          qty?: number
        }
        Update: {
          created_at?: string | null
          id?: string
          meal_id?: string
          order_id?: string
          price?: number
          qty?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_meal_id_fkey"
            columns: ["meal_id"]
            isOneToOne: false
            referencedRelation: "meals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          accepted_at: string | null
          address_id: string | null
          chef_id: string
          completed_at: string | null
          created_at: string | null
          customer_id: string
          delivery_fee: number | null
          id: string
          notes: string | null
          preferred_time: string | null
          status: Database["public"]["Enums"]["order_status"]
          subtotal: number
          total: number
          updated_at: string | null
        }
        Insert: {
          accepted_at?: string | null
          address_id?: string | null
          chef_id: string
          completed_at?: string | null
          created_at?: string | null
          customer_id: string
          delivery_fee?: number | null
          id?: string
          notes?: string | null
          preferred_time?: string | null
          status?: Database["public"]["Enums"]["order_status"]
          subtotal?: number
          total?: number
          updated_at?: string | null
        }
        Update: {
          accepted_at?: string | null
          address_id?: string | null
          chef_id?: string
          completed_at?: string | null
          created_at?: string | null
          customer_id?: string
          delivery_fee?: number | null
          id?: string
          notes?: string | null
          preferred_time?: string | null
          status?: Database["public"]["Enums"]["order_status"]
          subtotal?: number
          total?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_address_id_fkey"
            columns: ["address_id"]
            isOneToOne: false
            referencedRelation: "addresses"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          full_name: string
          id: string
          phone: string | null
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          full_name: string
          id: string
          phone?: string | null
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string
          id?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string | null
        }
        Relationships: []
      }
      reports: {
        Row: {
          chef_id: string
          created_at: string | null
          details: string | null
          id: string
          reason: string
          reporter_id: string
        }
        Insert: {
          chef_id: string
          created_at?: string | null
          details?: string | null
          id?: string
          reason: string
          reporter_id: string
        }
        Update: {
          chef_id?: string
          created_at?: string | null
          details?: string | null
          id?: string
          reason?: string
          reporter_id?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          chef_id: string
          comment: string | null
          created_at: string | null
          customer_id: string
          id: string
          order_id: string
          ratings: Json
        }
        Insert: {
          chef_id: string
          comment?: string | null
          created_at?: string | null
          customer_id: string
          id?: string
          order_id: string
          ratings?: Json
        }
        Update: {
          chef_id?: string
          comment?: string | null
          created_at?: string | null
          customer_id?: string
          id?: string
          order_id?: string
          ratings?: Json
        }
        Relationships: [
          {
            foreignKeyName: "reviews_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: true
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_chefs: {
        Row: {
          chef_id: string
          created_at: string | null
          customer_id: string
          id: string
        }
        Insert: {
          chef_id: string
          created_at?: string | null
          customer_id: string
          id?: string
        }
        Update: {
          chef_id?: string
          created_at?: string | null
          customer_id?: string
          id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["app_role"]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "customer" | "chef"
      order_status:
        | "placed"
        | "accepted"
        | "cooking"
        | "ready"
        | "completed"
        | "cancelled"
        | "expired"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["customer", "chef"],
      order_status: [
        "placed",
        "accepted",
        "cooking",
        "ready",
        "completed",
        "cancelled",
        "expired",
      ],
    },
  },
} as const
