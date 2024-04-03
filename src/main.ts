import HTMLElements from './lib/HTMLElements'
import Bot from './lib/models/Bot'
import Result from './lib/models/Result'
import User from './lib/models/User'
import type { Choices } from './types/types'

class Main extends HTMLElements {
   user: User
   bot: Bot
   result: Result

   constructor() {
      super()
      this.user = new User()
      this.bot = new Bot()
      this.result = new Result()
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
      this.user.setValue(inputValue)

      this.$submitButton.disabled = false
      this.$checkboxs.forEach($el => {
         if ($el.value !== this.user?.value) $el.checked = false
      })
   }

   onSubmit() {
      this.onLoading()

      setTimeout(() => {
         this.loaderAction('remove')

         this.bot.getRandomChoice()

         if (!this.user.value) throw new Error('User choice not found')
         if (!this.bot.value) throw new Error('Bot choice not found')

         this.result.evaluateResult(this.user.value, this.bot.value)

         this.renderResult(this.user, this.bot, this.result)

         this.onFinish()
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

   onFinish() {
      if (this.user && this.bot) {
         this.$checkboxList?.forEach(el => el.style.display = 'block')

         this.user.reset()
         this.bot.reset()
         this.result.reset()

         this.$checkboxs?.forEach(el => el.checked = false)
         this.$submitButton.disabled = true
      }
   }

   renderResult(user: User, bot: Bot, result: Result) {
      this.$userChoice.textContent = `🧑 Elegiste ${user.icon} ${user.value}`
      this.$botChoice.textContent = `El 🤖 eligió ${bot.icon} ${bot.value}`
      this.$submitButton.textContent = 'Reintentar'

      this.$gameResult.textContent = result.message
      this.$gameResult.style.color = result.messageColor
   }
}

new Main().init()
