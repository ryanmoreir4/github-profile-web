const repositorios = document.querySelector(".card-container");
const perfilImg = document.querySelector(".imgprofile");
const colegasTrabalho = document.querySelector(".colegastrabalho");

function getApiGitHub() {
  //Puxar a imagem de perfil do GitHub
  fetch("https://api.github.com/users/ryanmoreir4")
    .then(async (res) => {
      if (!res.ok) {
        throw new Error(res.status);
      }
      let userData = await res.json();
      perfilImg.src = userData.avatar_url;
      perfilImg.alt = `${userData.name} Profile Picture`;
    })
    .catch((error) => {
      console.error("Erro ao buscar informações do usuário:", error);
    });

  //Puxar repositórios
  fetch("https://api.github.com/users/ryanmoreir4/repos")
    .then(async (res) => {
      if (!res.ok) {
        throw new Error(res.status);
      }
      let data = await res.json();
      data.forEach((item) => {
        let project = document.createElement("div");
        project.classList.add("card-content");

        project.innerHTML = `
          <p class="title-card">
            <a style="color: black" href="repo.html">
              <b>${item.name}</b>
            </a>
          </p>
          <p>${item.description || "Descrição não disponível."}</p>
          <div class="icon-card-repo">
            <img src="/assets/img/grande-estrela-favorita.png" alt="Star Icon" />
            <p>${item.stargazers_count}</p>
            <img src="/assets/img/sombra-de-usuario-masculino.png" alt="Fork Icon" />
            <p>${item.forks_count}</p>
          </div>`;
        repositorios.appendChild(project);
      });
    })
    .catch((error) => {
      console.error("Erro ao buscar informações:", error);
    });

  fetch("https://api.github.com/users/ryanmoreir4/following")
    .then(async (res) => {
      if (!res.ok) {
        throw new Error(res.status);
      }
      let collabsData = await res.json();
      colegasTrabalho.innerHTML = "<h2>Colegas de Trabalho</h2>";
      collabsData.forEach((collab) => {
        let colega = document.createElement("figure");
        colega.classList.add("perfil-colega");

        colega.innerHTML = `
            <a style="color: black" href="https://github.com/${collab.login}">
            <img src="${collab.avatar_url}" alt="${collab.login}" />
            <figcaption>${collab.login}</figcaption></a
            >`;
        colegasTrabalho.appendChild(colega);
      });
    })
    .catch((error) => {
      console.error("Erro ao buscar colaboradores do repositório:", error);
    });
}

getApiGitHub();
