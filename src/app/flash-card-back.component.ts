import { Component, OnInit, Input } from '@angular/core';
import { Keyword } from './keyword';

//{{keyword.keywordId}} {{keyword.chapterId}}
@Component({
    selector: 'flash-card-back',
    template: `
    <div class="panel panel-default">
        <div class="panel-body">
            <div id="main" class="col-xs-12">
                <div class="col-xs-6 text-center box" *ngIf="keyword.english !=''">
                    <h6>English</h6>
                    <h2>{{keyword.english}}</h2>
                </div>    
                <div class="col-xs-6 text-center box" *ngIf="keyword.hiragana !=''">
                    <h6>Hiragana</h6>
                    <h2>{{keyword.hiragana}}</h2>
                </div>    
                <div class="col-xs-6 text-center box" *ngIf="keyword.romaji !=''">
                    <h6>Romaji</h6>
                    <h2>{{keyword.romaji}}</h2>
                </div>    
                <div class="col-xs-6 text-center box" *ngIf="keyword.kanji !=''">
                    <h6>Kanji</h6>
                    <h2>{{keyword.kanji}}</h2>
                </div>    
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
.box{
    margin-bottom:25px;
}

    `]
})
export class FlashCardBack {
    @Input() keyword: Keyword;
}