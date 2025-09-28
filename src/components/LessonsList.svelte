<script>
  import { faBook } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
  import LoadingOverlay from "../ui/LoadingOverlay.svelte";
  import ErrorModal from "../ui/ErrorModal.svelte";
  import { onMount } from "svelte";
  import { firstLessonPrompt } from "../prompts/lesson";

  let lessons = [];
  let course = null;
  let loading = false;
  let loadingMessage = "";
  let loadingLessons = false;
  let showErrorModal = false;
  let errorMsg = "";
  let error = "";

  async function loadLessons() {
    try {
      loadingLessons = true;
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
      console.log("Curso ativo:", course);

      // 🔎 2. Buscar lessons do curso ativo
      const resLessons = await fetch(`/api/lessons?courseId=${course._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!resLessons.ok) {
        showErrorModal = true;
        error = "Erro ao carregar lições";
        errorMsg = error;
        return;
      }

      lessons = await resLessons.json();
    } catch (err) {
      console.error(err);
      showErrorModal = true;
      error = "Erro inesperado";
      errorMsg = error;
    } finally {
      loadingLessons = false;
    }
  }

  onMount(loadLessons);

  async function createFirstLesson() {
    try {
      loading = true;
      loadingMessage = "Gerando sua primeira lição...";
      errorMsg = "";
      const token = localStorage.getItem("token");
      console.log("Meu curso:", course);
      let prompt = firstLessonPrompt(course);
      console.log("Prompt para a primeira lição:", prompt);

      const res = await fetch(`/api/lessons/generate`, {
        headers: { Authorization: `Bearer ${token}` },
        method: "POST",
        body: JSON.stringify({ prompt, courseId: course._id }),
      });

      const data = await res.json();
      if (res.ok) {
        console.log("Lição criada:", data);
        loadLessons();
      } else {
        showErrorModal = true;
        errorMsg = data.error || "Erro ao criar a lição";
      }
    } catch (err) {
      console.error(err);
      showErrorModal = true;
      errorMsg = "Erro ao criar a primeira lição";
    } finally {
      loading = false;
    }
  }
</script>

<div class="p-6 bg-bg-primary flex-1 overflow-auto">
  <h2 class="text-2xl font-bold mb-4">📚 Minhas Lições</h2>

  {#if loadingLessons}
    <p>Carregando...</p>
  {:else if error}
    <p class="text-red-500">{error}</p>
  {:else if lessons.length === 0}
    <p>Nenhuma lição encontrada para o curso ativo.</p>
    <button class="btn-success mt-4" on:click={createFirstLesson}>
      <FontAwesomeIcon icon={faBook} class="w-4 h-4" /> Criar minha primeira lição
    </button>
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
<LoadingOverlay show={loading} message={loadingMessage} />
<ErrorModal 
  show={showErrorModal} 
  title="Erro" 
  message={errorMsg} 
  onClose={() => showErrorModal = false}
/>