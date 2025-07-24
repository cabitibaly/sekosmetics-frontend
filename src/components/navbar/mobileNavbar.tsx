"use client"

import BottomTabs from './bottomTabs';
import Sidebar from './sidebar';

const MobileNavbar = ({isSidebarVisible = true}: {isSidebarVisible?: boolean}) => {    

    return (
        <>            
            {isSidebarVisible && <Sidebar />}
            <BottomTabs />
        </>
    )
}

export default MobileNavbar
