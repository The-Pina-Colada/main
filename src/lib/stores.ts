import { writable } from 'svelte/store'
import { supabase } from '$lib/supabase'

export interface ProcessedItem {
  icon: string
  name?: string
  price: string | number
  seller: string
  store: string
  x: number
  y: number
}
interface RawItem {
  icon: string
  name?: string
  price: string | number
  store: string
}

interface Icon {
  name: string
  url: string
}

interface Store {
  name: string
  owner: string
  x: number
  y: number
}

export const loading = writable(true)

export const shopitems = writable<ProcessedItem[]>([])
;(async () => {
  const { data: itemsData  } = await supabase.from('shopitems').select() as { data: RawItem[] }
  const { data: iconsData } = await supabase.from('itemimages').select() as { data: Icon[] }
  const { data: storesData } = await supabase.from('stores').select()  as { data: Store[] }

  const processed = itemsData?.map((item) => {
    const icon = iconsData?.find((icon) => icon.name === item.icon)
    const store = storesData?.find((store) => store.name === item.store)

    return {
      icon: icon?.url,
      name: item.name,
      price: item.price,
      seller: store?.owner,
      store: store?.name,
      x: store?.x,
      y: store?.y
    }
  })

  shopitems.set(processed as ProcessedItem[])
  loading.set(false)
})()
