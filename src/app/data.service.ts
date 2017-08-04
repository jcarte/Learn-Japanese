import { Injectable, isDevMode } from '@angular/core';

import { Chapter } from './chapter';
import { Keyword } from './keyword';

import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";

@Injectable()
export class DataService {

    constructor(private db: AngularFireDatabase) {
    }

    getChapters(): Promise<Chapter[]> {
        if (isDevMode()) {//todo use injection rather than this, hacky
            return Promise.resolve(CHAPTERS);
        }

        return new Promise((resolve, reject) => {
            let chaps: Chapter[] = [];
            this.db.list('/chapters').subscribe((c: Chapter[]) => {
                c.forEach((cc: Chapter) => chaps.push(cc));
                resolve(chaps);
            });
        });
    }

    getChapter(chapterId: number): Promise<Chapter> {
        if (isDevMode()) {//todo use injection rather than this, hacky
            return Promise.resolve(CHAPTERS.filter(chap => chap.chapterId === chapterId)[0]);
        }

        return new Promise((resolve, reject) => {
            this.db.list('/chapters',
                {
                    query: {
                        orderByChild: 'chapterId',
                        equalTo: chapterId
                    }
                }).subscribe((c: Chapter[]) => {
                    resolve(c[0]);
                });
        });
    }

    getKeywords(chapterId: number): Promise<Keyword[]> {
        if (isDevMode()) {//todo use injection rather than this, hacky
            return Promise.resolve(KEYWORDS.filter(key => key.chapterId === chapterId));
        }

        return new Promise((resolve, reject) => {
            let keys: Keyword[] = [];
            this.db.list('/keywords',
                {
                    query: {
                        orderByChild: 'chapterId',
                        equalTo: chapterId
                    }
                }).subscribe((k: Keyword[]) => {
                    k.forEach((kk: Keyword) => keys.push(kk));
                    resolve(keys);
                });
        });
    }


}




export const CHAPTERS: Chapter[] = [
    { chapterId: 0, description: 'Chapter 1' },
    { chapterId: 1, description: 'Chapter 1 (Bonus)' },
    { chapterId: 2, description: 'Chapter 2' }
];


export const KEYWORDS: Keyword[] = [
    {
        keywordId: 0,
        chapterId: 0,
        english: 'test 1',
        hiragana: 'おはよう',
        romaji: 'testau 1',
        kanji: '三五分'
    }, {
        keywordId: 1,
        chapterId: 0,
        english: 'test 2',
        hiragana: 'は',
        romaji: 'testau 2',
        kanji: ''
    }, {
        keywordId: 2,
        chapterId: 0,
        english: 'test 3',
        hiragana: 'う',
        romaji: 'testau 3',
        kanji: '四十分'
    }, {
        keywordId: 3,
        chapterId: 1,
        english: 'test 4',
        hiragana: 'よよよ',
        romaji: 'testau 4',
        kanji: ''
    }, {
        keywordId: 4,
        chapterId: 2,
        english: 'test 5',
        hiragana: 'おはようおはようおはよう',
        romaji: '',
        kanji: ''
    }, {
        keywordId: 5,
        chapterId: 2,
        english: 'test 6',
        hiragana: '',
        romaji: '',
        kanji: ''
    }, {
        keywordId: 6,
        chapterId: 2,
        english: '',
        hiragana: '',
        romaji: '',
        kanji: ''
    }

];

