<script lang="ts">
  import { goto } from '$app/navigation';
  import Container from '$lib/components/Container.svelte';
  import PrimaryButton from '$lib/components/PrimaryButton.svelte';

  function start() {
    goto('/screen-2');
  }
</script>

<Container>
  <div class="wrapper">
    <h1>Які окуляри вам потрібні?</h1>

    <PrimaryButton
      label="Підібрати модель"
      onClick={start}
    />

    <p class="trust">
      Оплата на пошті при отриманні
    </p>
  </div>
</Container>

<style lang="scss">
.wrapper {
  min-height: calc(100vh - 48px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
  text-align: center;
}

h1 {
  margin: 0;
  font-size: 32px;
  font-weight: 700;
}

.trust {
  font-size: 20px;
  font-weight: 600;
  color: #333;
}
</style>