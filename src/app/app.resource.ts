import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PersistedWindowLayout } from "@morgan-stanley/desktopjs";
import { EMPTY, Observable } from "rxjs";
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AppResource {
    constructor(
        private http: HttpClient
    ) {}

    getDesktopLayoutJson(): Observable<PersistedWindowLayout> {
        return this.http.get('assets/layout.json').pipe(
            map(layout => layout as PersistedWindowLayout),
            catchError(error => {
                console.error(`Unexpected error in getting layout json for desktop`);
                return EMPTY;
            })
        )

    }
}