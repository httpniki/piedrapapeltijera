import type { Choice as ChoiceType } from '../../types/types'

export default class Choice {
   value: ChoiceType['value'] | null = null
   icon: ChoiceType['icon'] | null = null

   setValue(value: ChoiceType['value']) {
      this.value = value

      if (value === 'Piedra') this.icon = '🪨'
      if (value === 'Papel') this.icon = '🧻'
      if (value === 'Tijera') this.icon = '✂️'
   }

   reset() {
      this.icon = null
      this.value = null
   }
}
