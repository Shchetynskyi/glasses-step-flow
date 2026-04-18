<script lang="ts">
  import { goto } from '$app/navigation';
  import Container from '$lib/components/Container.svelte';
  import DiopterButton from '$lib/components/DiopterButton.svelte';

  const diopters = ['-2.75', '-3', '-3.25', '-3.5', '-3.75', '-4', '-4.5', '-5', '-5.5', '-6'];

  const handleSelect = (value: string) => {
    goto(`/next-minus?diopter=${encodeURIComponent(value)}`);
  };
</script>

<Container>
  <div class="wrapper">
    <div class="top">
      <h1>Оберіть лінзи</h1>
    </div>

    <div class="list">
      {#each diopters as diopter}
        <DiopterButton
          label={diopter}
          onClick={() => handleSelect(diopter)}
        />
      {/each}
    </div>
  </div>
</Container>

<style lang="scss">
  .wrapper {
    min-height: calc(100vh - 48px);
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .top {
    display: flex;
    flex-direction: column;
    text-align: center;
  }

  h1 {
    margin: 0;
    font-size: 28px;
    line-height: 1.15;
    font-weight: 700;
    color: #222;
    text-align: center;
  }

  .list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
</style>