<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import Container from '$lib/components/Container.svelte';
  import SingleModelViewer from '$lib/components/SingleModelViewer.svelte';

  import { getFlowModels } from '$lib/utils/getFlowModels';
  import { loadCatalog } from '$lib/data/catalog';

  const diopter = $derived($page.url.searchParams.get('diopter') ?? '');

  let isLoading = $state(true);
  let viewerModels = $state<any[]>([]);

  $effect(() => {
    isLoading = true;

    (async () => {
      const raw = await loadCatalog();

      const models = raw.map((r) => ({
        modelId: r.modelId,
        marketingTitle: r.MarketingTitle,
        sitePriceUAH: r.SitePriceUAH,
        imageUrl: r.ImageUrl,
        show: r.Show,
        gender: r.Gender,
        diopterValues: r.DiopterValues,
        priority: r.Priority
      }));

      viewerModels = getFlowModels(models, diopter);
      isLoading = false;
    })();
  });
</script>

<Container>
  {#if isLoading}
    <p class="loading-text">Завантажуємо моделі...</p>
  {:else}
    <SingleModelViewer
      diopterLabel={diopter}
      models={viewerModels}
      onOrder={(model) => {
        goto(`/order?modelId=${model.modelId}&diopter=${diopter}`);
      }}
    />
  {/if}
</Container>

<style>
  .loading-text {
    margin: 40px 0 0;
    text-align: center;
    font-size: 22px;
    font-weight: 700;
  }
</style>