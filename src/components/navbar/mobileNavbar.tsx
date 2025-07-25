"use client"

import BottomTabs from './bottomTabs';
import Sidebar from './sidebar';

const MobileNavbar = ({isSidebarVisible = true, inArticle = false}: {isSidebarVisible?: boolean, inArticle?: boolean}) => {

    return (
        <>            
            {isSidebarVisible && <Sidebar />}
            <BottomTabs inArticle={inArticle} />
        </>
    )
}

export default MobileNavbar
