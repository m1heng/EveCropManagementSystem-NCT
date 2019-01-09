import React from "react";
import { FilteringState, IntegratedFiltering } from "@devexpress/dx-react-grid";
import {
    Grid,
    Table,
    TableHeaderRow,
    TableFilterRow
} from "@devexpress/dx-react-grid-material-ui";

const MemberView = (users = []) => (
    <Grid
        rows={users}
        columns={[
            { name: "emial", title: "Email" },
            { name: "chinese_alias", title: "中文昵称" },
            { name: "english_alias", title: "英文昵称" },
            { name: "qq", title: "QQ" },
            { name: "registered_on", title: "注册于" },
            { name: "fc", title: "指挥" },
            { name: "hr", title: "招新" },
            { name: "director", title: "总监" }
        ]}
    >
        <FilteringState defaultFilters={[]} />
        <IntegratedFiltering />
        <Table />

        <TableHeaderRow />
        <TableFilterRow />
    </Grid>
);

export default MemberView;
