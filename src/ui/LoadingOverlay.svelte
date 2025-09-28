<script>
  export let show = false;
  export let message = "Carregando...";
</script>

{#if show}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
      <!-- Spinner -->
      <div class="animate-spin rounded-full h-12 w-12 border-4 border-btn-primary border-t-transparent mb-4"></div>
      <p class="text-lg font-semibold text-center">{message}</p>
    </div>
  </div>
{/if}
