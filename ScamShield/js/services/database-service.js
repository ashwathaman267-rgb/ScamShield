// Database Service - Firestore Integration

class DatabaseService {
    constructor() {
        this.db = null;
        this.initDB();
    }

    async initDB() {
        // Wait for Firebase to initialize
        const checkFirebase = setInterval(() => {
            if (window.db) {
                this.db = window.db;
                clearInterval(checkFirebase);
                console.log('Database service ready');
            }
        }, 100);
    }

    async saveScan(scanData) {
        if (!this.db) {
            console.warn('Database not initialized');
            return null;
        }

        try {
            const { collection, addDoc, serverTimestamp } = await import(
                'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js'
            );

            const docRef = await addDoc(collection(this.db, 'scans'), {
                ...scanData,
                timestamp: serverTimestamp()
            });

            return docRef.id;
        } catch (error) {
            console.error('Error saving scan:', error);
            return null;
        }
    }

    async getRecentScans(limit = 10) {
        if (!this.db) return [];

        try {
            const { collection, query, orderBy, getDocs, limit: firestoreLimit } = await import(
                'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js'
            );

            const q = query(
                collection(this.db, 'scans'),
                orderBy('timestamp', 'desc'),
                firestoreLimit(limit)
            );

            const querySnapshot = await getDocs(q);
            const scans = [];

            querySnapshot.forEach((doc) => {
                scans.push({ id: doc.id, ...doc.data() });
            });

            return scans;
        } catch (error) {
            console.error('Error getting scans:', error);
            return [];
        }
    }

    async getScamDatabase(filter = 'all') {
        if (!this.db) return [];

        try {
            const { collection, query, where, getDocs } = await import(
                'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js'
            );

            let q = collection(this.db, 'scam_database');

            if (filter !== 'all') {
                q = query(q, where('type', '==', filter));
            }

            const querySnapshot = await getDocs(q);
            const scams = [];

            querySnapshot.forEach((doc) => {
                scams.push({ id: doc.id, ...doc.data() });
            });

            return scams;
        } catch (error) {
            console.error('Error getting scam database:', error);
            return [];
        }
    }
}

window.databaseService = new DatabaseService();
