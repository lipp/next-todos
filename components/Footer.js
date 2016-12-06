import React from 'react'

const Footer = ({clearCompleted, completedIds, selectedFilter, active, setFilter}) => {
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
      <a href='#' onClick={() => clearCompleted(completedIds)}>Clear completed</a>
    </footer>
  )
}

export default Footer

