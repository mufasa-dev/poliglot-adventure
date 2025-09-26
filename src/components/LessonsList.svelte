<script>
  import { onMount } from "svelte";

  let lessons = [];
  let course = null;
  let loading = true;
  let error = "";

  async function loadLessons() {
    try {
      loading = true;
      const token = localStorage.getItem("token");
      if (!token) {
        error = "Usuário não autenticado";
        return;
      }

      // 🔎 1. Pegar curso ativo
      const resCourse = await fetch("/api/user/course", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!resCourse.ok) {
        error = "Erro ao carregar curso ativo";
        return;
      }

      const courseData = await resCourse.json();
      course = courseData.course;

      if (!course) {
        error = "Nenhum curso ativo encontrado";
        return;
      }

      // 🔎 2. Buscar lessons do curso ativo
      const resLessons = await fetch(`/api/lessons?courseId=${course._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!resLessons.ok) {
        error = "Erro ao carregar lições";
        return;
      }

      lessons = await resLessons.json();
    } catch (err) {
      console.error(err);
      error = "Erro inesperado";
    } finally {
      loading = false;
    }
  }

  onMount(loadLessons);
</script>

<div class="p-6 bg-bg-primary flex-1 overflow-auto">
  <h2 class="text-2xl font-bold mb-4">📚 Minhas Lições</h2>

  {#if loading}
    <p>Carregando...</p>
  {:else if error}
    <p class="text-red-500">{error}</p>
  {:else if lessons.length === 0}
    <p>Nenhuma lição encontrada para o curso ativo.</p>
  {:else}
    <ul class="space-y-4">
      {#each lessons as lesson}
        <li class="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
          <h3 class="text-lg font-semibold">{lesson.title}</h3>
          <p class="text-gray-600 text-sm">{lesson.description}</p>
        </li>
      {/each}
    </ul>
  {/if}
</div>
