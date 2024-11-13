type ButtonTextValue = 'Listo!' | 'Reintentar'

export default class SubmitButton {
   private readonly $element = document.getElementById('submit-btn') as HTMLButtonElement
   private disabled = true

   public disableBtn(disabled: boolean) {
      this.disabled = disabled
      this.$element.disabled = disabled
   }

   public setText(text: ButtonTextValue) {
      if (this.disabled) return
      this.$element.textContent = text
   }

   public onClick(cb: (event: MouseEvent) => void) {
      this.$element.addEventListener('click', (event) => {
         event.preventDefault()
         cb(event)
      })
   }
}
