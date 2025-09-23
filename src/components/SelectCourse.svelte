<script>
  import { onMount } from "svelte";

  let currentPath = "";
  let showCourseModal = false;
  let selectedCourse = null;
  let courses = [ 
    { 
      name: "Inglês", 
      code: "en-us", 
      asks: [
        { 
          title: "Qual seu nível de Inglês?", 
          options: ["Iniciante", "Intermediário", "Avançado"],
          answer: "Iniciante"
        },
        { 
          title: "Qual seu objetivo com o curso?", 
          options: ["Viagem", "Trabalho", "Estudos", "Outro"] ,
          answer: "Viagem"
        },
        {
          title: "Fale um pouco sobre você: o que já sabe de inglês e o que gostaria de aprender ou melhorar neste curso.",
          placeholder: "Exemplo: Já estudei inglês na escola, mas tenho dificuldade em conversar. Gostaria de aprender a falar melhor para viagens.",
          answer: ""
        }
      ] 
    },
    { 
      name: "Italiano", 
      code: "it-it", 
      asks: [
        { 
          title: "Qual seu nível de Italiano?", 
          options: ["Iniciante", "Intermediário", "Avançado"] ,
          answer: "Iniciante"
        },
        { 
          title: "Qual seu objetivo com o curso?", 
          options: ["Viagem", "Trabalho", "Estudos", "Outro"],
          answer: "Viagem"
        },
        {
          title: "Fale um pouco sobre você: o que já sabe de italiano e o que gostaria de aprender ou melhorar neste curso.",
          placeholder: "Exemplo: Sei algumas palavras e frases básicas, mas quero aprender a conversar melhor para viajar para a Itália.",
          answer: ""
        }
      ] 
    },
    { 
      name: "Japonês", 
      code: "ja-jp", 
      asks: [
        { 
          title: "Qual seu nível de Japonês?", 
          options: ["Iniciante", "Intermediário", "Avançado"] ,
          answer: "Iniciante"
        },
        { 
          title: "Qual seu objetivo com o curso?", 
          options: ["Viagem", "Trabalho", "Estudos", "Anime/Cultura", "Outro"] ,
          answer: "Viagem"
        },
        {
          title: "Fale um pouco sobre você: o que já sabe de japonês e o que gostaria de aprender ou melhorar neste curso.",
          placeholder: "Exemplo: Já aprendi hiragana e katakana, mas quero melhorar meu vocabulário e aprender a conversar no dia a dia.",
          answer: ""
        }
      ] 
    },
    { 
      name: "Espanhol", 
      code: "es-es",
      asks: [
        { 
          title: "Qual seu nível de Espanhol?", 
          options: ["Iniciante", "Intermediário", "Avançado"],
          answer: "Iniciante"
        },
        { 
          title: "Qual seu objetivo com o curso?", 
          options: ["Viagem", "Trabalho", "Estudos", "Conversação Geral", "Outro"] ,
          answer: "Viagem"
        },
        {
          title: "Fale um pouco sobre você: o que já sabe de espanhol e o que gostaria de aprender ou melhorar neste curso.",
          placeholder: "Exemplo: Consigo entender algumas palavras por serem parecidas com o português, mas quero aprender a falar de forma correta e natural.",
          answer: ""
        }
      ] 
    }
  ];


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

  async function saveCourse() {
    const token = localStorage.getItem("token");
    if (!token || !selectedCourse) return;

    const res = await fetch("/api/user/course", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ course: selectedCourse }),
    });

    if (res.ok) {
      showCourseModal = false;
    } else {
      alert("Erro ao salvar curso");
    }
  }

  function selectCourse(course) {
    selectedCourse = course;
  }
</script>

<div class="p-6 w-full bg-bg-primary flex-1 overflow-auto">
  {#if selectedCourse == null}
  <h1 class="text-lg font-semibold">Cursos</h1>
  <p>O quê deseja aprender?</p>
  <div class="flex flex-col">
      {#each courses as course}
        <button type="button" class="p-4 btn-outline-primary w-full mb-4 cursor-pointer text-left" on:click={() => selectCourse(course)}>
          <img src={`/courses/${course.code}.png`} alt={course.name} class="h-12 inline-block mr-4" />
          <h2 class="inline-block text-xl font-semibold">{course.name}</h2>
        </button>
      {/each}
    </div>
  {/if}

  {#if selectedCourse != null}
    <div class="flex items-center">
      <img src={`/courses/${selectedCourse.code}.png`} alt={selectedCourse.name} class="h-8 inline-block mr-4" />
      <h2 class="text-lg font-semibold">{selectedCourse.name}</h2>
    </div>
    <hr class="my-4 border-bg-secondary" />
    <div class="mt-2">
      {#each selectedCourse.asks as ask}
        <div class="mb-4">
          <span class="block font-medium mb-1">{ask.title}</span>
          {#if ask.options}
            <select class="w-full select-base" bind:value={ask.answer}>
              <option value="" disabled selected>Selecione uma opção</option>
              {#each ask.options as option}
                <option value={option}>{option}</option>
              {/each}
            </select>
          {:else if ask.placeholder}
            <textarea class="w-full input-base" rows="4" placeholder={ask.placeholder} bind:value={ask.answer}></textarea>
          {/if}
      </div>
      {/each}
      <div class="flex">
        <button class="mt-2 px-4 py-2 bg-gray-300 text-black rounded mr-2" on:click={() => selectedCourse = null}>Voltar</button>
        <button class="mt-2 px-4 py-2 btn-primary text-white rounded" on:click={saveCourse}>Selecionar {selectedCourse.name}</button>
      </div>
    </div>
  {/if}
</div>