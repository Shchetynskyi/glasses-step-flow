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
  <div class="title">{title}</div>
  <div class="desc">{description}</div>
</button>

<style lang="scss">
.card {
  width: 100%;
  text-align: left;
  padding: 20px;
  border-radius: 18px;

  background: #ffffff;
  border: 1px solid #eee;

  font-family: inherit;
}

.title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 6px;
}

.desc {
  font-size: 15px;
  color: #777;
}
</style>