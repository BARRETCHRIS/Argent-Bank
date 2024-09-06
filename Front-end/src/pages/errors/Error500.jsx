import { Link } from 'react-router-dom';

function Error500(){
    document.title = 'AB Error';
    return (
        <main className="main bg-dark header">
            <div className='header'>
                <h2>500<br />Oups! Nous rencontrons des problèmes technique.</h2>
                <h2>500<br />Oops! We are experiencing technical issues.</h2>
                <Link to="/" className='error_link'>
                    Merci de retenter ultérieurement<br />Please try again later
                </Link>
            </div>
        </main>
    )
}

export default Error500;