import React from "react";
import { Button } from "@material-ui/core";
import {
    FilteringState,
    IntegratedFiltering,
    SortingState,
    IntegratedSorting,
    DataTypeProvider
} from "@devexpress/dx-react-grid";
import {
    Grid,
    Table,
    TableHeaderRow,
    TableFilterRow
} from "@devexpress/dx-react-grid-material-ui";

class CharacterView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { chars } = this.props;
        return (
            <Grid
                rows={chars}
                columns={[
                    { name: "name", title: "角色名" },
                    { name: "esi_id", title: "ESI ID" },
                    { name: "add_on", title: "注册于" },
                    { name: "owner", title: "拥有者" }
                ]}
            >
                <FilteringState
                    defaultFilters={[]}
                    columnExtensions={[
                        { columnName: "action", filteringEnabled: false }
                    ]}
                />
                <SortingState
                    defaultSorting={[{ columnName: "name", direction: "asc" }]}
                />
                <IntegratedSorting />
                <IntegratedFiltering />
                <Table />
                <TableHeaderRow showSortingControls />
                <TableFilterRow />
            </Grid>
        );
    }
}

export default CharacterView;
