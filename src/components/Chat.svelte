<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
  import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

  export let person: { name: string; description: string; level: string; objectives: string[] };
  export let course: { name: string };

  let messages: { from: "user" | "person"; text: string }[] = [];
  let newMessage = "";
  let loadingResponse = false;

  let messagesContainer: HTMLDivElement;

  async function sendMessage() {
    if (!newMessage.trim()) return;

    // adiciona mensagem do usuário
    messages = [...messages, { from: "user", text: newMessage.trim() }];
    const userText = newMessage.trim();
    newMessage = "";
    scrollToBottom();

    loadingResponse = true;
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          person,
          course,
          messages
        })
      });

      if (!res.ok) throw new Error("Erro na API");

      const data = await res.json();
      messages = [...messages, { from: "person", text: data.reply }];
      scrollToBottom();
    } catch (err) {
      console.error("Erro no chat:", err);
      messages = [...messages, { from: "person", text: "⚠️ Ocorreu um erro ao responder." }];
    } finally {
      loadingResponse = false;
    }
  }

  function scrollToBottom() {
    if (messagesContainer) {
      setTimeout(() => {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }, 50);
    }
  }

  onMount(scrollToBottom);
</script>

<div class="flex flex-col h-full max-h-[600px] border-2 border-bg-secondary shadow rounded-lg overflow-hidden">
  <!-- Cabeçalho -->
  <div class="bg-bg-secondary px-4 py-2 border-b flex justify-between items-center">
    <div>
      <h3 class="font-bold">👤 {person.name}</h3>
      <p class="text-xs text-gray-800">{person.description}</p>
      {#each person.objectives as obj}
        <span class="inline-block bg-yellow-200 text-black px-2 py-1 rounded text-xs mr-1">{obj}</span>        
      {/each}
    </div>
  </div>

  <!-- Mensagens -->
  <div class="flex-1 overflow-y-auto p-4 space-y-2" bind:this={messagesContainer}>
    {#each messages as msg, i (i)}
      <div
        class="w-fit p-2 rounded-lg"
        class:bg-blue-100={msg.from === "person"}
        class:bg-green-200={msg.from === "user"}
        class:self-end={msg.from === "user"}
        class:ml-auto={msg.from === "user"}
        class:text-right={msg.from === "user"}
        class:self-start={msg.from === "person"}
        transition:fade
      >
        {msg.text}
      </div>
    {/each}
    {#if loadingResponse}
      <div class="text-gray-500 italic text-sm">Digitando...</div>
    {/if}
  </div>

  <!-- Input -->
  <div class="px-4 py-2 border-t border-bg-secondary flex gap-2">
    <input
      class="flex-1 input-base"
      placeholder="Digite sua mensagem..."
      bind:value={newMessage}
      on:keydown={(e) => e.key === "Enter" && sendMessage()}
    />
    <button class="btn-primary px-4 rounded-full" on:click={sendMessage}>
      <FontAwesomeIcon icon={faPaperPlane} />
    </button>
  </div>
</div>
