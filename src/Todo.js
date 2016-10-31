import React, {Component} from 'react';
import ClassNames from 'classnames';

export default class Todo extends Component {
  constructor() {
    super();
    // 에디트 모드인지 아닌지 확인하기 위한 플래그 변수인데
    // 리액트 Virtual DOM은 setState나 props changed 이벤트가 발생하지 않으면
    // 렌더링하지 않아서 클래스도 붙지 않는다.
    // 따라서 일반 변수가 아닌 state로 지정해줌.
    this.state = {
      isEdited: false
    };
    // window 객체에서 this를 제대로 바인딩하지 못해서 여기에서 바인딩 해줌.
    this.cancelEditTodo = this.cancelEditTodo.bind(this);
  }

  // 최초 컴포넌트가 마운트 됐을 때 1회 발생함.
  // 윈도우 객체를 클릭했을 때 수정 모드를 취소.
  // input 창에 blur 했을 때 수정 모드 취소를 하게 되면
  // 탭 이동이나 다른 윈도우를 클릭했을 때도 수정 취소가 됨...
  componentDidMount() {
    window.addEventListener('click', this.cancelEditTodo);
  }

  // setState() 이벤트가 발생하서 다시 렌더링이 발생할 때 일어나는 이벤트.
  // isEdited 스테이트가 변경됐을 때 렌더링을 다시 하고
  // 그 때 input 창에 포커스를 줌.
  componentDidUpdate() {
    if(this.state.isEdited) this.editField.focus();
  }

  editTodo() {
    this.setState({isEdited: true});
  }

  cancelEditTodo() {
    this.setState({isEdited: false});
  }

  // 그냥 input에 value를 주면 readOnly가 됨.
  // onChange 핸들러를 주는 등등의 방법이 필요하지만,
  // input이 포커스 되기 전까지 딱히 value를 가질 필요도 없음.
  // 따라서 focus 됐을 때만 value를 주면 되고,
  // 추가 작업 없이도 readOnly 모드를 벗어날 수 있음.
  handleFocus() {
    this.editField.value = this.props.text;
  }

  // 윈도우 객체를 클릭했을 때 수정 모드가 취소되지만
  // 예외적으로 수정 중인 input을 클릭했을 때는 취소되면 안 됨.
  // 따라서 이벤트의 버블링을 막음.
  handleClick(e) {
    e.stopPropagation();
  }

  handleKeyDown(e) {
    const text = this.editField.value;

    // 내용을 다 지우고 엔터를 누르면 수정이 취소.
    if(!text && e.keyCode === 13) return this.cancelEditTodo();

    // 내용이 있는 상태에서 엔터 이외의 키를 누르면 함수 종료.
    else if(e.keyCode !== 13) return;

    this.props.saveTodo(this.props.id, text);
    this.cancelEditTodo();
  }

  render() {
    const {text, id} = this.props;
    return (
      <li className={ClassNames('todo-item', {editing: this.state.isEdited})}>
        <div className="todo-item__view">
          <div className="toggle" />
          <div className="todo-item__view__text"
               onDoubleClick={() => this.editTodo()}>
            {text}
          </div>
          {/*
           실제 메소드를 호출할 때는 매개변수를 생략하고 씀.
           */}
          <button className="todo-item__destroy"
                  onClick={()=> this.props.deleteTodo(id)} />
        </div>
        <input type="text"
               className="todo-item__edit"
               ref={ref => {
                 this.editField = ref;
               }}
               onFocus={() => this.handleFocus()}
               onClick={e => this.handleClick(e)}
               onKeyDown={e => this.handleKeyDown(e)} />
      </li>
    );
  }
}