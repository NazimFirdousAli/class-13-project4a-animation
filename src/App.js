import './App.css';
import React,{useEffect} from 'react';
import useWebAnimations from "@wellyshen/use-web-animations";

function App() {

  var playbackrateQ = 1;
  var playbackrateBG = 0;

  let background1Movement = useWebAnimations({
    keyframes: [
      { transform: "translateX(100%)" },
      { transform: "translateX(-100%)" },
    ],
    timing: {
      duration: 36000,
      iterations: Infinity,
    },
  });

  let background2Movement = useWebAnimations({
    keyframes: [
      { transform: "translateX(100%)" },
      { transform: "translateX(-100%)" },
    ],
    timing: {
      duration: 36000,
      iterations: Infinity,
    },
  });

  let foreground1Movement = useWebAnimations({
    keyframes:[
      { transform: "translateX(100%)" },
      { transform: "translateX(-100%)" },
    ],
    timing:{
      duration: 12000,
    iterations: Infinity,
    }
  });

  let foreground2Movement = useWebAnimations({
    keyframes:[
      { transform: "translateX(100%)" },
      { transform: "translateX(-100%)" },
    ],
    timing:{
      duration: 12000,
    iterations: Infinity,
    }
  });

  const redQueen = useWebAnimations({
    keyframes:[
      { transform: "translateY(0)" },
    { transform: "translateY(-100%)" },
    ],
    timing:{
      easing: "steps(7, end)",
    direction: "reverse",
    duration: 600,
    playbackRate: 1,
    iterations: Infinity,
    }
  });

  const adjustBackgroundPlayback = () => {
    if (playbackrateQ < 0.8) {
      playbackrateBG = (playbackrateQ / 2) * -1;
    } else if (playbackrateQ > 1.2) {
      playbackrateBG = playbackrateQ / 2;
    } else {
      playbackrateBG = 0;
    }
    foreground1Movement.getAnimation().playbackRate = playbackrateBG;
    foreground2Movement.getAnimation().playbackRate = playbackrateBG;
    background1Movement.getAnimation().playbackRate = playbackrateBG;
    background2Movement.getAnimation().playbackRate = playbackrateBG;
  };
  useEffect(() => {
    // /* If Alice and the Red Queen are running at a speed of 1, the background doesn't move. */
    // /* But if they fall under 1, the background slides backwards */

    setInterval(() => {
      if (playbackrateQ > 0.4) {
        playbackrateQ *= 0.9;
        redQueen.getAnimation().playbackRate = playbackrateQ;
      }
      adjustBackgroundPlayback();
    }, 3000);

    //you can speed them up by giving the screen a click or a tap. */

    document.addEventListener("click", () => {
      playbackrateQ *= 1.1;
      redQueen.getAnimation().playbackRate = playbackrateQ;
      adjustBackgroundPlayback();
    });
  });



  return (
    <div className='App'>
      <div className='sky'>
      </div>
      <div className='earth'>
        <div id='queen' >
          <img id='queen_image' ref={redQueen.ref} src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/sprite_running-alice-queen_small.png' alt=" " />
        </div>
      </div>
      <div className='foreground' id='foreground1' ref={foreground1Movement.ref}>
        <img id='palmtree' src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm3_small.png' alt=" " />
      </div>
      <div className='foreground' id='foreground2' ref={foreground2Movement.ref}>
      <img id='rooksmall' src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook_upright_small.png' alt=" "/>
      <img id="bush" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/bush_small.png"alt=" "/>
      </div>
      <div className='background' ref={background1Movement.ref}>
        <img id='palmtreebackground' src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm1_small.png' alt=" "/>
        <img id='rook' src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook_small.png ' alt=" "/>
        <img id='pawnupright' src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_upright_small.png ' alt=" "/>

        <div className='background' ref={background2Movement.ref}>
        <img id='knight' src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_knight_small.png ' alt=" "/>
        <img id="r_pawn" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_small.png" alt=" "></img>
        <img id="palm2" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm2_small.png" alt=" "/>
        </div>
      </div>
    </div>
  );
}

export default App;
