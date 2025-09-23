<script>
  import { onMount } from "svelte";

  let user = { name: "", description: "", email: "" };
  let passwordData = { current: "", new: "", confirm: "" };
  let message = "";
  let showModal = false;

  async function loadUser() {
    const token = localStorage.getItem("token");
    if (!token) return;

    const res = await fetch("/api/user/user", {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (res.ok) {
      user = await res.json();
    } else {
      console.error("Não autorizado ou erro ao carregar usuário");
    }
  }

  async function saveProfile() {
    const token = localStorage.getItem("token");
    if (!token) return;

    if (passwordData.new || passwordData.confirm) {
      if (passwordData.new !== passwordData.confirm) {
        showModalMessage("A nova senha e a confirmação não coincidem.");
        return;
      }
      if (!passwordData.current) {
        showModalMessage("Digite sua senha atual para alterar.");
        return;
      }
    }

    const payload = {
      ...user,
      currentPassword: passwordData.current,
      password: passwordData.new || undefined
    };

    const res = await fetch("/api/user/user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      showModalMessage("Perfil atualizado com sucesso!");
      passwordData = { current: "", new: "", confirm: "" };
    } else {
      showModalMessage("Erro ao atualizar perfil.");
    }
  }

  function showModalMessage(msg) {
    message = msg;
    showModal = true;
  }

  function closeModal() {
    showModal = false;
  }

  onMount(loadUser);
</script>

<div class="bg-bg-primary flex-1 p-6 overflow-auto">
  <div class="max-w-lg p-6 bg-white shadow-lg rounded-2xl space-y-4">
    <h2 class="text-2xl font-bold">Meu Perfil</h2>

    <label class="block">
      <span class="text-gray-700">Nome</span>
      <input
        type="text"
        bind:value={user.name}
        placeholder="Seu nome"
        class="mt-1 input-base"
      />
    </label>

    <label class="block">
      <span class="text-gray-700">Descrição</span>
      <textarea
        rows="3"
        bind:value={user.description}
        placeholder="Fale um pouco sobre você..."
        class="mt-1 input-base"
      ></textarea>
    </label>

    <label class="block">
      <span class="text-gray-700">E-mail</span>
      <input
        type="email"
        bind:value={user.email}
        placeholder="Seu e-mail"
        class="mt-1 input-base"
      />
    </label>

    <hr class="my-4" />

    <h3 class="text-lg font-semibold">Alterar senha</h3>

    <label class="block">
      <span class="text-gray-700">Senha atual</span>
      <input
        type="password"
        bind:value={passwordData.current}
        placeholder="Digite sua senha atual"
        class="mt-1 input-base"
      />
    </label>

    <label class="block">
      <span class="text-gray-700">Nova senha</span>
      <input
        type="password"
        bind:value={passwordData.new}
        placeholder="Nova senha"
        class="mt-1 input-base"
      />
    </label>

    <label class="block">
      <span class="text-gray-700">Confirmação da nova senha</span>
      <input
        type="password"
        bind:value={passwordData.confirm}
        placeholder="Confirme a nova senha"
        class="mt-1 input-base"
      />
    </label>

    <button
      on:click={saveProfile}
      class="w-full btn-primary"
    >
      Salvar Alterações
    </button>
  </div>
</div>

<!-- Modal de mensagem -->
{#if showModal}
  <div class="fixed inset-0 flex items-center justify-center z-50">
    
    <!-- Overlay clicável -->
    <button
      class="absolute inset-0 bg-black/50"
      aria-label="Fechar modal"
      on:click={closeModal}
    ></button>

    <!-- Conteúdo do modal -->
    <div class="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full relative" role="dialog" aria-modal="true">
      <p class="text-gray-800">{message}</p>
      <button class="mt-4 btn-primary w-full" on:click={closeModal}>Fechar</button>
    </div>
  </div>
{/if}
