import React, {Component} from 'react';
import ComponentTestChild from './ComponentTestChild';

export default class ComponentTest extends Component {
  constructor() {
    super();
    this.state = {
      list: [0]
    };
  }
  addChild() {
    const nextList = [...this.state.list];
    nextList.push(nextList.length);
    this.setState({list: nextList});
  }
  removeChild() {
    const nextList = [...this.state.list];
    nextList.pop();
    this.setState({list: nextList});
  }
  render() {
    if(!this.state.list.length) return (
      <button onClick={() => this.addChild()}>자식 추가</button>
    );
    return (
      <div>
        <ComponentTestChild list={this.state.list} />
        <button onClick={() => this.addChild()}>자식 추가</button>
        <button onClick={() => this.removeChild()}>자식 삭제</button>
      </div>
    );
  }
}