<script>
  let name = "";
  let email = "";
  let password = "";

  var register = async () => {
    console.log('Registering user:', { name, email, password });
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

  function test() {
    console.log("Test function called");
  }
</script>

<div class="flex justify-end items-center h-screen bg-bg-primary text-text-primary p-3">
  <div class="h-full p-4 w-1/2 flex flex-col justify-center items-center bg-bg-secondary text-text-primary rounded-md">
    <h2 class="mb-3">Cadastro</h2>
    <div class="mb-3 w-full">
      <label for="r-name" class="form-label">Nome</label>
      <input id=r-name type="text" bind:value={name} class="input-base mb-3" placeholder="Digite seu nome" />

      <label for="r-email" class="form-label">Email</label>
      <input id="r-email" type="email" bind:value={email} class="input-base mb-3" placeholder="Digite seu email" />

      <label for="r-password" class="form-label">Senha</label>
      <input id="r-password" type="password" bind:value={password} class="input-base mb-3" placeholder="Digite sua senha" />

      <button type="button" class="btn-primary w-full" on:click={test}>
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
