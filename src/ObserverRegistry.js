import RegistryElement from './RegistryElement'

export default class ObserverRegistry {
   constructor (options) {
      this.registry = []
      this.options = options || {}
      this.observer = new IntersectionObserver(this.callback, this.options)
   }

   callback = (observables) => {
      observables.forEach(observable => {
         const registryElement = this.registry.find(reg => reg.target === observable.target)
         if (!registryElement) {
            return
         }
         registryElement.check(observable.isIntersecting)
      })
   } 

   add (el) {
      const registryElement = new RegistryElement(el)
      this.registry.push(registryElement)
      this.observer.observe(el)
      return {
         on: registryElement.on,
         off: () => {
            this.observer.unobserve(el)
            return registryElement.off
         }
      }
   }

   remove (el) {
      this.registry = this.registry.filter(r => r.target !== el)
      this.observer.unobserve(el)
   }
}