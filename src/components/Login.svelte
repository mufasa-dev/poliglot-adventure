<script>
  let email = "";
  let password = "";

  function login() {
    alert(`Login com email: ${email}, senha: ${password}`);
    // Aqui depois você chama sua API
  }
</script>

<div class="flex justify-end items-center vh-100 bg-bg-primary text-text-primary p-3">
  <div class="h-100 p-4 w-50 flex flex-column justify-center items-center bg-bg-secondary text-text-primary rounded-md">
    <h2 class="mb-3">Entrar</h2>
    <div class="mb-3">
      <label class="form-label">Email</label>
      <input type="email" bind:value={email} class="input-base mb-3" placeholder="Digite seu email" />

      <label class="form-label">Senha</label>
      <input type="password" bind:value={password} class="input-base mb-3" placeholder="Digite sua senha" />

      <button class="btn-primary w-full" on:click={login}>Login</button>
    </div>
  </div>
</div>
