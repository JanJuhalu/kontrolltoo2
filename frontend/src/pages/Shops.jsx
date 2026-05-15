import React, { useEffect, useState } from 'react'

const BACKEND_URL = import.meta.env.VITE_BACK_URL

function Shops() {
  const [types, setTypes] = useState([])

  useEffect(() => {
    fetch(BACKEND_URL + "/gazetteer-types")
      .then(res => res.json())
      .then(json => setTypes(json))
  }, [])

  return (
    <div className="flex flex-col gap-6 pt-4">
      <h1 className="text-xl font-semibold">Our shops</h1>

      <div>{types.length} gazetteer types found.</div>

      {types.map(type =>
        <div key={type.typeID} className="border rounded-md p-4">
          <div className="font-semibold">{type.type}</div>
          <div>{type.description}</div>
        </div>
      )}
    </div>
  )
}

export default Shops