<script>
  export let current = 0;     // etapa atual (0-based)
  export let total = 1;       // total de etapas
  export let showLabel = true; // se mostra ou não o texto
</script>

<div class="w-full">
  <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
    <div
      class="bg-btn-success h-3 rounded-full transition-all duration-300"
      style="width: {Math.min((current + 1) / total * 100, 100)}%"
    ></div>
  </div>

  {#if showLabel}
    <p class="mt-2 text-gray-600 text-sm text-center">
      Etapa {current + 1} de {total}
    </p>
  {/if}
</div>
