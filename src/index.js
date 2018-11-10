import ObserverRegistry from './ObserverRegistry'

export default function (options) {
   const Observer = new ObserverRegistry(options)
   return (el) => {
      const instance = Observer.add(el)
      return instance
   }
}