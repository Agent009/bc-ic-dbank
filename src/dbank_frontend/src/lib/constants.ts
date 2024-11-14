// Environment
const network = process.env.DFX_NETWORK || "local";
const local = network === "local" || network !== "ic";
const ic = !local;
// CWA
const replicaPort = 4943;
const host = local ? `http://127.0.0.1:${replicaPort}` : 'https://icp-api.io';

// Constants
export const constants = Object.freeze({
    // Environment
    env: {
        local,
        ic,
    },
    // CWA
    cwa: {
        host: host,
    },
    // Canisters
    canisters: {
        backend: {
            id: process.env.CANISTER_ID_DBANK_BACKEND || process.env.CANISTER_ID,
        },
        frontend: {
            id: process.env.CANISTER_ID_DBANK_FRONTEND,
        },
    },
});