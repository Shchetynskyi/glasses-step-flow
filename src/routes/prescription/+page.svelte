<script lang="ts">
  const openFacebook = () => {
  window.location.href = 'https://m.me/110514481874624';
};
</script>

<div class="wrapper">
  <h1>Окуляри за рецептом</h1>

  <p class="text">
    Менеджер підбере оправу<br />
    і порадить лінзи за вашим рецептом
  </p>

  <button class="btn" onclick={openFacebook}>
    Перейти у Facebook
  </button>
</div>

<style lang="scss">
.wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  padding: 24px;
  text-align: center;
}

h1 {
  font-size: 32px;
  font-weight: 700;
  margin: 0;
}

.text {
  font-size: 20px;
  line-height: 1.4;
  color: #333;
}

.btn {
  margin-top: 16px;
  padding: 16px 24px;
  font-size: 20px;
  font-weight: 600;
  background: #1877f2;
  color: #fff;
  border: none;
  border-radius: 8px;
}
</style>