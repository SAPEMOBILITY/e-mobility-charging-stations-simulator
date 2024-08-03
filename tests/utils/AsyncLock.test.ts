import { describe, it } from 'node:test'

import { expect } from 'expect'

import { AsyncLock, AsyncLockType } from '../../src/utils/AsyncLock.js'

await describe('AsyncLock test suite', async () => {
  await it('Verify runExclusive()', () => {
    const runs = 10
    let executed: number[] = []
    let count = 0
    const fn = () => {
      executed.push(++count)
    }
    for (let i = 0; i < runs; i++) {
      AsyncLock.runExclusive(AsyncLockType.configuration, fn)
        .then(() => {
          expect(executed).toEqual(new Array(count).fill(0).map((_, i) => ++i))
          return undefined
        })
        // eslint-disable-next-line @typescript-eslint/use-unknown-in-catch-callback-variable
        .catch(console.error)
    }
    executed = []
    count = 0
    const asyncFn = async () => {
      await new Promise(resolve => {
        setTimeout(resolve, 100)
      })
      executed.push(++count)
    }
    for (let i = 0; i < runs; i++) {
      AsyncLock.runExclusive(AsyncLockType.configuration, asyncFn)
        .then(() => {
          expect(executed).toEqual(new Array(count).fill(0).map((_, i) => ++i))
          return undefined
        })
        // eslint-disable-next-line @typescript-eslint/use-unknown-in-catch-callback-variable
        .catch(console.error)
    }
  })
})
