<script>
  import { onMount } from "svelte";

  let currentPath = "";
  let showCourseModal = false;
  let selectedCourse = "";
  let courses = ["Inglês", "Espanhol", "Italiano", "Japonês"];

  onMount(async () => {
    currentPath = window.location.pathname;

    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    // Verificar curso do usuário
    const res = await fetch("/api/user/course", {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    if (res.ok) {
      const data = await res.json();
      if (!data.course) {
        showCourseModal = true;
      }
    } else {
      console.error("Erro ao verificar curso");
    }
  });

  async function saveCourse() {
    const token = localStorage.getItem("token");
    if (!token || !selectedCourse) return;

    const res = await fetch("/api/user/course", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ course: selectedCourse }),
    });

    if (res.ok) {
      showCourseModal = false;
    } else {
      alert("Erro ao salvar curso");
    }
  }
</script>

<!-- Sidebar -->
<div class="flex flex-col p-4 bg-gray-800 text-white w-56 h-screen shadow-lg">
  <a href="/" class="mb-6 text-lg font-semibold tracking-wide hover:text-accent transition-colors">
    Menu
  </a>

  <ul class="flex flex-col space-y-2">
    <li>
      <a href="/" class="block px-3 py-2 rounded-md transition-colors 
        {currentPath === '/' ? 'bg-accent text-white' : 'hover:bg-gray-700'}">
        Início
      </a>
    </li>
    <li>
      <a href="/homework" class="block px-3 py-2 rounded-md transition-colors 
        {currentPath === '/homework' ? 'bg-accent text-white' : 'hover:bg-gray-700'}">
        Exercícios
      </a>
    </li>
    <li>
      <a href="/chat" class="block px-3 py-2 rounded-md transition-colors 
        {currentPath === '/chat' ? 'bg-accent text-white' : 'hover:bg-gray-700'}">
        Conversas
      </a>
    </li>
    <li>
      <a href="/perfil" class="block px-3 py-2 rounded-md transition-colors 
        {currentPath === '/perfil' ? 'bg-accent text-white' : 'hover:bg-gray-700'}">
        Perfil
      </a>
    </li>
  </ul>
</div>

<!-- Modal de seleção de curso -->
{#if showCourseModal}
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
    <div class="bg-white text-black p-6 rounded-md w-96 shadow-xl">
      <h2 class="text-lg font-bold mb-4">Escolha seu curso</h2>

      <select bind:value={selectedCourse} class="w-full p-2 border rounded mb-4">
        <option value="">Selecione...</option>
        {#each courses as course}
          <option value={course}>{course}</option>
        {/each}
      </select>

      <div class="flex justify-end space-x-2">
        <button class="px-4 py-2 rounded bg-gray-400 text-white" on:click={() => (showCourseModal = false)}>
          Cancelar
        </button>
        <button class="px-4 py-2 rounded bg-blue-600 text-white" on:click={saveCourse}>
          Salvar
        </button>
      </div>
    </div>
  </div>
{/if}
