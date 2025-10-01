<script lang="ts">
  import LoadingOverlay from "../ui/LoadingOverlay.svelte";
  import ErrorModal from "../ui/ErrorModal.svelte";
  import ConfirmModal from "../ui/ConfirmModal.svelte";
  import { onMount } from "svelte";
  import { getLevelClasses } from "../pages/utils/level.util";
  import ExercisePlayer from "./ExercisePlayer.svelte";
  import { faPlus } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";

  let course: any = null;
  let loadingPeople = false;
  let showErrorModal = false;
  let errorMsg = "";
  let error = "";

  // Pessoas
  let people: any[] = [];
  let selectedPerson = null;
  let showCreatePersonModal = false;
  let newPerson = {
    name: "",
    description: "",
    level: "",
    objectives: [] as string[]
  };
  let newObjective = "";

  async function loadPeople() {
    try {
      loadingPeople = true;
      const token = localStorage.getItem("token");
      if (!token) {
        error = "Usuário não autenticado";
        return;
      }

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

      const resPerson = await fetch(`/api/person?courseId=${course._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!resPerson.ok) {
        showErrorModal = true;
        error = "Erro ao carregar exercícios";
        errorMsg = error;
        return;
      }

      people = await resPerson.json();

    } catch (err) {
      console.error(err);
      showErrorModal = true;
      error = "Erro inesperado";
      errorMsg = error;
    } finally {
      loadingPeople = false;
    }
  }

  onMount(loadPeople);

  function openCreatePersonModal() {
    newPerson = { name: "", description: "", level: "", objectives: [] };
    newObjective = "";
    showCreatePersonModal = true;
  }

  function addObjective() {
    if (newObjective.trim()) {
        // ⚡ reatribui para forçar reatividade
        newPerson.objectives = [...newPerson.objectives, newObjective.trim()];
        newObjective = "";
    }
  }

  function removeObjective(index: number) {
    newPerson.objectives = newPerson.objectives.filter((_, i) => i !== index);
  }

   async function savePerson() {
    if (!newPerson.name || !newPerson.level || !course._id) {
      alert("Nome, nível e curso são obrigatórios");
      return;
    }

    try {
      const token = localStorage.getItem("token"); // se precisar de auth
      const res = await fetch("/api/person", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          ...newPerson,
          courseId: course._id
        })
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Erro ao criar pessoa");
        return;
      }

      // adiciona a pessoa retornada na lista local
      people = [...people, { ...newPerson, _id: data.id }];
      showCreatePersonModal = false;
      // limpa form
      newPerson = { name: "", description: "", level: "", objectives: [] };
      newObjective = "";

    } catch (err) {
      console.error(err);
      alert("Erro ao criar pessoa");
    }
  }
</script>

<div class="p-6 bg-bg-primary flex-1 overflow-auto">
  <h2 class="text-2xl font-bold mb-4">🧑‍🤝‍🧑 Pessoas para praticar</h2>
  <button class="btn-success mb-4" on:click={openCreatePersonModal}>
    <FontAwesomeIcon icon={faPlus} class="w-4 h-4" /> Criar nova pessoa
  </button>

  {#if people.length === 0}
    <p>Nenhuma pessoa encontrada. Crie uma nova acima.</p>
  {:else}
    <ul class="space-y-4">
      {#each people as person}
        <li class="btn-outline-primary text-left rounded-lg flex flex-col gap-2">
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-semibold">{person.name}</h3>
            <div class={`px-2 py-1 text-sm font-medium rounded ${getLevelClasses(person.level).bg}`}>
              {person.level}
            </div>
          </div>
          <p class="text-sm">{person.description}</p>
          <div class="flex flex-wrap gap-2">
            {#each person.objectives as obj}
              <span class="bg-yellow-200 text-black px-2 py-1 rounded text-xs">{obj}</span>
            {/each}
          </div>
        </li>
      {/each}
    </ul>
  {/if}
</div>

<!-- Modal de criar pessoa -->
{#if showCreatePersonModal}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-xl shadow-lg w-full max-w-md relative p-6">
      <h2 class="text-xl font-bold mb-4">Criar nova pessoa</h2>
      <div class="flex flex-col gap-3">
        <input class="input-base" placeholder="Nome" bind:value={newPerson.name} />
        <input class="input-base" placeholder="Descrição" bind:value={newPerson.description} />
        <input class="input-base" placeholder="Nível (Iniciante, A1, etc)" bind:value={newPerson.level} />

        <div class="flex gap-2">
          <input class="input-base flex-1" placeholder="Adicionar objetivo" bind:value={newObjective} />
          <button class="btn-secondary" on:click={addObjective}>
            <FontAwesomeIcon icon={faPlus} class="w-4 h-4" />
          </button>
        </div>

        <div class="flex flex-wrap gap-2">
          {#each newPerson.objectives as obj, i}
            <span class="bg-gray-200 px-2 py-1 rounded flex items-center gap-1 text-xs">
              {obj} <button class="text-red-500 font-bold" on:click={() => removeObjective(i)}>✕</button>
            </span>
          {/each}
        </div>

        <div class="flex justify-end gap-2 mt-4">
          <button class="btn-secondary" on:click={() => showCreatePersonModal = false}>Cancelar</button>
          <button class="btn-success" on:click={savePerson}>Salvar</button>
        </div>
      </div>
    </div>
  </div>
{/if}

<LoadingOverlay show={loadingPeople} message="Carregando pessoas..." />
<ErrorModal 
  show={showErrorModal} 
  title="Erro" 
  message={errorMsg} 
  onClose={() => showErrorModal = false}
/>
