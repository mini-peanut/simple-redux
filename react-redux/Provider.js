function createProvider(storeKey = 'store') {
    class Provider extends Component {
        getChildContext() {
            return {
                [storeKey]: this[storeKey]
            }
        }

        constructor(props, context) {
            super(props, context);
            this[storeKey] = this.props[storeKey]
        }

        render() {
            return Children.only(this.props.children)
        }
    }
}

export default createProvider();