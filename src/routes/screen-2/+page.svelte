<script lang="ts">
  import { goto } from '$app/navigation';
  import Container from '$lib/components/Container.svelte';
  import OptionCard from '$lib/components/OptionCard.svelte';

  const handleClick = (value: string) => {
    if (value === 'plus') {
      goto('/plus');
      return;
    }

    if (value === 'minus') {
      goto('/minus');
      return;
    }

    if (value === 'custom') {
      goto('/next-custom');
    }
  };
</script>

<Container>
  <div class="wrapper">
    <div class="top">
      <h1>Для чого вам окуляри?</h1>
    </div>

    <div class="list">
      <OptionCard
        title="Для читання (+)"
        description="Текст, телефон"
        onClick={() => handleClick('plus')}
      />

      <OptionCard
        title="Для дали (−)"
        description="Вулиця, водіння"
        onClick={() => handleClick('minus')}
      />

      <OptionCard
        title="За рецептом"
        description="Зробимо під вас"
        onClick={() => handleClick('custom')}
      />
    </div>

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
  justify-content: flex-start;
  gap: 28px;
}

.top {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  text-align: center;
}

h1 {
  margin: 0;
  font-size: 34px;
  font-weight: 700;
  line-height: 1.2;
  color: #222;
  text-align: center;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.trust {
  font-size: 17px;
  color: #444;
  font-weight: 500;
  text-align: center;
}
</style>