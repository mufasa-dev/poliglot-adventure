<script>
  function logout() {
    localStorage.removeItem("token");

    window.location.href = "/login";
  }
</script>

<nav class="flex items-center justify-between bg-btn-secondary text-white px-4 py-3 shadow-md">
  <ul class="flex items-center space-x-6 ml-auto">
    <li>
      <b>Aurix</b> - Sua jornada de aprendizado de idiomas
    </li>
  </ul>
</nav>
