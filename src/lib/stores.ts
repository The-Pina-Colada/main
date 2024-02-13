import { writable } from 'svelte/store'

export interface Item {
  icon: string
  name?: string
  price: string | number
  seller: string
  store: string
  x: number
  y: number
}

const icons = {
  enchanted_book: 'https://minecraft.wiki/images/Enchanted_Book.gif',
  totem_of_undying: 'https://minecraft.wiki/images/Totem_of_Undying_JE2_BE2.png'
}

export const data = writable<Item[]>([
  {
    icon: icons.enchanted_book,
    name: 'Mending',
    price: '2',
    seller: 'test',
    store: 'test',
    x: 0,
    y: 0
  },
  {
    icon: icons.totem_of_undying,
    name: 'Totem of Undying',
    price: '1',
    seller: 'test 2',
    store: 'test 2',
    x: 0,
    y: 0
  }
])
