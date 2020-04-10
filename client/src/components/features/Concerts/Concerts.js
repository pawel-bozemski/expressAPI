import React from 'react';

import Concert from './../Concert/Concert';

const Concerts = ({ concerts }) => {
  console.log('concerts', concerts)

 return <section>
    {concerts.map(con => <Concert key={con.id} {...con} />)}
  </section>
}

export default Concerts;