import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class SeoService {
constructor(@Inject(DOCUMENT) private doc) { }
createLinkForCanonicalURL(URL) {
const link: HTMLLinkElement = this.doc.createElement('link');
link.setAttribute('rel', 'canonical');
this.doc.head.appendChild(link);
link.setAttribute('href', URL);
}
}
