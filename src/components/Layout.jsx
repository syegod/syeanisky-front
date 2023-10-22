import Header from './Header'
import NotificationContainer from './features/NotificationContainer'

export default function Layout({children}) {
    

    return (
        <div className='flex flex-col h-[100vh] text-zinc-800 relative'>
            <Header />
            <main>{children}</main>
            <NotificationContainer/>
        </div>
    )
}
