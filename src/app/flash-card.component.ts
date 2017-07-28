import { Component, OnInit, Input } from '@angular/core';
import { Keyword } from './keyword';


@Component({
    selector: 'flash-card',
    template: ` THIS IS A FLASH CARD
    // {{keyword.keywordId}} {{keyword.chapterId}} {{keyword.english}} {{keyword.hiragana}} {{keyword.romaji}} {{keyword.kanji}}
    `,
    styles: [``]
})
export class FlashCard {
    @Input() keyword: Keyword;
}