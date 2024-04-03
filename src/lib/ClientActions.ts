import { type Result, type Choices, type Choice } from '../types/types'
import HTMLElements from './HTMLElements'
import { gameChoice } from './consts/consts'

interface CurrentChoices {
   userChoice: Choice
   botChoice: Choice
}

interface RenderResult extends CurrentChoices {
   gameResult: Result
}

export default class ClientActions extends HTMLElements {
   constructor() {
      super()
      this.getFormElements()
   }

   getChoiceIcon(choice: Choices) {
      if (choice === 'Piedra') return '🪨'
      if (choice === 'Papel') return '🧻'
      if (choice === 'Tijera') return '✂️'

      return '>.<'
   }

   getRandomChoice(): Choices {
      const randomNumber = Math.ceil(Math.random() * 3) - 1
      const choices = Object.keys(gameChoice)
      const randomChoice = choices[randomNumber] as Choices

      return randomChoice
   }

   evaluateResult({ userChoice, botChoice }: CurrentChoices) {
      const userChoiceProps = gameChoice[userChoice.value]
      let gameResult: Result | null = null

      if (userChoice.value === botChoice.value) {
         gameResult = {
            win: null,
            message: 'Empate >.<',
            messageColor: '#ecf542'
         }
      }

      if (userChoiceProps.win === botChoice.value) {
         gameResult = {
            win: true,
            message: '¡Felicitaciones, Ganaste :D!',
            messageColor: '#42f545'
         }
      }

      if (userChoiceProps.lose === botChoice.value) {
         gameResult = {
            win: false,
            message: 'Ups, Perdiste :(',
            messageColor: '#CC0000'
         }
      }

      return gameResult as Result
   }

   renderResult({ userChoice, botChoice, gameResult }: RenderResult) {
      this.$userChoice.textContent = `🧑 Elegiste ${userChoice.icon} ${userChoice.value}`
      this.$botChoice.textContent = `El 🤖 eligió ${botChoice.icon} ${botChoice.value}`
      this.$submitButton.textContent = 'Reintentar'

      this.$gameResult.textContent = gameResult.message
      this.$gameResult.style.color = gameResult.messageColor
   }
}
