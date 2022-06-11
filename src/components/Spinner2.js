import React, { Component } from 'react';
import ClipLoader from "react-spinners/ClipLoader";


export default class Spinner2 extends Component {
  render() {
    return <div>
        <ClipLoader  css={`display: block; margin: 0 auto; border-color: black; `} size={30} />
    </div>;
  }
}
