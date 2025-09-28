<script>
  export let show = false;
  export let title = "Erro";
  export let message = "Ocorreu um erro inesperado.";
  export let onClose = () => {};
</script>

{#if show}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-xl shadow-lg w-full max-w-md relative p-6">
      <!-- Header -->
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold text-red-600">{title}</h2>
        <button 
          class="text-gray-500 hover:text-gray-800 font-bold text-lg"
          on:click={onClose}
        >
          ✕
        </button>
      </div>

      <!-- Body -->
      <div class="mb-4">
        <p class="text-gray-700">{message}</p>
      </div>

      <!-- Footer (botão fechar) -->
      <div class="flex justify-end">
        <button 
          class="btn-warning"
          on:click={onClose}
        >
          Fechar
        </button>
      </div>
    </div>
  </div>
{/if}
