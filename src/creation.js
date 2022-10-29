import {of, from, Observable, fromEvent, range, timer, interval} from 'rxjs'
import {scan, map} from 'rxjs/operators'

const stream$ = of(1, 2, 3, 4, 5)
stream$.subscribe(val => {
    console.log('Value', val)
})

const arr$ = from([1, 2, 3, 4]).pipe(
    scan((acc, v) => acc.concat(v), [])
)
arr$.subscribe(val => {
    console.log('Value', val)
})

const streamObs$ = new Observable(observable => {
    observable.next('First value')
    
    setTimeout(() => {
        observable.next('After 1000ms')
    }, 1000)
    
    setTimeout(() => {
        observable.complete()
    }, 1500)
    
    setTimeout(() => {
        observable.error('Something error')
    }, 2000)

    setTimeout(() => {
        observable.next('After 3000ms')
    }, 3000)
})
streamObs$.subscribe(
    (val) => console.log('Observable value:', val),
    (err) => console.log(err),
    () => console.log('Complete')
)

streamObs$.subscribe({
    next(val) {
        console.log(val)
    },
    error(err) {
        console.log(err);
    },
    complete() {
        console.log('Complete');
    }
})

fromEvent(document.querySelector('canvas'), 'mousemove')
    .pipe(
        map(e => ({
            x: e.offsetX,
            y: e.offsetY,
            ctx: e.target.getContext('2d')
        }))
    )
    .subscribe(pos => {
        pos.ctx.fillRect(pos.x, pos.y, 2, 2)
    })

const clear$ = fromEvent(document.querySelector('#clear'), 'click')

clear$.subscribe(() => {
    const canvas = document.querySelector('canvas')
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
})

const sub = interval(500).subscribe(v => console.log(v))

setTimeout(() => {
    sub.unsubscribe()
}, 4000)

timer(2500).subscribe(v => console.log(v))

range(40, 10).subscribe(v => console.log(v))