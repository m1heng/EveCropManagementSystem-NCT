import React from "react";

export default class ChangInfoDialog extends React.Component {
    state = {
        open: true
    };

    constructor(props) {
        super(props);
        this.setState({
            email: this.props.email,
            chinese_alias: this.props.chinese_alias,
            english_alias: this.props.english_alias,
            qq: this.props.qq
        });
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        return this.state.open && <div />;
    }
}
