<script>
  function logout() {
    localStorage.removeItem("token");

    window.location.href = "/login";
  }
</script>

<nav class="flex items-center justify-between bg-btn-secondary text-white px-4 py-3 shadow-md">
  <a href="/" class="text-xl font-bold tracking-wide hover:text-accent transition-colors">
    LinguaQuest
  </a>

  <ul class="flex items-center space-x-6">
    <li>
      
    </li>
  </ul>
</nav>
