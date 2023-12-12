import {trigger, transition, style, query, group, animateChild, animate, keyframes, state} from "@angular/animations";


export const transparency =
  trigger('animate_transparency',[
    // false일때 css스타일 정의
    state('false',style({opacity:0, visibility:'hidden'})),
    // true 일때 css 스타일 정의
    state('true',style({opacity:1, visibility:'visible'})),
    // transition: state변화 경우의 수에 따른 변화 지정
    transition('false=>true', animate('500ms ease-in')),
    transition('true=>false', animate('500ms ease-out'))
    ]
  )

export const widthChange =
  trigger('animate_widthChange',[
      // false일때 css스타일 정의
      state('false',style({width:0})),
      // true 일때 css 스타일 정의
      state('true',style({width: '50%'})),
      // transition: state변화 경우의 수에 따른 변화 지정
      transition('false=>true', animate('500ms ease-in')),
      transition('true=>false', animate('500ms ease-out'))
    ]
  )

export const fader =
  trigger('routeAnimations',[
    // [@routeAnimations]="prepareRoute(outlet)" prepareRoute(outlet) 값이 바뀔 때마다 애니메이션 작동
    // ex => outlet
    //       && outlet.activatedRouteData && outlet.activatedRouteData['animation']; 이 값이 바뀔 때마다
    // isright => isLeft
    transition('* <=> *',[
      // static 상태일 때 :enter, :leave 스타일 지정
      query(':enter, :leave',[
        style({
          position: 'absolute',
          left: 0,
          width: '100%',
          opacity: 0,
          transform: 'scale(0) translateY(100%)'
        })
        //enter로 갈때 animate 지정
      ],  { optional: true }),
      query(':enter',[
        animate('600ms ease'),
        style({opacity: 1, transform: 'scale(1) translateY(0)'})
      ],  { optional: true })
    ])
  ]);

export const slider = trigger('routeAnimations',[
  ...generateSlideTransitions('left',0,5),

  // transition('5=>4', slideTo('right')),
  // transition('4=>3', slideTo('right')),
  // transition('3=>2', slideTo('right')),
  // transition('2=>1', slideTo('right')),
  // transition('1=>0', slideTo('right')),

  // transition('1=>2', slideTo('left')),
  // transition('2=>3', slideTo('right')),
  // transition('3=>4', slideTo('right')),
  // transition('4=>5', slideTo('left')),
])

function slideTo(direction:string){
  const optional  = {optional: true};
  return [
    query(':enter, :leave',[
      style({
        position: 'absolute',
        top: 0,
        [direction]: 0,
        width: '100%'
      })
    ], optional),
    query(':enter',[
      style({[direction]: '-100%'})
    ]),
     group([
       query(':leave',[
         animate('600ms ease', style({[direction]: '100%'}))
       ], optional),
       query(':enter',[
         animate('600ms ease', style({[direction]: '0%'}))
       ], optional)

     ])
  ]
}

function generateSlideTransitions(direction: 'left' |'right', start: number, end: number):any[]{
  const transitions  = [];
  for(let i = start ; i<end; i++){
    for(let j = i+1; j<end; j++){
      transitions.push(
        transition(`${i}=>${j}`,slideTo('right'))
      );
      transitions.push(
        transition(`${j}=>${i}`,slideTo('left'))
      );
    }

  }
  return transitions;
}


export const expander = trigger('animate_expander',[
  state('false',style({opacity: 0 , visibility: 'hidden', height: 0})),
  state('true',style({opacity: 1 , visibility: 'visible', padding: '1rem 1rem'})),
  transition('false=>true', animate('500ms ease-in')),
  transition('true=>false', animate('500ms ease-in')),
]);
