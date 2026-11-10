import React, { Component, useEffect, useState } from "react";
import ReactDOM, { findDOMNode } from "react-dom";

export function notAComponent(): number {
  return 1;
}

class Legacy extends Component<{ items: string[] }, { count: number }> {
  state = { count: 0 };

  componentWillMount() {
    this.state.count = 1;
  }

  componentDidMount() {
    findDOMNode(this);
    if (this.isMounted()) {
      this.setState({ count: 2 });
    }
  }

  render() {
    return (
      <div class="x" ref="legacy">
        {this.props.items.map((item) => (
          <span>{item}</span>
        ))}
        <a href="https://example.com" target="_blank">
          don't
        </a>
        <p children="x" />
        <div dangerouslySetInnerHTML={{ __html: "x" }}>child</div>
        <input value="a" value="b" />
        <section></section>
        // comment text node
        <Missing />
      </div>
    );
  }
}

class NoReturn extends Component {
  render() {
    <div />;
  }
}

export function Counter({ start }: { start: number }) {
  if (start > 0) {
    const [value] = useState(start);
    return <b>{value}</b>;
  }
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount(start);
  }, []);
  return <i>{count}</i>;
}

export const table = { Cell: React.memo(() => <td />) };

export function withThing() {
  return () => <Legacy items={[]} />;
}

export default React.forwardRef<HTMLDivElement>((_props, ref) => (
  <div ref={ref} />
));

const instance = ReactDOM.render(<NoReturn />, document.body);
console.log(instance);
