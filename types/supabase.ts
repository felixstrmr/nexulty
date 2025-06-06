export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      departments: {
        Row: {
          created_at: string
          id: string
          name: string
          organization: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          organization: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          organization?: string
        }
        Relationships: [
          {
            foreignKeyName: "departments_organization_fkey"
            columns: ["organization"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      groups: {
        Row: {
          created_at: string
          id: string
          name: string
          organization: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          organization: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          organization?: string
        }
        Relationships: [
          {
            foreignKeyName: "groups_organization_fkey"
            columns: ["organization"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          created_at: string
          domain: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          domain: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          domain?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      ticket_categories: {
        Row: {
          created_at: string
          group: string | null
          id: string
          name: string
          organization: string
        }
        Insert: {
          created_at?: string
          group?: string | null
          id?: string
          name: string
          organization: string
        }
        Update: {
          created_at?: string
          group?: string | null
          id?: string
          name?: string
          organization?: string
        }
        Relationships: [
          {
            foreignKeyName: "ticket_categories_group_fkey"
            columns: ["group"]
            isOneToOne: false
            referencedRelation: "ticket_category_groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ticket_categories_organization_fkey"
            columns: ["organization"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      ticket_category_groups: {
        Row: {
          created_at: string
          id: string
          name: string
          organization: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          organization: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          organization?: string
        }
        Relationships: [
          {
            foreignKeyName: "ticket_category_group_organization_fkey"
            columns: ["organization"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      ticket_statuses: {
        Row: {
          category: Database["public"]["Enums"]["ticket_status_types"]
          created_at: string
          icon: string
          id: string
          is_default: boolean
          name: string
          organization: string
        }
        Insert: {
          category?: Database["public"]["Enums"]["ticket_status_types"]
          created_at?: string
          icon: string
          id?: string
          is_default?: boolean
          name: string
          organization: string
        }
        Update: {
          category?: Database["public"]["Enums"]["ticket_status_types"]
          created_at?: string
          icon?: string
          id?: string
          is_default?: boolean
          name?: string
          organization?: string
        }
        Relationships: [
          {
            foreignKeyName: "ticket_statuses_organization_fkey"
            columns: ["organization"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      ticket_types: {
        Row: {
          created_at: string
          id: string
          name: string
          organization: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          organization: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          organization?: string
        }
        Relationships: [
          {
            foreignKeyName: "ticket_types_organization_fkey"
            columns: ["organization"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      tickets: {
        Row: {
          assignee: string | null
          category: string
          created_at: string
          creator: string
          description: string | null
          id: string
          name: string
          organization: string
          status: string
          type: string
        }
        Insert: {
          assignee?: string | null
          category: string
          created_at?: string
          creator?: string
          description?: string | null
          id?: string
          name: string
          organization: string
          status: string
          type: string
        }
        Update: {
          assignee?: string | null
          category?: string
          created_at?: string
          creator?: string
          description?: string | null
          id?: string
          name?: string
          organization?: string
          status?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "tickets_assignee_fkey"
            columns: ["assignee"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tickets_category_fkey"
            columns: ["category"]
            isOneToOne: false
            referencedRelation: "ticket_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tickets_creator_fkey"
            columns: ["creator"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tickets_organization_fkey"
            columns: ["organization"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tickets_status_fkey"
            columns: ["status"]
            isOneToOne: false
            referencedRelation: "ticket_statuses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tickets_type_fkey"
            columns: ["type"]
            isOneToOne: false
            referencedRelation: "ticket_types"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          department: string | null
          email: string
          id: string
          organization: string
        }
        Insert: {
          created_at?: string
          department?: string | null
          email: string
          id?: string
          organization?: string
        }
        Update: {
          created_at?: string
          department?: string | null
          email?: string
          id?: string
          organization?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_department_fkey"
            columns: ["department"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_organization_fkey"
            columns: ["organization"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_organization_user: {
        Args: { _user: string; _organization: string }
        Returns: boolean
      }
    }
    Enums: {
      ticket_status_types: "resolved" | "unresolved" | "cancelled"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      ticket_status_types: ["resolved", "unresolved", "cancelled"],
    },
  },
} as const
