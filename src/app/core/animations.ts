import { trigger, state, animate, transition, style } from '@angular/animations';

export const fadeInAnimation =
  trigger('fadeInAnimation', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('.3s', style({ opacity: 1 }))
    ]),
  ]);

export const slideInOutAnimation =
  trigger('slideInOutAnimation', [
    state('*', style({
      position: 'absolute',
      width: '100%'
      // top: 0,
      // left: 0,
      // right: 0,
      // bottom: 0
    })),
    transition(':enter', [
      style({
        transform: 'translate(-400%,0)',
      }),
      animate('.5s ease-in-out', style({
        transform: 'translate(0,0)',
      }))
    ]),
    transition(':leave', [
      animate('.5s ease-in-out', style({
        transform: 'translate(-400%,0)'
      }))
    ])
  ]);
