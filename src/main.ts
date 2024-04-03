import ClientActions from './lib/ClientActions'
import HTMLElements from './lib/HTMLElements'
import type { Choice, Choices, Result } from './types/types'

class Main extends HTMLElements {
   userChoice: Choice | null = null
   botChoice: Choice | null = null
   gameResult: Result | null = null
   clientActions!: ClientActions

   constructor() {
      super()
      this.clientActions = new ClientActions()
   }

   init() {
      this.getFormElements()

      this.$form.addEventListener('input', (event) => {
         if ((event.target as HTMLInputElement).type === 'checkbox') {
            const value = (event.target as HTMLInputElement).value as Choices

            this.onUserCheck(value)
         }
      })

      this.$submitButton?.addEventListener('click', (event) => {
         event.preventDefault()
         this.onSubmit()
      })
   }

   onUserCheck(inputValue: Choices) {
      this.userChoice = {
         value: inputValue,
         icon: this.clientActions.getChoiceIcon(inputValue)
      }

      if (this.userChoice) this.$submitButton.disabled = false
      this.$checkboxs?.forEach(el => (el.value !== this.userChoice?.value) ? el.checked = false : null)
   }

   onSubmit() {
      this.onLoading()

      setTimeout(() => {
         this.loaderAction('remove')

         const botChoice = this.clientActions.getRandomChoice()
         this.botChoice = {
            value: botChoice,
            icon: this.clientActions.getChoiceIcon(botChoice)
         }

         if (!this.userChoice || !this.botChoice) throw new Error('Choice not found')

         this.gameResult = this.clientActions.evaluateResult({
            userChoice: this.userChoice,
            botChoice: this.botChoice
         })

         this.clientActions.renderResult({
            userChoice: this.userChoice,
            botChoice: this.botChoice,
            gameResult: this.gameResult
         })

         this.onLoadingComplete()
      }, 1500)
   }

   onLoading() {
      this.loaderAction('insert')

      this.$userChoice.textContent = ''
      this.$botChoice.textContent = ''
      this.$gameResult.textContent = ''
      this.$subtitle.style.display = 'none'

      this.$checkboxList?.forEach(el => el.style.display = 'none')
      this.$submitButton.disabled = true
   }

   onLoadingComplete() {
      if (this.userChoice && this.botChoice) {
         this.$checkboxList?.forEach(el => el.style.display = 'block')
         this.userChoice = null

         this.$checkboxs?.forEach(el => el.checked = false)
         this.$submitButton.disabled = true
      }
   }
}

new Main().init()
