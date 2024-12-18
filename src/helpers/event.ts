import { forEach, size } from 'lodash'

export interface Listener<T> {
  // eslint-disable-next-line
  (event: T): any
}

export interface Disposable {
  dispose: () => void
}

/** passes through events as they happen. You will not get events from before you start listening */
export class TypedEvent<T> {
  private listeners: Listener<T>[] = []

  private listenersOncer: Listener<T>[] = []

  on = (listener: Listener<T>): Disposable => {
    this.listeners.push(listener)
    return {
      dispose: (): void => this.off(listener),
    }
  }

  once = (listener: Listener<T>): void => {
    this.listenersOncer.push(listener)
  }

  off = (listener: Listener<T>): void => {
    const callbackIndex = this.listeners.indexOf(listener)
    if (callbackIndex > -1) this.listeners.splice(callbackIndex, 1)
  }

  emit = (event: T): void => {
    /** Update any general listeners */
    forEach(this.listeners, (listener) => listener(event))

    /** Clear the `once` queue */
    if (size(this.listenersOncer) > 0) {
      const toCall = this.listenersOncer
      this.listenersOncer = []
      forEach(toCall, (listener) => listener(event))
    }
  }

  pipe = (te: TypedEvent<T>): Disposable => {
    return this.on((e) => te.emit(e))
  }
}
