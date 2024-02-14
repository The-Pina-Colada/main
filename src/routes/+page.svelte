<script lang="ts">
  import { slide } from 'svelte/transition'
  import { shopitems, loading } from '$lib/stores'

  let query: string = ''
  $: results = (
    query
      ? $shopitems.filter((item) =>
          `${item.name} ${item.seller} ${item.store}`.toLowerCase().includes(query.toLowerCase())
        )
      : $shopitems
  ).sort((a, b) => {
    if (a.price === b.price) {
      return Math.abs(a.x) + Math.abs(a.y) - (Math.abs(b.x) + Math.abs(b.y))
    }
    return a.price - b.price
  })
</script>

<div class="bg-gray-100 min-h-screen w-screen">
  <div class="max-w-xl mx-auto pt-24 pb-5">
    <h1 class="text-5xl font-bold text-center">Pina Colada<br />Shop List</h1>
    <input
      type="text"
      class="input w-full mt-10 sticky top-10 shadow-lg focus:outline-0 focus:border-0 focus:shadow-lg"
      placeholder="Search shop or item..."
      bind:value={query}
    />
    {#if $loading}
      <h2 class="font-medium text-neutral-500 text-xl text-center mt-10">Loading items...</h2>
    {:else}
      <ul class="flex flex-col bg-white w-full mt-5 rounded-lg font-minecraft">
        {#each results as item (`${item.name}-${item.price}/${item.seller}/${item.store}`)}
          <li class="w-full flex flex-col p-5 gap-2" transition:slide>
            <div class="flex gap-2 items-center">
              <img src={item.icon} alt={item.icon} class="h-7" />
              <span class="text-xl">{item.name}</span>
              <div class="w-1 h-1 bg-neutral-400 rounded-full"></div>
              <span class="text-xl text-[#1aaba7]">{item.price}</span>
              <div class="grow"></div>
              <span>{item.seller}</span>
            </div>
            <div class="flex gap-2 items-center">
              <span>{item.store}</span>
              <div class="w-1 h-1 bg-neutral-400 rounded-full"></div>
              <span>{item.x} {item.y}</span>
            </div>
          </li>
        {/each}
      </ul>
      {/if}
  </div>
</div>
