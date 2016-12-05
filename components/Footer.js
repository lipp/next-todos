import React from 'react'

const Footer = ({connection, call, completedIds, selectedFilter, active, setFilter, todos}) => {
  const filters = ['all', 'active', 'completed']
  return (
    <footer>
      <span>
        {active.length === 0 ? 'no items ' : null}
        {active.length === 1 ? '1 item ' : null}
        {active.length > 1 ? active.length + ' items ' : null}
        left
      </span>
      <ul className='filters'>
        {filters.map(filter =>
          <li className={selectedFilter === filter && 'selected'} key={filter} onClick={() => setFilter(filter)}>{filter}</li>
        )}
      </ul>
      <a href='#' onClick={() => call(connection, 'todo/remove', completedIds)}>Clear completed</a>
    </footer>
  )
}

export default Footer

