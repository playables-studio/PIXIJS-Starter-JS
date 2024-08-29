class SessionHelper {
    private static instance: SessionHelper | null = null;
    private sessionId: string;

    private constructor() {
        this.sessionId = this.getSessionId();
    }

    public static getInstance(): SessionHelper {
        if (!SessionHelper.instance) {
            SessionHelper.instance = new SessionHelper();
        }
        return SessionHelper.instance;
    }

    public getSessionId(): string {
        if (!this.sessionId) {
            let sessionId = sessionStorage.getItem('session_id');
            if (!sessionId) {
                sessionId = this.generateSessionId();
                sessionStorage.setItem('session_id', sessionId);
            }
            this.sessionId = sessionId;
        }
        return this.sessionId;
    }

    private generateSessionId(): string {
        return 'xxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = Math.random() * 16 | 0,
                v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}
export default SessionHelper;
