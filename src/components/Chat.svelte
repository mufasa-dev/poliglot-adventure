<script lang="ts">
  import { onMount } from 'svelte';
  let messages = [
    { from: 'bot', text: 'Olá! Escreva algo para eu responder.' }
  ];
  let input = '';
  let loading = false;

  async function send() {
    if (!input.trim()) return;
    const userMsg = input;
    messages = [...messages, { from: 'user', text: userMsg }];
    input = '';
    loading = true;
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg })
      });
      const data = await res.json();
      messages = [...messages, { from: 'bot', text: data.reply }];
    } catch (e) {
      messages = [...messages, { from: 'bot', text: 'Erro: não foi possível contactar a API.' }];
    } finally {
      loading = false;
    }
  }
</script>

<div class="card" style="max-width:720px;margin:20px auto;padding:16px;">
  <div style="min-height:220px; overflow:auto; padding:8px;">
    {#each messages as m (m)}
      <div class={m.from === 'user' ? 'text-end mb-2' : 'text-start mb-2'}>
        <div class={m.from === 'user' ? 'badge bg-primary' : 'badge bg-secondary'}>
          {m.text}
        </div>
      </div>
    {/each}
  </div>

  <div class="input-group mt-3">
    <input class="form-control" bind:value={input} placeholder="Escreva..." on:keydown={(e)=> e.key === 'Enter' && send()} />
    <button class="btn btn-success" on:click={send} disabled={loading}>
      {#if loading}Enviando...{:else}Enviar{/if}
    </button>
  </div>
</div>

<style>
  .badge { padding: 0.6rem 0.9rem; font-size: 0.95rem; }
</style>
