import { writable } from 'svelte/store'
import { supabase } from "$lib/supabase"

export interface Item {
  icon: string
  name?: string
  price: string | number
  seller: string
  store: string
  x: number
  y: number
}

interface Icon {
  name: string
  url: string
}

const { data: icons } = await supabase.from("itemimages").select() as { data: Icon[] }

export const shopitems = writable<Item[]>([])

export async function load() {
  const { data } = await supabase.from("shopitems").select()
  return {
    shopitems: data ?? [],
  }
}

load().then((data) => {
  const iconswapped = data.shopitems.map((item: Item) => {
    return {
      ...item,
      icon: icons.find(icon => icon.name === item.icon)?.url ?? item.icon
    }
  })
  shopitems.set(iconswapped)
})
