import React, {Component, PropTypes} from "react";

export default class ModalRouter extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modals: []
        };
    }

    render() {
        let self = this;
        let modals = this.state.modals;

        return (
            <div>
                {modals.map(m => {
                    let Type = m.type;
                    return <Type key={m.id} show={true} {...m.data} hide={() => self.hide(m.id)}/>
                })}
            </div>
        );
    }

    show(type, data) {
        if (typeof type != 'function')
            throw new Error('modal type 必须为component');
        if (typeof data != 'object')
            throw new Error('data 必须为object');

        let modals = this.state.modals;
        modals.push({
            id: this.buildUid(),
            type: type,
            data: data
        });
        this.setState({modals: modals});
    }

    hide(id) {
        let modals = this.state.modals;
        let target = -1;
        modals.forEach((m, i) => {
            if (m.id == id)
                target = i;
        });
        (target != -1) && modals.splice(target, 1);
        this.setState({modals: modals});
    }

    buildUid() {
        return new Date().getTime() + Math.random();
    }

}