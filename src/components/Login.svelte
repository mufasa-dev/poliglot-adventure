<script>
  let email = "";
  let password = "";

  async function login() {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      window.location.href = "/main";
    } else {
      alert("Erro: " + data.error);
    }
  }
</script>

<div class="flex justify-end items-center h-screen bg-bg-primary text-text-primary p-3">
  <div class="h-full p-4 w-1/2 flex flex-col justify-center items-center bg-bg-secondary text-text-primary rounded-md">
    <h2 class="mb-3">Entrar</h2>
    <div class="mb-3">
      <label for="login-email" class="form-label">Email</label>
      <input id="login-email" type="email" bind:value={email} class="input-base mb-3" placeholder="Digite seu email" />

      <label for="login-password" class="form-label">Senha</label>
      <input id="login-password" type="password" bind:value={password} class="input-base mb-3" placeholder="Digite sua senha" />

      <button class="btn-primary w-full" on:click={login}>Login</button>

      <div class="text-center mt-4">
        <a href="/register" class="text-accent hover:underline">
          Não tem conta? Cadastre-se
        </a>
      </div>
    </div>
  </div>
</div>
