import { writable } from 'svelte/store'
import { supabase } from "$lib/supabase"

export async function load() {
  const { data } = await supabase.from("shopitems").select()
  return {
    shopitems: data ?? [],
  }
}

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

export const shopitems = writable<Item[]>([])

load().then((data) => {
  const iconswapped = data.shopitems.map((item: Item) => {
    return {
      ...item,
      icon: icons[item.icon as keyof typeof icons] ?? item.icon
    }
  })
  shopitems.set(iconswapped)
})
