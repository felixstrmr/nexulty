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
      ticket_categories: {
        Row: {
          created_at: string
          description: string | null
          group: string | null
          icon: string
          icon_color: string
          id: string
          name: string
          type: string
          workspace: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          group?: string | null
          icon: string
          icon_color: string
          id?: string
          name: string
          type: string
          workspace: string
        }
        Update: {
          created_at?: string
          description?: string | null
          group?: string | null
          icon?: string
          icon_color?: string
          id?: string
          name?: string
          type?: string
          workspace?: string
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
            foreignKeyName: "ticket_categories_type_fkey"
            columns: ["type"]
            isOneToOne: false
            referencedRelation: "ticket_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ticket_categories_workspace_fkey"
            columns: ["workspace"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      ticket_category_groups: {
        Row: {
          created_at: string
          id: string
          name: string
          position: number
          workspace: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          position: number
          workspace: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          position?: number
          workspace?: string
        }
        Relationships: [
          {
            foreignKeyName: "ticket_category_groups_workspace_fkey"
            columns: ["workspace"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      ticket_priorities: {
        Row: {
          created_at: string
          icon: string
          icon_color: string
          id: string
          is_default: boolean
          name: string
          position: number
          workspace: string
        }
        Insert: {
          created_at?: string
          icon: string
          icon_color: string
          id?: string
          is_default?: boolean
          name: string
          position: number
          workspace: string
        }
        Update: {
          created_at?: string
          icon?: string
          icon_color?: string
          id?: string
          is_default?: boolean
          name?: string
          position?: number
          workspace?: string
        }
        Relationships: [
          {
            foreignKeyName: "ticket_priorities_workspace_fkey"
            columns: ["workspace"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      ticket_statuses: {
        Row: {
          created_at: string
          icon: string
          icon_color: string
          id: string
          is_default: boolean
          name: string
          position: number
          workspace: string
        }
        Insert: {
          created_at?: string
          icon: string
          icon_color: string
          id?: string
          is_default?: boolean
          name: string
          position: number
          workspace: string
        }
        Update: {
          created_at?: string
          icon?: string
          icon_color?: string
          id?: string
          is_default?: boolean
          name?: string
          position?: number
          workspace?: string
        }
        Relationships: [
          {
            foreignKeyName: "ticket_statuses_workspace_fkey"
            columns: ["workspace"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      ticket_types: {
        Row: {
          created_at: string
          icon: string
          icon_color: string
          id: string
          name: string
          workspace: string
        }
        Insert: {
          created_at?: string
          icon: string
          icon_color: string
          id?: string
          name: string
          workspace: string
        }
        Update: {
          created_at?: string
          icon?: string
          icon_color?: string
          id?: string
          name?: string
          workspace?: string
        }
        Relationships: [
          {
            foreignKeyName: "task_types_workspace_fkey"
            columns: ["workspace"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      tickets: {
        Row: {
          assignee: string | null
          created_at: string
          description: string | null
          id: string
          number: number
          priority: string
          status: string
          subject: string
          type: string
          workspace: string
        }
        Insert: {
          assignee?: string | null
          created_at?: string
          description?: string | null
          id?: string
          number: number
          priority: string
          status: string
          subject: string
          type: string
          workspace: string
        }
        Update: {
          assignee?: string | null
          created_at?: string
          description?: string | null
          id?: string
          number?: number
          priority?: string
          status?: string
          subject?: string
          type?: string
          workspace?: string
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
            foreignKeyName: "tickets_priority_fkey"
            columns: ["priority"]
            isOneToOne: false
            referencedRelation: "ticket_priorities"
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
          {
            foreignKeyName: "tickets_workspace_fkey"
            columns: ["workspace"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          id?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          id?: string
        }
        Relationships: []
      }
      workspace_counters: {
        Row: {
          created_at: string
          id: string
          tickets: number
        }
        Insert: {
          created_at?: string
          id?: string
          tickets: number
        }
        Update: {
          created_at?: string
          id?: string
          tickets?: number
        }
        Relationships: [
          {
            foreignKeyName: "workspace_counters_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      workspace_users: {
        Row: {
          created_at: string
          id: string
          user: string
          user_role: Database["public"]["Enums"]["workspace_user_roles"]
          workspace: string
        }
        Insert: {
          created_at?: string
          id?: string
          user: string
          user_role?: Database["public"]["Enums"]["workspace_user_roles"]
          workspace: string
        }
        Update: {
          created_at?: string
          id?: string
          user?: string
          user_role?: Database["public"]["Enums"]["workspace_user_roles"]
          workspace?: string
        }
        Relationships: [
          {
            foreignKeyName: "workspace_users_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workspace_users_workspace_fkey"
            columns: ["workspace"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      workspaces: {
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      workspace_user_roles: "agent" | "customer"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
