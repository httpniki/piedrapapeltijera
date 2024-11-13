import { Bot, User } from './components/Models'
import Result from './components/Result'
import SubmitButton from './components/SubmitButton'
import type { Choices } from './types/types'

class Main {
   private readonly user = new User()
   private readonly bot = new Bot()
   private readonly result = new Result()
   private readonly $loader = document.querySelector('#loader') as HTMLElement
   private readonly $form = document.querySelector('form') as HTMLFormElement
   private readonly checkboxList = document.querySelectorAll('input[type=checkbox]') as NodeListOf<HTMLInputElement>
   private readonly submitButton = new SubmitButton()

   init() {
      document.addEventListener('input', (event) => {
         const target = event.target as HTMLInputElement

         if (target.type === 'checkbox' && target.checked) {
            const value = target.value as Choices

            this.user.setChoice(value)
            this.submitButton.disableBtn(false)

            this.checkboxList.forEach($input => {
               if ($input.value !== value && $input.checked) $input.checked = false
            })
         }

         if (target.type === 'checkbox' && !target.checked) {
            this.submitButton.disableBtn(true)
            this.reset()
         }
      })

      this.submitButton.onClick(() => {
         this.$loader.style.display = 'flex'
         this.$form.style.display = 'none'
         this.bot.generateRandomChoice()

         const userChoice = this.user.getSelectedChoice()
         const botChoice = this.bot.getSelectedChoice()

         setTimeout(() => {
            this.$loader.style.display = 'none'
            this.$form.style.display = 'flex'
            this.submitButton.setText('Reintentar')
            this.result.renderResult(userChoice, botChoice)
            this.reset()
         }, 1500)
      })
   }

   private reset() {
      this.user.reset()
      this.bot.reset()
      this.result.reset()
      this.checkboxList.forEach(el => el.checked = false)
   }
}

new Main().init()
