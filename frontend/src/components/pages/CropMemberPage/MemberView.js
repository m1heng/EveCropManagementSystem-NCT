import React from "react";
import { Button } from "@material-ui/core";
import { FilteringState, IntegratedFiltering ,SortingState,
    IntegratedSorting,DataTypeProvider } from "@devexpress/dx-react-grid";
import {
    Grid,
    Table,
    TableHeaderRow,
    TableFilterRow
} from "@devexpress/dx-react-grid-material-ui";


const DateFormatter = ({ value }) => new Date(value).toLocaleString("en-GB");

const DateTypeProvider = props => (
  <DataTypeProvider
    formatterComponent={DateFormatter}
    {...props}
  />
);



class MemberView extends React.Component{
    constructor(props){
        super(props);
    }


    addRoleBtn = ({index})=>{
        return(
            <Button onClick={this.handleRoleButton.bind(this, { index: index })}>Test</Button>
        )
    }

    handleRoleButton = ({ index }) =>{
        console.log(index);
    }

    componentDidMount(){

    }
    render(){
        const { users } = this.props;
        const s = this.props.users.slice();
        s.forEach(user =>{
            user.action = this.addRoleBtn.call(this, {index : user.public_id})
        });
        return(<Grid
            rows={s}
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
            <FilteringState defaultFilters={[]} />
            <SortingState
            defaultSorting={[]}
          />
          <IntegratedSorting />
            <IntegratedFiltering />
            <DateTypeProvider
            for={['registered_on']}
          />
            <Table />
    
            <TableHeaderRow  showSortingControls/>
            <TableFilterRow />
        </Grid>);


    }

}


export default MemberView;
