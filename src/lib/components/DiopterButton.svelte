<script lang="ts">
  let {
    label = '',
    onClick
  }: {
    label: string;
    onClick?: () => void;
  } = $props();
</script>

<button class="btn" type="button" onclick={onClick}>
  {label}
</button>

<style lang="scss">
.btn {
  width: 100%;
  min-height: 52px;
  padding: 12px 14px;
  border-radius: 16px;

  font-family: inherit;
  font-size: 20px;
  line-height: 1.1;
  font-weight: 700;

  border: 2px solid #d9cabb;
  background: #fff;
  color: #1f1f1f;

  text-align: center;
  -webkit-tap-highlight-color: transparent;
}

.btn:active {
  transform: scale(0.985);
}
</style>