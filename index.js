import express from "express";

const host = "0.0.0.0"; // todas as interfaces de rede possam acessar a aplicação
const port = 3000; // aplicação identificada pelo numero 3000
const app = express();

var listajogadores = [];

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`
        <h1>Bem-vindo à aula</h1>
        `);
});

// diferentemente do metodo GET, que exiga a passagem de parâmetros por meio da URL
// iremos utilizar o método POST (adicionar um novo recurso ao servidor submetendo uma entidade -> qualquer recurso manipulavel)

// poder enviar dados d eum jogador usando formulário HTML

// espera por dados de um formulário HTML (GET oferece o formulário)
// a aplicação devera oferecer tal formulario HTML
app.get("/jogador", (req, res) => {
  // retornar uma pagina contendo um formulario HTML
  res.send(`
        <hmtl lang="pt-br">
            <head>
                <meta charset="utf-8">
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">

            </head>

            <body>
                <div class="container mt-5">
                    <form method="POST" action="/jogador" class="row gy-2 gx-3 align-items-center border rounded b-5 p-3">
                      <legend class="col-form-label col-sm-2 pt-0">Cadastro de Jogador</legend>
                        <div class="row">
                            <label class="colFormLabel" for="apelido">Nickname</label>
                            <input type="text" class="form-control" id="apelido" name="apelido">
                        </div>
                        <label class="colFormLabel" for="apelido">Nível do jogador</label>
                        <select class="form-select mb-3" aria-label="Seleção de experiência do jogador" id="nivel" name="nivel">
                          <option selected>Selecione o nível do jogador</option>
                          <option value="1">Iniciante</option>
                          <option value="2">Experiente</option>
                          <option value="3">Lenda</option>
                        </select>

  <div class="row">
    <button type="submit" class="btn btn-primary">Cadastrar jogador</button>
  </div>

</form>
                </div>
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
        </html>
        `);
});

app.post("/jogador", (req, res) => {
  // Deve adicionar um novo jogador, criando um novo estado da aplicação.
  const apelido = req.body.apelido;
  const nivel = req.body.nivel;
  listajogadores.push({
    apelido: apelido,
    nivel: nivel,
  });

  res.redirect("/listaJogadores");
});

app.get("/listaJogadores", (req, res) => {
  res.write(`<hmtl lang="pt-br">
            <head>
                <meta charset="utf-8">
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">

            </head>

            <body>
                <div class="container mt-5">
                
                <table class="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th scope= "col">Id</th>
                      <th scope= "col">Apelido</th>
                      <th scope= "col">Nível</th>
                  </thead>
                  <tbody>
            `);

  for (let i = 0; i < listajogadores.length; i++) {
    const jogador = listaJogadores[i];
    resposta.write(`
      <tr>
        <td>${i + 1}</td>
        <td>${jogador.apelido}</td>
        <td>${jogador.nivel}</td>
      </tr>
      `);
  }

  res.write(`</tbody>
    </table>
    <a href="/jogador" class="btn btn-primary">Continuar cadastrando...</a>
    </div>
    </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
        </html>`);
  res.end();
});

app.listen(port, host, () => {
  console.log(`Servidor rodando em http://${host}:${port}`);
});
