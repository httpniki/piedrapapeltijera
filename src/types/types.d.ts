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
   messageColor: '#42f545' | '#CC0000' | '#ECf542' | '#FFFFFF'
}
