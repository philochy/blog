import * as envConfig from 'virtual:config-loader';
interface TrackItem {
  url: string;
  type: string;
}

interface TrackerOptions {
  tracks: TrackItem[];
  requestUrl: string;
  dynamicDbConnectName: string;
  throttleDelay?: number;
}

interface SendOptions {
  pathPage: string;
  type: string;
  from: string;
  DynamicDbConnectName: string;
  [key: string]: string;
}

export class ElementTracker {
  private tracks: TrackItem[];
  private requestUrl: string;
  private dynamicDbConnectName: string;
  private throttleDelay: number;
  private lastThrottleTime: number;
  private throttleTimer: number | null;

  constructor(options: TrackerOptions) {
    this.tracks = options.tracks;
    this.requestUrl = options.requestUrl;
    this.dynamicDbConnectName = options.dynamicDbConnectName;
    this.throttleDelay = options.throttleDelay || 300;
    this.lastThrottleTime = 0;
    this.throttleTimer = null;
    this.init();
  }

  private init(): void {
    document.addEventListener('DOMContentLoaded', () => {
      this.setupMutationObserver();
      this.addExistingElementListeners();
    });
  }

  private setupMutationObserver(): void {
    const observer = new MutationObserver((mutations: MutationRecord[]) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              this.addListenerToElement(node as Element);
              (node as Element)
                .querySelectorAll('a')
                .forEach((el) => this.addListenerToElement(el));
            }
          });
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  private addExistingElementListeners(): void {
    document
      .querySelectorAll('a')
      .forEach((el) => this.addListenerToElement(el));
  }

  private addListenerToElement(element: Element): void {
    if (this.shouldTrackElement(element)) {
      element.addEventListener('click', (e) => this.handleClick(e));
    }
  }

  private shouldTrackElement(element: Element): boolean {
    return (
      element.tagName === 'A' &&
      this.tracks.some(
        (track) =>
          (element as HTMLAnchorElement).href &&
          (element as HTMLAnchorElement).href.startsWith(track.url)
      )
    );
  }

  private handleClick(event: Event): void {
    const target = event.currentTarget as HTMLAnchorElement;
    const track = this.tracks.find((item) => target.href.startsWith(item.url));

    if (track) {
      let href: string;
      const url = new URL(target.href);
      href = target.href;

      if (href.includes('whatsapp')) {
        href = url.searchParams.get('phone') || '';
      }

      this.throttledSend({
        pathPage: window.location.href,
        type: track.type,
        from: href,
        DynamicDbConnectName: this.dynamicDbConnectName,
      });
    }
  }

  private throttledSend(options: SendOptions): void {
    const now = Date.now();

    if (now - this.lastThrottleTime >= this.throttleDelay) {
      this.send(options);
      this.lastThrottleTime = now;
    } else {
      if (this.throttleTimer === null) {
        const remainingTime =
          this.throttleDelay - (now - this.lastThrottleTime);

        this.throttleTimer = window.setTimeout(() => {
          this.send(options);
          this.lastThrottleTime = Date.now();
          this.throttleTimer = null;
        }, remainingTime);
      }
    }
  }

  private send(options: SendOptions): void {
    const xhr = new XMLHttpRequest();
    const url = new URL(this.requestUrl);

    Object.keys(options).forEach((key) => {
      url.searchParams.append(key, options[key]);
    });

    xhr.open('GET', url.toString());
    xhr.send();
  }
}
const {
  reporting: { REQUEST_URL },
  database: { DB_NAME },
} = envConfig;
new ElementTracker({
  tracks: [
    { url: 'mailto:', type: 'email' },
    { url: 'https://web.whatsapp.com', type: 'whatsapp' },
    { url: 'https://api.whatsapp.com', type: 'whatsapp' },
    { url: 'skype:', type: 'skype' },
  ],
  requestUrl: REQUEST_URL,
  dynamicDbConnectName: DB_NAME,
  throttleDelay: 3000,
});
