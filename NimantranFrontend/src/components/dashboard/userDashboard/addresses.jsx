
import React, { useState } from "react";
import AddressSection from "../../AddressSection.jsx"


export default function Addresses({}) {

  return (
    <section>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
            <AddressSection/>
       </div>
    </section>
  );
}
