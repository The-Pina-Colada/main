import { writable } from 'svelte/store'
import { supabase } from '$lib/supabase'

export interface Item {
  icon: string
  name?: string
  price: string | number
  seller: string
  store: string
  x: number
  y: number
}

export const shopitems = writable<Item[]>([]);

(async () => {
  const { data: itemsData } = await supabase.from('shopitems').select()
  const { data: iconsData } = await supabase.from('itemimages').select()

  const iconswapped = itemsData?.map((item: Item) => {
    return {
      ...item,
      icon: iconsData?.find((icon) => icon.name === item.icon)?.url ?? item.icon
    }
  })

  shopitems.set(iconswapped ?? [])
})()
