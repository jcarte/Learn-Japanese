import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { DataService } from './data.service';
import { Keyword } from './keyword';
import { Chapter } from './chapter';
import { FlashCard } from './flash-card.component';


import 'rxjs/add/operator/switchMap';//??????

@Component({
    selector: 'practise',
    template: ` 
    <button (click)="previous()">Previous</button>
    <div #cardholder></div>
    <button (click)="next()">Next</button> 
    
    <div *ngIf="keywords">
        {{cardIndex+1}} / {{keywords.length}}
    </div>
    `,
    styles: ['']
})

// <li *ngFor="let keyword of keywords">
//   {{keyword.keywordId}} {{keyword.chapterId}} {{keyword.english}} {{keyword.hiragana}} {{keyword.romaji}} {{keyword.kanji}}
// </li>

export class PractiseComponent implements OnInit {
    ngOnInit(): void {
        this.route.paramMap.switchMap((params: ParamMap) =>
            this.dataService.getChapter(+params.get('chapterId'))).subscribe(chapter =>
                this.dataService.getKeywords(chapter.chapterId).then(keywords => {
                    this.keywords = keywords;
                    this.next();
                }));

              
    }

    //https://blog.thecodecampus.de/angular-2-dynamically-render-components/
    @ViewChild('cardholder', { read: ViewContainerRef })
    cardHolder: ViewContainerRef;

    cardIndex: number;

    component: any;

    constructor(
        private dataService: DataService,
        private route: ActivatedRoute,
        private location: Location,
        private componentFactoryResolver: ComponentFactoryResolver) {
            
    }

    next(): void {
        if (this.cardIndex == null)
            this.cardIndex = 0
        else if (this.cardIndex < this.keywords.length - 1)
            this.cardIndex++;

        this.load();//want to load same again?
    }

    previous(): void {
        if (this.cardIndex == null)
            this.cardIndex = 0
        else if (this.cardIndex > 0)
            this.cardIndex--;

        this.load();//want to load same again?
    }

    load(): void {
        if(this.keywords.length == 0)
            return;

        let childComponent = this.componentFactoryResolver.resolveComponentFactory(FlashCard)
        let key: Keyword = this.keywords[this.cardIndex];

        //Needs to be in some kind of promise, better way?
        setTimeout(() => {
            if (this.component != null)
                this.component.destroy();
            this.component = this.cardHolder.createComponent(childComponent)
            this.component.instance.keyword = key;
        }, 0);
    }


    // goBack(): void {
    //     this.location.back();
    // }

    keywords: Keyword[];
}


//https://angular.io/guide/animations
//https://angular.io/guide/dynamic-component-loader