import { Injectable } from '@angular/core';

import {Chapter} from './chapter';
import {Keyword} from './keyword';

@Injectable()
export class DataService{
    getChapters(): Chapter[]{
        return CHAPTERS;
    }

    getChapter(chapterId:number): Chapter{
        return CHAPTERS.filter(chap=>chap.chapterId === chapterId)[0];
    }

    getKeywords(chapterId:number): Keyword[]{
        return KEYWORDS.filter(key=>key.chapterId === chapterId);
    }

}



// import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";

// https://github.com/angular/angularfire2/tree/master/docs
// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent implements OnInit{
//   ngOnInit(): void {
//     this.items = this.db.list('/Keywords', {
//       query: {
//         orderByChild: 'Chapter',
//         equalTo: 0
//       }
//   });
//   }
//   items: FirebaseListObservable<any[]>;
//   constructor(private db:AngularFireDatabase){
    
//   }
//   title = 'Learn Japanese';
// }


export const CHAPTERS: Chapter[] = [
    {chapterId: 0, description: 'Chapter 1'},
    {chapterId: 1, description: 'Chapter 1 (Bonus)'},
    {chapterId: 2, description: 'Chapter 2'}
];


export const KEYWORDS: Keyword[] = [
{
    keywordId: 0,
    chapterId: 0,
    english: 'test 1',
    hiragana: 'おはよう',
    romaji: 'testau 1',
    kanji: '三五分'
},{
    keywordId: 1,
    chapterId: 0,
    english: 'test 2',
    hiragana: 'は',
    romaji: 'testau 2',
    kanji: ''
},{
    keywordId: 2,
    chapterId: 0,
    english: 'test 3',
    hiragana: 'う',
    romaji: 'testau 3',
    kanji: '四十分'
},{
    keywordId: 3,
    chapterId: 1,
    english: 'test 4',
    hiragana: 'よよよ',
    romaji: 'testau 4',
    kanji: ''
},{
    keywordId: 4,
    chapterId: 2,
    english: 'test 5',
    hiragana: 'おはようおはようおはよう',
    romaji: 'testau 5',
    kanji: ''
}];
    
