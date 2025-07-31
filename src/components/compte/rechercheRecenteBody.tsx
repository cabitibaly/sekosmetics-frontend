import CompteNavbar from '../navbar/compteNavbar'
import RechercheRecentCard from '../cards/rechercheRecentCard'

const RechercheRecenteBody = () => {
    return (
        <div className={`overflow-x-hidden px-[100px] pt-32 py-6 w-screen h-screen flex items-start justify-center gap-4 max-xl:px-[30px] max-896:flex-wrap max-896:!pb-4 max-896:!px-4 max-896:pt-20`}>
            <div className='w-4/5 h-full flex items-start justify-center gap-8 max-lg:w-[90%] max-896:!w-full'>
                <CompteNavbar />
                <div className='border border-red-3 p-4 overflow-auto rounded-3xl bg-red-1 w-3/5 min-h-3/5 max-h-full flex flex-col items-center justify-start gap-4 max-896:w-full max-896:bg-transparent max-896:border-none max-896:p-0 max-896:!pb-32'>
                    <RechercheRecentCard recherche='Make-up' />
                </div>
            </div>
        </div>
    )
}

export default RechercheRecenteBody
