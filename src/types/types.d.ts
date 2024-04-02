export type Choices = 'Piedra' | 'Papel' | 'Tijera'
export interface Choice {
   value: Choices
   icon: string
}

export interface ChoiceProps {
   win: Choices
   lose: Choices
}

export interface Result {
   win: boolean | null
   message: string
   messageColor: string
}
