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
      window.location.href = "/select-course";
    } else {
      alert("Erro: " + data.error);
    }
  }
</script>

<div class="flex justify-center items-center min-h-screen bg-bg-primary text-text-primary p-4">
  <div
    class="w-full max-w-md p-6 flex flex-col justify-center items-center bg-bg-secondary text-text-primary rounded-md shadow-lg"
  >
    <h2 class="mb-6 text-2xl font-bold">Entrar</h2>

    <div class="w-full">
      <label for="login-email" class="form-label">Email</label>
      <input
        id="login-email"
        type="email"
        bind:value={email}
        class="input-base mb-4 w-full"
        placeholder="Digite seu email"
      />

      <label for="login-password" class="form-label">Senha</label>
      <input
        id="login-password"
        type="password"
        bind:value={password}
        class="input-base mb-4 w-full"
        placeholder="Digite sua senha"
      />

      <button class="btn-primary w-full" on:click={login}>Login</button>

      <div class="text-center mt-4">
        <a href="/register" class="text-accent hover:underline">
          Não tem conta? Cadastre-se
        </a>
      </div>
    </div>
  </div>
</div>

