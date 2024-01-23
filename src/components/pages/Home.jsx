import Header from '../imports/Header'
import Footer from '../imports/Footer'
import Body from '../imports/Body'

export default function Home() {
    return (
        <div>
            <div className='navigation-bar'><Header></Header></div>
            <div className="body"><Body /></div>
            <div className="footer"><Footer /></div>
        </div>
    )
}
