<script lang="ts">
  import { page } from '$app/stores';
  import Container from '$lib/components/Container.svelte';
</script>

<Container>
  <div class="wrapper">
    <h1>Обрані лінзи</h1>
    <div class="value">{$page.url.searchParams.get('diopter')}</div>
  </div>
</Container>

<style lang="scss">
  .wrapper {
    min-height: calc(100vh - 48px);
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  h1 {
    margin: 0;
    font-size: 30px;
    line-height: 1.2;
    font-weight: 700;
    color: #222;
  }

  .value {
    font-size: 42px;
    line-height: 1.1;
    font-weight: 800;
    color: #7a4b2f;
  }
</style>