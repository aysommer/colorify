import './Layout.css';

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
   return (
      <main className='app-layout'>
         {children}
      </main>
   )
}

export default Layout;