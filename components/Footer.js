import React from 'react'

const Footer = ({clearCompleted, completedIds, selectedFilter, actives, setFilter}) => {
  return (
    <footer>
      <span>
        {actives === 0 ? 'no items ' : null}
        {actives === 1 ? '1 item ' : null}
        {actives > 1 ? actives + ' items ' : null}
        left
      </span>
      <ul className='filters'>
        {['all', 'active', 'completed'].map(filter =>
          <li className={selectedFilter === filter && 'selected'} key={filter} onClick={() => setFilter(filter)}>{filter}</li>
        )}
      </ul>
      <a href='#' onClick={() => clearCompleted(completedIds)}>Clear completed</a>
    </footer>
  )
}

export default Footer

