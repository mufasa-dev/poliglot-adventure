<script>
  let currentPath = '';
  import { onMount } from 'svelte';

  onMount(() => {
    currentPath = window.location.pathname;
  });
</script>

<div class="d-flex flex-column flex-shrink-0 p-3 text-bg-dark" style="width: 220px; height: 100vh;">
  <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
    <span class="fs-5">Menu</span>
  </a>
  <hr />
  <ul class="nav nav-pills flex-column mb-auto">
    <li class="nav-item">
        <a href="/" class="nav-link text-white">Início</a>
    </li>
    <li>
        <a href="/homework" class="nav-link text-white">Exercícios</a>
    </li>
    <li>
        <a href="/chat" class="nav-link text-white {currentPath === '/chat' ? 'active' : ''}">Conversas</a>
    </li>
    <li>
        <a href="/perfil" class="nav-link text-white">Perfil</a>
    </li>
  </ul>
</div>
