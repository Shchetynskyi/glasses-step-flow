<script lang="ts">
  let {
    label = '',
    onClick
  }: {
    label: string;
    onClick?: () => void;
  } = $props();
</script>

<button class="btn" onclick={onClick} type="button">
  {label}
</button>

<style lang="scss">
@keyframes pulse {
  0% {
    box-shadow: 0 4px 0 #5a3621, 0 0 0 0 rgba(122, 75, 47, 0.4);
    transform: scale(1);
  }
  50% {
    box-shadow: 0 4px 0 #5a3621, 0 0 0 14px rgba(122, 75, 47, 0);
    transform: scale(1.03);
  }
  100% {
    box-shadow: 0 4px 0 #5a3621, 0 0 0 0 rgba(122, 75, 47, 0);
    transform: scale(1);
  }
}

.btn {
  width: 100%;
  padding: 22px;
  font-size: 22px;
  border-radius: 18px;

  background: #7a4b2f;
  color: #ffffff;

  font-weight: 700;
  letter-spacing: 0.5px;

  border: 2px solid #5a3621;

  box-shadow: 0 4px 0 #5a3621;

  animation: pulse 3.5s infinite;
}

.btn:active {
  transform: translateY(2px) scale(0.98);
  box-shadow: 0 1px 0 #5a3621;
}
</style>