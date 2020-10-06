const { spawn } = require("child_process");

let haro;

function spawnHaro() {
    haro = spawn("node", ["./haro.js"], { stdio: ["inherit", "inherit", "inherit", "ipc"] });
    haro.on("close", (code) => {
        console.log(`child process exited with code ${code}`);
        if (code === null ) {
            console.log(`Haro closed with ${code}`);
            return;
        } else if (code !== 0) {
            console.error(`Haro has crashed with code ${code}, rebooting.`);
            spawnHaro();
        }
    });
}

spawnHaro();