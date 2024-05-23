import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import $ from 'jquery';
import 'datatables.net';

// Attach jQuery to the global window object
(window as any).$ = $;
(window as any).jQuery = $;


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
