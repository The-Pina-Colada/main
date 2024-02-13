import { writable } from 'svelte/store'

export interface Item {
  icon: string
  name?: string
  price: string|number
  seller: string
  store: string
  x: number
  y: number
}

const icons = {
  enchanted_book: 'https://minecraft.wiki/images/Enchanted_Book.gif',
  totem_of_undying: 'https://minecraft.wiki/images/Totem_of_Undying_JE2_BE2.png'
}

export const data = writable<Item[]>()
