import '@angular/compiler';
import { Component, provideZonelessChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { renderApplication, provideServerRendering } from '@angular/platform-server';
import PQueue from 'p-queue';

class App {
  result = 'pending';

  constructor() {
    // p-queue 10 extends node's `EventTarget` and calls `this.dispatchEvent(new CustomEvent(...))`.
    // Once Angular's server platform has installed domino's globals, `CustomEvent` is domino's
    // implementation, which node's `EventTarget#dispatchEvent` rejects.
    const queue = new PQueue({ concurrency: 1 });
    queue.add(() => 1);
    this.result = 'ok';
  }
}

Component({ selector: 'app-root', template: `<p>{{ result }}</p>` })(App);

const html = await renderApplication(
  (context) =>
    bootstrapApplication(
      App,
      { providers: [provideZonelessChangeDetection(), provideServerRendering()] },
      context,
    ),
  { document: '<html><body><app-root></app-root></body></html>' },
);
console.log(html);