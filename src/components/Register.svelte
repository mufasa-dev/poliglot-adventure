<script>
  let name = "";
  let email = "";
  let password = "";

  function register() {
    alert(`Cadastro realizado!\nNome: ${name}\nEmail: ${email}\nSenha: ${password}`);
    // Aqui depois você chama sua API de registro
  }
</script>

<div class="flex justify-end items-center h-screen bg-bg-primary text-text-primary p-3">
  <div class="h-full p-4 w-1/2 flex flex-col justify-center items-center bg-bg-secondary text-text-primary rounded-md">
    <h2 class="mb-3">Cadastro</h2>
    <div class="mb-3 w-full">
      <label class="form-label">Nome</label>
      <input type="text" bind:value={name} class="input-base mb-3" placeholder="Digite seu nome" />

      <label class="form-label">Email</label>
      <input type="email" bind:value={email} class="input-base mb-3" placeholder="Digite seu email" />

      <label class="form-label">Senha</label>
      <input type="password" bind:value={password} class="input-base mb-3" placeholder="Digite sua senha" />

      <button class="btn-primary w-full" on:click={register}>Cadastrar</button>

      <div class="text-center mt-4">
        <a href="/login" class="text-accent hover:underline">
            Já tem conta? Entrar
        </a>
        </div>
    </div>
  </div>
</div>
