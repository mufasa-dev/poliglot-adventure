<script>
  export let show = false;
  export let title = "Confirmação";
  export let message = "Tem certeza que deseja continuar?";
  export let onConfirm = () => {};
  export let onCancel = () => {};
</script>

{#if show}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-xl shadow-lg w-full max-w-md relative p-6">
      <!-- Header -->
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold text-gray-800">{title}</h2>
        <button 
          class="text-gray-500 hover:text-gray-800 font-bold text-lg"
          on:click={onCancel}
        >
          ✕
        </button>
      </div>

      <!-- Body -->
      <div class="mb-4">
        <p class="text-gray-700">{message}</p>
      </div>

      <!-- Footer (botões de ação) -->
      <div class="flex justify-end gap-3">
        <button 
          class="btn-secondary"
          on:click={onCancel}
        >
          Não
        </button>
        <button 
          class="btn-success"
          on:click={onConfirm}
        >
          Sim
        </button>
      </div>
    </div>
  </div>
{/if}
