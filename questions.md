### `1. What is the difference between Component and PureComponent? Give an example where it might break my app.`

    The difference is, Component rerenders everytime its props value or state value change, no matter the value of the prop/state. Whereas, PureComponent does a shallow comparison using shouldComponentUpdate and rerenders only if the value of the prop/state change(ie. if the previous value is not equal to the current value).

    class ParentComponent extends Component {
        constructor(props){
            super(props)
            this.state = {
                color: 'green'
            }
        }
        render(){
            return (
                <>
                    <ChildComponent1 color={this.state.color} />
                    <button onClick={() => this.setState({ color: 'red' })}>
                        set Color to red
                    </button>
                    <ChildComponent2 color={color} />
                </>
            )
        }
    }

    class ChildComponent1 extends Component {
        render(){
            return (
                <div>{this.props.color}</div>
            )
        }
    }

    class ChildComponent2 extends PureComponent {
        render(){
            return(
                <div>{this.props.color}</div>
            )
        }
    }

    In the above example ChildComponent1 rerenders everytime the button is clicked, whereas ChildComponent2 rerenders only when the prop value changes.

### `2. Context + shouldComponentUpdate is dangerous. why is that?`

        Context is generally used to avoid prop drilling in small projects where no other state management or hooks are used or in combination with these.
        ShouldComponentUpdate is a lifecycle method in class components used to check if a component should rerenders. Returning true will rerenders, whereas false wont rerenders.The issue with using this combination is that, suppose the shouldComponentUpdate depends on a value not dependent on the context value or if the shouldComponentUpdate always returns false, the component will neve rerender and get the updated value.

### `3. Ways to pass information from a component to its parent`

        (i) using call back or props

            const ParentComponent = () => {
                const [param, setParam] = useState('');
                const handleChange = (value) => setParam(value); // the param value here will be 'param2'

                return (
                    <ChildComponent onChange={handleChanage} />
                )
            }

            const ChildComponent = ({ onChange }) =>
                <button onClick={() => onChange('param2')}>Click me </button>

        (ii) using state management
            const ParentComponent = () => {
                const value = useSelector((state) => state.color)
                ...
                return ...
            }

            const ChildComponent = () => {
                ..
                const handleChange = () => {
                    dispatch({ type: 'SET_PARENT_VALUE', payload: 'green' })
                }
            }

        (iii) using local storage(which is not advisable and this would require listening to local storage changes)
            const ChildComponent = () => {
                ....
                localStorage.setItem('value', 12345);
                return ...
            }

            const ParentComponent = () => {
                ....
                localStorage.getItem('value');
                ....
            }

### `4. Give 2 ways to prevent components from re-rerendering`

        (i) using memo and callback or React.memo()
        (ii) use useRef instead of useState

            const ExampleComponent = () => {
                const [value, setValue] = useState('');

                return (
                    <div>
                        <input onChange={(event) => setValue(event?.target.value)} />
                    </div>
                )
            }
            in the above example, the component will rerender everytime a value is typed.

            const ExampleComponent = () => {
                const inputRef = useRef(null);

                console.log(inputRef.current.value);
                return (
                    <div>
                        <input ref={inputRef} />
                    </div>
                )
            }
            here the change in inputRef doesn not cause rerender

### `5. What is a fragment and.. `

        Fragment is used to group a section of Jsx elements or as a parent element. THe advantage of using a fragment instead of a div, is that it doesn't include any additional element to the DOM.
        But the disadvantage of a Fragment is that no styles can be included in it. Only keys can be added where list is used and keys have to be unique.
        Syntax: <Fragment></Fragment> or <></>(shortcut)

### `6. Give 3 examples of the HOC Pattern`

            HOC are functions that receive a component and return another component with additional functionalities.
            (i) withStyles

            const withStylesHOC = (Component) => {
                return (props) => {
                    const style = {
                    color: "red",
                    ...props.style,
                    };

                    return <Component {...props} style={style} />;
                };
            }

            import { withStyles } ...;

            const Component = () => <div style={{ color: 'green' }}>text value</div>;
            const StyledComponent = withStylesHOC(Component);

            (ii) withAuth
                const withAuthHOC = (Component) => {
                    return (props) => {
                        if (is_logged_in) {
                            return <PrivateComponent />
                        }

                        return <PublicComponent />
                    }
                }
            (iii) connect (inbuilt)
                connect(mapStatetoProps, mapDispatchToProps)(App)

### `7. What is the difference in handling exception in promises, callbacks and async/await?`

        promises => .then() .catch((error) => console.log(error))
        async/await => written inside try catch block
            try {
            }
            catch(error){
                console.log(error)
            }
        callback function => error value passed as parameter back to the function

### `8. How many arguments does state state take and why is it async.`

        setState takes two arguments, first the nextState value and then an optional callback funcion as below:
            setState(nextState, callback?)
        SetState is async as. When there are multiple setstates, react kind of groupes or batches them so as to prevent multiple rerenders.
            let's say initial state of color is 'red'
            function handleChange() {
                this.setState({ color: 'green' })
                console.log(this.state.color);
            }
        the above console will still give color value as 'red' as setstate is async.But

### `9. steps to convert class component to functional component`

            class ExampleComponent extends Component {
                constructor(){
                    this.state = {
                        color: 'green'
                    }
                }

                function handleChange() {
                    this.setState({
                        color: 'red'
                    })
                }

                render(){
                    return (
                        <div>{this.state.color}</div>
                    )
                };
            }

            ==> convert the class to function
            ==> remove constructor
            ==> use hooks instead of lifecycle methods(useEffect)
            ==> convert methods to functions
            ==> use usestate for initialization
            ==> remove render method
            ==> remove this

            const ExampleComponent = () => {
                const [color, setColor] = useState('green');

                const handleChange = () => setColor('red');

                return (
                    <div>{color}</div>
                )
            }

### `10. how to use styles with components`

            ==> use inline styles
                <div styles={{color: 'green' }}></div>

            ==> use css modules
                import and use in <div className='class name'>

            ==> use libraries
                tailwind, material ui, radixui, shadcn, etc

            ==> styled components
                const textStyle = styled.div`
                color: green
                `

### `11. how to render an HTML string coming from the server`

            in react, dangerouslySetInnerHtml can be used.
            <div dangerouslySetInnerHtml={{ __html: '<a>value</a>' }}>
