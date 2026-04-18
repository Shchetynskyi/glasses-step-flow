<script lang="ts">
  import Container from '$lib/components/Container.svelte';
  import OptionCard from '$lib/components/OptionCard.svelte';

  const handleClick = (value: string) => {
    console.log(value);
  };
</script>

<Container>
  <div class="wrapper">
    <h1>Коли ви їх носите?</h1>

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
        title="Не знаю"
        description="Допоможемо визначитись"
        onClick={() => handleClick('unknown')}
      />
    </div>
  </div>
</Container>

<style lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

h1 {
  font-size: 24px;
  text-align: center;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
