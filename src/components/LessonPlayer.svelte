<script>
import { faBook, faCaretLeft, faCaretRight, faFlag } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";

  export let lesson;
  let currentIndex = 0;
  let showResult = false;
  let totalQuestions = 0;
  let correctAnswers = 0;
  let scorePercent = 0;
  let pageGenerateExercises = false;
  let pageGenerateNextLesson = false;
  let nextClassSugest = "";

  $: currentItem = lesson.content[currentIndex];

  function selectAnswer(answer) {
    if (currentItem.respondida) return;

    currentItem.respondida = true;
    currentItem.selectedAnswer = answer;

    const correctAnswer = currentItem.answers.find(a => a.correct);
    currentItem.isCorrect = correctAnswer?.answer === answer;
  }

  function next() {
    if (currentIndex < lesson.content.length - 1) {
      currentIndex += 1;
    }
  }

  function prev() {
    if (currentIndex > 0) {
      currentIndex -= 1;
    }
  }

  function finish() {
    // calcula resultados
    const questions = lesson.content.filter(c => c.type === 'ask' || c.type === 'exercise');
    totalQuestions = questions.length;
    correctAnswers = questions.filter(q => q.isCorrect).length;
    scorePercent = Math.round((correctAnswers / totalQuestions) * 100);
    showResult = true;
  }
</script>

<div class="max-w-2xl mx-auto md-p-4">
  <h1 class="text-2xl font-bold mb-2">{lesson.title}</h1>
  <p class="text-gray-700 mb-4">{lesson.description}</p>

  {#if !showResult}
    <div class="bg-white p-4 rounded-lg shadow mb-4">
      {#if currentItem.type === 'message'}
        <p class="text-gray-800">{currentItem.value}</p>
        {#if currentItem.words}
          <div class="mt-2 flex flex-wrap gap-2">
            {#each currentItem.words as word}
              <span class="bg-yellow-200 px-2 py-1 rounded">{word}</span>
            {/each}
          </div>
        {/if}
      {:else if currentItem.type === 'ask' || currentItem.type === 'exercise'}
        <p class="mb-2">{currentItem.value}</p>
        <div class="flex flex-col gap-2">
          {#each currentItem.answers as answer}
            <button
              class="btn-outline-primary"
              class:selected={currentItem.selectedAnswer === answer.answer}
              class:correct={currentItem.respondida && answer.correct}
              class:incorrect={currentItem.respondida && currentItem.selectedAnswer === answer.answer && !answer.correct}
              on:click={() => selectAnswer(answer.answer)}
              disabled={currentItem.respondida} 
            >
              {answer.answer}
            </button>
          {/each}
        </div>
        {#if currentItem.respondida}
          <p class="mt-2 font-semibold" class:text-green-600={currentItem.isCorrect} class:text-red-600={!currentItem.isCorrect}>
            {currentItem.isCorrect ? "✔ Resposta correta!" : "✖ Resposta incorreta"}
          </p>
        {/if}
      {/if}
    </div>

    <div class="flex justify-between">
        {#if currentIndex > 0}
        <button on:click={prev} class="btn-secondary" disabled={currentIndex === 0}>
            <FontAwesomeIcon icon={faCaretLeft} class="w-4 h-4" /> Anterior
        </button>
      {/if}

      {#if currentIndex === lesson.content.length - 1}
        <button on:click={finish} class="btn-success">
            <FontAwesomeIcon icon={faFlag} class="w-4 h-4" /> Finalizar
        </button>
      {:else}
        <button on:click={next} class="btn-primary">
            Próximo <FontAwesomeIcon icon={faCaretRight} class="w-4 h-4" />
        </button>
      {/if}
    </div>

    <p class="mt-2 text-gray-500 text-sm">Etapa {currentIndex + 1} de {lesson.content.length}</p>
  {:else if pageGenerateExercises}
    <div class="bg-white p-6 rounded-lg shadow text-center">
        <h2 class="text-2xl font-bold mb-4">Exercícios</h2>
        <p class="text-gray-700">Gostaria de criar alguns exercícios para praticar as palavras aprendidas nessa lição?</p>
        <div class="mt-4 flex justify-center gap-4">
          <button class="btn-primary" on:click={() => {pageGenerateExercises = false; pageGenerateNextLesson = true}}>Não, obrigado</button>
          <button class="btn-success" on:click={() => window.location.href = `/exercise/create?lessonId=${lesson.id}`}>Sim, criar exercícios</button>
        </div>
    </div>
  {:else if pageGenerateNextLesson}
    <div class="bg-white p-6 rounded-lg shadow text-center">
        <h2 class="text-2xl font-bold mb-4">Próxima aula</h2>
        <p class="text-gray-700">Gostaria de sugerir um tema para a próxima aula?</p>
        <textarea class="w-full input-base" rows="4" placeholder="" bind:value={nextClassSugest}></textarea>
        <div class="mt-4 flex justify-center gap-4">
          <button class="btn-success" on:click={() => window.location.href = `/exercise/create?lessonId=${lesson.id}`}>
            <FontAwesomeIcon icon={faBook} class="w-4 h-4" /> Criar aula
          </button>
        </div>
    </div>
  {:else}
    <!-- Tela de resultado -->
    <div class="bg-white p-6 rounded-lg shadow text-center">
      <h2 class="text-2xl font-bold mb-4">Parabéns! Você concluiu a lição 🎉</h2>
      <p class="mb-2">Acertou {correctAnswers} de {totalQuestions} questões.</p>
      <p class="text-xl font-semibold">Pontuação: {scorePercent}%</p>
      <button on:click={() => {pageGenerateExercises = true}} class="btn-primary">
            Próximo <FontAwesomeIcon icon={faCaretRight} class="w-4 h-4" />
        </button>
    </div>
  {/if}
</div>

<style>
  .selected {
    @apply bg-btn-success text-btn-success-text;
  }
  .correct {
    @apply bg-green-500 text-white;
  }
  .incorrect {
    @apply bg-red-500 text-white;
  }
</style>
