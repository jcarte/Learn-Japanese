import { Component, OnInit, Input } from '@angular/core';
import { Keyword } from './keyword';


@Component({
    selector: 'flash-card-back',
    template: `
    {{keyword.keywordId}} {{keyword.chapterId}} {{keyword.english}} {{keyword.hiragana}} {{keyword.romaji}} {{keyword.kanji}}
    `,
    styles: [``]
})
export class FlashCardBack {
    @Input() keyword: Keyword;
}