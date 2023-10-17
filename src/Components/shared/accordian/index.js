import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

function Accordian({ list, header, body, keyExtractor, expandedIndex }) {

  const [open, setOpen] = useState(expandedIndex)

  return (
    <>
      {
        list && list.length > 0 &&
        <>
          {
            list.map((l, i) => (
              <React.Fragment key={i}>
                <TouchableOpacity onPress={() => setOpen(i)}>
                  {
                    header(l)
                  }
                </TouchableOpacity>
                {
                  l.subcategories && l.subcategories.length > 0 && open === i && body(l)
                }
              </React.Fragment>
            ))
          }
        </>
      }
    </>
  )
}

export default Accordian