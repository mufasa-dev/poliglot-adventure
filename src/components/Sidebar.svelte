<script>
  let currentPath = '';
  import { onMount } from 'svelte';

  onMount(() => {
    currentPath = window.location.pathname;

    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }
  });
</script>

<div class="flex flex-col p-4 bg-gray-800 text-white w-56 h-screen shadow-lg">
  <!-- Título -->
  <a href="/" class="mb-6 text-lg font-semibold tracking-wide hover:text-accent transition-colors">
    Menu
  </a>

  <!-- Navegação -->
  <ul class="flex flex-col space-y-2">
    <li>
      <a
        href="/"
        class="block px-3 py-2 rounded-md transition-colors 
          {currentPath === '/' ? 'bg-accent text-white' : 'hover:bg-gray-700'}"
      >
        Início
      </a>
    </li>
    <li>
      <a
        href="/homework"
        class="block px-3 py-2 rounded-md transition-colors 
          {currentPath === '/homework' ? 'bg-accent text-white' : 'hover:bg-gray-700'}"
      >
        Exercícios
      </a>
    </li>
    <li>
      <a
        href="/chat"
        class="block px-3 py-2 rounded-md transition-colors 
          {currentPath === '/chat' ? 'bg-accent text-white' : 'hover:bg-gray-700'}"
      >
        Conversas
      </a>
    </li>
    <li>
      <a
        href="/perfil"
        class="block px-3 py-2 rounded-md transition-colors 
          {currentPath === '/perfil' ? 'bg-accent text-white' : 'hover:bg-gray-700'}"
      >
        Perfil
      </a>
    </li>
  </ul>
</div>
