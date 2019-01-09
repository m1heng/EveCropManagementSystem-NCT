import React from "react";
import { Button } from "@material-ui/core";
import {
    FilteringState,
    IntegratedFiltering,
    SortingState,
    IntegratedSorting,
    DataTypeProvider,
    RowDetailState
} from "@devexpress/dx-react-grid";
import {
    Grid,
    Table,
    TableHeaderRow,
    TableFilterRow,
    TableRowDetail
} from "@devexpress/dx-react-grid-material-ui";

import { MemberRowDetail } from "./MemberRowDetail";
import AccessControlDialog from "./AccessControlDialog";

const DateFormatter = ({ value }) => new Date(value).toLocaleString("en-GB");

const DateTypeProvider = props => (
    <DataTypeProvider formatterComponent={DateFormatter} {...props} />
);

const RoleFormatter = ({ value }) => (value ? "是" : "否");

const RoleTypeProvider = props => (
    <DataTypeProvider formatterComponent={RoleFormatter} {...props} />
);

class MemberView extends React.Component {
    state = {
        ACDialogOpen: false,
        ACuser: null
    };

    constructor(props) {
        super(props);
    }

    addRoleBtn = ({ index }) => {
        return (
            <Button
                onClick={this.handleRoleButton.bind(this, { index: index })}
            >
                权限
            </Button>
        );
    };

    handleRoleButton = ({ index }) => {
        console.log(index);
        this.setState({
            ACDialogOpen: true,
            ACuser: index
        });
    };

    handleDialogClose = () => {
        this.setState({ ACDialogOpen: false });
    };

    componentDidMount() {}
    render() {
        const { users } = this.props;
        users.forEach(user => {
            user.action = this.addRoleBtn.call(this, { index: user });
            user.characters &&
                user.characters.map(char => {
                    char.action = this.addRoleBtn.call(this, {
                        index: char.esi_id
                    });
                    char.owner = user.chinese_alias;
                });
        });
        return (
            <div>
                <Grid
                    rows={users}
                    columns={[
                        { name: "email", title: "Email" },
                        { name: "chinese_alias", title: "中文昵称" },
                        { name: "english_alias", title: "英文昵称" },
                        { name: "qq", title: "QQ" },
                        { name: "registered_on", title: "注册于" },
                        { name: "fc", title: "指挥" },
                        { name: "hr", title: "招新" },
                        { name: "director", title: "总监" },
                        { name: "action", title: "action" }
                    ]}
                >
                    <FilteringState
                        defaultFilters={[]}
                        columnExtensions={[
                            { columnName: "action", filteringEnabled: false }
                        ]}
                    />
                    <SortingState defaultSorting={[]} />
                    <RowDetailState defaultExpandedRowIds={[]} />
                    <IntegratedSorting />
                    <IntegratedFiltering />
                    <DateTypeProvider for={["registered_on"]} />
                    <RoleTypeProvider for={["fc", "hr", "director"]} />
                    <Table />

                    <TableHeaderRow showSortingControls />
                    <TableRowDetail contentComponent={MemberRowDetail} />
                    <TableFilterRow />
                </Grid>
                {this.state.ACuser && (
                    <AccessControlDialog
                        onClose={this.handleDialogClose}
                        open={this.state.ACDialogOpen}
                        user={this.state.ACuser}
                    />
                )}
            </div>
        );
    }
}

export default MemberView;
