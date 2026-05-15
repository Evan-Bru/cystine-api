import fs from "fs";
import { spawn } from "child_process";

// controle de mcps ativos
const runningProcesses = {};

// função que seleciona o mundo e o path correto
function startMCP(name, path) {

    // evita duplicar processo
    if (runningProcesses[name]) {
        console.log(`Mundo '${name}' já está rodando.`);
        return;
    }

    console.log(`Iniciando mundo: ${name}`);

    const processMCP = spawn(
        "npx.cmd",
        ["@modelcontextprotocol/server-filesystem", path],
        {
            stdio: "inherit",
            shell: true
        }
    );

    // registra processo
    runningProcesses[name] = processMCP;

    processMCP.on("close", (code) => {
        console.log(`Mundo ${name} encerrou com código ${code}`);
        delete runningProcesses[name];
    });

    processMCP.on("error", (err) => {
        console.log(`Erro no Mundo ${name}:`, err.message);
        delete runningProcesses[name];
    });
}

// lê o arquivo .JSON
const vaults = JSON.parse(fs.readFileSync("./vaults.json", "utf-8"));

// pega argumento do terminal
const args = process.argv.slice(2);

const command = args[0]; //start, list, etc
const target = args[1]; // remmant, lotm, all
 
// -------------------- START --------------------
if (command === "start"){

    if (target === "all") {
        console.log("Iniciando TODOS os mundos...\n");

        for (const [name, path] of Object.entries(vaults)) {
            startMCP(name, path);
        }

    } else{

    // busca o mundo
    const path = vaults[target];

    // caso erro
    if (!path) {
    console.log(`Mundo '${target}' não encontrado`);
    console.log("Disponíveis:", Object.keys(vaults));
    process.exit(0);
}
    

 // caso sucesso
 console.log(`Mundo selecionado: ${target}`);
 console.log(`Path: ${path}`);

    // iniciar mcp do mundo selecionado
    startMCP(target, path);

}
}

// -------------------- LIST --------------------
    if (command === "list") {
    console.log("Mundos disponíveis:\n");

    for (const name of Object.keys(vaults)) {
        console.log(`- ${name}`);
    }

    process.exit(0);
}

// -------------------- STOP --------------------
if (command === "stop") {

    if (!target) {
        console.log("Use: node test.js stop <world>");
        process.exit(0);
    }

    const proc = runningProcesses[target];

    if (!proc) {
        console.log(`Mundo '${target}' não está rodando.`);
        process.exit(0);
    }

    console.log(`Parando mundo: ${target}`);

    proc.kill("SIGTERM");

    delete runningProcesses[target];

    console.log(`Mundo '${target}' parado.`);

    process.exit(0);
}

// -------------------- STATUS --------------------
if (command === "status") {

    const running = Object.keys(runningProcesses);

    if (running.length === 0) {
        console.log("Nenhum mundo está rodando.");
        process.exit(0);
    }

    console.log("Mundos rodando:\n");

    for (const name of running) {
        console.log(`- ${name}`);
    }

    console.log(`\nTotal: ${running.length}`);

    process.exit(0);
}