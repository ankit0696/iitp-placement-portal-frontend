export default function Footer(){
    return(
        <footer className="mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8">
            <div className="border-t border-slate-900/5">
                <p className="mt-5 text-center text-sm leading-6 text-slate-500">©
                    {new Date().getFullYear() + ' ' }

                    IIT Patna. All rights
                    reserved. Developed by <a href='https://www.linkedin.com/in/ankitiitpatna/' target='_blank' rel='noreferrer'><span className='text-indigo-800 font-semibold'>Ankit Kumar (2111MC02)</span></a> </p>
                {/*<div*/}
                {/*    className="mt-16 flex items-center justify-center space-x-4 text-sm font-semibold leading-6 text-slate-700">*/}
                {/*    <a href="/privacy-policy">Privacy policy</a>*/}
                {/*    <div className="h-4 w-px bg-slate-500/20"></div>*/}
                {/*    <a href="/changelog">Changelog</a></div>*/}
            </div>
        </footer>)
}