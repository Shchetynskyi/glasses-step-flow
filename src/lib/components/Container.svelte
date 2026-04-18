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
  max-width: 420px;
  margin: 0 auto;
  padding: 24px 16px;
}
</style>