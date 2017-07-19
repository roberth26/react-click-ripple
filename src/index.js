import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

class Button extends React.Component {
    element;
    state = {
        clickEvents: []
    };

    handleClick = event => {
        if (this.element == null) {
            this.forceUpdate();
        }
        this.setState({
            clickEvents: [...this.state.clickEvents, event.nativeEvent]
        });
    }

    setElement = el => this.element = el;

    removeClickEvent = clickEvent => {
        this.setState({
            clickEvents: this.state.clickEvents.filter( e => e.timeStamp !== clickEvent.timeStamp )
        });
    };

    renderRipples = () => {
        const { clickEvents } = this.state;

        if (this.element == null) {
            return null;
        }

        return (
            <svg
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 10
                }}
                viewBox={`0 0 ${this.element.offsetWidth} ${this.element.offsetHeight}`}
            >
                {clickEvents.map(clickEvent => {
                    const cx = clickEvent.pageX - this.element.offsetLeft;
                    const cy = clickEvent.pageY - this.element.offsetTop;
                    
                    return (
                        <circle
                            key={clickEvent.timeStamp}
                            cx={cx}
                            cy={cy}
                            r={10}
                            fill="white"
                            onAnimationEnd={() => {
                                this.removeClickEvent(clickEvent);
                            }}
                        />
                    );
                })}
            </svg>
        );
    };

    render() {
        return (
            <a
                ref={this.setElement}
                style={{
                    background: 'red',
                    position: 'relative',
                    padding: '50px 100px'
                }}
                onClick={this.handleClick}    
            >
                SOME TEXT
                {this.renderRipples()}
            </a>
        )
    }
}



ReactDOM.render(
    <Button />,
    document.getElementById('root')
);

registerServiceWorker();