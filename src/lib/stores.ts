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

export const data = writable<Item[]>()
