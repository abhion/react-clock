import React from "react";

class Clock extends React.Component {
  timeNums = [0, 1, 2, 3, 4, 5];
  state = {
    hrs: 0,
    min: 0,
    sec: 0
  };

  
  componentDidMount() {
    this.animFrameRef =  requestAnimationFrame(this.refresh);
    this.prevDate = new Date();
    this.refresh();
  }

  componentWillUnmount(){
      cancelAnimationFrame(this.animFrameRef);
  }


  refresh = () => {
    const now = new Date();
    if(this.prevDate.getSeconds() != now.getSeconds()){
      let time = new Date();
      console.log(time.getSeconds());
      let sec = time.getSeconds() / 5;
      
    //   console.log(sec);
      sec = sec * 30;
    //   console.log(sec, "2");
      let min = time.getMinutes() / 5;
      min = min * 30;
      let hrs = time.getHours();
      hrs = hrs > 12 ? hrs - 12 : hrs;
      hrs = (hrs + time.getMinutes()/60) * 30;
  
      this.setState({
        hrs,
        min,
        sec
      });
    }
    this.prevDate = now;
    this.animFrameRef = requestAnimationFrame(this.refresh)
  };

  render() {
    const { hrs, sec, min } = this.state;
    const timeNumEls = this.timeNums.map((timeNum, i) => {
      return (
        <div
          key={timeNum}
          className="time-num"
          style={{ transform: `rotate(${30 * i}deg)` }}
        >
          <div
            style={{ transform: `rotate(${-30 * i}deg)` }}
            className="first-time time-num-span"
          >
            {timeNum || 12}
          </div>
          <div
            style={{ transform: `rotate(${-30 * i}deg)` }}
            className="sec-time time-num-span"
          >
            {timeNum + 6}
          </div>
        </div>
      );
    });

    return (
      <div className="clock">
        <div className="inner-clock">
          {timeNumEls}
          <div
            className="second-hand hand"
            style={{ transform: `rotate(${sec}deg)` }}
          />
          <div
            className="hour-hand hand"
            style={{ transform: `rotate(${hrs}deg)` }}
          />
          <div
            className="min-hand hand"
            style={{ transform: `rotate(${min}deg)` }}
          />
        </div>
      </div>
    );
  }
}

export default Clock;
