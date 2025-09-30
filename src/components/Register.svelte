<script>
  let name = "";
  let email = "";
  let password = "";

  async function register() {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();
    if (res.ok) {
      alert("Cadastro realizado com sucesso!");
      window.location.href = "/login";
    } else {
      alert("Erro: " + data.error);
    }
  }
</script>

<div class="flex justify-center items-center min-h-screen bg-bg-primary text-text-primary p-4">
  <div
    class="w-full max-w-md p-6 flex flex-col justify-center items-center bg-bg-secondary text-text-primary rounded-md shadow-lg"
  >
    <h2 class="mb-6 text-2xl font-bold">Cadastro</h2>

    <div class="w-full">
      <label for="r-name" class="form-label">Nome</label>
      <input
        id="r-name"
        type="text"
        bind:value={name}
        class="input-base mb-4 w-full"
        placeholder="Digite seu nome"
      />

      <label for="r-email" class="form-label">Email</label>
      <input
        id="r-email"
        type="email"
        bind:value={email}
        class="input-base mb-4 w-full"
        placeholder="Digite seu email"
      />

      <label for="r-password" class="form-label">Senha</label>
      <input
        id="r-password"
        type="password"
        bind:value={password}
        class="input-base mb-4 w-full"
        placeholder="Digite sua senha"
      />

      <button type="button" class="btn-primary w-full" on:click={register}>
        Cadastrar
      </button>

      <div class="text-center mt-4">
        <a href="/login" class="text-accent hover:underline">
          Já tem conta? Entrar
        </a>
      </div>
    </div>
  </div>
</div>

