export function genProcessors(store, type) {
  return { processing: CommitProcessing(store, type) }
}

function CommitProcessing(store, type) {
  return function processing() {
    store.commit(type.base, { type: type.success, data: null, message: '', status: 0 })
    store.commit(type.base, { type: type.failure, error: null })
    store.commit(type.base, { type: type.processing, value: true })
  }
}
