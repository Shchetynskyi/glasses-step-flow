<script lang="ts">
  import { page } from '$app/stores';
  import Container from '$lib/components/Container.svelte';
  import PrimaryButton from '$lib/components/PrimaryButton.svelte';

  import { readyPlusModels } from '$lib/mock/ready-plus-models';
  import { readyMinusModels } from '$lib/mock/ready-minus-models';

  const modelId = $derived($page.url.searchParams.get('modelId') ?? '');
  const diopter = $derived($page.url.searchParams.get('diopter') ?? '');

  const allModels = [...readyPlusModels, ...readyMinusModels];

  const currentModel = $derived(
    allModels.find((m) => m.modelId === modelId)
  );

  const orderText = $derived(
    currentModel
      ? [
          'Добрий день.',
          'Хочу замовити окуляри:',
          '',
          `Модель: ${currentModel.marketingTitle}`,
          `Артикул: ${currentModel.modelId}`,
          `Ціна: ${currentModel.sitePriceUAH}`,
          diopter ? `Діоптрії: ${diopter}` : '',
          '',
          'Підкажіть, будь ласка, щодо оформлення замовлення.'
        ].join('\n')
      : ''
  );

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(orderText);
    } catch (e) {}

    window.location.href = '/order/done';
  }
</script>

<Container>
  <div class="wrapper">
    {#if !currentModel}
      <p class="instruction-text">
        Дані моделі не знайдено
      </p>
    {:else}
      <p class="title">
        Перевірте замовлення
      </p>

      <div class="card">
        <pre>{orderText}</pre>
      </div>

      <PrimaryButton
        label="Скопіювати текст"
        onClick={handleCopy}
      />
    {/if}
  </div>
</Container>

<style lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.title {
  margin: 0;
  text-align: center;
  font-size: 28px;
  font-weight: 700;
}

.card {
  padding: 16px;
  border-radius: 16px;
  border: 1.5px solid #e0d3c6;
  background: #fff;
}

pre {
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
  font-size: 18px;
  line-height: 1.5;
}

.instruction-text {
  text-align: center;
  font-size: 20px;
  font-weight: 600;
}
</style>