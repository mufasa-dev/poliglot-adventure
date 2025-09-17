<script>
  let email = "";
  let password = "";

  function login() {
    alert(`Login com email: ${email}, senha: ${password}`);
    // Aqui depois você chama sua API
  }
</script>

<div class="flex justify-end items-center vh-100 bg-bg-primary text-text-primary">
  <div class="vh-100 p-4 w-50 flex flex-column justify-center items-center bg-bg-secondary text-text-primary">
    <h2 class="mb-3">Entrar</h2>
    <div class="mb-3">
      <label class="form-label">Email</label>
      <input type="email" bind:value={email} class="form-control" placeholder="Digite seu email" />
    </div>
    <div class="mb-3">
      <label class="form-label">Senha</label>
      <input type="password" bind:value={password} class="form-control" placeholder="Digite sua senha" />
    </div>
    <button class="btn-primary" on:click={login}>Login</button>
  </div>
</div>
