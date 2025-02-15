
import {ShoppingBag, Truck, Ruler, Undo2 , LockKeyhole , GraduationCap } from 'lucide-react'
const Benefits = () => {
  return (
    <div className="">
     
     
          <div className="space-y-2 text-center lg:mx-5 xl:mx-2">
            <Truck className="w-10 h-10 mx-auto" />
            <div className="text-sm font-bold">Free Delivery</div>
            <div className="text-sm  leading-tight text-muted-foreground">
            Free Delivery to MV Learners – Delivered to Their Class Within 5 Days!
            </div>
          </div>
       
          <div className="space-y-2 text-center lg:mx-5 xl:mx-2">
            <Undo2 className="w-10 h-10 mx-auto" />
            <div className="text-sm font-bold">Easy Returns</div>
            <div className="text-sm leading-tight text-muted-foreground">
              If you have ordered the wrong size return it with the learner for the correct one.
            </div>
          </div>
       
          <div className="space-y-2 text-center lg:mx-5 xl:mx-2">
            <GraduationCap className="w-10 h-10 mx-auto" />
            <div className="text-sm font-bold">Benefit from each sale.</div>
            <div className="text-sm leading-tight text-muted-foreground">
           Proceeds from all sales will be used for the education of your child
            </div>
          </div>
        </div>
     
  )
}
export default Benefits