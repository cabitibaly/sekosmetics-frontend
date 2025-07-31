import { X } from "lucide-react"
import RecentIcon from "../../../public/svg/recentIcon"

interface Props {
    recherche: string
}

const RechercheRecentCard = ({recherche}: Props) => {
    return (
        <div className='border-b border-gris-6 pb-2 w-full flex items-center justify-between gap-6 max-896:px-1'>
            <div className='flex items-center justify-center gap-2'>
                <RecentIcon color='#D8D9E0' className='size-6' />
                <p className='line-clamp-1 text-gris-12 text-base font-medium max-md:text-sm'>{recherche}</p>
            </div>
            <div className='cursor-pointer flex items-center justify-center group'>
                <X strokeWidth={1.25} className='stroke-gris-6 size-6 transition duration-200 ease-in group-hover:stroke-2' />
            </div>
        </div> 
    )
}

export default RechercheRecentCard
