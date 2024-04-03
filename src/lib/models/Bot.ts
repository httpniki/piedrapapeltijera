import type { Choices } from '../../types/types'
import { gameChoice } from '../consts/consts'
import Choice from './Choice'

export default class Bot extends Choice {
   getRandomChoice() {
      const randomNumber = Math.ceil(Math.random() * 3) - 1
      const choices = Object.keys(gameChoice)
      const randomChoice = choices[randomNumber] as Choices

      this.setValue(randomChoice)
   }
}
