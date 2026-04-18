<script lang="ts">
  import Container from '$lib/components/Container.svelte';
  import PrimaryButton from '$lib/components/PrimaryButton.svelte';
  import { goto } from '$app/navigation';

  const handleClick = () => {
    goto('screen-2');
  };
</script>

<Container>
  <div class="wrapper">
    <div class="top">
      <div class="brand">Майстерня Окулярко</div>

      <img src="/hero.jpg" alt="Окуляри" class="image" />

      <h1>
        Готові окуляри
        <span>
          <span class="plus-symbol">+</span> плюс та
          <span class="minus-symbol">−</span> мінус
        </span>
      </h1>
    </div>

    <div class="bottom">
      <PrimaryButton label="Підібрати модель" onClick={handleClick} />

      <p class="trust">
        Оплата на пошті при отриманні
      </p>
    </div>
  </div>
</Container>

<style lang="scss">
.wrapper {
  min-height: calc(100vh - 48px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 24px;
}

.top {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  text-align: center;
}

.bottom {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;
}

.brand {
  font-size: 26px;
  color: #7a5134;
  font-weight: 800;
  text-align: center;
}

.image {
  width: 100%;
  border-radius: 16px;
  aspect-ratio: 1 / 1;
  object-fit: cover;
}

h1 {
  font-size: 30px;
  font-weight: 700;
  line-height: 1.2;
  color: #222;
  margin: 0;
}

h1 > span {
  display: block;
  font-size: 24px;
  font-weight: 600;
  margin-top: 6px;
  color: #333;
}

/* тільки символи */
.plus-symbol {
  color: #2e7d32;
  font-weight: 800;
}

.minus-symbol {
  color: #1565c0;
  font-weight: 800;
}

.trust {
  font-size: 17px;
  color: #444;
  font-weight: 500;
  text-align: center;
  margin: 0;
}
</style>