import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

class LandingPage extends React.Component {
  render() {
    return (
      <div>
        <main className='main'>
          <div>
            <h1>Your Learning Journey Starts Here!</h1>
            <p>
              Break into a new field with courses from our world class
              instructors. Build skills for your present and your future.
            </p>
            <div className='cta-get-started'>
              <Link to={'/videos'}>Get Started</Link>
            </div>
          </div>
        </main>
        <section className='services'>
          <div>
            <img className='trophy-icon' src='/icons/trophy.png' />
            <h3>High Quality</h3>
            <h5>from the best instructors</h5>
          </div>
          <div>
            <img className='check-mark-icon' src='icons/check-mark.png' />
            <h3>Money Back</h3>
            <h5>30 Days</h5>
          </div>
          <div>
            <img className='support-icon' src='icons/support.png' />
            <h3>High Quality</h3>
            <h5>from the best instructors</h5>
          </div>
        </section>
        <section>
          <h1>Today's Popular Videos</h1>
          <img className='carousel-image' src='/icons/video-placeholder.jpeg' />
          <img className='carousel-image' src='/icons/video-placeholder.jpeg' />
          <img className='carousel-image' src='/icons/video-placeholder.jpeg' />
        </section>
      </div>
    );
  }
}

export default LandingPage;
