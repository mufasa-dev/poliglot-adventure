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

  <ul class="flex flex-col space-y-2">
    <li>
      <a href="/" class="block px-3 py-2 rounded-md transition-colors 
        {currentPath === '/' ? 'bg-accent text-white' : 'hover:bg-btn-primary'}">
        Início
      </a>
    </li>
    <li>
      <a href="/homework" class="block px-3 py-2 rounded-md transition-colors 
        {currentPath === '/homework' ? 'bg-accent text-white' : 'hover:bg-btn-primary'}">
        Exercícios
      </a>
    </li>
    <li>
      <a href="/chat" class="block px-3 py-2 rounded-md transition-colors 
        {currentPath === '/chat' ? 'bg-accent text-white' : 'hover:bg-btn-primary'}">
        Conversas
      </a>
    </li>
    <li>
      <a href="/perfil" class="block px-3 py-2 rounded-md transition-colors 
        {currentPath === '/perfil' ? 'bg-accent text-white' : 'hover:bg-btn-primary'}">
        Perfil
      </a>
    </li>
    <li>
      <button class="block px-3 py-2 rounded-md transition-colors" on:click={logout}>
        Sair
      </button>
    </li>
  </ul>
</div>