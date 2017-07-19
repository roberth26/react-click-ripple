import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

class Button extends React.Component {
    element;
    state = {
        clickEvents: []
    };

    setElement = el => this.element = el;

    handleClick = event => {
        this.setState({
            clickEvents: [...this.state.clickEvents, event.nativeEvent]
        });
    }

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

        const offsetLeft = this.element.offsetLeft;
        const offsetTop = this.element.offsetTop;

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
                    const cx = clickEvent.pageX - offsetLeft;
                    const cy = clickEvent.pageY - offsetTop;
                    
                    return (
                        <circle
                            key={clickEvent.timeStamp}
                            cx={cx}
                            cy={cy}
                            r={10}
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