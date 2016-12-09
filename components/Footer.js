import React from 'react'

export default ({clearCompleted, completedIds, selectedFilter, actives, setFilter}) => {
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
          <li key={filter}
            className={selectedFilter === filter && 'selected'}
            onClick={() => setFilter(filter)}>
            {filter}
          </li>
        )}
      </ul>
      <a href='#' onClick={() => clearCompleted(completedIds)}>Clear completed</a>
    </footer>
  )
}
