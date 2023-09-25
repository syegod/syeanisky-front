import Header from './Header'

export default function Layout({children}) {
    return (
        <div className='flex flex-col h-[100vh] text-zinc-800'>
            <Header />
            <main>{children}</main>
        </div>
    )
}
