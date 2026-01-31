// Storage Service - LocalStorage wrapper

class StorageService {
    constructor() {
        this.prefix = 'scamshield_';
    }

    set(key, value) {
        try {
            const serialized = JSON.stringify(value);
            localStorage.setItem(this.prefix + key, serialized);
            return true;
        } catch (error) {
            console.error('Storage set error:', error);
            return false;
        }
    }

    get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(this.prefix + key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error('Storage get error:', error);
            return defaultValue;
        }
    }

    remove(key) {
        try {
            localStorage.removeItem(this.prefix + key);
            return true;
        } catch (error) {
            console.error('Storage remove error:', error);
            return false;
        }
    }

    clear() {
        try {
            Object.keys(localStorage)
                .filter(key => key.startsWith(this.prefix))
                .forEach(key => localStorage.removeItem(key));
            return true;
        } catch (error) {
            console.error('Storage clear error:', error);
            return false;
        }
    }

    // Session storage methods
    sessionSet(key, value) {
        try {
            const serialized = JSON.stringify(value);
            sessionStorage.setItem(this.prefix + key, serialized);
            return true;
        } catch (error) {
            console.error('Session storage set error:', error);
            return false;
        }
    }

    sessionGet(key, defaultValue = null) {
        try {
            const item = sessionStorage.getItem(this.prefix + key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error('Session storage get error:', error);
            return defaultValue;
        }
    }
}

window.storageService = new StorageService();
