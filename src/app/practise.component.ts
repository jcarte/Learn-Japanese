import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { DataService } from './data.service';
import { Keyword } from './keyword';
import { Chapter } from './chapter';
import { FlashCardFront } from './flash-card-front.component';
import { FlashCardBack } from './flash-card-back.component';


import 'rxjs/add/operator/switchMap';//??????

@Component({
    selector: 'practise',
    template: ` 
    <button (click)="previous()">Previous</button>
    <div #cardholder></div>
    <button (click)="next()">Next</button> 

    <br>

    <button (click)="goBack()">Menu</button> 

    <button (click)="flipCard()">Turn Over</button> 

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

    showingFront: boolean;

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

        this.loadFront();//want to load same again?
    }

    previous(): void {
        if (this.cardIndex == null)
            this.cardIndex = 0
        else if (this.cardIndex > 0)
            this.cardIndex--;

        this.loadFront();//want to load same again?
    }


    flipCard(): void {
        if (this.showingFront)
            this.loadBack();
        else
            this.loadFront();
    }

    loadFront(): void {
        if (this.keywords.length == 0)
            return;

        let childComponent = this.componentFactoryResolver.resolveComponentFactory(FlashCardFront)
        let key: Keyword = this.keywords[this.cardIndex];

        //Needs to be in some kind of promise, better way?
        setTimeout(() => {
            if (this.component != null)
                this.component.destroy();
            this.component = this.cardHolder.createComponent(childComponent)
            this.component.instance.keyword = key;
        }, 0);

        this.showingFront = true;
    }

    //TODO duplication, refactor
    loadBack(): void {
        if (this.keywords.length == 0)
            return;

        let childComponent = this.componentFactoryResolver.resolveComponentFactory(FlashCardBack)
        let key: Keyword = this.keywords[this.cardIndex];

        setTimeout(() => {
            if (this.component != null)
                this.component.destroy();
            this.component = this.cardHolder.createComponent(childComponent)
            this.component.instance.keyword = key;
        }, 0);

        this.showingFront = false;
    }


    goBack(): void {
        this.location.back();
    }

    keywords: Keyword[];
}


//https://angular.io/guide/animations
//https://angular.io/guide/dynamic-component-loader