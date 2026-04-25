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
  let isImageOpen = $state(false);

  const currentModel = $derived(props.models[currentIndex] ?? null);
  const canGoBack = $derived(history.length > 0);

  $effect(() => {
    if (currentIndex >= props.models.length) {
      currentIndex = 0;
      history = [];
    }
  });

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

  function openImage() {
    if (!currentModel?.imageUrl) return;
    isImageOpen = true;
  }

  function closeImage() {
    isImageOpen = false;
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && isImageOpen) {
      closeImage();
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<section class="single-model-viewer">
  {#if currentModel}
    {#if canGoBack}
      <button type="button" class="back-button" onclick={handleBack}>
        ← Назад
      </button>
    {/if}

    <p class="diopter-text">
      Це готові окуляри з
      <span class="diopter-value">{props.diopterLabel}</span>
    </p>

    <button
      type="button"
      class="image-button"
      onclick={openImage}
      aria-label="Збільшити фото окулярів"
    >
      <img
        class="model-image"
        src={currentModel.imageUrl}
        alt={currentModel.marketingTitle}
        loading="eager"
      />
    </button>

    <h1 class="model-title">{currentModel.marketingTitle}</h1>

    <p class="model-price">{currentModel.sitePriceUAH}</p>

    <button type="button" class="primary-button" onclick={handleOrder}>
      Замовити ці окуляри
    </button>

    <button type="button" class="secondary-button" onclick={handleNext}>
      Показати іншу модель
    </button>
  {:else}
    <p class="diopter-text">
      Це готові окуляри з
      <span class="diopter-value">{props.diopterLabel}</span>
    </p>

    <p class="empty">Моделі для цієї діоптрії не знайдено</p>
  {/if}

  {#if isImageOpen && currentModel}
    <div class="lightbox" role="dialog" aria-modal="true" aria-label="Збільшене фото">
      <button
        type="button"
        class="lightbox-backdrop"
        onclick={closeImage}
        aria-label="Закрити"
      ></button>

      <button
        type="button"
        class="lightbox-close"
        onclick={closeImage}
        aria-label="Закрити"
      >
        ×
      </button>

      <div class="lightbox-viewport" aria-label="Перегляд фото">
        <img
          class="lightbox-image"
          src={currentModel.imageUrl}
          alt={currentModel.marketingTitle}
        />
      </div>
    </div>
  {/if}
</section>

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

  .image-button {
    width: 100%;
    padding: 0;
    border: none;
    background: none;
  }

  .model-image {
    width: 100%;
    height: auto;
    max-height: none;
    border-radius: 16px;
    object-fit: contain;
    display: block;
    cursor: zoom-in;
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

  .lightbox {
    position: fixed;
    inset: 0;
    z-index: 1000;
  }

  .lightbox-backdrop {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.9);
    border: 0;
    padding: 0;
  }

  .lightbox-close {
    position: absolute;
    top: 12px;
    right: 12px;
    width: 48px;
    height: 48px;
    border-radius: 14px;
    border: 0;
    background: rgba(255, 255, 255, 0.92);
    color: #111;
    font-size: 32px;
    font-weight: 900;
    line-height: 1;
    cursor: pointer;
    z-index: 2;
  }

  .lightbox-viewport {
    position: absolute;
    inset: 0;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    display: grid;
    place-items: center;
    padding: 12px;
  }

  .lightbox-image {
    width: min(2200px, 260vw);
    max-width: none;
    height: auto;
    display: block;
    border-radius: 14px;
    background: #fff;
    touch-action: pan-x pan-y;
  }

  @media (max-width: 420px) {
    .lightbox-image {
      width: 260vw;
      border-radius: 10px;
    }
  }

  @media (min-width: 560px) {
    .lightbox-image {
      width: min(1400px, 160vw);
    }
  }
</style>