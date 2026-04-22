<script lang="ts">
  type ViewerModel = {
    modelId: string;
    marketingTitle: string;
    sitePriceUAH: string;
    imageUrl: string;
  };

  const props = $props<{
    diopterLabel: string;
    models: ViewerModel[];
    onOrder: (model: ViewerModel) => void;
  }>();

  let currentIndex = $state(0);
  let history = $state<number[]>([]);

  const currentModel = $derived(props.models[currentIndex] ?? null);
  const canGoBack = $derived(history.length > 0);

  function handleNext() {
    if (props.models.length === 0) return;

    history = [...history, currentIndex];

    currentIndex =
      currentIndex >= props.models.length - 1
        ? 0
        : currentIndex + 1;
  }

  function handleBack() {
    if (!canGoBack) return;

    const previousIndex = history[history.length - 1];
    history = history.slice(0, -1);
    currentIndex = previousIndex;
  }

  function handleOrder() {
    if (!currentModel) return;
    props.onOrder(currentModel);
  }
</script>

{#if !currentModel}
  <section class="single-model-viewer">
    <p class="diopter-text">
      Це готові окуляри з
      <span class="diopter-value">{props.diopterLabel}</span>
    </p>

    <p class="empty">Немає моделей</p>
  </section>
{:else}
  <section class="single-model-viewer">
    {#if canGoBack}
      <button type="button" class="back-button" onclick={handleBack}>
        ← Назад
      </button>
    {/if}

    <p class="diopter-text">
      Це готові окуляри з
      <span class="diopter-value">{props.diopterLabel}</span>
    </p>

    <img
      class="model-image"
      src={currentModel.imageUrl}
      alt={currentModel.marketingTitle}
      loading="eager"
    />

    <h1 class="model-title">
      {currentModel.marketingTitle}
    </h1>

    <p class="model-price">
      {currentModel.sitePriceUAH}
    </p>

    <button
      type="button"
      class="primary-button"
      onclick={handleOrder}
    >
      Замовити ці окуляри
    </button>

    <button
      type="button"
      class="secondary-button"
      onclick={handleNext}
    >
      Показати іншу модель
    </button>
  </section>
{/if}

<style>
  .single-model-viewer {
    min-height: calc(100vh - 48px);
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 12px 16px 16px;
    box-sizing: border-box;
  }

  .back-button {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    align-self: flex-start;
    min-height: 44px;
    padding: 8px 6px;
    margin: 0;
    background: none;
    border: none;
    cursor: pointer;
    color: #222;
    font-size: 18px;
    font-weight: 700;
    line-height: 1.2;
  }

  .diopter-text {
    margin: 0;
    text-align: center;
    color: #333;
    font-size: 22px;
    font-weight: 700;
    line-height: 1.2;
  }

  .diopter-value {
    display: inline-block;
    margin-left: 8px;
    font-size: 34px;
    font-weight: 800;
    line-height: 1;
    color: #7a5134;
    white-space: nowrap;
  }

  .model-image {
    width: 100%;
    max-height: 38vh;
    border-radius: 16px;
    object-fit: cover;
    display: block;
  }

  .model-title {
    margin: 4px 0 0;
    color: #222;
    font-size: 25px;
    font-weight: 700;
    line-height: 1.15;
  }

  .model-price {
    margin: 0 0 4px;
    color: #222;
    font-size: 21px;
    font-weight: 700;
    line-height: 1.2;
  }

  .primary-button {
    min-height: 60px;
    margin-top: 4px;
    border: none;
    border-radius: 14px;
    background: #7a5134;
    color: #fff;
    font-size: 19px;
    font-weight: 800;
    line-height: 1.2;
    box-shadow: 0 2px 8px rgba(122, 81, 52, 0.18);
  }

  .secondary-button {
    min-height: 56px;
    margin-top: 0;
    border: 2px solid #7a5134;
    border-radius: 14px;
    background: #fff;
    color: #7a5134;
    font-size: 18px;
    font-weight: 700;
    line-height: 1.2;
  }

  .empty {
    margin: 0;
    text-align: center;
    color: #666;
    font-size: 18px;
  }
</style>