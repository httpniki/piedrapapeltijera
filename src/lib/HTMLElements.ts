export default class HTMLElements {
   $form!: HTMLFormElement
   $submitButton!: HTMLButtonElement
   $checkboxs!: NodeListOf<HTMLInputElement>
   $checkboxList!: NodeListOf<HTMLLIElement>
   $botChoice!: HTMLElement
   $userChoice!: HTMLElement
   $gameResult!: HTMLElement
   $subtitle!: HTMLElement

   getFormElements() {
      this.$form = document.querySelector('form') as HTMLFormElement
      this.$submitButton = document.querySelector('button') as HTMLButtonElement
      this.$checkboxs = document.querySelectorAll('input[type=checkbox]')
      this.$checkboxList = document.querySelectorAll('li')
      this.$botChoice = document.getElementById('bot-choice') as HTMLElement
      this.$userChoice = document.getElementById('user-choice') as HTMLElement
      this.$gameResult = document.getElementById('result') as HTMLElement
      this.$subtitle = document.getElementById('subtitle') as HTMLElement
   }

   loaderAction(action: 'insert' | 'remove') {
      const $template = document.querySelector('template') as HTMLTemplateElement
      const $loader = $template.content.cloneNode(true)
      const $section = document.querySelector('section') as HTMLElement

      if (action === 'insert') $section.appendChild($loader)
      if (action === 'remove') {
         const $loader = $section.querySelector('#loader')
         if ($loader) $section.removeChild($loader)
      }
   }
}
