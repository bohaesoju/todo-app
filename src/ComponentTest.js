import React, {Component} from 'react';

class ComponentTest extends Component{
	
	constructor(){
		super();
		this.state = {toggleColor: false}
	}
	componentWillMount(){
		console.log('1. ������Ʈ�� ����Ʈ�� �����Դϴ�.');
	}
	componentDidMount(){
		console.log('2. ������Ʈ�� ����Ʈ�Ǿ����ϴ�.');
	}
	componentWillReciveProps(nextProps){
		console.log('3. ������Ʈ�� ���ο� props�� ���� �����Դϴ� : ', nextProps);
	}
	shouldComponentUpdate(){
		console.log('4. ������Ʈ�� ������Ʈ �ؾ����� ������ �Ǵ��մϴ� : ', nextProps, nextState);
		const shouldUpdate = confirm('������Ʈ �ұ��?');
		return !!shouldUpdate;
	}
	componentWillUpdate(nextProps, nextState){
		console.log('5. ������Ʈ�� ������Ʈ�� �����Դϴ� : ', nextProps, nextState);
	}
	componentDidUpdate(prevProps, prevState){
		console.log('6. ������Ʈ�� ������Ʈ�Ǿ����ϴ� : ', prevProps, prevState);
	}
	componentWillUnmount(){
		console.log('7. ������Ʈ�� �𸶿�Ʈ�� �����Դϴ�.');
	}
	bgToggle(){
		this.setState({
			toggleColor: !this.state.toggleColor
		});
	}
	render(){
		const toggleColor = this.state.toggleColor;
		const children = this.props.list.map((v,i) => (
			<li key= {i}>
				{v}
			</li>
		));
		return(
			<div>
				<ul style={{
					backgroundColor: toggleColor ? '#acf' : '#fca'
				}}>
					{children}
				</ul>
				<button onClick={()=> this.bgToggle()}>
					���󺯰�
				</button>
			</div>
		)
	}
}

export default ComponentTest;