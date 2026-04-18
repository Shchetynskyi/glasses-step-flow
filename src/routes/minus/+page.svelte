<script lang="ts">
  import { goto } from '$app/navigation';
  import Container from '$lib/components/Container.svelte';
  import DiopterButton from '$lib/components/DiopterButton.svelte';

  const diopters = ['-0.5', '-0.75', '-1', '-1.25', '-1.5', '-1.75', '-2', '-2.25', '-2.5'];

  const handleSelect = (value: string) => {
    goto(`/next-minus?diopter=${encodeURIComponent(value)}`);
  };

  const handleNext = () => {
    goto('/minus/more');
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

      <button
        class="next-button"
        type="button"
        onclick={handleNext}
      >
        Далі
      </button>
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

  .next-button {
    width: 100%;
    min-height: 52px;
    padding: 12px 14px;
    border-radius: 16px;
    font-family: inherit;
    font-size: 20px;
    line-height: 1.1;
    font-weight: 700;
    border: 2px solid #d9cabb;
    background: #f7f3ee;
    color: #5a4332;
    text-align: center;
    -webkit-tap-highlight-color: transparent;
  }

  .next-button:active {
    transform: scale(0.985);
  }
</style>