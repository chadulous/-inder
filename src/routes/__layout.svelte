<script lang="ts">
  import "../app.css";
  import { swipe } from 'svelte-gestures';
  import swipejs from '$lib/layoutswipe'
  function handler(e) {
    swipejs.handle(e.detail.direction)
  }
</script>

<main class="h-screen w-screen max-w-screen max-h-screen flex items-center justify-center" use:swipe={{ timeframe: 300, minSwipeDistance: 100, touchAction: 'pan-x'}} on:swipe={handler}>
  <slot />
</main>