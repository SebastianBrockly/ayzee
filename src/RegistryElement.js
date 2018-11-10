export default class RegistryElement {
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