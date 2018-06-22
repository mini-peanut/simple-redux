
function createConnect() {

    return function connect(
        mapStateToProps,
        mapDispatchToProps,
        mergeProps,
        options
    ) {

        return connectAdvanced(selectorFactory, {storeKey: 'store', ...connectOptions});
    }
}

function connectAdvanced(selectorFactory, {storeKey = 'store', ...connectOptions}) {

    return function wrapWithConnect(WrappedComponent) {
        class Connect extends Component {
            constructor(props, context) {
                super(props, context);
                this.store = props[storeKey] || context[storeKey];

                this.initSelector()
            }

            addExtraProps() {
                // 这里处理mapStateToProps, mapDispatchToProps, 返回UI所需要的参数
            }

            render() {
                return React.createElement(WrappedComponent, this.addExtraProps())
            }
        }
    }

}

const connect = createConnect()