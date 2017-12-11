import React from "react";
import "./GoalListItems.css";

const GoalListItems = props =>{

return (
  <div className="form-group">
    <label for="transfer_funds">Select Item to Transfer Funds to:</label>
    <select className="form-control" id="transfer_funds">
      {props.items.map(item => (
        <option>
          {item.item_name}
        </option>
      ))}
    </select>
  </div>
  );
}

export default GoalListItems;
