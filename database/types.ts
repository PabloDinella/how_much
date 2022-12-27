export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      accounts_and_credit_cards: {
        Row: {
          color: string | null
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          color?: string | null
          created_at?: string | null
          id?: string
          name?: string
        }
      }
      transactions: {
        Row: {
          "Alguém deve esse valor pra mim?": string | null
          amount: number
          Category: string | null
          "Date time": string | null
          Description: string | null
          id: string
          Source: string | null
          Target: string | null
          Type: string | null
          Value: string | null
        }
        Insert: {
          "Alguém deve esse valor pra mim?"?: string | null
          amount?: number
          Category?: string | null
          "Date time"?: string | null
          Description?: string | null
          id?: string
          Source?: string | null
          Target?: string | null
          Type?: string | null
          Value?: string | null
        }
        Update: {
          "Alguém deve esse valor pra mim?"?: string | null
          amount?: number
          Category?: string | null
          "Date time"?: string | null
          Description?: string | null
          id?: string
          Source?: string | null
          Target?: string | null
          Type?: string | null
          Value?: string | null
        }
      }
    }
    Views: {
      expense_sum_by_account: {
        Row: {
          Source: string | null
          sum: number | null
        }
      }
      income_sum_by_account: {
        Row: {
          sum: number | null
          Target: string | null
        }
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

