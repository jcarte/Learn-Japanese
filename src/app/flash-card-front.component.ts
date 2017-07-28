import { Component, OnInit, Input } from '@angular/core';
import { Keyword } from './keyword';


@Component({
    selector: 'flash-card-front',
    template: `
    {{keyword.keywordId}} - {{keyword.english}}
    `,
    styles: [``]
})
export class FlashCardFront {
    @Input() keyword: Keyword;
}