<script>
  import { onMount } from "svelte";
  import { faUser, faComments, faTasks, faDoorOpen, faFlag } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";

  let currentPath = "";
  let course = {};

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
      if (!data.course && currentPath !== "/select-course" && currentPath !== "/" && currentPath !== "/profile") {
        window.location.href = "/select-course";
      }
      course = data.course;
    } else {
      console.error("Erro ao verificar curso");
    }
  });

  function logout() {
    localStorage.removeItem("token");

    window.location.href = "/login";
  }
</script>

<!-- Sidebar -->
<div class="flex flex-col p-4 bg-bg-secondary text-white w-56 h-screen shadow-lg">
  <a href="/select-course" class="block px-3 mb-3 py-2 rounded-md transition-colors 
      {currentPath === '/select-course' ? 'bg-accent text-white' : 'hover:bg-btn-primary'}">
    <img src="/courses/en-us.png" alt="Logo" class="h-10 mx-auto" />
  </a>

  <ul class="flex flex-col space-y-2 text-black">
    {#if course != null}
      <li>
        <a href="/" class="block px-3 py-2 rounded-md transition-colors 
          {currentPath === '/' ? 'bg-accent text-white' : 'hover:bg-btn-primary hover:text-white'}">
          <FontAwesomeIcon icon={faFlag} class="w-4 h-4" /> Início
        </a>
      </li>
      <li>
        <a href="/homework" class="block px-3 py-2 rounded-md transition-colors 
          {currentPath === '/homework' ? 'bg-accent text-white' : 'hover:bg-btn-primary hover:text-white'}">
          <FontAwesomeIcon icon={faTasks} class="w-4 h-4" /> Exercícios
        </a>
      </li>
      <li>
        <a href="/chat" class="block px-3 py-2 rounded-md transition-colors 
          {currentPath === '/chat' ? 'bg-accent text-white' : 'hover:bg-btn-primary hover:text-white'}">
          <FontAwesomeIcon icon={faComments} class="w-4 h-4" /> Conversas
        </a>
      </li>
    {/if}
    <li>
      <a href="/profile" class="block px-3 py-2 rounded-md transition-colors 
        {currentPath === '/profile' ? 'bg-accent text-white' : 'hover:bg-btn-primary hover:text-white'}">
        <FontAwesomeIcon icon={faUser} class="w-4 h-4" /> Perfil
      </a>
    </li>
    <li>
      <button class="block px-3 py-2 w-full text-left rounded-md transition-colors hover:bg-btn-primary hover:text-white" on:click={logout}>
        <FontAwesomeIcon icon={faDoorOpen} class="w-4 h-4" /> Sair
      </button>
    </li>
  </ul>
</div>