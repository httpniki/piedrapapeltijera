import { gameChoice } from '../lib/consts/consts'
import type { Choice, Choices, Result as ResultType } from './../types/types'

export default class Result {
   private readonly $gameResultSection = document.querySelector('#game-result') as HTMLElement
   private readonly $userChoice = document.querySelector('#user-choice .choice') as HTMLElement
   private readonly $botChoice = document.querySelector('#bot-choice .choice') as HTMLElement
   private readonly $result = document.querySelector('#result') as HTMLElement

   private win?: boolean | null
   private message: ResultType['message'] = ''
   private messageColor: ResultType['messageColor'] = '#FFFFFF'

   private evaluateResult(userChoice: Choices, botChoice: Choices) {
      const userChoiceProps = gameChoice[userChoice]

      if (userChoice === botChoice) {
         this.win = null
         this.message = 'Empate >.<'
         this.messageColor = '#ECf542'
      }

      if (userChoiceProps.win === botChoice) {
         this.win = true
         this.message = '¡Felicitaciones, Ganaste :D!'
         this.messageColor = '#42f545'
      }

      if (userChoiceProps.lose === botChoice) {
         this.win = false
         this.message = 'Ups, Perdiste :('
         this.messageColor = '#CC0000'
      }

      return {
         win: this.win,
         message: this.message,
         messageColor: this.messageColor
      }
   }

   public renderResult(userChoice: Choice, botChoice: Choice) {
      const result = this.evaluateResult(userChoice.value, botChoice.value)

      this.$gameResultSection.style.display = 'block'
      this.$userChoice.textContent = `${userChoice.icon} ${userChoice.value}`
      this.$botChoice.textContent = `${botChoice.icon} ${botChoice.value}`

      this.$result.textContent = result.message
      this.$result.style.color = result.messageColor
   }

   public reset() {
      this.win = undefined
      this.message = ''
      this.messageColor = '#FFFFFF'
   }
}
