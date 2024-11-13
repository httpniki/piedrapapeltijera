import { gameChoice } from '../lib/consts/consts'
import type { Choices, Choice as ChoiceType } from '../types/types'

export class Choice {
   private value: ChoiceType['value'] | null = null
   private icon: ChoiceType['icon'] | null = null

   public setChoice(value: ChoiceType['value']) {
      this.value = value

      if (value === 'Piedra') this.icon = '🪨'
      if (value === 'Papel') this.icon = '🧻'
      if (value === 'Tijera') this.icon = '✂️'
   }

   public getSelectedChoice(): ChoiceType {
      if (!this.value) throw new Error('Value not found')
      if (!this.icon) throw new Error('Icon not found')

      return {
         value: this.value,
         icon: this.icon
      }
   }

   public reset() {
      this.icon = null
      this.value = null
   }
}

export class Bot extends Choice {
   public generateRandomChoice() {
      const randomNumber = Math.ceil(Math.random() * 3) - 1
      const choices = Object.keys(gameChoice)
      const randomChoice = choices[randomNumber] as Choices

      this.setChoice(randomChoice)
   }
}

export class User extends Choice { }
