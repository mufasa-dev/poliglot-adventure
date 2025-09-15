<script>
  let email = "";
  let password = "";

  function login() {
    alert(`Login com email: ${email}, senha: ${password}`);
    // Aqui depois você chama sua API
  }
</script>

<div class="d-flex justify-content-center align-items-center vh-100 bg-light">
  <div class="card p-4 shadow" style="max-width: 400px; width: 100%;">
    <h2 class="mb-3">Entrar</h2>
    <div class="mb-3">
      <label class="form-label">Email</label>
      <input type="email" bind:value={email} class="form-control" placeholder="Digite seu email" />
    </div>
    <div class="mb-3">
      <label class="form-label">Senha</label>
      <input type="password" bind:value={password} class="form-control" placeholder="Digite sua senha" />
    </div>
    <button class="btn btn-primary w-100" on:click={login}>Login</button>
  </div>
</div>
