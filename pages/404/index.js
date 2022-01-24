import Link from 'next/link'

export default function NotFound() {
    return (
         
            <div>
                <h1>404</h1>
                <h4>Sorry, page do not exist!!</h4>
                <Link href="/account/login">Login</Link>
            </div>

    )
}
