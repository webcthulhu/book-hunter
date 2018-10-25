import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

export abstract class BaseComponent implements OnDestroy {
  protected destroyed$: Subject<boolean> = new Subject();
  protected constructor() {}
  ngOnDestroy(): void {
    console.log('component destroyed');
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
