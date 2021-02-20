import React from 'react';

function Footer() {
  const divStyle = { paddingTop: '15px', paddingBottom: '15px' };
  return (
      <footer style={{ background: 'black', color: 'white' }}>
        <div style={divStyle} className="ui center aligned container">
          BBO is a student project under the University of Hawaii at Manoa Spring 2021. <br/>
          This project aims to explore cyber security techniques, and as such this website shouldn't <br/>
          be taken seriously with real personal information. <br/>
          University of Hawaii<br/>
          Honolulu, HI 96826
        </div>
      </footer>
  );
}

export default Footer;