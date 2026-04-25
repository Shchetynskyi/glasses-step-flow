<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  import Container from '$lib/components/Container.svelte';
  import PrimaryButton from '$lib/components/PrimaryButton.svelte';
  import { loadCatalog, type RawCatalogRow } from '$lib/data/catalog';

  let allModels = $state<RawCatalogRow[]>([]);
  let isLoading = $state(true);
  let copied = $state(false);

  const facebookUrl = 'https://m.me/110514481874624';

  const modelId = $derived($page.url.searchParams.get('modelId') ?? '');
  const diopterRaw = $derived($page.url.searchParams.get('diopter') ?? '');

  const diopter = $derived(
    diopterRaw
      ? diopterRaw.startsWith('+') || diopterRaw.startsWith('-')
        ? diopterRaw
        : `+${diopterRaw}`
      : ''
  );

  const currentModel = $derived(
    allModels.find((model) => model.modelId === modelId)
  );

  const orderText = $derived(
    currentModel
      ? [
          'Хочу замовити окуляри',
          '',
          `Модель: ${currentModel.MarketingTitle}`,
          `Діоптрія: ${diopter}`,
          `Ціна: ${currentModel.SitePriceUAH}`
        ].join('\n')
      : ''
  );

  onMount(async () => {
    allModels = await loadCatalog();
    isLoading = false;
  });

  async function handleCopy() {
  if (!orderText) return;

  try {
    await navigator.clipboard.writeText(orderText);
    copied = true;
  } catch {
    const textarea = document.createElement('textarea');
    textarea.value = orderText;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    textarea.style.top = '0';

    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    document.execCommand('copy');
    document.body.removeChild(textarea);

    copied = true;
  }
}

  function goToFacebook() {
    window.location.href = facebookUrl;
  }
</script>

<Container>
  <div class="wrapper">
    {#if isLoading}
      <p class="instruction-text">
        ...
      </p>
    {:else if !currentModel}
      <p class="instruction-text">
        Дані моделі не знайдено
      </p>
    {:else if copied}
      <p class="title">
        Скопійовано
      </p>

      <p class="instruction-text">
        Тепер перейдіть у Facebook
        <br />
        і вставте замовлення менеджеру
      </p>

      <PrimaryButton
        label="Перейти у Facebook"
        onClick={goToFacebook}
      />
    {:else}
      <p class="title">
        Натисніть, щоб скопіювати замовлення
      </p>

      <div class="card">
        <pre>{orderText}</pre>
      </div>

      <PrimaryButton
        label="Скопіювати замовлення"
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
  margin: 0;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.35;
}
</style>