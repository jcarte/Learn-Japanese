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
    <div class="col-xs-12 col-sm-offset-2 col-sm-8">
        <div class="col-xs-12 text-center" id="header">
            <div class="text-left" id="menu-button">
                <a (click)="goBack()" class="btn btn-link btn-xs">Menu</a> 
            </div>    
            <div class="text-center">
                <a (click)="flipCard()" class="btn btn-info btn-xs">Turn Over</a> 
            </div>
        
        </div>

        <div class="col-xs-12">
            <div class="col-xs-12" #cardholder id="card"></div>
        </div> 
        
        <div #footer class="col-xs-12 text-left">
            <div class="col-xs-4 text-left" id="previous">
                <i class="fa fa-chevron-left fa-2x" aria-hidden="true" (click)="previous()" [ngClass]="{ 'hidden': !showPrevious || showingFront}"></i>
            </div>
            <div class="col-xs-4 text-center">
                <div *ngIf="keywords">
                    {{cardIndex+1}} / {{keywords.length}}
                </div>
            </div>
            <div class="col-xs-4 text-right" id="next">
                <i class="fa fa-chevron-right fa-2x" aria-hidden="true" (click)="next()" [ngClass]="{ 'hidden': !showNext  || showingFront}"></i>
            </div>    
        </div>
    </div>

    
    `,
    styles: [`
    #card {
        min-height: 300px;
        display: inline-block;
        vertical-align: middle;
    }
    #next #previous{
        
    }

    #menu-button{
        position:absolute;
    }

    #header{
        margin-bottom: 25px;
    }
    `]
})

// <li *ngFor="let keyword of keywords">
//   {{keyword.keywordId}} {{keyword.chapterId}} {{keyword.english}} {{keyword.hiragana}} {{keyword.romaji}} {{keyword.kanji}}
// </li>

export class PractiseComponent implements OnInit {
    ngOnInit(): void {

        this.route.paramMap
            .switchMap((params: ParamMap) => this.dataService.getKeywords(+params.get('chapterId')))
            .subscribe(keys => {
                this.keywords = keys;

                this.cardIndex = 0;
                this.loadFront();

                if (keys.length > 1)
                    this.showNext = true;
            });
    }



    //https://blog.thecodecampus.de/angular-2-dynamically-render-components/
    @ViewChild('cardholder', { read: ViewContainerRef })
    cardHolder: ViewContainerRef;

    cardIndex: number;

    component: any;

    showingFront: boolean;

    showNext: boolean = false;
    showPrevious: boolean = false;

    constructor(
        private dataService: DataService,
        private route: ActivatedRoute,
        private location: Location,
        private componentFactoryResolver: ComponentFactoryResolver) {

    }

    next(): void {

        if (this.cardIndex == this.keywords.length - 1) {//reached max
            return;
        }
        this.cardIndex++;
        if (this.cardIndex == this.keywords.length - 1) {//reached max
            this.showNext = false;
        }
        this.showPrevious = true;

        this.loadFront();//want to load same again?
    }

    previous(): void {
        if (this.cardIndex == 0) {//reached max
            return;
        }
        this.cardIndex--;
        if (this.cardIndex == 0) {//reached max
            this.showPrevious = false;
        }

        this.showNext = true;

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