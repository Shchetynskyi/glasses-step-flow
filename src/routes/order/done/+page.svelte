<script lang="ts">
  import Container from '$lib/components/Container.svelte';
  import PrimaryButton from '$lib/components/PrimaryButton.svelte';

  const facebookUrl = 'https://m.me/110514481874624';

  function goToFacebook() {
    window.location.href = facebookUrl;
  }
</script>

<Container>
  <div class="wrapper">
    <p class="title">
      Скопійовано!
    </p>

    <p class="instruction-text">
      Тепер відкрийте Facebook
      <br />
      і вставте повідомлення
    </p>

    <PrimaryButton
      label="Відкрити Facebook"
      onClick={goToFacebook}
    />
  </div>
</Container>

<style lang="scss">
.wrapper {
  min-height: calc(100vh - 48px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 22px;
}

.title {
  margin: 0;
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  line-height: 1.15;
  color: #222;
}

.instruction-text {
  margin: 0;
  text-align: center;
  font-size: 22px;
  font-weight: 600;
  line-height: 1.35;
  color: #333;
}
</style>