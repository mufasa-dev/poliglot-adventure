<script>
  import LoadingOverlay from "../ui/LoadingOverlay.svelte";
  import ErrorModal from "../ui/ErrorModal.svelte";
  import { onMount } from "svelte";
  import { getLevelClasses } from "../pages/utils/level.util";
  import ExercisePlayer from "./ExercisePlayer.svelte";

  let exercises = [];
  let selectedExercise = null;
  let course = null;
  let loading = false;
  let loadingMessage = "";
  let loadingExercises = false;
  let showErrorModal = false;
  let errorMsg = "";
  let error = "";

  async function loadExercises() {
    try {
      loadingExercises = true;
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
      const resEx = await fetch(`/api/exercise?courseId=${course._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!resEx.ok) {
        showErrorModal = true;
        error = "Erro ao carregar lições";
        errorMsg = error;
        return;
      }

      exercises = await resEx.json();
      console.log("Exercicios carregadas:", exercises);
    } catch (err) {
      console.error(err);
      showErrorModal = true;
      error = "Erro inesperado";
      errorMsg = error;
    } finally {
      loadingExercises = false;
    }
  }

  onMount(loadExercises);
</script>

<div class="p-6 bg-bg-primary flex-1 overflow-auto">
  {#if !selectedExercise}
    <h2 class="text-2xl font-bold mb-4">📝 Meus exercícios</h2>
  {/if}

  {#if loadingExercises}
    <p>Carregando...</p>
  {:else if error}
    <p class="text-red-500">{error}</p>
  {:else if exercises.length === 0}
    <p>Nenhuma exercício encontrado para o curso ativo.</p>
  {:else if selectedExercise}
    <ExercisePlayer exercise={selectedExercise} course={course} />
  {:else}
    <ul class="space-y-4">
      {#each exercises as exercise}
        <li>
          <button
            type="button"
            class={`w-full text-left p-4 ${getLevelClasses(exercise.level).bg} rounded-lg ${getLevelClasses(exercise.level).hover} cursor-pointer focus:outline-none`}
            on:click={() => selectedExercise = exercise}
          >
            <div class="flex">
              <h3 class="text-lg font-semibold">{exercise.title}</h3>
              <div class={`px-2 py-1 ml-auto text-sm font-medium bg-white text-black rounded flex items-center`}>
                {exercise.level}
              </div>
            </div>
            <p class="text-sm">{exercise.description}</p>
          </button>
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