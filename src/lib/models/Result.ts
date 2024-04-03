import type { Choices, Result as ResultType } from '../../types/types'
import { gameChoice } from '../consts/consts'

export default class Result {
   win?: boolean | null
   message: ResultType['message'] = ''
   messageColor: ResultType['messageColor'] = '#FFFFFF'

   evaluateResult(userChoice: Choices, botChoice: Choices) {
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
   }

   reset() {
      this.win = undefined
      this.message = ''
      this.messageColor = '#FFFFFF'
   }
}
