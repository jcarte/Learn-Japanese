import { Component, OnInit, Input } from '@angular/core';
import { Keyword } from './keyword';


@Component({
    selector: 'flash-card-front',
    template: `
    <div class="panel panel-default text-center" #main>
        <div class="panel-body">
            <div id="main" class="col-xs-12">
                <h6>{{label}}</h6>
                <h1>{{value}}</h1>
            </div>
        </div>
    </div>
    

    `,
    styles: [`
        #main{
            padding:0px;
            margin: 0;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    `]
})
export class FlashCardFront implements OnInit {
    ngOnInit(): void {
        let words: WordType[] = new Array<WordType>();

        if (this.keyword.english != '')
            words.push(WordType.English);
        if (this.keyword.hiragana != '')
            words.push(WordType.Hiragana);
        if (this.keyword.kanji != '')
            words.push(WordType.Kanji);
        if (this.keyword.romaji != '')
            words.push(WordType.Romaji);

        let index = words[Math.round(Math.random() *( words.length - 1))];
        switch (index) {
            case WordType.English:
                this.label = 'English';
                this.value = this.keyword.english
                break;
            case WordType.Hiragana:
                this.label = 'Hiragana';
                this.value = this.keyword.hiragana
                break;
            case WordType.Kanji:
                this.label = 'Kanji';
                this.value = this.keyword.kanji
                break;
            case WordType.Romaji:
                this.label = 'Romaji';
                this.value = this.keyword.romaji
                break;

            default:
                this.label = 'ERROR';
                this.value = 'ERROR'
                break;
        }


    }
    @Input() keyword: Keyword;
    label: string;
    value: string;

}
enum WordType {
    English, Hiragana, Kanji, Romaji
}