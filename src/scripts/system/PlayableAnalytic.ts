import axios, { AxiosResponse } from 'axios';

interface EventData {
  [key: string]: any;
}

class PlayableAnalytic {
  private static instance: PlayableAnalytic;
  private baseUrl: string;
  private adNetwork: string;
  private sessionId: string;
  private startTime: number;

  private constructor(baseUrl: string, adNetwork: string) {
    this.baseUrl = baseUrl;
    this.adNetwork = adNetwork;
    this.sessionId = this.getSessionId();
    this.startTime = Date.now(); 

    this.trackSessionStart();

    window.addEventListener('beforeunload', () => this.trackSessionEnd());
  }

  public static getInstance(baseUrl: string, adNetwork: string): PlayableAnalytic {
    if (!PlayableAnalytic.instance) {
      PlayableAnalytic.instance = new PlayableAnalytic(baseUrl, adNetwork);
    }

    return PlayableAnalytic.instance;
  }

  private getSessionId(): string {
    let sessionId = sessionStorage.getItem('session_id');
    if (!sessionId) {
      sessionId = this.generateSessionId();
      sessionStorage.setItem('session_id', sessionId);
    }
    return sessionId;
  }

  private generateSessionId(): string {
    return 'xxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0,
        v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  private sendEvent(eventName: string, eventData?: EventData): Promise<void> {
    const data = {
      sessionId: this.sessionId,
      adNetwork: this.adNetwork,
      eventName: eventName,
      eventData: eventData ? JSON.stringify(eventData) : null,
      timestamp: Date.now()
    };

    return axios.post(`${this.baseUrl}/api/analytics/track-event`, data)
      .then((response: AxiosResponse) => console.log(`Event ${eventName} tracked:`, response.data))
      .catch((error: Error) => console.error(`Error tracking ${eventName} event:`, error));
  }

  private trackSessionStart(): void {
    this.sendEvent('session_start', { startTime: new Date(this.startTime).toISOString() });
  }

  private trackSessionEnd(): void {
    const endTime = Date.now();
    const playtime = (endTime - this.startTime) / 1000;  // Calculate playtime in seconds

    this.sendEvent('session_end', {
      endTime: new Date(endTime).toISOString(),
      playtime: playtime  // Include playtime in the session end event
    });
  }

  public newDesignEvent(eventData: EventData): void {
    this.sendEvent('design_event', eventData);
  }

  public newBusinessEvent(eventData: EventData): void {
    this.sendEvent('business_event', eventData);
  }
}

export default PlayableAnalytic;
