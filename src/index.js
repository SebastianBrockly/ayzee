class RegistryElement {
   constructor (target, subscriptions) {
      this.target = target
      this.subscriptions = this.subscriptions || []
      this.visible = false
   }

   on = (type, handler) => {
      this.subscriptions.push({ type, handler })
   }

   off = (type, handler) => {
      this.subscriptions = this.subscriptions
         .filter(s => !(s.handler === handler && s.type === type))
   }

   setVisible = (visible) => {
      this.visible = visible
   }

   check = (isIntersecting) => {
      this.subscriptions.forEach(({ type, handler }) => {
         if (isIntersecting) {
            if (type === 'enter' && !this.visible) {
               handler(this.target)
            }
         }
         if (!isIntersecting) {
            if (type === 'exit' && this.visible) {
               handler(this.target)
            }
         }
      })
      this.setVisible(isIntersecting)
   }
}

class ObserverRegistry {
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

export default (options) => {
   const Observer = new ObserverRegistry(options)
   return (el) => {
      const instance = Observer.add(el)
      return instance
   }
}