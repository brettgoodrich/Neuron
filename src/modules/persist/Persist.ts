import NeuronGSM from '@neurongsm/core';

export enum StorageTypes {
    SESSION = "session",
    LOCAL = 'local'
}

export interface ModuleProps{
    persist?: StorageTypes.LOCAL | StorageTypes.SESSION | boolean;
}

const moduleName = `@neurongsm/persist`;//need a unique id that is passed by store

const saveStateToStorage = (payload: NeuronGSM.Payload<string, any>) => {
    const isEnabled = ((payload?.features as any)?.persist);
    if(isEnabled){
        const storageKey = `${moduleName}/${payload.key}`;
        const storageType = ((payload?.features as any)?.persist === StorageTypes.SESSION) ? StorageTypes.SESSION : StorageTypes.LOCAL;
        const stateToCache = JSON.stringify(payload.nextState);
        if(storageType === StorageTypes.LOCAL){
            if(localStorage){
                localStorage.setItem(storageKey, stateToCache);
            }
        }
        else if(storageType === StorageTypes.SESSION){
            if(sessionStorage){
                sessionStorage.setItem(storageKey, stateToCache);
            }
        }
    }
}

const getStateFromStorage = (payload: NeuronGSM.Payload<string, any>) => {
    const isEnabled = ((payload?.features as any)?.persist);
    if(isEnabled){
        const storageKey = `${moduleName}/${payload.key}`;
        const storageType = ((payload?.features as any)?.persist === StorageTypes.SESSION) ? StorageTypes.SESSION : StorageTypes.LOCAL;
        if(storageType === StorageTypes.LOCAL){
            if(localStorage){
                const cachedValue = localStorage.getItem(storageKey);
                if (cachedValue !== null) {
                    const parsedCachedValue = JSON.parse(cachedValue);
                    return parsedCachedValue;
                }
                return cachedValue;
            }
        }
        else if(storageType === StorageTypes.SESSION){
            if(sessionStorage){
                const cachedValue = sessionStorage.getItem(storageKey);
                if (cachedValue !== null) {
                    const parsedCachedValue = JSON.parse(cachedValue);
                    return parsedCachedValue;
                }
                return cachedValue;
            }
        }
    }
}

const Persist = NeuronGSM.Module({
    name: moduleName,
    onLoad: (payload) => {
        const cachedState = getStateFromStorage(payload);
        if(cachedState !== null && cachedState !== undefined){
            payload.setNextState(cachedState);
        }
    },
    onCallback: (payload) => {
        saveStateToStorage(payload);
    }
});
export default Persist;