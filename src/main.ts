import HTMLElements from './lib/HTMLElements'
import type { Choice, ChoiceProps, Choices, Result } from './types/types'

const gameChoice = {
   Piedra: {
      win: 'Tijera',
      lose: 'Papel'
   },
   Papel: {
      win: 'Piedra',
      lose: 'Tijera'
   },
   Tijera: {
      win: 'Papel',
      lose: 'Piedra'
   }
}

class Main extends HTMLElements {
   userChoice: Choice | null = null
   botChoice: Choice | null = null
   gameResult: Result = {
      win: null,
      message: '',
      messageColor: '#ffffff'
   }

   constructor() {
      super()
      this.setup()
   }

   setup() {
      this.getFormElements()

      this.$form?.addEventListener('input', (event) => {
         const target = event.target as HTMLInputElement
         const value = target.value as Choices

         this.userChoice = {
            value,
            icon: this.getChoiceIcon(value)
         }

         this.$submit.disabled = false
         this.$checkboxs?.forEach(el => (el.value !== this.userChoice?.value) ? el.checked = false : null)
      })

      this.$submit?.addEventListener('click', (event) => {
         event.preventDefault()
         this.$userChoose.textContent = ''
         this.$result.textContent = ''
         this.$subtitle.style.display = 'none'
         this.$botResponse.textContent = 'Eligiendo...'

         this.$li?.forEach(el => el.style.display = 'none')
         this.$submit.disabled = true

         setTimeout(() => {
            const botChoice = this.getRandomChoice()
            this.botChoice = {
               value: botChoice,
               icon: this.getChoiceIcon(botChoice)
            }

            if (this.userChoice && this.botChoice) {
               this.$li?.forEach(el => el.style.display = 'block')

               this.evaluateResult()
               this.renderResult()
               this.resetState()
            }
         }, 1000)
      })
   }

   private resetState() {
      this.$submit.disabled = true
      this.$checkboxs?.forEach(el => el.checked = false)
      this.userChoice = null
   }

   getChoiceIcon(choice: Choices) {
      if (choice === 'Piedra') return '🪨'
      if (choice === 'Papel') return '🧻'
      if (choice === 'Tijera') return '✂️'

      return '>.<'
   }

   private getRandomChoice(): Choices {
      const randomNumber = Math.ceil(Math.random() * 3) - 1
      const choices = Object.keys(gameChoice)
      const randomChoice = choices[randomNumber] as Choices

      return randomChoice
   }

   private evaluateResult() {
      const userChoiceProps = gameChoice[this.userChoice?.value as Choices] as ChoiceProps

      if (this.userChoice === this.botChoice) {
         this.gameResult = {
            win: null,
            message: 'Empate >.<',
            messageColor: '#ecf542'
         }
      }

      if (userChoiceProps.win === this.botChoice?.value) {
         this.gameResult = {
            win: true,
            message: 'Ganaste :D',
            messageColor: '#42f545'
         }
      }

      if (userChoiceProps.lose === this.botChoice?.value) {
         this.gameResult = {
            win: false,
            message: 'Perdiste :(',
            messageColor: '#CC0000'
         }
      }
   }

   private renderResult() {
      this.$botResponse.textContent = `El bot eligio ${this.botChoice?.icon} ${this.botChoice?.value}`
      this.$userChoose.textContent = `Elegiste ${this.userChoice?.icon} ${this.userChoice?.value}`
      this.$submit.textContent = 'Reintentar'

      this.$result.textContent = this.gameResult.message
      this.$result.style.color = this.gameResult.messageColor
   }
}

new Main()

