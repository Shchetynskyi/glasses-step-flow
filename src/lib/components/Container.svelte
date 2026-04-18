<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    className = '',
    children
  }: {
    className?: string;
    children?: Snippet;
  } = $props();
</script>

<div class={`container ${className}`}>
  {@render children?.()}
</div>

<style lang="scss">
.container {
  min-height: 100vh;
  max-width: 420px;
  margin: 0 auto;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
}
</style>