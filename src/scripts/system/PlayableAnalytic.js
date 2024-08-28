import axios from 'axios';

class PlayableAnalytic {
  constructor(baseUrl, adNetwork) {
    if (PlayableAnalytic.instance) {
      return PlayableAnalytic.instance;
    }

    this.baseUrl = baseUrl;
    this.adNetwork = adNetwork;
    this.sessionId = this.getSessionId();
    this.startTime = Date.now();  // Record the start time of the session

    // Automatically track session start
    this.trackSessionStart();

    // Set up event listener for session end
    window.addEventListener('beforeunload', () => this.trackSessionEnd());

    PlayableAnalytic.instance = this;
  }

  static getInstance(baseUrl, adNetwork) {
    if (!PlayableAnalytic.instance) {
      PlayableAnalytic.instance = new PlayableAnalytic(baseUrl, adNetwork);
    }

    return PlayableAnalytic.instance;
  }

  getSessionId() {
    let sessionId = sessionStorage.getItem('session_id');
    if (!sessionId) {
      sessionId = this.generateSessionId();
      sessionStorage.setItem('session_id', sessionId);
    }
    return sessionId;
  }

  generateSessionId() {
    return 'xxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0,
        v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  sendEvent(eventName, eventData) {
    const data = {
      sessionId: this.sessionId,
      adNetwork: this.adNetwork,
      eventName: eventName,
      eventData: eventData ? JSON.stringify(eventData) : null,
      timestamp: Date.now()
    };

    return axios.post(`${this.baseUrl}/api/analytics/track-event`, data)
      .then(response => console.log(`Event ${eventName} tracked:`, response.data))
      .catch(error => console.error(`Error tracking ${eventName} event:`, error));
  }


  trackSessionStart() {
    this.sendEvent('session_start', { startTime: new Date(this.startTime).toISOString() });
  }

  trackSessionEnd() {
    const endTime = Date.now();
    const playtime = (endTime - this.startTime) / 1000;  // Calculate playtime in seconds

    this.sendEvent('session_end', {
      endTime: new Date(endTime).toISOString(),
      playtime: playtime  // Include playtime in the session end event
    });
  }

  newDesignEvent(eventData) {
    this.sendEvent('design_event', eventData);
  }

  newBusinessEvent(eventData) {
    this.sendEvent('business_event', eventData);
  }
}

export default PlayableAnalytic;
