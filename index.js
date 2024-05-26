import express from 'express';
import path from 'path';

const host = '0.0.0.0';
const porta = 3000;

let listaEmpresas = [];

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), 'publico')));

app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Cadastro de Empresa</title>
        <link rel="stylesheet" href="cadastro.css">
    </head>
    <body>
        <h1>Cadastro de Empresas</h1>
        <form method="POST" action="/cadastro">
            <div>
                <label for="cnpj">CNPJ:</label>
                <input type="text" id="cnpj" name="cnpj" required>
            </div>
            <div>
                <label for="razao_social">Razão Social:</label>
                <input type="text" id="razao_social" name="razao_social" required>
            </div>
            <div>
                <label for="nome_empresa">Nome da Empresa:</label>
                <input type="text" id="nome_empresa" name="nome_empresa" required>
            </div>
            <div>
                <label for="endereco">Endereço:</label>
                <input type="text" id="endereco" name="endereco" required>
            </div>
            <div>
                <label for="cidade">Cidade:</label>
                <input type="text" id="cidade" name="cidade" required>
            </div>
            <div>
                <label for="uf">UF:</label>
                <input type="text" id="uf" name="uf" required>
            </div>
            <div>
                <label for="cep">CEP:</label>
                <input type="text" id="cep" name="cep" required>
            </div>
            <div>
                <label for="email">Email:</label>
                <input type="text" id="email" name="email" required>
            </div>
            <div>
                <label for="telefone">Telefone:</label>
                <input type="text" id="telefone" name="telefone" required>
            </div>
            <button type="submit">Cadastrar</button>
        </form>
        <h2>Empresas Cadastradas</h2>
        <ul>
            ${listaEmpresas.map(empresa => `<li>${empresa.razao_social} (${empresa.nome_empresa})</li>`).join('')}
        </ul>
    </body>
    </html>
    `);
});

app.post('/cadastro', (req, res) => {
    const { cnpj, razao_social, nome_empresa, endereco, cidade, uf, cep, email, telefone } = req.body;

    let erros = {};
    if (!cnpj) erros.cnpj = 'CNPJ é obrigatório.';
    if (!razao_social) erros.razao_social = 'Razão Social é obrigatória.';
    if (!nome_empresa) erros.nome_empresa = 'Nome Fantasia é obrigatório.';
    if (!endereco) erros.endereco = 'Endereço é obrigatório.';
    if (!cidade) erros.cidade = 'Cidade é obrigatória.';
    if (!uf) erros.uf = 'UF é obrigatório.';
    if (!cep) erros.cep = 'CEP é obrigatório.';
    if (!email) erros.email = 'Email é obrigatório.';
    if (!telefone) erros.telefone = 'Telefone é obrigatório.';

    if (Object.keys(erros).length === 0) {
        listaEmpresas.push({ cnpj, razao_social, nome_empresa, endereco, cidade, uf, cep, email, telefone });
        res.redirect('/');
    } else {
        res.send(`
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Cadastro de Empresa</title>
            <link rel="stylesheet" href="cadastro.css">
        </head>
        <body>
            <h1>Cadastro de Empresas</h1>
            <form method="POST" action="/cadastro">
                <div>
                    <label for="cnpj">CNPJ:</label>
                    <input type="text" id="cnpj" name="cnpj" required>
                    ${erros.cnpj ? `<div class="alert">${erros.cnpj}</div>` : ''}
                </div>
                <div>
                    <label for="razao_social">Razão Social:</label>
                    <input type="text" id="razao_social" name="razao_social" required>
                    ${erros.razao_social ? `<div class="alert">${erros.razao_social}</div>` : ''}
                </div>
                <div>
                    <label for="nome_empresa">Nome da Empresa:</label>
                    <input type="text" id="nome_empresa" name="nome_empresa" required>
                    ${erros.nome_empresa ? `<div class="alert">${erros.nome_empresa}</div>` : ''}
                </div>
                <div>
                    <label for="endereco">Endereço:</label>
                    <input type="text" id="endereco" name="endereco" required>
                    ${erros.endereco ? `<div class="alert">${erros.endereco}</div>` : ''}
                </div>
                <div>
                    <label for="cidade">Cidade:</label>
                    <input type="text" id="cidade" name="cidade" required>
                    ${erros.cidade ? `<div class="alert">${erros.cidade}</div>` : ''}
                </div>
                <div>
                    <label for="uf">UF:</label>
                    <input type="text" id="uf" name="uf" required>
                    ${erros.uf ? `<div class="alert">${erros.uf}</div>` : ''}
                </div>
                <div>
                    <label for="cep">CEP:</label>
                    <input type="text" id="cep" name="cep" required>
                    ${erros.cep ? `<div class="alert">${erros.cep}</div>` : ''}
                </div>
                <div>
                    <label for="email">Email:</label>
                    <input type="text" id="email" name="email" required>
                    ${erros.email ? `<div class="alert">${erros.email}</div>` : ''}
                </div>
                <div>
                    <label for="telefone">Telefone:</label>
                    <input type="text" id="telefone" name="telefone" required>
                    ${erros.telefone ? `<div class="alert">${erros.telefone}</div>` : ''}
                </div>
                <button type="submit">Cadastrar</button>
            </form>
            <h2>Empresas Cadastradas</h2>
            <ul>
                ${listaEmpresas.map(empresa => `<li>${empresa.razao_social} (${empresa.nome_empresa})</li>`).join('')}
            </ul>
        </body>
        </html>
        `);
    }
});

app.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}`);
});
