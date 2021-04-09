import React, { useState } from 'react';
import { Container, Grid, Dropdown, Icon, Input, Form, TextArea, Button } from "semantic-ui-react";

const useDropdown = (label, defaultState, options) => {
  const [state, setState] = useState(defaultState);
  const Dropdownmaker = () => (
      <label htmlFor={label}>
        {label}
        <Dropdown
            id={label}
            value={state}
            onChange={e => setState(e.target.value)}
            options={["bankA", "bankB"]}/>

          {/*{options.map(item =>*/}
          {/*    <option key={item} value={item}>{item}</option>)}*/}
        {/*</Dropdown>*/}
      </label>
  );
  return [state, Dropdownmaker, setState]
}

export default useDropdown