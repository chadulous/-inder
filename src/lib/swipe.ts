type VerticalSwipeDirection = 'left' | 'right'

type VerticalSwipe = {
    direction: VerticalSwipeDirection,
    target: HTMLElement
}

type HorizontalSwipeDirection = 'top' | 'bottom'

type HorizontalSwipe = {
    direction: HorizontalSwipeDirection,
    target: HTMLElement
}

type SwipeDirection = HorizontalSwipeDirection | VerticalSwipeDirection

type Swipe = HorizontalSwipe | VerticalSwipe

type Listener = {
    id: number,
    callback: () => void,
    direction: SwipeDirection | 'all'
}

class SwipeHandler {
    swipetime: Date | undefined
    direction: SwipeDirection | undefined
    listeners: Array<Listener>

    constructor() {
        this.listeners = []
    }

    handle(direction: SwipeDirection) {
        this.swipetime = new Date();
        this.direction = direction
        for(let listener of this.listeners) {
            if(this.direction === listener.direction || listener.direction === 'all') {
                listener.callback.apply({ 
                    direction: this.direction,
                    time: this.swipetime
                })
            }
        }
    }

    listen(callback: () => void, direction?: SwipeDirection) {
        const id = new Date().getTime()
        this.listeners.push({
            callback,
            direction: direction || 'all',
            id: id
        })
        return () => {
            const ind = this.listeners.findIndex((e) => {
                return e.id === id
            })

            delete this.listeners[ind]
        }
    }
}

export {
    type VerticalSwipeDirection,
    type VerticalSwipe,
    type HorizontalSwipeDirection,
    type HorizontalSwipe,
    type SwipeDirection,
    type Swipe,
    SwipeHandler
}