export default class HTMLElements {
   $form!: HTMLFormElement
   $submit!: HTMLButtonElement
   $checkboxs!: NodeListOf<HTMLInputElement>
   $li!: NodeListOf<HTMLLIElement>
   $botResponse!: HTMLElement
   $userChoose!: HTMLElement
   $result!: HTMLElement
   $subtitle!: HTMLElement

   getFormElements() {
      this.$form = document.querySelector('form') as HTMLFormElement
      this.$submit = document.querySelector('button') as HTMLButtonElement
      this.$checkboxs = document.querySelectorAll('input[type=checkbox]')
      this.$li = document.querySelectorAll('li')
      this.$botResponse = document.getElementById('bot-choice') as HTMLElement
      this.$userChoose = document.getElementById('user-choice') as HTMLElement
      this.$result = document.getElementById('result') as HTMLElement
      this.$subtitle = document.getElementById('subtitle') as HTMLElement
   }
}
