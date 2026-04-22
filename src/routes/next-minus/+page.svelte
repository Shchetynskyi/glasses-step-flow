<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import Container from '$lib/components/Container.svelte';
  import SingleModelViewer from '$lib/components/SingleModelViewer.svelte';
  import { readyMinusModels } from '$lib/mock/ready-minus-models.js';

  const diopter = $derived($page.url.searchParams.get('diopter') ?? '');

  const viewerModels = readyMinusModels;
</script>

<Container>
  <SingleModelViewer
    diopterLabel={diopter}
    models={viewerModels}
    onOrder={(model) => {
      goto(`/order?modelId=${model.modelId}&diopter=${diopter}`);
    }}
  />
</Container>