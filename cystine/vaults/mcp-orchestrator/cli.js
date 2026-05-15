import fs from "fs";
import { spawn } from "child_process";
import readline from "readline";

const vaults = JSON.parse(fs.readFileSync("./vaults.json", "utf-8"));
const runningProcesses = {};

function startMCP(name, path) {

    if (runningProcesses[name]) {
        console.log(`Mundo '${name}' já está rodando.`);
        return;
    }

    console.log(`Iniciando mundo: ${name}`);

    const proc = spawn(
        "npx.cmd",
        ["@modelcontextprotocol/server-filesystem", path],
        {
            stdio: "pipe",
            shell: true,
        }
    );
    proc.unref();

    runningProcesses[name] = proc;

    proc.on("close", () => {
        console.log(`Mundo ${name} encerrou`);
        delete runningProcesses[name];
    });
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "mcp > "
});

function shutdown() {

    const running = Object.keys(runningProcesses);

    if (running.length > 0) {
        console.log("Encerrando todos os mundos...\n");

        for (const name of running) {
            try {
                runningProcesses[name].kill();
                console.log(`Parado: ${name}`);
            } catch (err) {
                console.log(`Erro ao parar ${name}:`, err.message);
            }

            delete runningProcesses[name];
        }
    }

    console.log("\nShutdown completo.");
    rl.close();
}

rl.prompt();

rl.on("line", (input) => {

    const args = input.trim().split(" ");
    const command = args[0];
    const target = args[1];

    // START
    if (command === "start") {

        if (target === "all") {
            console.log("Iniciando todos mundos...\n");

            for (const [name, path] of Object.entries(vaults)) {
                startMCP(name, path);
            }

        } else {
            const path = vaults[target];

            if (!path) {
                console.log("Mundo não encontrado");
            } else {
                startMCP(target, path);
            }
        }
    }
// STOP
 if (command === "stop") {

    const target = args[1];

    // ---------------- STOP ALL ----------------
    if (target === "all") {

        const names = Object.keys(runningProcesses);

        if (names.length === 0) {
            console.log("Nenhum mundo está rodando.");
            return;
        }

        console.log("Parando todos os mundos...\n");

        for (const name of names) {
            runningProcesses[name].kill();
            delete runningProcesses[name];
            console.log(`Parado: ${name}`);
        }

        console.log("\nTodos os mundos foram parados.");
        return;
    }

    // ---------------- STOP SINGLE ----------------
    const proc = runningProcesses[target];

    if (!proc) {
        console.log("Não está rodando");
        return;
    }

    proc.kill();
    delete runningProcesses[target];

    console.log("Parado:", target);
}
    // STATUS
    if (command === "status") {

        const list = Object.keys(runningProcesses);

        if (list.length === 0) {
            console.log("Nenhum mundo rodando");
        } else {
            console.log("Rodando:");
            list.forEach(m => console.log("- " + m));
        }
    }

    // LIST
    if (command === "list") {
        console.log(Object.keys(vaults));
    }

    rl.prompt();

    // EXIT
    if (command === "exit") {
    shutdown();
    return;
}
});



rl.on("close", () => {
    console.log("Encerrando CLI...");
    process.exit(0);
});