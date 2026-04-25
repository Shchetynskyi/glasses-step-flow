<script lang="ts">
  let {
    title = '',
    description = '',
    onClick
  }: {
    title: string;
    description: string;
    onClick?: () => void;
  } = $props();
</script>

<button class="card" onclick={onClick} type="button">
  <div class="content">
    <div class="title">{title}</div>
    <div class="desc">{description}</div>
  </div>
  <div class="arrow">›</div>
</button>

<style lang="scss">
.card {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 22px 20px;
  border-radius: 18px;

  background: #ffffff;
  border: 1.5px solid #e0d3c6;

  font-family: inherit;
  cursor: pointer;

  transition:
    background 0.12s ease,
    transform 0.12s ease;

  -webkit-tap-highlight-color: transparent;
}

.card:active {
  transform: scale(0.98);
  background: #f5efe8;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}

.title {
  font-size: 24px;
  font-weight: 700;
  color: #1f1f1f;
  margin-bottom: 8px;
  text-align: left;
}

.desc {
  font-size: 20px;
  color: #3f3f3f;
  font-weight: 500;
  line-height: 1.25;
  text-align: left;
  max-width: 260px;
}

.arrow {
  font-size: 26px;
  color: #b8a18d;
  font-weight: 500;
}
</style>